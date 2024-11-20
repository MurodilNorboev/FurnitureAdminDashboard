import React, { useId } from 'react';
import { useParams } from 'react-router-dom';
import './omaterialStile.css'
import './omaterialStile.css'; 
import { usedcarCars } from '../mock/usedCardata';

interface OmaterialProps {
  onClose: () => void;
}

const OmaterialusedCar: React.FC<OmaterialProps> = ({ onClose }) => {
  const { id } = useParams<{ id: string }>();
  const OmaterialusedCar = usedcarCars.find(used => used.id === Number(id));

  if (!OmaterialusedCar) {
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
        <h2>Used Car Details</h2>
      <div className='button_wrap'> 
      <button onClick={onClose}>Close</button>
      </div>
      </div>

      <div className='content-container_wrap'>
           <div className='content-container'>
        <div className='img_wraps'>
        <img src={OmaterialusedCar.img} alt={OmaterialusedCar.CarName} className="fade-in img_wraps" />
        <p className='img_wraps_2'>Name: {OmaterialusedCar.CarName} Cost: {OmaterialusedCar.Cost}</p>
        </div>
        <div className="text fade-in">
            <p>Brand: {OmaterialusedCar.BrandName}</p>
            <p>Year: {OmaterialusedCar.Dates}</p>
            <p>company: {OmaterialusedCar.company}</p>
            <p>location: {OmaterialusedCar.place}</p>
            <p>licese: {OmaterialusedCar.license}</p>
            <p>yoqilgi: {OmaterialusedCar.fuelType}</p>
            <p>karopkasi: {OmaterialusedCar.transmission}</p>
            <p>info: {OmaterialusedCar.info}</p>
            <p>rate: {OmaterialusedCar.fuelTankCapacity}</p>
        </div>

       </div>
           </div>

    </div>
    </div>
  );
};

export default OmaterialusedCar;