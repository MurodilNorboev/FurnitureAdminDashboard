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

import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Table from '@mui/joy/Table';
import Sheet from '@mui/joy/Sheet';
import Checkbox from '@mui/joy/Checkbox';
import { iconButtonClasses } from '@mui/joy/IconButton';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { baseAPI } from '../../utils/constants';
import { AddDataForm, ResponseType } from '../types/type';
import { Modal, ModalContent, CloseButton, Input, SubmitButton, ErrorMessage } from '../styles/style';
import { toast } from 'react-toastify';
import { VariantProp } from '@mui/joy/styles';
import ButtonGroup from '@mui/joy/ButtonGroup';
import Add from '@mui/icons-material/Add';


export default function OrderList() {
  const [todo, setTodo] = useState<any[]>(() => {const storedTodos = localStorage.getItem('todos'); return storedTodos ? JSON.parse(storedTodos) : [];});
  const [search, setSearch] = useState('');
  const [todos, setTodos] = useState(todo);
  const [filteredTodo, setFilteredTodos] = useState(todo);
  const [formData, setFormData] = useState<AddDataForm>({ title: '', desc: '', image: '' });
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selected, setSelected] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [todosPerPage] = useState(7);
  const totalPages = Math.ceil(todos.length / todosPerPage);
  const [variant, setVariant] = React.useState<VariantProp>('outlined');
  const createOnClick = (value: VariantProp) => () => {
    setVariant(value);
  };

  useEffect(() => {
    window.addEventListener('resize', () => {});
    return () => window.removeEventListener('resize', () => {});
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) return setError('Iltimos, tizimga kiring.');
    setLoading(true);
    try {
      const { data } = await axios.post<ResponseType>(`${baseAPI}/todo/add`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data.success) {
        const updatedTodos = [data.new_todo, ...todos];
        setTodos(updatedTodos);
        localStorage.setItem('todos', JSON.stringify(updatedTodos));
        setFormData({ title: '', desc: '', image: '' });
      } else {
        setError(data.message || 'Xatolik yuz berdi.');
      }
    } catch {
      setError('Xatolik yuz berdi.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (_id: string) => {
    const token = localStorage.getItem('token');
    if (!token) return setError('Iltimos, tizimga kiring.');
    try {
      const { data } = await axios.delete<ResponseType>(`${baseAPI}/todo/delete/${_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data.success) {
        toast.success("Data o'chirildi");
        const updatedTodos = todos.filter((todo) => todo && todo._id !== _id);
        setTodos(updatedTodos);
        localStorage.setItem('todos', JSON.stringify(updatedTodos));
      } else {
        setError('O‘chirishda xatolik.');
      }
    } catch {
      setError('O‘chirishda xatolik.');
    }
  };

  const handleCheckboxChange = (id: string) => {
    setSelected((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((selectedId) => selectedId !== id)
        : [...prevSelected, id]
    );
  };

  const handleDownloadPDF = () => {
    if (selected.length === 0) {
      setError('No selected!');
      setTimeout(() => {
        setError('')
      }, 2000);
      return;
    }

    const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });

    doc.setFontSize(30);
    doc.text('Furniture', 140, 20, { align: 'center' });

    const headers = ['Title', 'Description', 'Image URL', 'Date', 'ID'];

    const rows = selected
      .map((id) => {
        const todo = todos.find((item) => item._id === id);
        return todo ? [todo.title, todo.desc, todo.image, todo.sana, todo._id] : [];
      })
      .filter((row) => row.length > 0);

    autoTable(doc,{
      head: [headers], 
      body: rows, 
      startY: 30, 
      bodyStyles: {
        lineWidth: 0.1, 
        lineColor: [0, 0, 0], 
        textColor: [0, 0, 0], 
        fillColor: '#FFF',
      },
      headStyles: {
        fillColor: '#395cf8', 
        textColor: [255, 255, 255],
        fontSize: 12, 
        halign: 'center',
      },
      tableId: '#FFF',
      tableLineColor: [0, 0, 0], 
      tableLineWidth: 0.1,
    });
    
    doc.save('table.pdf'); 
    doc.save('todos.pdf');
    setSelected([]);
  };

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const allIds = todos.map((todo) => todo._id);
      setSelected(allIds);
    } else {
      setSelected([]);
    }
  };

  const handlePagination = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const getAllTodo = async (search: string) => {
      try {
        const { data } = await axios.get<ResponseType>(baseAPI + "/todo/get-all", {
        params: {search},
      }) 
      
      if (data.success) {
          setTodos(data.data)
        console.log(data.data);
      }
  
  
      } catch (error) {
        console.log(error);
      }
  } 
  useEffect(() => {
      getAllTodo('');
  }, [])
  
  useEffect(() => {
      console.log('Todos:', todos); 
      if (search.trim() === '') {
        setFilteredTodos(todos);
      } else {
        const filtered = todos.filter(t =>
          t.title.toLowerCase().includes(search.toLowerCase()) || 
          t.desc.toLowerCase().includes(search.toLowerCase())
        );
        setFilteredTodos(filtered);
      }
  }, [search, todos]);

  const currentTodos = filteredTodo.slice(
      (currentPage - 1) * todosPerPage,
      currentPage * todosPerPage
    );
  return (
    <Box sx={{ 
      display: { xs: 'block', sm: 'none' },
       }}>
      <div style={{display:"flex",flexDirection:'column',justifyContent:"space-between",height:"45rem"}}>
      <div>
      {currentTodos.map((listItem) => (
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
                <Avatar size="sm" >{listItem.desc.charAt(0).toUpperCase()}</Avatar>
              </ListItemDecorator>
              <div>
                <Typography gutterBottom sx={{ fontWeight: 600 }}>
                  {listItem.name}
                </Typography>
                <Typography level="body-xs" gutterBottom>
                  {listItem.title}
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
                  <Typography level="body-xs">{listItem.sana}</Typography>
                  <Typography level="body-xs">&bull;</Typography>
                  <Typography level="body-xs">{listItem._id}</Typography>
                </Box>
              </div>
            </ListItemContent>

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

          </ListItem>
          <ListDivider />
        </List>
      ))}
      </div>

      <Box
        className="Pagination-mobile"
        sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center', py: 2 }}
      >
        <IconButton
        onClick={() => handlePagination(currentPage - 1)} disabled={currentPage === 1}
          aria-label="previous page"
          variant="outlined"
          color="neutral"
          size="sm"
        >
          <KeyboardArrowLeftIcon />
        </IconButton>

        <Typography level="body-sm" sx={{ mx: 'auto' }}>
        {currentPage}     
        </Typography>

        <IconButton
          onClick={() => handlePagination(currentPage + 1)} disabled={currentPage === totalPages}
          aria-label="next page"
          variant="outlined"
          color="neutral"
          size="sm"
        >
          <KeyboardArrowRightIcon />
        </IconButton>
      </Box>
      </div>
    </Box>
  );
}