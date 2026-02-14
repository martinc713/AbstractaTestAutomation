import { Page } from '@playwright/test';

export class AuthPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async openSignUpModal() {
    await this.page.locator('a[data-target="#signInModal"]').first().click();
    // Wait for modal to be visible
    await this.page.waitForSelector('#signInModal', { state: 'visible', timeout: 5000 });
  }

  async openLoginModal() {
    await this.page.locator('a[data-target="#logInModal"]').click();
    // Wait for modal to be visible
    await this.page.waitForSelector('#logInModal', { state: 'visible', timeout: 5000 });
  }

  async signup(username: string, password: string) {
    const modal = this.page.locator('#signInModal');
    await modal.locator('#sign-username').fill(username);
    await modal.locator('#sign-password').fill(password);

    // Handle success dialog
    const [dialog] = await Promise.all([
      this.page.waitForEvent('dialog'),
      modal.locator('button:has-text("Sign up")').click(),
    ]);
    await dialog.accept();
  }

  async login(username: string, password: string) {
    const modal = this.page.locator('#logInModal');
    await modal.locator('#loginusername').fill(username);
    await modal.locator('#loginpassword').fill(password);

    await Promise.all([
      this.page.waitForNavigation({ waitUntil: 'load', timeout: 5000 }).catch(() => {}),
      modal.locator('button:has-text("Log in")').click(),
    ]);
  }

  async getWelcomeText(): Promise<string> {
    // Wait for and return the welcome text (e.g., "Welcome username")
    const userElement = this.page.locator('#nameofuser');
    await userElement.waitFor({ state: 'visible', timeout: 5000 });
    return userElement.innerText();
  }
}
