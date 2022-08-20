import { newE2EPage } from '@stencil/core/testing';

describe('page-directory', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<page-directory></page-directory>');

    const element = await page.find('page-directory');
    expect(element).toHaveClass('hydrated');
  });
});
