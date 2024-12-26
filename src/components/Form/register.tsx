import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { baseAPI } from '../../utils/constants';
import { toast, ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
import { LoginCon, LoginWrap, LoginWraps } from './loginSyle';
import 'react-toastify/dist/ReactToastify.css';

interface SignupData {
  full_name: string;
  phone_number: string;
  email: string;
  password: string;
}
interface Type {
    data: string;
    success: string;
}


const Register: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<SignupData>({
    full_name: '',
    phone_number: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState<string | null>(null);
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
      const response = await axios.post<Type>(baseAPI + '/user/sign-up', formData);
      if (response.data.success) {
        navigate('/login');  
      } 

    } catch (err: any) {
      const errorMessage = err?.response?.data?.error?.messages || 'Noma’lum xato yuz berdi';
      
      alert(`Royhatdan o'tishda muammo: ${errorMessage}`);
      setError("telefon raqami yoki email manzilni notogri kirgazdingiz!");
    
      setTimeout(() => {
        setError(null);
      }, 2000);
    } finally {
      setLoading(false);
    }
  };

  return (
        <LoginCon>
          <form onSubmit={handleSubmit}>
        <LoginWraps className='LoginWrap'>
          
       <div className="aut"> <h2>Registrate</h2> <h3>X</h3></div>

       <div className="loginis1">
            <label>Full Name</label>
            <input
              type="text"
              name="full_name"
              placeholder="To'liq Ism"
              value={formData.full_name}
              onChange={handleChange}
              required
            />
        </div>

        <div className="loginis1">
        <label>Phone Number</label>
          <input
            type="text"
            name="phone_number"
            placeholder="Telefon Raqami"
            value={formData.phone_number}
            onChange={handleChange}
            required
          />
        </div>

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

        {/* <div className="loginis1">
        <label>Repeat your password</label>
        <input
             type="password"
             name="password"
             value={formData.password}
             onChange={handleInputChange}
             placeholder="Password"
             required
           />
        </div> */}

        <div className="loginis3">
             <div className='chackbox1'>
               <input className='intut' type={'checkbox'}/>
               <label>Keep mee logged in</label>
             </div>
        </div>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <div className="loginis7">
           <button type="submit" disabled={loading}>
             {loading ? 'Yuborilmoqda...' : 'REGISTRATE'}
           </button>
        </div> 

        </LoginWraps>
        </form>
   
</LoginCon>
  );
};

export default Register;



