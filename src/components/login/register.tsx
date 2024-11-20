import React from 'react';
import { LoginCon, LoginWrap, LoginWraps } from './loginSyle';

interface RegisterProps {
  navigate: (path: string) => void;
}

const Register: React.FC<RegisterProps> = ({ navigate }) => {
  const handleGoBack = () => {
    navigate('/login');
  };

  return (
        <LoginCon>
        <LoginWraps className='LoginWrap'>
          
       <div className="aut"> <h2>Registrate</h2> <h3 onClick={handleGoBack}>X</h3></div>
        <div className="loginis1">
            <label>Email</label>
            <input type="email" placeholder='Your email' />
        </div>
        <div className="loginis1">
        <label>Password</label>
        <input type="email" placeholder='Your password' />
        </div>
        <div className="loginis1">
        <label>Repeat your password</label>
        <input type="email" placeholder='Your password' />
        </div>
        <div className="loginis3">
             <div className='chackbox1'>
               <input className='intut' type={'checkbox'}/>
               <label>Keep mee logged in</label>
             </div>
        </div>
        <div className="loginis7">
            <button onClick={handleGoBack}>REGISTRATE</button>
        </div> 

        </LoginWraps>
   
</LoginCon>
  );
};

export default Register;






 

