import { Component, h, Prop } from '@stencil/core';

@Component({
    tag: 'icn-copy',
    styleUrl: 'icn-copy.scss',
    shadow: false,
})
export class IcnCopy {
    @Prop() textToCopy: string;
    @Prop() titleText?: string = '';

    private handleCopyClick(e: MouseEvent) {
        e.preventDefault();
        navigator.clipboard.writeText(this.textToCopy);
    }
    render() {
        return (
            <button class='copy' title={this.titleText} onClick={e => this.handleCopyClick(e)}><i class="fa-solid fa-copy"></i></button>
        );
    }
}
