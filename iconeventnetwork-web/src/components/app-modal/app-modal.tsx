import { Component, Event, EventEmitter, Prop, h } from "@stencil/core";

@Component({
  tag: "app-modal",
  styleUrl: "app-modal.scss",
  shadow: false
})
export class Modal {
    @Prop() dialogTitle: string;
    @Prop() primaryActionText: string = 'Save';
    @Prop() secondaryActionText: string = 'Cancel';
    @Prop( { mutable: true, reflect: true, } ) visible: boolean = false;
    @Event() private primaryModalClick: EventEmitter;
    @Event() private secondaryModalClick: EventEmitter;

    private handlePrimaryClick(e: MouseEvent) {
        e.preventDefault();
        this.primaryModalClick.emit();
    }

    private handleSecondaryClick(e: MouseEvent) {
        e.preventDefault();
        this.secondaryModalClick.emit();
    }

    render() {
        return (
            <div class={this.visible ? 'wrapper visible' : 'wrapper'}>
                <div class="modal">
                    <div class="title-container">{this.dialogTitle}</div>
                    <slot></slot>
                    <div class="button-container">
                        <button class="primary-action" onClick={e => this.handlePrimaryClick(e)}>{this.primaryActionText}</button>
                        <button class="secondary-action" onClick={e => this.handleSecondaryClick(e)}>{this.secondaryActionText}</button>
                    </div>
                </div>
            </div>
        );
    }
}