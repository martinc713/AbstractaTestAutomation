import { Page } from '@playwright/test';

export class CartPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate() {
    await this.page.goto('/cart.html');
    await this.page.waitForSelector('#tbodyid', { timeout: 10000 });
  }

  async placeOrder(details: {
    name: string;
    country: string;
    city: string;
    card: string;
    month: string;
    year: string;
  }) {
    // Click the actual button that opens the order modal (avoid matching the modal title)
    await this.page.locator('button[data-target="#orderModal"]').click();

    const modal = this.page.locator('#orderModal');
    await modal.locator('#name').fill(details.name);
    await modal.locator('#country').fill(details.country);
    await modal.locator('#city').fill(details.city);
    await modal.locator('#card').fill(details.card);
    await modal.locator('#month').fill(details.month);
    await modal.locator('#year').fill(details.year);

    await modal.locator('text=Purchase').click();
    await this.page.waitForSelector('.sweet-alert', { timeout: 5000 });
  }

  async getConfirmationText() {
    const el = this.page.locator('.sweet-alert');
    return el.innerText();
  }

  async getCartItems(): Promise<string[]> {
    await this.page.waitForSelector('#tbodyid tr', { timeout: 5000 });
    const rows = this.page.locator('#tbodyid tr');
    const count = await rows.count();
    const items: string[] = [];
    for (let i = 0; i < count; i++) {
      const title = await rows.nth(i).locator('td').nth(1).innerText().catch(() => '');
      items.push(title.trim());
    }
    return items;
  }

  async removeItemByName(name: string) {
    const rows = this.page.locator('#tbodyid tr');
    const count = await rows.count();
    for (let i = 0; i < count; i++) {
      const row = rows.nth(i);
      const title = await row.locator('td').nth(1).innerText().catch(() => '');
      if (title.trim() === name) {
        await row.locator('a').click();
        // wait a short moment for DOM update
        await this.page.waitForTimeout(500);
        return;
      }
    }
  }
}
