import { newSpecPage } from '@stencil/core/testing';
import { PageDestinations } from '../page-destinations';

describe('page-destinations', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [PageDestinations],
      html: `<page-destinations></page-destinations>`,
    });
    expect(page.root).toEqualHtml(`
      <page-destinations>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </page-destinations>
    `);
  });
});
