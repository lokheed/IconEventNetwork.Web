import { Component, Event, EventEmitter, Prop, h } from "@stencil/core";

@Component({
  tag: "app-confirmation",
  styleUrl: "app-confirmation.scss",
  shadow: false
})
export class Modal {
    @Prop() primaryActionText?: string = 'Delete';
    @Prop() secondaryActionText?: string = 'Cancel';
    @Prop( { mutable: true, reflect: true, } ) visible: boolean = false;
    @Event() private primaryConfirmationClick: EventEmitter;
    @Event() private secondaryConfirmationClick: EventEmitter;

    private handlePrimaryClick(e: MouseEvent) {
        e.preventDefault();
        this.primaryConfirmationClick.emit();
    }

    private handleSecondaryClick(e: MouseEvent) {
        e.preventDefault();
        this.secondaryConfirmationClick.emit();
    }
    
    render() {
        return (
            <div class={this.visible ? 'wrapper visible' : 'wrapper'}>
                <div class="confirmation">
                    <div class='message'>
                        <slot></slot>
                    </div>
                    <hr/>
                    <div class="button-container">
                        <icn-button type="neutral" onClick={e => this.handleSecondaryClick(e)}>{this.secondaryActionText}</icn-button>
                        <icn-button type="danger" onClick={e => this.handlePrimaryClick(e)}>{this.primaryActionText}</icn-button>
                    </div>
                </div>
            </div>
        );
    }
}