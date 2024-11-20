import React from 'react';
import { useParams } from 'react-router-dom';
import { Campingimg, Campingimges } from '../mock/campingdata';
import './omaterialStile.css'

interface OmaterialProps {
  onClose: () => void;
}

const OmaterialCamp: React.FC<OmaterialProps> = ({ onClose }) => {
  const { id } = useParams<{ id: string }>();
  const OmaterialCamp = Campingimges.find(camp => camp.id === Number(id));

  if (!OmaterialCamp) {
    return <div>Data not </div>;
  }

  return (
    <div className='asosiy_wrapper'
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 99999,
      }}
    >
      <div
        style={{
          overflow: 'scroll',
          backgroundColor: '#fff',
          padding: '20px',
          width: '100%',
          height: '100%',
          zIndex: 0, 
          color: '#000',
        }}
      >
        <div className='motor_wrap'> 
          <h2>Camping Place Details</h2>
        <div className='button_wrap'> 
        <button onClick={onClose}>Close</button>
        </div>
        </div>

           <div className='content-container_wrap'>
           <div className='content-container'>
        <div className='img_wraps'>
        <img src={OmaterialCamp.img} alt={OmaterialCamp.campingName} className="fade-in img_wraps" />
        </div>
        <div className="text fade-in" >
         <p>Name: {OmaterialCamp.campingName}</p>
         <p>Location: {OmaterialCamp.location}</p>
         <p>Number: {OmaterialCamp.number}</p>
         <p>License: {OmaterialCamp.license}</p>
         <p>info: {OmaterialCamp.info}</p>
        </div>

       </div>
           </div>
      </div>
    </div>
  );
};

export default OmaterialCamp;












