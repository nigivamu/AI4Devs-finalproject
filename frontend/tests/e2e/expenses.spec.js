
import { test, expect } from '@playwright/test';

test.describe('Expense Management', () => {
    test.beforeEach(async ({ page }) => {
        // Register a new user for each test to have a clean state
        const uniqueEmail = `expense_test_${Date.now()}@example.com`;
        const password = 'password123';

        await page.goto('/login');
        await page.click('button:has-text("¿No tienes cuenta? Regístrate")');
        await page.fill('#email', uniqueEmail);
        await page.fill('#password', password);
        await page.click('button:has-text("Registrarse")');
        await expect(page).toHaveURL('/dashboard');
    });

    test('Add expense with natural language: "comrpe una pizza en 15"', async ({ page }) => {
        const expenseText = 'comrpe una pizza en 15';

        // Find the textarea for expense input
        const inputArea = page.locator('textarea[placeholder="Ej: Almuerzo 15.000..."]');
        await expect(inputArea).toBeVisible();
        await inputArea.fill(expenseText);

        // Click send button
        await page.click('button[type="submit"]');

        // Verify success message
        await expect(page.getByText('Gasto guardado')).toBeVisible();

        // Verify expense appears in the list
        // Since the backend processes the text, we look for key terms.
        // "pizza" should definitely be there.
        // "15" might be formatted, so we check for the description primarily.

        // Wait for the list to update
        await expect(page.locator('text=pizza')).toBeVisible({ timeout: 10000 });

        // Optionally check if the total spent updated (non-zero)
        // This depends on how "15" is parsed (15 or 15000), but checking it's not 0 is a good sanity check
        // const totalSpent = await page.locator('text=Gasto Total').locator('..').locator('.text-2xl').textContent();
        // expect(totalSpent).not.toBe('$ 0');
    });
});
