import { displayEntranceForm } from './components/entrance.js';
import { displayWelcomeMessage } from './components/dashboard.js';
import { apiService } from './services/apiService.js';

let currentUser;

document.addEventListener('DOMContentLoaded', () => {

    displayEntranceForm();
    
    const entranceForm = document.getElementById('entranceForm');
    entranceForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const name = nameInput.value;
        const email = emailInput.value;

        try {
            const response = await apiService.postData('/', { name, email });

            if (response.status=='success') {
                currentUser = response['user_details'];
                displayWelcomeMessage(response['user_details']);
            } else {
                console.error('API request was not successful');
            }
        } catch (error) {
            console.error('Error making API request:', error);
        }
    });
});

window.addEventListener('beforeunload', async (event) => {
    event.preventDefault(); // Preventing tab closing
    
    await apiService.putData('/', { email: currentUser.email, status: 'offline' });

    setTimeout(() => {
        window.close();
    }, 1000);
});