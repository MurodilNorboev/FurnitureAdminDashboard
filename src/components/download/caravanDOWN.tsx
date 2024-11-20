
import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import Stack from '@mui/joy/Stack';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';
import { CampcarMoto } from '../types/data';
import { Add } from '@mui/icons-material';

interface CarvanDOWNrops {
  onAdd: (newCar: CampcarMoto) => void;
}

export default function CarvanDOWN({ onAdd }: CarvanDOWNrops) {
  const defaultCar: CampcarMoto = {
    id: 0,
    img: '',
    CarName: '',
    BrandName: '',
    Cost: 0,
    Dates: 0, // Change to number
    place: '',
    fuelType: '',
    sleepingCapacity: 0,
    company: '',
    license: '',
    info: '',
    Viewed: '',
    transmission: '',
    kitchen: false,
    bathroom: false,
    airConditioning: false,
    waterTankCapacity: 0,
    solarPanel: false,
    gps: false,
    parkingSensors: false,
    backupCamera: false,
    insurance: false,
    maintenancePlan: false,
    imageUrl: '',
    hasStorage: false,
    hasBathroom: false,
    hasAirConditioning: false,
    fuelTankCapacity: 0,
  };

  const [newCar, setNewCar] = useState<CampcarMoto>(defaultCar);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAddCar = () => {
    if (!newCar.CarName || !newCar.BrandName || newCar.Dates <= 0) {
      setError('Please fill in all required fields and provide a valid year.');
      return;
    }
    onAdd({ ...newCar, id: Date.now() });
    resetNewCar();
    setOpen(false);
  };

  const resetNewCar = () => {
    setNewCar(defaultCar);
    setError(null);
  };

  return (
    <>
      <div>
              <Button 
              variant="outlined"
              startDecorator={<Add />}
              onClick={() => setOpen(true)}
              >Add to cart</Button>
    </div>
      <Modal open={open} onClose={() => setOpen(false)} sx={{zIndex: 99999}}>
        <ModalDialog>
          <DialogTitle>Add New Car</DialogTitle>
          <DialogContent>
            <Stack spacing={2}>
              {error && <Typography color="danger">{error}</Typography>}
              <FormControl>
                <FormLabel>Car Name</FormLabel>
                <Input
                  value={newCar.CarName}
                  onChange={(e) => setNewCar({ ...newCar, CarName: e.target.value })}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Brand</FormLabel>
                <Input
                  value={newCar.BrandName}
                  onChange={(e) => setNewCar({ ...newCar, BrandName: e.target.value })}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Year</FormLabel>
                <Input
                  type="number"
                  value={newCar.Dates}
                  onChange={(e) => setNewCar({ ...newCar, Dates: Number(e.target.value) })}
                />
              </FormControl>
              <Button onClick={handleAddCar}>Submit</Button>
            </Stack>
          </DialogContent>
        </ModalDialog>
      </Modal>
    </>
  );
}