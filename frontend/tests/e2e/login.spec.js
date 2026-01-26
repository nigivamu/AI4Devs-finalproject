import { test, expect } from '@playwright/test';

test.describe('Authentication Flow', () => {

    test('Register and Redirect to Dashboard', async ({ page }) => {
        // Generate unique email
        const uniqueEmail = `test_${Date.now()}@example.com`;
        const password = 'password123';

        await page.goto('/login');

        // Switch to Register mode
        await page.click('button:has-text("¿No tienes cuenta? Regístrate")');

        // Fill registration form
        await page.fill('#email', uniqueEmail);
        await page.fill('#password', password);

        // Click register button
        await page.click('button:has-text("Registrarse")');

        // Verify redirection to dashboard
        await expect(page).toHaveURL('/dashboard');
    });

    test('Login with Existing User', async ({ page }) => {
        // 1. Register a user first to ensure they exist
        const uniqueEmail = `login_test_${Date.now()}@example.com`;
        const password = 'password123';

        await page.goto('/login');
        await page.click('button:has-text("¿No tienes cuenta? Regístrate")');
        await page.fill('#email', uniqueEmail);
        await page.fill('#password', password);
        await page.click('button:has-text("Registrarse")');
        await expect(page).toHaveURL('/dashboard');

        // 2. Logout (assuming there is a logout button or we can clear state)
        // Simulate logout by clearing storage since AuthContext calls localStorage.removeItem('token')
        await page.evaluate(() => localStorage.removeItem('token'));
        await page.goto('/login');

        // 3. Login
        await page.fill('#email', uniqueEmail);
        await page.fill('#password', password);
        await page.click('button:has-text("Iniciar Sesión")');

        // Verify redirection
        await expect(page).toHaveURL('/dashboard');
    });

    test('Protected Route Redirection', async ({ page }) => {
        await page.goto('/dashboard');
        await expect(page).toHaveURL('/login');
    });
});
