import { useState } from 'react';

export default function useUsername() {
    const getUsername = () => {
        const usernameString = sessionStorage.getItem('username');
        const username = JSON.parse(usernameString);
        return username;
      };
      const [username, setUsername] = useState(getUsername());
    
      const saveUserName = username => {
        sessionStorage.setItem('username', JSON.stringify(username));
      };
      return {
        setUsername: saveUserName,
        username
      }
}