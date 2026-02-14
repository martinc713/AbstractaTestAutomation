import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ProductPage } from '../pages/ProductPage';
import { CartPage } from '../pages/CartPage';

test('Add two items to cart then remove one', async ({ page }) => {
  const home = new HomePage(page);
  await home.navigate();

  // Add first product
  await home.products.nth(0).locator('a.hrefch').click();
  const product = new ProductPage(page);
  await product.addToCart();

  // Return to home to add another product
  await page.goto('/');
  await home.navigate();

  // Add second product (index 1)
  await home.products.nth(1).locator('a.hrefch').click();
  await product.addToCart();

  // Go to cart and verify both items present
  await product.goToCart();
  const cart = new CartPage(page);
  await cart.navigate();

  const itemsBefore = await cart.getCartItems();
  expect(itemsBefore.length).toBeGreaterThanOrEqual(2);

  const itemToRemove = itemsBefore[0];
  await cart.removeItemByName(itemToRemove);

  const itemsAfter = await cart.getCartItems();
  expect(itemsAfter.length).toBe(itemsBefore.length - 1);
  expect(itemsAfter).not.toContain(itemToRemove);
});
