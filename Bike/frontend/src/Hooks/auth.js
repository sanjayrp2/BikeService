import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const useAuth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
      } else {
        try {
          const response = await axios.get('http://localhost:5000/protected-route', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          if (response.status !== 200) {
            navigate('/login');
          }
        } catch (error) {
          console.error('Authentication error:', error);
          navigate('/login');
        }
      }
    };

    checkAuth();
  }, [navigate]);
};

export default useAuth;
