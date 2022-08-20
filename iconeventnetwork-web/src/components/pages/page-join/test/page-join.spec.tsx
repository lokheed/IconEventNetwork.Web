import { newSpecPage } from '@stencil/core/testing';
import { PageJoin } from '../page-join';

describe('page-join', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [PageJoin],
      html: `<page-join></page-join>`,
    });
    expect(page.root).toEqualHtml(`
      <page-join>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </page-join>
    `);
  });
});
