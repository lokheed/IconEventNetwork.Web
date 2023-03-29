import { Component, h } from '@stencil/core';

@Component({
  tag: 'page-ux-test',
  styleUrl: 'page-ux-test.scss',
  shadow: false,
})
export class PageUXTest{
    private demoModal: HTMLIcnModalElement;
    private buttonsContainer: HTMLFieldSetElement;

    componentDidLoad(){
        const buttons = this.buttonsContainer.querySelectorAll("icn-button");
        buttons.forEach(button => button.addEventListener("click", e => console.log(e)));
    }

    private showModal(): void {
        this.demoModal.show();
    }

    private getColors(): {varName: string, value: string}[]{
        var colors: {varName: string, value: string}[] = [];
        const styleSheets = document.styleSheets;
        for (let index = 0; index < styleSheets.length; index++) {
            const styleSheet = styleSheets[index];
            try {
                if (!styleSheet.cssRules){
                    continue;
                }
            } catch (error) {
                continue;
            }
            for (let index = 0; index < styleSheet.cssRules.length; index++) {
                const rule = styleSheet.cssRules[index] as any;
                if (rule.cssText?.toLowerCase().startsWith(":root")){
                    for (let index = 0; index < rule.style.length; index++) {
                        const style = rule.style[index];
                        if (style.startsWith("--color-")){
                            colors.push({varName: style, value: rule.style.getPropertyValue(style)});
                        }
                    }
                }
            }
        }
        return colors;
    }

    render() {
        return (
            <div class='ux-test'>
                <fieldset class="colors">
                    <legend>Colors</legend>
                    {this.getColors().map(color =>
                        <div>
                            <div>{color.varName}</div>
                            <div style={{backgroundColor: color.value, width: "100px", height: "100px"}}></div>
                            <div>{color.value}</div>
                        </div>
                    )}
                </fieldset>
                <fieldset class="icn-button" ref={el => this.buttonsContainer = el}>
                    <legend>icn-button</legend>
                    <icn-button type="primary">Primary</icn-button>
                    <icn-button type="primary" reversed>Primary Reversed</icn-button>
                    <icn-button type="primary" disabled>Primary Disabled</icn-button>

                    <icn-button type="secondary">Secondary</icn-button>
                    <icn-button type="secondary" reversed>Secondary Reversed</icn-button>
                    <icn-button type="secondary" disabled>Secondary Disabled</icn-button>
                    
                    <icn-button type="tertiary">Tertiary</icn-button>
                    <icn-button type="tertiary" reversed>Tertiary Reversed</icn-button>
                    <icn-button type="tertiary" disabled>Tertiary Disabled</icn-button>
                    
                    <icn-button type="neutral">Neutral</icn-button>
                    <icn-button type="neutral" reversed>Neutral Reversed</icn-button>
                    <icn-button type="neutral" disabled>Neutral Disabled</icn-button>

                    <icn-button type="danger">Danger</icn-button>
                    <icn-button type="danger" reversed>Danger Reversed</icn-button>
                    <icn-button type="danger" disabled>Danger Disabled</icn-button>

                    <icn-button type="success">Success</icn-button>
                    <icn-button type="success" reversed>Success Reversed</icn-button>
                    <icn-button type="success" disabled>Success Disabled</icn-button>

                    <icn-button type="warning">Warning</icn-button>
                    <icn-button type="warning" reversed>Warning Reversed</icn-button>
                    <icn-button type="warning" disabled>Warning Disabled</icn-button>

                    <icn-button type="info">Info</icn-button>
                    <icn-button type="info" reversed>Info Reversed</icn-button>
                    <icn-button type="info" disabled>Info Disabled</icn-button>

                    <icn-button type="link">Link</icn-button>
                    <icn-button type="link" reversed>Link Reversed</icn-button>
                    <icn-button type="link" disabled>Link Disabled</icn-button>

                    <icn-button
                        confirm
                        confirmMessage="Are you sure you want to do the thing?"
                        confirmYesText="Hell ya!"
                        confirmNoText="Oh hell no!"
                        onConfirmed={() => alert("Confirmed!")}
                        onDismissed={() => alert("Dismissed!")}
                    >
                        Confirmable
                    </icn-button>
                </fieldset>
                <fieldset>
                    <legend>icn-modal</legend>
                    <icn-button onClick={() => this.showModal()}>
                        Open Modal
                    </icn-button>
                    <icn-modal ref={el => this.demoModal = el}>
                        <div>
                            <h3>Modal Header Text</h3>
                            <p>The body content of the modal goes in this space.</p>
                        </div>
                        <div slot="footer">
                            <icn-button type="primary" onClick={() => this.demoModal.hide()}>
                                Close
                            </icn-button>
                        </div>
                    </icn-modal>
                </fieldset>
            </div>    
        );
    }
}