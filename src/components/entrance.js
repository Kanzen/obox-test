export function displayEntranceForm() {
    const welcomeContainer = document.getElementById('app-container');

    const entranceForm = `
        <h1>Welcome to the Live Users Dashboard</h1>
        <p>Please enter your details:</p>
        <form id="entranceForm">
            <label for="name">Name:</label>
            <input type="text" id="name" name="name" required>
            <br>
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" required>
            <br>
            <button type="submit">Enter</button>
        </form>
    `;

    welcomeContainer.innerHTML = entranceForm;
}