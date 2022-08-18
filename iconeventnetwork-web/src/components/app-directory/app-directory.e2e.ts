import { newE2EPage } from '@stencil/core/testing';

describe('app-directory', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<app-directory></app-directory>');

    const element = await page.find('app-directory');
    expect(element).toHaveClass('hydrated');
  });
});