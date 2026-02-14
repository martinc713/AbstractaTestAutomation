import fs from 'fs';
import { Product } from '../pages/HomePage';

const BASE_URL = 'https://www.demoblaze.com';

export function writeProductsToFile(
  products: Product[],
  fileName: string = 'products.txt'
) {
  let content = '';

  for (const product of products) {
    const link = product.link
      ? product.link.startsWith('http')
        ? product.link
        : `${BASE_URL}/${product.link.replace(/^\//, '')}`
      : 'N/A';

    content += `Name: ${product.name}\n`;
    content += `Price: ${product.price}\n`;
    content += `Link: ${link}\n`;
    content += '---------------------------------\n';
  }

  fs.writeFileSync(fileName, content);
}
