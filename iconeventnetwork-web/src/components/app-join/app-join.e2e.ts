import { newE2EPage } from '@stencil/core/testing';

describe('app-join', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<app-join></app-join>');

    const element = await page.find('app-join');
    expect(element).toHaveClass('hydrated');
  });
});