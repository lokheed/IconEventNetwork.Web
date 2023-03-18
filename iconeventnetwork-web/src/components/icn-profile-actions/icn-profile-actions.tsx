import { Component, Event, EventEmitter, h, Prop } from '@stencil/core';

@Component({
    tag: 'icn-profile-actions',
    styleUrl: 'icn-profile-actions.scss',
    shadow: false,
})
export class IcnProfileActions {
    @Prop() editText?: string = 'Edit';
    @Prop() deleteText?: string = 'Delete';
    @Prop() editDisabled?: boolean = false;
    @Prop() deleteDisabled?: boolean = false;
    @Event() private editClick: EventEmitter;
    @Event() private deleteClick: EventEmitter;

    private handleDeleteClick(e: MouseEvent) {
        e.preventDefault();
        this.deleteClick.emit();
    }

    private handleEditClick(e: MouseEvent) {
        e.preventDefault();
        this.editClick.emit();
    }

    render() {
        return (        
            <div class='profile-actions'>
                <button disabled={this.editDisabled} class='profile-action primary' onClick={e => this.handleEditClick(e)}>
                    <i class="fa-solid fa-pen"></i>&nbsp;<span class='action-text'>{this.editText}</span>
                </button>
                <button disabled={this.deleteDisabled} class='profile-action secondary' onClick={e => this.handleDeleteClick(e)}>
                    <i class="fa-solid fa-trash-can"></i>&nbsp;<span class='action-text'>{this.deleteText}</span>
                </button> 
            </div>
        );
    }
}