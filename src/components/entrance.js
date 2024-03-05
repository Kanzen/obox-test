export function displayEntranceForm() {
    const welcomeContainer = document.getElementById('app-container');

    const entranceForm = `
        <div class="card">
            <h1>Welcome to the Live Users Dashboard</h1>
        </div>
        <div class="card">
            <form id="entranceForm">
                <p>Please enter your details below:</p>
                <div class="row justify-centre">
                    <input type="text" id="name" name="name" placeholder="Enter your name" required>
                </div>
                <div class="row justify-centre">
                    <input type="email" id="email" name="email" placeholder="Enter your email address" required>
                </div>
                <div class="row justify-centre">
                    <button type="submit" class="submit-btn">Enter</button>
                </div>
            </form>
        </div>
    `;

    welcomeContainer.innerHTML = entranceForm;
}