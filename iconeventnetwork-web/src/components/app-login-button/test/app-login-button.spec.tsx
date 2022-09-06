import { newSpecPage } from '@stencil/core/testing';
import { AppLoginButton } from '../app-login-button';

describe('app-login-button', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [AppLoginButton],
      html: `<app-login-button></app-login-button>`,
    });
    expect(page.root).toEqualHtml(`
      <app-login-button>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </app-login-button>
    `);
  });
});
