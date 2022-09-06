import { newSpecPage } from '@stencil/core/testing';
import { PageLoginRedirect } from '../page-login-redirect';

describe('page-login-redirect', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [PageLoginRedirect],
      html: `<page-login-redirect></page-login-redirect>`,
    });
    expect(page.root).toEqualHtml(`
      <page-login-redirect>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </page-login-redirect>
    `);
  });
});
