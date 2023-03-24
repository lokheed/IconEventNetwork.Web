import { Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'icn-button',
  styleUrl: 'icn-button.scss',
  shadow: true,
})
export class IcnButton {
  
  /** Defines the overall style of the button. */
  @Prop() type: 'primary' | "secondary" | "tertiary" | "neutral" | "danger" | "success" | "warning" | "link" = "primary";

  /** Defines if the button should be reversed (colors) */
  @Prop() reversed: boolean = false;

  /** Defines if the button should be disabled */
  @Prop() disabled: boolean = false;

  private getButtonClass(){
    var classList: string[] = [];
    classList.push(this.type);
    if (this.reversed)
    {
      classList.push("reversed");
    }
    if (this.disabled){
      classList.push("disabled");
    }
    return classList.join(" ");
  }

  render() {
    return (
      <Host>
        <button class={this.getButtonClass()}>
          <slot></slot>
        </button>
      </Host>
    );
  }

}
