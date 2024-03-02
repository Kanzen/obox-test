export function displayWelcomeMessage(username) {
    const welcomeContainer = document.getElementById('app-container');

    const welcomeMessage = `
        <h1>Welcome, ${username}!</h1>
        <p>This is a dynamic sub-message in the dashboard.</p>
    `;

    welcomeContainer.innerHTML = welcomeMessage;
}