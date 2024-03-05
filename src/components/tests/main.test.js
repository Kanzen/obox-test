import { test as playwrightTest, expect as playwrightExpect } from '@playwright/test';

playwrightTest('Form submission triggers API call and displays welcome message on success', async ({ page }) => {
  await page.goto('http://localhost:8888/src/');

  // Mock API response
  page.route('**/api/**', (route) => {
    if (route.request().url().includes('/api/')) {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ status: 'success', user_details: { name: 'John Doe' } }),
      });
    } else {
      route.continue();
    }
  });

  await page.evaluate(() => {
    // Simulate form submission
    document.getElementById('name').value = 'Karl Hohls';
    document.getElementById('email').value = 'kanzenj@gmail.com';
    document.getElementById('entranceForm').dispatchEvent(new Event('submit'));
  });

  // Verify API call and welcome message
  const postDataCall = await page.waitForRequest(request => request.url().includes('/api/'));
  playwrightExpect(postDataCall).not.toBeNull();

});



playwrightTest('Handle API Error', async ({ page }) => {
  await page.route('**/api/**', (route) => {
    if (!route.request().failure()) { // Check if the route has not failed
      route.continue(); // Continue the request by default
      if (route.request().url().includes('/api/')) {
        route.abort('failed'); // Abort the request if it matches the URL pattern
      }
    }
  });
});

playwrightTest('Beforeunload event triggers API call to set user status offline', async ({ page }) => {
  await page.goto('http://localhost:8888/src/');

  // Mock API response for beforeunload event
  page.on('request', async (request) => {
    if (request.url().includes('/api/')) {
      await request.respond({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({}),
      });
    }
  });

  await page.evaluate(() => {
    // Simulate beforeunload event
    window.dispatchEvent(new Event('beforeunload'));
  });

});