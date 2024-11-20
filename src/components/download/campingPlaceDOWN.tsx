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
import { CampcarCamp } from '../types/data';
import { Add } from '@mui/icons-material';

interface CampingPlaceDOWNProps {
  onAdd: (newCar: CampcarCamp) => void;
}

export default function CampingPlaceDOWN({ onAdd }: CampingPlaceDOWNProps) {
  const defaultCar: CampcarCamp = {
    id: 0,
    img: '',
    campingName: '',
    location: '',
    number: '0', // O'zgarish: string formatida saqlash
    sleepingCapacity: 0,
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
    fuelTankCapacity: 0, // Yana kerakli maydon
  };

  const [newCar, setNewCar] = useState<CampcarCamp>(defaultCar);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAddCar = () => {
    // Yangi xatolarni to'g'rilash
    if (!newCar.campingName || !newCar.location || !newCar.license || newCar.sleepingCapacity <= 0) {
      setError('Please fill in all required fields and provide valid details.');
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
        >
          Add to cart
        </Button>
      </div>
      <Modal open={open} onClose={() => setOpen(false)} sx={{ zIndex: 99999 }}>
        <ModalDialog>
          <DialogTitle>Add New Car</DialogTitle>
          <DialogContent>
            <Stack spacing={2}>
              {error && <Typography color="danger">{error}</Typography>}
              <FormControl>
                <FormLabel>Camping Name</FormLabel>
                <Input
                  value={newCar.campingName}
                  onChange={(e) => setNewCar({ ...newCar, campingName: e.target.value })}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Location</FormLabel>
                <Input
                  value={newCar.location}
                  onChange={(e) => setNewCar({ ...newCar, location: e.target.value })}
                />
              </FormControl>
              <FormControl>
                <FormLabel>License</FormLabel>
                <Input
                  value={newCar.license}
                  onChange={(e) => setNewCar({ ...newCar, license: e.target.value })}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Sleeping Capacity</FormLabel>
                <Input
                  type="number"
                  value={newCar.sleepingCapacity}
                  onChange={(e) => setNewCar({ ...newCar, sleepingCapacity: Number(e.target.value) })}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Fuel Tank Capacity</FormLabel>
                <Input
                  type="number"
                  value={newCar.fuelTankCapacity}
                  onChange={(e) => setNewCar({ ...newCar, fuelTankCapacity: Number(e.target.value) })}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Transmission</FormLabel>
                <Input
                  value={newCar.transmission}
                  onChange={(e) => setNewCar({ ...newCar, transmission: e.target.value })}
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

