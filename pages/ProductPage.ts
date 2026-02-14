import { Page } from '@playwright/test';

export class ProductPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async addToCart() {
    this.page.once('dialog', (dialog) => dialog.accept());
    await this.page.locator('text=Add to cart').click();
    await this.page.waitForTimeout(800);
  }

  async goToCart() {
    await Promise.all([
      this.page.locator('#cartur').click(),
      this.page.waitForURL('**/cart.html', { timeout: 10000 }),
    ]);
  }
}
