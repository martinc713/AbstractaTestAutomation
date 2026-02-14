import { Page, Locator } from '@playwright/test';

export interface Product {
  name: string;
  price: string;
  link: string | null;
}

export class HomePage {
  readonly page: Page;
  readonly products: Locator;
  readonly nextButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.products = page.locator('.card');
    this.nextButton = page.locator('#next2');
  }

  async navigate() {
    await this.page.goto('/');
    // Ensure product cards are present before extracting data
    await this.page.waitForSelector('.card .card-title', { timeout: 10000 });
  }

  async getProductsData(): Promise<Product[]> {
    const productsData: Product[] = [];

    const count = await this.products.count();

    for (let i = 0; i < count; i++) {
      const product = this.products.nth(i);

      const name = await product.locator('.card-title').innerText();
      const price = await product.locator('.card-block h5').innerText();
      const link = await product.locator('a.hrefch').getAttribute('href');

      productsData.push({ name, price, link });
    }

    return productsData;
  }

  async goToNextPage() {
    const firstTitleLocator = this.products.nth(0).locator('.card-title');
    const prevTitle = await firstTitleLocator.innerText().catch(() => null);

    await this.nextButton.click();

    // Wait until the first product title changes (indicates page content updated)
    await this.page.waitForFunction(
      (prev) => {
        const el = document.querySelector('.card .card-title');
        return !!el && el.textContent !== prev;
      },
      prevTitle,
      { timeout: 10000 }
    );
  }
}
