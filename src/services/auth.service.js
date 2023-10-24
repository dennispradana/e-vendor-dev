import api from '../config/api';
import { toasterror, toastsuccess } from '../utils/ToastMessage';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const userAuth = () => {
  const [userToken, setUserToken] = useLocalStorage('token');
  const [user, setUser] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const login = async (data) => {
    try {
      const authResult = await api.post('/auth/login', data);
      const token = authResult.data;
      setUserToken(token);
      toastsuccess('Login Successfull');
      navigate('/dashboard');
    } catch (error) {
      toasterror('Login Failed');
      throw new Error('Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleInvalidToken = () => {
    setUserToken(null);
    window.location.href = '/login';
  };

  useEffect(() => {
    const fetchDataUser = async () => {
      try {
        if (userToken) {
          const response = await api.get('auth/me', {
            headers: {
              Authorization: `Bearer ${userToken.access_token}`,
            },
          });
          const userData = response.data;
          setUser(userData);
        }
      } catch (error) {
        handleInvalidToken();
      } finally {
        setLoading(false);
      }
    };
    fetchDataUser();
  }, [userToken]);

  const logout = async () => {
    try {
      if (userToken) {
        const response = await api.get('/logout', {
          headers: {
            Authorization: `Bearer ${userToken.access_token}`,
          },
        });
        toastsuccess(response.data.message);
        setUserToken(null);
        navigate('/');
      }
    } catch (error) {
      handleInvalidToken();
    } finally {
      setLoading(false);
    }
  };

  return { user, loading, login, logout, userToken };
};
