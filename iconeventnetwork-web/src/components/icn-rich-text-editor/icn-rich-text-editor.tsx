import { Component, Host, h, Prop, Method } from '@stencil/core';
import { Jodit } from 'jodit';
import { Config } from 'jodit/types/config';

@Component({
  tag: 'icn-rich-text-editor',
  styleUrl: 'icn-rich-text-editor.scss',
  shadow: false,
})
export class IcnRichTextEditor {

  /** The value of the html content */
  @Prop() value: string;

  /** Allows overriding the default config,
   * see https://github.com/xdan/jodit/blob/master/src/config.ts
   */
  @Prop() options: Config = {
    ...Jodit.defaultOptions,
    buttons:[
      "bold", "italic", "underline", "eraser", "ul", "ol", "superscript", "subscript", "cut", "copy", "paste", "copyformat", "link"
    ],
    buttonsMD: [
      "bold", "italic", "underline", "eraser", "ul", "ol", "superscript", "subscript", "cut", "copy", "paste", "copyformat", "link"
    ],
    buttonsSM: [
      "bold", "italic", "underline", "ul", "ol", "copy", "paste", "link", "dots"
    ],
    buttonsXS: [
      "bold", "italic", "underline", "ul", "ol", "link", "dots"
    ],
    defaultActionOnPaste: "insert_as_text",
    defaultActionOnPasteFromWord: "insert_as_text",
  };

  /** Gets the current html value. */
  @Method()
  async getValue() {
    return this.editor.value;
  }

  private editorContainer!: HTMLTextAreaElement;
  private editor!: Jodit;

  componentDidLoad() {
    console.log(this.options);
    this.editor = Jodit.make(this.editorContainer, this.options);
    this.editor.value = this.value;
  }

  render() {
    return (
      <Host>
        <textarea
          ref={el => this.editorContainer = el}
        />
      </Host>
    );
  }
}
