import { test } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { writeProductsToFile } from '../utils/fileWriter';

test('Extract products from first two pages', async ({ page }) => {
  const home = new HomePage(page);

  await home.navigate();

  const allProducts = [];

  // Página 1
  const firstPageProducts = await home.getProductsData();
  allProducts.push(...firstPageProducts);

  // Página 2
  await home.goToNextPage();
  const secondPageProducts = await home.getProductsData();
  allProducts.push(...secondPageProducts);

  writeProductsToFile(allProducts);
});
