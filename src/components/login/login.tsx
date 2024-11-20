
import React from 'react';
import { LoginCon, LoginWrap } from './loginSyle';

interface LoginProps {
  setIsLoggedIn: (value: boolean) => void;
  navigate: (path: string) => void;
}

const Login: React.FC<LoginProps> = ({ setIsLoggedIn, navigate }) => {
  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true'); 
    navigate('/motor');
  };

  const handleRegisterRedirect = () => {
    navigate('/register');
  };

  return (
    <LoginCon>
      <LoginWrap className='LoginWrap'>
        <h2>Sign in</h2>
        <div className="loginis1">
          <label>Email</label>
          <input type="email" placeholder='Your email' />
        </div>
        <div className="loginis1">
          <label>Password</label>
          <input type="password" placeholder='Your password' /> 
        </div>
        <div className="loginis3">
          <div className='chackbox1'>
            <input className='intut' type='checkbox' />
            <label>Keep me logged in</label>
          </div>
          <h3>Forget your password?</h3>
        </div>
        <div className="loginis4">
          <button onClick={handleLogin}>SIGN IN</button>
        </div>
        <div className="loginis5">
          <div className='lang'></div>
          <h4>or</h4>
          <div className='lang'></div>
        </div>
        <div className="loginis6">
          <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRO9IVGavttBPk_RofxQU3Yy_rQ_T6tZX2qw&s' alt="naver-img" />
          <img src='https://cdn.iconscout.com/icon/free/png-256/free-google-logo-icon-download-in-svg-png-gif-file-formats--search-social-media-round-pack-logos-icons-434764.png?f=webp&w=256' alt="google-img" />
          <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkYPayhLZMpQ8B4QRzN-oNgun1SF18CwywdQ&s' alt="talk-img" />
        </div>
        <div className="loginis7">
          <button onClick={handleRegisterRedirect}>CREATE ACCOUNT</button>
        </div>
      </LoginWrap>
    </LoginCon>
  );
};

export default Login;









// import React, { useState, useEffect } from 'react';
// import { LoginCon, LoginWrap } from './loginSyle';

// interface LoginProps {
//   setIsLoggedIn: (value: boolean) => void;
//   navigate: (path: string) => void;
// }

// const Login: React.FC<LoginProps> = ({ setIsLoggedIn, navigate }) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [message, setMessage] = useState('');

//   const handleLogin = () => {
//     if (!email || !password) {
//       setMessage('Email va parolni kiritishingiz kerak.'); // Parol yoki email kiritilmasa
//       return;
//     }

//     // Email va parolni tekshirish
//     if (email === 'admin@gmail.com' && password === 'admin') {
//       setIsLoggedIn(true);
//       localStorage.setItem('isLoggedIn', 'true');
//       setMessage('Kirish muvaffaqiyatli!'); // Muvaffaqiyatli xabar
//       navigate('/motor');
//     } else {
//       setMessage('Noto\'g\'ri email yoki parol. Iltimos, qaytadan urinib ko\'ring.'); // Noto'g'ri bo'lsa
//     }
//   };

//   const handleRegisterRedirect = () => {
//     navigate('/register'); // Ro'yxatdan o'tish sahifasiga o'tadi
//   };

//   useEffect(() => {
//     if (message) {
//       alert(message); // Xabarni ko'rsatamiz
//       setMessage(''); // Xabarni tozalaymiz
//     }
//   }, [message]);

//   return (
//     <LoginCon>
//       <LoginWrap className='LoginWrap'>
//         <h2>Sign in</h2>
//         <div className="loginis1">
//           <label>Email</label>
//           <input 
//             type="email" 
//             placeholder='Your email' 
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//         </div>
//         <div className="loginis1">
//           <label>Password</label>
//           <input 
//             type="password" 
//             placeholder='Your password' 
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           /> 
//         </div>
//         <div className="loginis3">
//           <div className='chackbox1'>
//             <input className='intut' type='checkbox' />
//             <label>Keep me logged in</label>
//           </div>
//           <h3>Forget your password?</h3>
//         </div>
//         <div className="loginis4">
//           <button onClick={handleLogin}>SIGN IN</button>
//         </div>
//         <div className="loginis5">
//           <div className='lang'></div>
//           <h4>or</h4>
//           <div className='lang'></div>
//         </div>
//         <div className="loginis6">
//           <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRO9IVGavttBPk_RofxQU3Yy_rQ_T6tZX2qw&s' alt="naver-img" />
//           <img src='https://cdn.iconscout.com/icon/free/png-256/free-google-logo-icon-download-in-svg-png-gif-file-formats--search-social-media-round-pack-logos-icons-434764.png?f=webp&w=256' alt="google-img" />
//           <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkYPayhLZMpQ8B4QRzN-oNgun1SF18CwywdQ&s' alt="talk-img" />
//         </div>
//         <div className="loginis7">
//           <button onClick={handleRegisterRedirect}>CREATE ACCOUNT</button>
//         </div>
//       </LoginWrap>
//     </LoginCon>
//   );
// };

// export default Login;