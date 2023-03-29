import { Component, Host, h, Method, Prop } from '@stencil/core';

@Component({
  tag: 'icn-modal',
  styleUrl: 'icn-modal.scss',
  shadow: true,
})
export class IcnModal {

  private overlay: HTMLDivElement;

  /** Defines the overall style of the button. */
  @Prop() type: 'primary' | "secondary" | "tertiary" | "neutral" | "danger" | "success" | "warning" | "info" = "primary";

  /** Shows the modal. */
  @Method()
  async show() {
    this.overlay.classList.add('visible');
  }

  /** Hides the modal. */
  @Method()
  async hide() {
    this.overlay.classList.remove('visible');
  }

  private getDialogClasses(){
    const classlist = ["dialog"];
    classlist.push(this.type);
    return classlist.join(" ");
  }
  
  render() {
    return (
      <Host>
        <div class="overlay" ref={el => this.overlay = el}>
          <div class={this.getDialogClasses()}>
            <button class="close"
              onClick={() => this.hide()}
            >
              <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 96 960 960" width="24"><path d="m256 856-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
            </button>
            <slot></slot>
            <div class="footer">
              <slot name="footer"></slot>
            </div>
          </div>
        </div>
      </Host>
    );
  }

}
