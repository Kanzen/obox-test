import { displayOnlineUsers } from "./usersOnlineList.js";

export function displayWelcomeMessage(user) {
    const welcomeContainer = document.getElementById('app-container');

    const welcomeMessage = `
        <h1>Welcome, ${user.name}!</h1>
        <p>You logged in at ${new Date(user.entrance_time).toLocaleTimeString()}</p>
    `;

    welcomeContainer.innerHTML = welcomeMessage;

    // Create a container for the online users list
    const onlineUsersContainer = document.createElement('div');
    onlineUsersContainer.classList.add('card');
    onlineUsersContainer.id = 'onlineUsersList';
    welcomeContainer.appendChild(onlineUsersContainer);

    displayOnlineUsers(user);
}

