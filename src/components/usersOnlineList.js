import apiService from '../services/apiService.js';

export async function displayOnlineUsers(currentUser) {
    const userListContainer = document.getElementById('onlineUsersList');
    const userListHeading = userListContainer.appendChild(document.createElement('p'));
    userListHeading.textContent = "Current online users:";
    userListHeading.classList.add('online-users-heading');
    
    const userList = userListContainer.appendChild(document.createElement('ul'));

    async function fetchAndUpdateUserList(currentUser) {

        userList.innerHTML = '';

        const users = await apiService.getData('/', { status: 'online' });
        console.log(users);

        if(users.length > 0) {
            users.forEach(user => {
                let isCurrentUser = (user.email === currentUser.email);
                const li = document.createElement('li');
                li.textContent = (isCurrentUser) ? user.name + ' (you)' : user.name;
                userList.appendChild(li);
                
            });
        } else {
            const li = document.createElement('li');
            li.textContent = 'No users online';
            userList.appendChild(li);
        }
    }

    fetchAndUpdateUserList(currentUser);

    // Update the user list every 3 seconds
    setInterval(() => fetchAndUpdateUserList(currentUser), 3000);
}

