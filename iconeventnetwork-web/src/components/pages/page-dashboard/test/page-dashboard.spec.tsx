import { newSpecPage } from '@stencil/core/testing';
import { PageDashboard } from '../page-dashboard';

describe('page-dashboard', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [PageDashboard],
      html: `<page-dashboard></page-dashboard>`,
    });
    expect(page.root).toEqualHtml(`
      <page-dashboard>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </page-dashboard>
    `);
  });
});
