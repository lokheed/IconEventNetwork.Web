import { newE2EPage } from '@stencil/core/testing';

describe('app-dashboard', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<app-dashboard></app-dashboard>');

    const element = await page.find('app-dashboard');
    expect(element).toHaveClass('hydrated');
  });
});