import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ProductPage } from '../pages/ProductPage';
import { CartPage } from '../pages/CartPage';

test('Purchase first product', async ({ page }) => {
  const home = new HomePage(page);
  await home.navigate();

  // Click first product card link (use specific anchor to avoid strict-mode ambiguity)
  await home.products.nth(0).locator('a.hrefch').click();

  const product = new ProductPage(page);
  await product.addToCart();

  await product.goToCart();

  const cart = new CartPage(page);
  // make sure we're on cart page
  await cart.navigate();

  await cart.placeOrder({
    name: 'Test Buyer',
    country: 'Testland',
    city: 'Testville',
    card: '4111111111111111',
    month: '12',
    year: '2030',
  });

  const confirmation = await cart.getConfirmationText();
  expect(confirmation).toContain('Thank you');
});
