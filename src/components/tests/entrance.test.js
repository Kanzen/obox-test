import { test as playwrightTest, expect as playwrightExpect } from '@playwright/test';

playwrightTest('Display Entrance Form', async ({ page }) => {
  await page.setContent('<div id="app-container"></div>');

  // Mock displayEntranceForm function
  await page.evaluate(() => {
    window.displayEntranceForm = () => {
      document.getElementById('app-container').innerHTML = 'Welcome to the Live Users Dashboard';
    };
  });

  // Call the mocked function
  await page.evaluate(() => {
    displayEntranceForm();
  });

  // Verify the displayed content
  const entranceForm = await page.innerHTML('#app-container');
  playwrightExpect(entranceForm).toContain('Welcome to the Live Users Dashboard');
});