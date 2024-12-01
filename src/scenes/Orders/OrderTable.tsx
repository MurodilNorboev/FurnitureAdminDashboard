import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Table from '@mui/joy/Table';
import Sheet from '@mui/joy/Sheet';
import Checkbox from '@mui/joy/Checkbox';
import IconButton, { iconButtonClasses } from '@mui/joy/IconButton';
import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import MenuItem from '@mui/joy/MenuItem';
import Dropdown from '@mui/joy/Dropdown';
import { jsPDF } from 'jspdf';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import autoTable from 'jspdf-autotable';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { baseAPI } from '../../utils/constants';
import { AddDataForm, ResponseType } from '../../components/types/type';
import { Modal, ModalContent,  Input, CloseButton, SubmitButton, ErrorMessage } from '../../components/styles/style';
import { toast } from 'react-toastify';
import { VariantProp } from '@mui/joy/styles';
import ButtonGroup from '@mui/joy/ButtonGroup';
import Add from '@mui/icons-material/Add';
import OrderList from './OrderList';
import Typography from '@mui/joy/Typography';
import Box from '@mui/joy/Box';


export default function OrderTable() {
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
    const [todosPerPage] = useState(20);
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
        .map((id, ind) => {
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
        const allIds = todos.map((todo, ind) => todo._id);
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
        }
    
    
        } catch (error) {
        }
    } 
    useEffect(() => {
        getAllTodo('');
    }, [])
    
    useEffect(() => {
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
      <React.Fragment>
        <Box
          className="SearchAndFilters-tabletUp"
          sx={{
            justifyContent:"space-between",
            borderRadius: 'sm',
            py: 2,
            display: { xs: 'none', sm: 'flex' },
            flexWrap: 'wrap',
            gap: 1.5,
            '& > *': {
              minWidth: { xs: '120px', md: '160px' },
            },
          }}
        >
          <FormControl sx={{ flex: 1,maxWidth:"300px" }} size="sm">
            <FormLabel >Search for order</FormLabel>
            <Input  placeholder="Search" 
            onChange={(e) => {
              setSearch(e.target.value)
            }} 
            />
          </FormControl>
  
          <div style={{display:"flex",alignItems:'center',gap:"10px",paddingTop:"15px"}}>

            <div style={{display:"flex",alignItems:"center",padding:"10px 4px 2px 4px"}}>
              {error && <ErrorMessage>{error}</ErrorMessage>}
            </div>

            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Button startDecorator={<Add />} onClick={handleDownloadPDF}>Download PDF</Button>
            </Box>

              <ButtonGroup
              onClick={() => setShowModal(true)}
               variant={variant} 
               size="sm" 
               aria-label="neutral button group" >
              <Button sx={{width:"130px",height:"35px"}} onClick={createOnClick('outlined')}>Add Cart</Button>
              </ButtonGroup>
  
          </div>
        </Box>
  
        {showModal && (
          <Modal style={{zIndex:99}}>
            <ModalContent>
              <CloseButton style={{marginTop:"-35px",marginRight:"-22px",color:"#FFF"}} onClick={() => setShowModal(false)}>c</CloseButton>
              <form onSubmit={handleSubmit}>
                <Input style={{background:"#FFF"}} type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Title" required />
                <Input style={{background:"#FFF"}} type="text" name="desc" value={formData.desc} onChange={handleChange} placeholder="Description" required />
                <Input style={{background:"#FFF"}} type="text" name="image" value={formData.image} onChange={handleChange} placeholder="Image URL" required />
                <SubmitButton type="submit" disabled={loading}>{loading ? 'Yuborilmoqda...' : 'Qo\'shish'}</SubmitButton>
              </form>
            </ModalContent>
          </Modal>
        )}
  
         <Sheet
          className="OrderTableContainer"
          variant="outlined"
          sx={{
            maxHeight:"500px",
            height: "100%",
            display: { xs: 'none', sm: 'initial' },
            width: '100%',
            borderRadius: 'sm',
            flexShrink: 1,
            overflow: 'auto',
            minHeight: 0,
          }}
        >

            {currentTodos.length > 0 ? (
              <Table
                aria-labelledby="tableTitle"
                stickyHeader
                hoverRow
                sx={{
                  '--TableCell-headBackground': 'var(--joy-palette-background-level1)',
                  '--Table-headerUnderlineThickness': '1px',
                  '--TableRow-hoverBackground': 'var(--joy-palette-background-level1)',
                  '--TableCell-paddingY': '4px',
                  '--TableCell-paddingX': '8px',
                }}
              >
                <thead style={{zIndex:2}}>
                  <tr>
                    <th style={{ width: 48, textAlign: 'center' }}>
                      <Checkbox
                        onChange={handleSelectAll}
                        checked={selected.length === todos.length}
                        size="md"
                        color="primary"
                        sx={{ cursor: 'pointer' }}
                      />
                    </th>
                    <th style={{ width: 50, padding: '12px 0px' }}>row</th>
                    <th style={{ width: 140, padding: '12px 6px' }}>title</th>
                    <th style={{ width: 140, padding: '12px 6px' }}>desc</th>
                    <th style={{ width: 140, padding: '12px 6px' }}>img</th>
                    <th style={{ width: 140, padding: '12px 6px' }}>Data</th>
                    <th style={{ width: 80, padding: '12px 6px' }}></th>
                  </tr>
                </thead>
                <tbody>
                  {currentTodos.map((todo, ind) => (
                    <tr key={ind}>
                      <td style={{ textAlign: 'center' }}>
                        <Checkbox
                          sx={{ verticalAlign: 'text-bottom'}}
                          size="md"
                          checked={selected.includes(todo._id)}
                          onChange={() => handleCheckboxChange(todo._id)}
                        />
                      </td>
                      <td>
                        <Typography level="body-xs">1</Typography>
                      </td>
                      <td>
                        <Typography level="body-xs">{todo.title}</Typography>
                      </td>
                      <td>
                        <Typography level="body-xs">{todo.desc}</Typography>
                      </td>
                      <td>
                        {todo.image ? (
                          <img src={todo.image} alt={todo.title} style={{ width: '50px', height: '50px' }} />
                        ) : 'No Image'}
                      </td>
                      <td>
                        <Typography level="body-xs">{todo.sana}</Typography>
                      </td>
                      <td>
                        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                          <Dropdown>
                            <MenuButton
                              slots={{ root: IconButton }}
                              slotProps={{ root: { variant: 'plain', color: 'neutral', size: 'sm' } }}
                            >
                              <MoreHorizRoundedIcon />
                            </MenuButton>
                            <Menu size="sm" sx={{ minWidth: 100 }}>
                              <MenuItem>Edit</MenuItem>
                              <MenuItem>Rename</MenuItem>
                              <MenuItem>Move</MenuItem>
                              <Divider />
                              <MenuItem color="danger" onClick={() => handleDelete(todo._id)}>
                                Delete
                              </MenuItem>
                            </Menu>
                          </Dropdown>
                        </Box>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <Table
                aria-labelledby="tableTitle"
                stickyHeader
                hoverRow
                sx={{
                  '--TableCell-headBackground': 'var(--joy-palette-background-level1)',
                  '--Table-headerUnderlineThickness': '1px',
                  '--TableRow-hoverBackground': 'var(--joy-palette-background-level1)',
                  '--TableCell-paddingY': '4px',
                  '--TableCell-paddingX': '8px',
                }}
              >
                <thead>
                  <tr>
                    <th style={{ width: 48, textAlign: 'center' }}>
                      <Checkbox
                        onChange={handleSelectAll}
                        checked={selected.length === todos.length}
                        size="md"
                        color="primary"
                        sx={{ cursor: 'pointer' }}
                      />
                    </th>
                    <th style={{ width: 50, padding: '12px 0px' }}>row</th>
                    <th style={{ width: 140, padding: '12px 6px' }}>title</th>
                    <th style={{ width: 140, padding: '12px 6px' }}>desc</th>
                    <th style={{ width: 140, padding: '12px 6px' }}>img</th>
                    <th style={{ width: 140, padding: '12px 6px' }}>Data</th>
                    <th style={{ width: 80, padding: '12px 6px' }}></th>
                  </tr>
                </thead>
                <tbody>
                <Typography  sx={{ textAlign: 'center', marginTop: 2,width:"100%",position:"absolute" }}>
                No search results found
              </Typography>
                </tbody>
              </Table>
            )}
        </Sheet>
  
        <Box
          className="Pagination-laptopUp"
          sx={{
            pt: 2,
            gap: 1,
            [`& .${iconButtonClasses.root}`]: { borderRadius: '50%' },
            display: { xs: 'none', sm: 'flex' },
          }}
        >
          <Button
            size="sm"
            variant="outlined"
            color="neutral"
            startDecorator={<KeyboardArrowLeftIcon />}
            onClick={() => handlePagination(currentPage - 1)} disabled={currentPage === 1}
          >
            Previous
          </Button>
  
          <Box sx={{ flex: 1 }} />
            {['1'].map((page, ind) => (
              <React.Fragment key={ind}> 
                <IconButton
                    size="sm"
                    variant={Number(page) ? 'outlined' : 'plain'}
                    color="neutral"
                  >
                    {currentPage}
                  </IconButton>
                  <IconButton
                    size="sm"
                    variant={Number(page) ? 'outlined' : 'plain'}
                    color="neutral"
                  >
                    {totalPages}
                </IconButton>
              </React.Fragment>
            ))}
          <Box sx={{ flex: 1 }} />
  
          <Button
            size="sm"
            variant="outlined"
            color="neutral"
            endDecorator={<KeyboardArrowRightIcon />}
            onClick={() => handlePagination(currentPage + 1)} disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </Box>
        <OrderList />
      </React.Fragment>
    );
  }
