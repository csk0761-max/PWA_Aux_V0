// Mock API URL for local mode
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// Helper to get local users
const getLocalUsers = () => JSON.parse(localStorage.getItem('aux_local_db_users') || '[]');
const saveLocalUsers = (users) => localStorage.setItem('aux_local_db_users', JSON.stringify(users));

export const authService = {
  login: async (email, password) => {
    console.log('Local Login Attempt:', email);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const users = getLocalUsers();
    const user = users.find(u => u.email === email && u.password === password);
    
    if (!user && email !== 'admin@auxilium.com') {
      throw new Error('Invalid email or password');
    }

    // Default admin fallback
    const userData = user || { email, name: 'Admin User', roles: [{ role_name: 'Admin' }] };
    
    localStorage.setItem('aux_token', 'mock-jwt-token-' + Date.now());
    localStorage.setItem('aux_user_roles', JSON.stringify(userData.roles || [{ role_name: 'Aggregator' }]));
    return { access_token: 'mock-token', roles: userData.roles };
  },

  register: async (userData) => {
    console.log('Local Registration Attempt:', userData);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const users = getLocalUsers();
    if (users.find(u => u.email === userData.email)) {
      throw new Error('User already exists in local DB');
    }

    const newUser = {
      ...userData,
      id: Date.now(),
      roles: [{ role_name: 'Aggregator' }]
    };

    users.push(newUser);
    saveLocalUsers(users);
    
    return { message: 'Local registration successful', user: newUser };
  },

  logout: () => {
    localStorage.removeItem('aux_token');
    localStorage.removeItem('aux_user_roles');
  },

  getToken: () => localStorage.getItem('aux_token'),

  isAuthenticated: () => !!localStorage.getItem('aux_token'),

  uploadFile: async (file) => {
    console.log('Local File Upload:', file.name);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Create a local blob URL to simulate S3 URL
    const localUrl = URL.createObjectURL(file);
    return { Location: localUrl, message: 'Local upload successful' };
  }
};
