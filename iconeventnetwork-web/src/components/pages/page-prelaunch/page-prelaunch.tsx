import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'page-prelaunch',
  styleUrl: 'page-prelaunch.scss',
  shadow: false,
})
export class PagePrelaunch{
    render() {
        return (
            <Host>
                <div class='accent-block'>
                    <div class='logo-header'>
                        <img src='/assets/icon/icon.png' class='icon' />
                    </div>
                    <hr class='purple'/>
                    <p>
                        The Icon Network is the first invitation-only consortia created for the global luxury 
                        event community of qualifying event planners and providers.
                    </p>   
                    <p> 
                        Coming in 2023.
                        <br/>
                        For more information, please contact us at <a href="mailto:info@theiconnetwork.com?subject=Inquiry about the Icon Network">info@theiconnetwork.com</a> 
                        <br/>
                        or call <a href="tel:12124769444">+1-212-476-9444</a>.
                    </p> 
                </div>        
            </Host>    
        );
    }
}