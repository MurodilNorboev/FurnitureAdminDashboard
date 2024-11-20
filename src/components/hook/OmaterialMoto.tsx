import React from 'react';
import { useParams } from 'react-router-dom';
import './omaterialStile.css'; 
import { CampcarMotos } from '../mock/mockdatail';

interface OmaterialProps {
  onClose: () => void;
}

const OmaterialMoto: React.FC<OmaterialProps> = ({ onClose }) => {
  const { id } = useParams<{ id: string }>(); 
  const selectedMotor = CampcarMotos.find(motor => motor.id === Number(id)); 

  if (!selectedMotor) {
    return <div>Data not found</div>; 
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
          <h2>Motor Details</h2>
        <div className='button_wrap'> 
        <button onClick={onClose}>Close</button>
        </div>
        </div>

           <div className='content-container_wrap'>
           <div className='content-container'>
        <div className='img_wraps'>
        <img src={selectedMotor.img} alt={selectedMotor.CarName} className="fade-in img_wraps" />
        <p className='img_wraps_2'>Name: {selectedMotor.CarName} Cost: {selectedMotor.Cost}</p>
        </div>
        <div className="text fade-in">
            <p>Brand: {selectedMotor.BrandName}</p>
            <p>Year: {selectedMotor.Dates}</p>
            <p>company: {selectedMotor.company}</p>
            <p>location: {selectedMotor.place}</p>
            <p>licese: {selectedMotor.license}</p>
            <p>yoqilgi: {selectedMotor.fuelType}</p>
            <p>karopkasi: {selectedMotor.transmission}</p>
            <p>info: {selectedMotor.info}</p>
            <p>rate: {selectedMotor.fuelTankCapacity}</p>
        </div>

       </div>
           </div>
      </div>
    </div>
  );
};

export default OmaterialMoto;








