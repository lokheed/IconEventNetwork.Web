import { Component, h } from '@stencil/core';

@Component({
  tag: 'page-ux-test',
  styleUrl: 'page-ux-test.scss',
  shadow: false,
})
export class PageUXTest{
    render() {
        return (
            <div class='ux-test'>
                test components will go here
            </div>    
        );
    }
}