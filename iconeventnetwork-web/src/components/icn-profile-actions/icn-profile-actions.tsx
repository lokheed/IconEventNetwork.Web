import { Component, Event, EventEmitter, h, Prop } from '@stencil/core';

@Component({
    tag: 'icn-profile-actions',
    styleUrl: 'icn-profile-actions.scss',
    shadow: false,
})
export class IcnProfileActions {
    @Prop() editText?: string = '';
    @Prop() deleteText?: string = 'Delete';
    @Prop() editDisabled?: boolean = false;
    @Prop() deleteDisabled?: boolean = false;
    @Event() private editClick: EventEmitter;

    private handleEditClick(e: MouseEvent) {
        e.preventDefault();
        this.editClick.emit();
    }

    render() {
        return (        
            <div class='content-actions'>
                <button disabled={this.editDisabled} class='profile-action primary' title='Edit' onClick={e => this.handleEditClick(e)}>
                    <span class='action-text'>{this.editText}</span><i class="fa-solid fa-pen"></i>
                </button>
            </div>
        );
    }
}