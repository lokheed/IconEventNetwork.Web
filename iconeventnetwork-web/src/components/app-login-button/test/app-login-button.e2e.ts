import { newE2EPage } from '@stencil/core/testing';

describe('app-login-button', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<app-login-button></app-login-button>');

    const element = await page.find('app-login-button');
    expect(element).toHaveClass('hydrated');
  });
});
