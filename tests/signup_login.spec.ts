import { test, expect } from '@playwright/test';
import { AuthPage } from '../pages/AuthPage';

test('Sign up, log in, and verify welcome message', async ({ page }) => {
  const testUsername = `testuser_${Date.now()}`;
  const testPassword = 'Password123!';

  // Sign up
  await page.goto('/');
  const auth = new AuthPage(page);
  await auth.openSignUpModal();
  await auth.signup(testUsername, testPassword);

  // Log in with the newly created account
  await page.goto('/');
  await auth.openLoginModal();
  await auth.login(testUsername, testPassword);

  // Verify welcome message appears
  const welcomeText = await auth.getWelcomeText();
  expect(welcomeText).toContain('Welcome');
  expect(welcomeText).toContain(testUsername);
});
