import { Component, Event, EventEmitter, Prop, h } from "@stencil/core";

@Component({
  tag: "app-confirmation",
  styleUrl: "app-confirmation.scss",
  shadow: false
})
export class Modal {
    @Prop() message: string = '';
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
                        {this.message}
                    </div>
                    <hr/>
                    <div class="button-container">
                        <button class="primary-action" onClick={e => this.handlePrimaryClick(e)}>{this.primaryActionText}</button>
                        <button class="secondary-action" onClick={e => this.handleSecondaryClick(e)}>{this.secondaryActionText}</button>
                        <div class='clearfix'></div>
                    </div>
                </div>
            </div>
        );
    }
}