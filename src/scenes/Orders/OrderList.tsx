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
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { baseAPI } from '../../utils/constants';
import { AddDataForm, ResponseType } from '../../components/types/type';
import { VariantProp } from '@mui/joy/styles';
import Breadcrumbs from '@mui/joy/Breadcrumbs';
import Link from '@mui/joy/Link';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';


export default function OrderList() {
  const [todo, setTodo] = useState<any[]>(() => {const storedTodos = localStorage.getItem('todos'); return storedTodos ? JSON.parse(storedTodos) : [];});
  const [search, setSearch] = useState('');
  const [todos, setTodos] = useState(todo);
  const [filteredTodo, setFilteredTodos] = useState(todo);
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
    <Box sx={{ 
      display: { xs: 'block', sm: 'none' },
       }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Breadcrumbs
              size="sm"
              aria-label="breadcrumbs"
              separator={<ChevronRightRoundedIcon />}
              sx={{ pl: 0 }}
            >
              <Link
                underline="none"
                color="neutral"
                href="#some-link"
                aria-label="Home"
              >
                <HomeRoundedIcon />
              </Link>

              {/* <Link
                underline="hover"
                color="neutral"
                href="#some-link"
                sx={{ fontSize: 12, fontWeight: 500 }}
              >
                Dashboard
              </Link> */}

              <Typography color="primary" sx={{ fontWeight: 500, fontSize: 12 }}>
                Orders
              </Typography>

            </Breadcrumbs>
          </Box>
      <div style={{display:"flex",flexDirection:'column',justifyContent:"space-between",height:"45rem"}}>
      <div>
      {currentTodos.map((listItem, ind) => (
        <List
        key={ind} 
        size="sm" 
        sx={{ '--ListItem-paddingX': 0 }}
        >
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
