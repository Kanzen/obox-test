import apiService from '../services/apiService.js';

export async function displayOnlineUsers(currentUser) {
    const userListContainer = document.getElementById('onlineUsersList');
    const userListHeading = userListContainer.appendChild(document.createElement('p'));
    userListHeading.textContent = "Current online users:";
    userListHeading.classList.add('online-users-heading');
    
    const userList = userListContainer.appendChild(document.createElement('ul'));

    async function fetchAndUpdateUserList(currentUser) {

        userList.innerHTML = '';

        const users = await apiService.getData('/api/', { status: 'online' });

        if(users.length > 0) {
            users.forEach(user => {
                let isCurrentUser = (user.email === currentUser.email);
                const li = document.createElement('li');
                li.textContent = (isCurrentUser) ? user.name + ' (you)' : user.name;
                li.addEventListener('click', async (event) => {
                    //show user details
                    const userDetails = await apiService.getData('/api/', { email: user.email });
                    const userDetailsDiv = document.createElement('div');
                    userDetailsDiv.classList.add('user-details');
                    userDetailsDiv.innerHTML = `
                        <p>User Details:</p>
                        <p>Name: ${userDetails.name}</p>
                        <p>Email: ${userDetails.email}</p>
                        <p>User Agent: ${userDetails.user_agent}</p>
                        <p>Entrance Time: ${new Date(userDetails.entrance_time).toLocaleTimeString()}</p>
                        <p>Visit count: ${userDetails.visits_count}</p>`;
                    
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

