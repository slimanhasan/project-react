import { useState } from 'react';

export default function useUsername() {
    const getUsername = () => {
        const usernameString = localStorage.getItem('username');
        const username = JSON.parse(usernameString);
        return username;
      };
      const [username, setUsername] = useState(getUsername());
    
      const saveUserName = username => {
        localStorage.setItem('username', JSON.stringify(username));
      };
      return {
        setUsername: saveUserName,
        username
      }
}