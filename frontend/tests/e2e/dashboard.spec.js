
import { test, expect } from '@playwright/test';

test.describe('Dashboard Features', () => {
    test.beforeEach(async ({ page }) => {
        const uniqueEmail = `dashboard_test_${Date.now()}@example.com`;
        const password = 'password123';

        await page.goto('/login');
        await page.click('button:has-text("¿No tienes cuenta? Regístrate")');
        await page.fill('#email', uniqueEmail);
        await page.fill('#password', password);
        await page.click('button:has-text("Registrarse")');
        await expect(page).toHaveURL('/dashboard');
    });

    test('Set Monthly Limit', async ({ page }) => {
        // Wait for loading to finish
        await expect(page.getByText('Cargando...')).not.toBeVisible({ timeout: 10000 });

        // Initial state check - look for Monthly Limit section
        // Depending on backend state, it might be 0 or set. 
        // We know for a new user it should be 0/undefined.
        // We check if "Tope Mensual" is visible which confirms the component loaded.
        await expect(page.getByText('Tope Mensual')).toBeVisible();
        await expect(page.locator('text=No definido').first()).toBeVisible();

        // Click edit button (pencil icon)
        // The MonthlyLimit component has an edit button. 
        // We can find it by the SVG or the button class/structure.
        // Based on the code, it's a button inside the component with "Tope Mensual" text nearby.

        // Locating the edit button in the "Presupuesto" card or "Tope Mensual" section
        // There are two places: The StatCard "Presupuesto" and the MonthlyLimit component which says "Tope Mensual"

        // Let's target the MonthlyLimit component specifically
        const monthlyLimitSection = page.locator('.bg-white', { hasText: 'Tope Mensual' }).last();
        // Note: StatCard might also have text, so we need to be careful.
        // MonthlyLimit.jsx has "Tope Mensual" in an h3.

        // Click edit button - target the specific edit button
        await monthlyLimitSection.getByRole('button').first().click();

        // Wait for input to appear
        const input = monthlyLimitSection.locator('input[type="number"]');
        await expect(input).toBeVisible();

        // Input new limit
        const newLimit = '500000';
        await input.fill(newLimit);

        // Submit (Check icon button)
        await monthlyLimitSection.locator('button[type="submit"]').click();

        // Verify it updates
        // It uses formatCurrency which adds symbols. We check if the number part is present.
        await expect(page.getByText('500.000')).toBeVisible();
    });
});
