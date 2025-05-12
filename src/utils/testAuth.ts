// This is a test file to manually verify our Zustand auth implementation
// You can import and call these functions from a component or page to test
// the authentication flow

import { useAuthStore } from '@/store';

export const testLogin = async () => {
  console.log('Testing login...');
  
  try {
    const { login } = useAuthStore.getState();
    
    // Test login with some credentials
    const result = await login({
      identifier: 'testuser',
      password: 'password123'
    });
    
    console.log('Login result:', result);
    console.log('Current auth state:', useAuthStore.getState());
    
    return result;
  } catch (error) {
    console.error('Test login failed:', error);
    return null;
  }
};

export const testRegister = async () => {
  console.log('Testing registration...');
  
  try {
    const { register } = useAuthStore.getState();
    
    // Test registration with some credentials
    const result = await register({
      username: 'newuser',
      email: 'newuser@example.com',
      password: 'password123'
    });
    
    console.log('Registration result:', result);
    console.log('Current auth state:', useAuthStore.getState());
    
    return result;
  } catch (error) {
    console.error('Test registration failed:', error);
    return null;
  }
};

export const testLogout = () => {
  console.log('Testing logout...');
  console.log('State before logout:', useAuthStore.getState());
  
  // Perform logout
  const { logout } = useAuthStore.getState();
  logout();
  
  console.log('State after logout:', useAuthStore.getState());
};

// You can add this to a component for testing:
// 
// import { testLogin, testLogout } from '@/utils/testAuth';
// 
// <button onClick={testLogin}>Test Login</button>
// <button onClick={testLogout}>Test Logout</button>
