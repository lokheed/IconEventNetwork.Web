import { newE2EPage } from '@stencil/core/testing';

describe('page-login-redirect', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<page-login-redirect></page-login-redirect>');

    const element = await page.find('page-login-redirect');
    expect(element).toHaveClass('hydrated');
  });
});
