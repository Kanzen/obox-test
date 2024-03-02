export function displayWelcomeMessage(user) {
    const welcomeContainer = document.getElementById('app-container');

    const welcomeMessage = `
        <h1>Welcome, ${user.name}!</h1>
        <p>You logged in at ${new Date(user.entrance_time).toLocaleTimeString()}</p>
    `;

    welcomeContainer.innerHTML = welcomeMessage;
}