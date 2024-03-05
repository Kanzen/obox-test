import apiService from '../services/apiService.js';

export async function displayOnlineUsers(currentUser) {
    const userListContainer = document.getElementById('onlineUsersList');
    const userListHeading = userListContainer.appendChild(document.createElement('p'));
    userListHeading.textContent = "Current online users:";
    userListHeading.classList.add('online-users-heading');
    userListHeading.classList.add('row');
    
    const userList = userListContainer.appendChild(document.createElement('div'));
    userList.classList.add('row');

    async function fetchAndUpdateUserList(currentUser) {

        userList.innerHTML = '';

        const users = await apiService.getData('/api/', { status: 'online' });

        if(users.length > 0) {
            users.forEach(user => {
                let isCurrentUser = (user.email === currentUser.email);
                const userContainer = document.createElement('div');
                userContainer.classList.add('profile');
                let userName = (isCurrentUser) ? user.name + ' (you)' : user.name;
                userContainer.innerHTML = `
                    <img src="assets/images/avatar.png" class="avatar" />
                    <p>${userName}</p>
                `;
                userContainer.addEventListener('click', async (event) => {
                    //show user details
                    const userDetails = await apiService.getData('/api/', { email: user.email });
                    const userDetailsDiv = document.createElement('div');
                    userDetailsDiv.classList.add('user-details');
                    userDetailsDiv.innerHTML = `
                        <p><strong>User Details:</strong></p>
                        <p><strong>Name:</strong> ${userDetails.name}</p>
                        <p><strong>Email:</strong> ${userDetails.email}</p>
                        <p><strong>User Agent:</strong> ${userDetails.user_agent}</p>
                        <p><strong>Entrance Time:</strong> ${new Date(userDetails.entrance_time).toLocaleTimeString()}</p>
                        <p><strong>Visit count:</strong> ${userDetails.visits_count}</p>`;
                    
                    userDetailsDiv.style.position = 'absolute';
                    userDetailsDiv.style.top = `${event.clientY}px`;
                    userDetailsDiv.style.left = `${event.clientX}px`;
                    
                    document.body.appendChild(userDetailsDiv);
                    
                    document.addEventListener('click', async (event) => {
                        if (!userDetailsDiv.contains(event.target)) {
                            userDetailsDiv.remove();
                        }
                    });
                });
                
                userList.appendChild(userContainer);
            });
        } else {
            const p = document.createElement('p');
            li.textContent = 'No users online';
            userList.appendChild(p);
        }
    }

    fetchAndUpdateUserList(currentUser);

    // Update the user list every 3 seconds
    setInterval(() => fetchAndUpdateUserList(currentUser), 30000);
}

