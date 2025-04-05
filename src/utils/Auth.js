// Simulated database of registered users
let registeredUsers = [];

const Auth = {
  register: (username, email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Check if username or email already exists
        const userExists = registeredUsers.some(
          (user) => user.username === username || user.email === email
        );

        if (userExists) {
          reject(new Error('Username or email already exists'));
          return;
        }

        // Add the new user to the registeredUsers array
        const newUser = { username, email, password };
        registeredUsers.push(newUser);
        console.log('Registered users:', registeredUsers); // Debug log
        resolve({ username, email });
      }, 1000); // Simulate network delay
    });
  },

  login: (username, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Check if the user exists and the password matches
        const user = registeredUsers.find(
          (u) => u.username === username && u.password === password
        );

        if (user) {
          // Simulate successful login by returning a token
          resolve({ username: user.username, token: 'fake-jwt-token' });
        } else {
          reject(new Error('Wrong username or password'));
        }
      }, 1000); // Simulate network delay
    });
  },

  logout: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 500);
    });
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },
};

export default Auth;