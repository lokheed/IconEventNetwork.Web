import { newSpecPage } from '@stencil/core/testing';
import { AppNavigation } from '../app-navigation';

describe('app-navigation', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [AppNavigation],
      html: `<app-navigation></app-navigation>`,
    });
    expect(page.root).toEqualHtml(`
      <app-navigation>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </app-navigation>
    `);
  });
});
