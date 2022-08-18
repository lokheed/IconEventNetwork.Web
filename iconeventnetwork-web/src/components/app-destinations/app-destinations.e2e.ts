import { newE2EPage } from '@stencil/core/testing';

describe('app-destinations', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<app-destinations></app-destinations>');

    const element = await page.find('app-destinations');
    expect(element).toHaveClass('hydrated');
  });
});