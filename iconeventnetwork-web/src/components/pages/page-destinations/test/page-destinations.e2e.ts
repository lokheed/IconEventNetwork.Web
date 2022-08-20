import { newE2EPage } from '@stencil/core/testing';

describe('page-destinations', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<page-destinations></page-destinations>');

    const element = await page.find('page-destinations');
    expect(element).toHaveClass('hydrated');
  });
});
