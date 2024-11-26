import Box from '@mui/joy/Box';
import Avatar from '@mui/joy/Avatar';
import Divider from '@mui/joy/Divider';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemContent from '@mui/joy/ListItemContent';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import ListDivider from '@mui/joy/ListDivider';
import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import MenuItem from '@mui/joy/MenuItem';
import Dropdown from '@mui/joy/Dropdown';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { baseAPI } from '../../utils/constants';
import { AddDataForm } from '../types/type';
import { AddToCartButton, CloseButton, ErrorMessage, Modal, ModalContent, SubmitButton } from '../styles/style';
import { ResponseType } from '../types/type';
import React from 'react';

const listItems = [
  {
    id: 'INV-1234',
    date: 'Feb 3, 2023',
    status: 'Refunded',
    customer: {
      initial: 'O',
      name: 'Olivia Ryhe',
      email: 'olivia@email.com',
    },
  },
  {
    id: 'INV-1233',
    date: 'Feb 3, 2023',
    status: 'Paid',
    customer: {
      initial: 'S',
      name: 'Steve Hampton',
      email: 'steve.hamp@email.com',
    },
  },
  {
    id: 'INV-1232',
    date: 'Feb 3, 2023',
    status: 'Refunded',
    customer: {
      initial: 'C',
      name: 'Ciaran Murray',
      email: 'ciaran.murray@email.com',
    },
  },
  {
    id: 'INV-1231',
    date: 'Feb 3, 2023',
    status: 'Refunded',
    customer: {
      initial: 'M',
      name: 'Maria Macdonald',
      email: 'maria.mc@email.com',
    },
  },
  {
    id: 'INV-1230',
    date: 'Feb 3, 2023',
    status: 'Cancelled',
    customer: {
      initial: 'C',
      name: 'Charles Fulton',
      email: 'fulton@email.com',
    },
  },
  {
    id: 'INV-1229',
    date: 'Feb 3, 2023',
    status: 'Cancelled',
    customer: {
      initial: 'J',
      name: 'Jay Hooper',
      email: 'hooper@email.com',
    },
  },
];

function RowMenu() {
  return (
    <Dropdown>
      <MenuButton
        slots={{ root: IconButton }}
        slotProps={{ root: { variant: 'plain', color: 'neutral', size: 'sm' } }}
      >
        <MoreHorizRoundedIcon />
      </MenuButton>
      <Menu size="sm" sx={{ minWidth: 140 }}>
        <MenuItem>Edit</MenuItem>
        <MenuItem>Rename</MenuItem>
        <MenuItem>Move</MenuItem>
        <Divider />
        <MenuItem color="danger">Delete</MenuItem>
      </Menu>
    </Dropdown>
  );
}

export default function OrderList() {
  const [selected, setSelected] = React.useState<string[]>([]); 
const [error, setError] = React.useState<string>('');
const [formData, setFormData] = React.useState<AddDataForm>({ title: '', desc: '', image: '' });
const [loading, setLoading] = React.useState<boolean>(false);
const [todos, setTodos] = React.useState<any[]>(JSON.parse(localStorage.getItem('todos') || '[]'));
const [showModal, setShowModal] = React.useState<boolean>(false);

const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
  if (event.target.checked) {
    setSelected(todos.map(todo => todo._id));
  } else {
    setSelected([]);
  }
};

const handleSelectItem = (id: string) => {
  setSelected(prev => 
    prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
  );
};

const handleDelete = async (id: string) => {
  const token = localStorage.getItem('token');
  if (!token) return setError('Iltimos, tizimga kiring.');

  try {
    const { data } = await axios.delete<ResponseType>(`${baseAPI}/todo/delete/${id}`, { headers: { Authorization: `Bearer ${token}` } });
    if (data.success) {
      const updatedTodos = todos.filter(todo => todo._id !== id);
      setTodos(updatedTodos);
      localStorage.setItem('todos', JSON.stringify(updatedTodos));
    } else {
      setError('O\'chirishda xatolik.');
    }
  } catch(error) {
      setError(' O\'chirishda xatolik.');
      setTimeout(() => {
          setError('')
      }, 3000);
  }
};

const generatePDF = () => {
  if (selected.length === 0) {
    setError('Iltimos, kamida bitta checkboxni tanlang.');
    return;
  }

  const doc = new jsPDF();
  const selectedTodos = todos.filter(todo => selected.includes(todo._id));

  const tableData = selectedTodos.map(todo => [
    todo.title,
    todo.desc,
    todo.image ? <img src={todo.image} alt={todo.title} style={{ width: '50px', height: '50px' }} /> : 'No Image',
    new Date(todo.sana).toLocaleDateString(),
  ]);

  autoTable(doc, {
    head: [['Title', 'Description', 'Image', 'Date']],
    body: tableData,
    theme: 'grid', 
    headStyles: {
      fillColor: [0, 102, 204], 
      textColor: [255, 255, 255], 
      fontStyle: 'bold', 
      halign: 'center', 
      valign: 'middle', 
    },
    bodyStyles: {
      lineColor: [0, 0, 0], 
      lineWidth: 0.1, 
    },
    styles: {
      cellPadding: 2, 
      fontSize: 8, 
    },
  });

  doc.save('todos.pdf');

  setSelected([]);
};
  return (
    <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
      {listItems.map((listItem) => (
        <List key={listItem.id} size="sm" sx={{ '--ListItem-paddingX': 0 }}>
          <ListItem
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'start',
            }}
          >
            <ListItemContent sx={{ display: 'flex', gap: 2, alignItems: 'start' }}>
              <ListItemDecorator>
                <Avatar size="sm">{listItem.customer.initial}</Avatar>
              </ListItemDecorator>
              <div>
                <Typography gutterBottom sx={{ fontWeight: 600 }}>
                  {listItem.customer.name}
                </Typography>
                <Typography level="body-xs" gutterBottom>
                  {listItem.customer.email}
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 0.5,
                    mb: 1,
                  }}
                >
                  <Typography level="body-xs">{listItem.date}</Typography>
                  <Typography level="body-xs">&bull;</Typography>
                  <Typography level="body-xs">{listItem.id}</Typography>
                </Box>
              </div>
            </ListItemContent>
            <RowMenu />
          </ListItem>
          <ListDivider />
        </List>
      ))}
      <Box
        className="Pagination-mobile"
        sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center', py: 2 }}
      >
        <IconButton
          aria-label="previous page"
          variant="outlined"
          color="neutral"
          size="sm"
        >
          <KeyboardArrowLeftIcon />
        </IconButton>
        <Typography level="body-sm" sx={{ mx: 'auto' }}>
          Page 1 of 10
        </Typography>
        <IconButton
          aria-label="next page"
          variant="outlined"
          color="neutral"
          size="sm"
        >
          <KeyboardArrowRightIcon />
        </IconButton>
      </Box>
    </Box>
  );
}