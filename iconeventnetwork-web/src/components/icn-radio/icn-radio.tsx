import { Component, Host, h, Prop, Element } from '@stencil/core';

@Component({
  tag: 'icn-radio',
  styleUrl: 'icn-radio.scss',
  shadow: true,
})
export class IcnRadio {

  /** Defines if the radio button is selected or not. */
  @Prop({mutable: true, reflect: true}) checked: boolean = false;

  /** Defines the name of the radio button (used to uncheck other radio buttons sharing the same name). */
  @Prop({reflect: true}) name!: string;

  /** Holds the value for this radio button. */
  @Prop({reflect: true}) value: any;

  /** Disables the radio button. */
  @Prop({reflect: true}) disabled: boolean = false;

  @Element() el!: HTMLIcnRadioElement;

  connectedCallback() {
    if (this.el.parentElement?.tagName == "LABEL"){
      this.el.parentElement.addEventListener("click", this.handleClick.bind(this));
    }

    const namedLabels = document.querySelectorAll(`label`);
    namedLabels.forEach(label =>{
      if (label.htmlFor && label.htmlFor == this.el.id){
        label.addEventListener("click", this.handleClick.bind(this));
      }
    });
  }

  disconnectedCallback(){
    if (this.el.parentElement?.tagName == "LABEL"){
      this.el.parentElement.removeEventListener("click", this.handleClick);
    }

    const namedLabels = document.querySelectorAll(`label`);
    namedLabels.forEach(label =>{
      if (label.htmlFor && label.htmlFor == this.el.id){
        label.removeEventListener("click", this.handleClick);
      }
    });
  }

  private handleClick() {
    if (this.disabled)
    {
      return;
    }

    const others = document.querySelectorAll("icn-radio");
    others.forEach(other =>
    {
      if (other.name == this.name){
        other.checked = false;
      }
    });
    this.checked = true;
  }

  render() {
    return (
      <Host
        role="radio"
        aria-checked={this.checked ? "true" : "false"}
        aria-disabled={this.disabled ? "true" : "false"}
      >
        <button class="outer"
          onClick={() => this.handleClick()}
        >
          <div class="inner"></div>
        </button>
      </Host>
    );
  }
}
