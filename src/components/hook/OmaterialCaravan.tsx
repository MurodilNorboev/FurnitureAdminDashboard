import React from 'react';
import { useParams } from 'react-router-dom';
import './omaterialStile.css'; 
import { caravanCar, caravanCars } from '../mock/caravandata';
import './omaterialStile.css'

interface OmaterialProps {
  onClose: () => void;
}

const Omaterialcaravan: React.FC<OmaterialProps> = ({ onClose }) => {
  const { id } = useParams<{ id: string }>(); 
  const selectedcaravan = caravanCars.find(caravan => caravan.id === Number(id));


  if (!selectedcaravan) {
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
        <h2>Caravan Details</h2>
      <div className='button_wrap'> 
      <button onClick={onClose}>Close</button>
      </div>
      </div>

           <div className='content-container_wrap'>
           <div className='content-container'>
        <div className='img_wraps'>
        <img src={selectedcaravan.img} alt={selectedcaravan.CarName} className="fade-in img_wraps" />
        <p className='img_wraps_2'>Name: {selectedcaravan.CarName} Cost: {selectedcaravan.Cost}</p>
        </div>
        <div className="text fade-in">
            <p>Brand: {selectedcaravan.BrandName}</p>
            <p>Year: {selectedcaravan.Dates}</p>
            <p>company: {selectedcaravan.company}</p>
            <p>location: {selectedcaravan.place}</p>
            <p>licese: {selectedcaravan.license}</p>
            <p>yoqilgi: {selectedcaravan.fuelType}</p>
            <p>karopkasi: {selectedcaravan.transmission}</p>
            <p>info: {selectedcaravan.info}</p>
            <p>rate: {selectedcaravan.fuelTankCapacity}</p>
        </div>

       </div>
           </div>
    </div>
    </div>
  );
};

export default Omaterialcaravan;