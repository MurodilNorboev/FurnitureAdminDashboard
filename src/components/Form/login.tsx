import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { baseAPI } from '../../utils/constants'; 
import { toast, ToastContainer } from 'react-toastify';  
import 'react-toastify/dist/ReactToastify.css';
import { LoginCon, LoginWrap } from './loginSyle';

interface LoginData {
  email: string;
  password: string;
}

interface Type {
  success: boolean;
  access_token: string; // access_token - backenddan qaytgan token
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<LoginData>({
    email: '',
    password: ''
  });

  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {

      const response = await axios.post<Type>(baseAPI + '/user/login', formData);

      if (response.data.access_token) {
        localStorage.setItem('token', response.data.access_token); 

        navigate('/home'); 
      } else {
        console.log('Token qaytarilmadi');
        setError('Token qaytarilmadi. Iltimos, qayta urinib ko\'ring.');
      }
    } catch (err) {

      console.error('Xatolik yuz berdi:', err);
      setError('Login yoki parol noto\'g\'ri.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginCon>
      <LoginWrap className='LoginWrap'>
        <h2>Sign in</h2>
        <form onSubmit={handleSubmit}>
          <div className="loginis1">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="loginis1">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Parol"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="loginis3">
            <div className="chackbox1">
              <input className="intut" type="checkbox" />
              <label>Keep me logged in</label>
            </div>
            <h3>Forget your password?</h3>
          </div>

          {error && <div style={{ color: 'red' }}>{error}</div>}
          <div className="loginis4">
             <button type="submit" disabled={loading} onClick={handleSubmit}>
                {loading ? 'Yuborilmoqda...' : 'SIGN IN'}
             </button>
          </div>

          <div className="loginis5">
            <div className="lang"></div>
            <h4>or</h4>
            <div className="lang"></div>
          </div>
          <div className="loginis6">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRO9IVGavttBPk_RofxQU3Yy_rQ_T6tZX2qw&s"
              alt="naver-img"
            />
            <img
              src="https://cdn.iconscout.com/icon/free/png-256/free-google-logo-icon-download-in-svg-png-gif-file-formats--search-social-media-round-pack-logos-icons-434764.png?f=webp&w=256"
              alt="google-img"
            />
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkYPayhLZMpQ8B4QRzN-oNgun1SF18CwywdQ&s"
              alt="talk-img"
            />
          </div>

          <div className="loginis7">
            <button type="button" onClick={() => navigate('/register')}>
              CREATE ACCOUNT
            </button>
          </div>
        </form>
      </LoginWrap>
      <ToastContainer />
    </LoginCon>
  );
};

export default Login;





