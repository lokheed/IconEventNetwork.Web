import { newE2EPage } from '@stencil/core/testing';

describe('page-dashboard', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<page-dashboard></page-dashboard>');

    const element = await page.find('page-dashboard');
    expect(element).toHaveClass('hydrated');
  });
});
