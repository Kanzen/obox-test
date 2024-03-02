// app.js
import { displayEntranceForm } from './components/entrance.js';
import { displayWelcomeMessage } from './components/dashboard.js';

document.addEventListener('DOMContentLoaded', () => {

    displayEntranceForm();
    
    const entranceForm = document.getElementById('entranceForm');
    entranceForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const name = nameInput.value;
        const email = emailInput.value;

        const response = await fetch('http://localhost:8888/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email })
        });

        if (response.ok) {
            displayWelcomeMessage(name);
        } else {
            // Handle error response
            console.error('Failed to make the POST request');
        }
    });
});

