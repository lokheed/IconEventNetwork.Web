import { Component, h, Method, Prop } from '@stencil/core';

@Component({
    tag: 'icn-message',
    styleUrl: 'icn-message.scss',
    shadow: false,
})
export class IcnMessage {
    private messageDiv: HTMLDivElement;
    @Prop() type!: 'warning' | 'success' | 'error' | 'info';
    @Prop() dismissible?: boolean = false;
    @Method()
    async reset() {
        this.messageDiv.classList.remove('hidden');
    }

    private handleDismissClick(e: MouseEvent) {
        e.preventDefault();
        this.messageDiv.classList.add('hidden');
    }

    componentWillLoad() {    }

    componentDidLoad() {
        this.messageDiv.classList.add(this.type);
    }

    render() {
        return (
            <div class='message' ref={el => this.messageDiv = el}>
                {this.type === 'error' &&
                    <span>
                        <i class="fa-solid fa-triangle-exclamation"></i> <b>Error. </b>
                    </span>
                }
                {this.type === 'info' &&
                    <span>
                        <i class="fa-solid fa-circle-info"></i> <b>Info. </b>
                    </span>
                }
                {this.type === 'success' &&
                    <span>
                        <i class="fa-solid fa-check"></i> <b>Success. </b>
                    </span>
                }
                {this.type === 'warning' &&
                    <span>
                        <i class="fa-solid fa-triangle-exclamation"></i> <b>Warning. </b>
                    </span>
                }
                <span>
                    <slot></slot>
                </span>
                {this.dismissible && 
                    <button onClick={e => this.handleDismissClick(e)}><i class="fa-solid fa-xmark"></i></button>
                }
            </div>
        );
    }
}
