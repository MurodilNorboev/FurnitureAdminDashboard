import React from 'react';
import { useParams } from 'react-router-dom';
import './omaterialStile.css'; 
import { tuningCar, tuningCars } from '../mock/tuningdata';
import './omaterialStile.css'; 

interface OmaterialProps {
  onClose: () => void;
}

const Omaterialtuning: React.FC<OmaterialProps> = ({ onClose }) => {
  const { id } = useParams<{ id: string }>(); 
  const selectedtuning = tuningCars.find(tuning => tuning.id === Number(id));


  if (!selectedtuning) {
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
        zIndex: 10000, 
        color: '#000',
      }}
    >
      <div className='motor_wrap'> 
        <h2>Tuning Details</h2>
      <div className='button_wrap'> 
      <button onClick={onClose}>Close</button>
      </div>
      </div>

           <div className='content-container_wrap'>
           <div className='content-container'>
        <div className='img_wraps'>
        <img src={selectedtuning.img} alt={selectedtuning.CarName} className="fade-in img_wraps" />
        <p className='img_wraps_2'>Name: {selectedtuning.CarName} Cost: {selectedtuning.Cost}</p>
        </div>
        <div className="text fade-in">
            <p>Brand: {selectedtuning.BrandName}</p>
            <p>Year: {selectedtuning.Dates}</p>
            <p>company: {selectedtuning.company}</p>
            <p>location: {selectedtuning.place}</p>
            <p>licese: {selectedtuning.license}</p>
            <p>yoqilgi: {selectedtuning.fuelType}</p>
            <p>karopkasi: {selectedtuning.transmission}</p>
            <p>info: {selectedtuning.info}</p>
            <p>rate: {selectedtuning.fuelTankCapacity}</p>
        </div>

       </div>
           </div>
    </div>
    </div>
  );
};

export default Omaterialtuning;