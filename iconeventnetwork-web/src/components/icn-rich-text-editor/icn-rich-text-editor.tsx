import { Component, Host, h, Prop, Method } from '@stencil/core';
import { Jodit } from 'jodit';

@Component({
  tag: 'icn-rich-text-editor',
  styleUrl: 'icn-rich-text-editor.scss',
  shadow: false,
})
export class IcnRichTextEditor {

  /** The value of the html content */
  @Prop() value: string;

  /** Gets the current html value. */
  @Method()
  async getValue() {
    return this.editor.value;
  }

  private editorContainer!: HTMLTextAreaElement;
  private editor!: Jodit;

  componentDidLoad() {
    const options = Jodit.defaultOptions;
    this.editor = Jodit.make(this.editorContainer, options);
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
