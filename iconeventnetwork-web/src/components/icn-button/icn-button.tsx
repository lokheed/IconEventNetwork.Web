import { Component, Host, h, Prop, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'icn-button',
  styleUrl: 'icn-button.scss',
  shadow: true,
})
export class IcnButton {
  
  /** Defines the overall style of the button. */
  @Prop() type: 'primary' | "secondary" | "tertiary" | "neutral" | "danger" | "success" | "warning" | "info" | "link" = "primary";

  /** Defines if the button should be reversed (colors) */
  @Prop() reversed: boolean = false;

  /** Defines if the button should be disabled */
  @Prop() disabled: boolean = false;

  /**
   * Optionally add a confirmation dialog before firing the action.
   */
  @Prop() confirm?: boolean = false;

  /**
   * The text of the yes button for confirmation.
   */
  @Prop() confirmYesText?: string = "Yes";

  /**
   * The text of the no button for confirmation.
   */
  @Prop() confirmNoText?: string = "No";

  /**
   * The text of the confirmation message;
   */
  @Prop() confirmMessage?: string = "Are you sure ?";

  /** Fires when in confirm mode and the user accepts the message. */
  @Event() confirmed: EventEmitter;

  /** Fires when in confirm mode and the user dismisses the message. */
  @Event() dismissed: EventEmitter;
  
  private modal: HTMLIcnModalElement;

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

  private handleClick(e: MouseEvent): void {
    if (this.confirm){
      e.stopPropagation();
      e.preventDefault();
      this.modal.show();
    }
  }

  private handleConfirm(e: MouseEvent): void {
    e.stopPropagation();
    e.preventDefault();
    this.confirmed.emit();
    this.modal.hide();
  }

  private handleDismiss(e: MouseEvent): void {
    e.stopPropagation();
    e.preventDefault();
    this.dismissed.emit();
    this.modal.hide();
  }

  handleHostClick(e: MouseEvent): void {
    if (this.disabled){
      e.stopPropagation();
      e.preventDefault();
    }
  }

  render() {
    return (
      <Host
        onClick={e => this.handleHostClick(e)}>
        <button class={this.getButtonClass()}
          onClick={e => this.handleClick(e)}
          disabled={this.disabled}
        >
          <slot></slot>
        </button>
        {this.confirm &&
          <icn-modal type={this.type as any} ref={el => this.modal = el}>
            <p>
              {this.confirmMessage}
            </p>
            <div slot="footer" class="controls">
              <icn-button type="neutral"
                onClick={e => this.handleDismiss(e)}>
                {this.confirmNoText}
              </icn-button>
              <icn-button type={this.type}
                onClick={e => this.handleConfirm(e)}>
                {this.confirmYesText}
              </icn-button>
            </div>
          </icn-modal>
        }
      </Host>
    );
  }
}
