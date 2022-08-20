import { newSpecPage } from '@stencil/core/testing';
import { PageDirectory } from '../page-directory';

describe('page-directory', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [PageDirectory],
      html: `<page-directory></page-directory>`,
    });
    expect(page.root).toEqualHtml(`
      <page-directory>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </page-directory>
    `);
  });
});
