import { test as playwrightTest, expect as playwrightExpect } from '@playwright/test';

playwrightTest('Display Welcome Message', async ({ page }) => {
  const user = { name: 'Karl Hohls', entrance_time: new Date().getTime() };

  await page.setContent('<div id="app-container"></div>');

  // Mock displayWelcomeMessage function
  await page.evaluate(({ user }) => {
    window.displayWelcomeMessage = (user) => {
      const container = document.getElementById('app-container');
      if (user.name) {
        container.innerHTML = `Welcome, ${user.name}!`;
      }
    };
    displayWelcomeMessage(user);
  }, { user });

  // Verify the displayed welcome message
  const welcomeMessage = await page.innerHTML('#app-container');
  if (user.name) {
    playwrightExpect(welcomeMessage).toContain(`Welcome, ${user.name}!`);
  } else {
    playwrightExpect(welcomeMessage).not.toContain('Welcome,');
  }
});