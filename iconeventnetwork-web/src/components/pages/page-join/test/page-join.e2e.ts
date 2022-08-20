import { newE2EPage } from '@stencil/core/testing';

describe('page-join', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<page-join></page-join>');

    const element = await page.find('page-join');
    expect(element).toHaveClass('hydrated');
  });
});
