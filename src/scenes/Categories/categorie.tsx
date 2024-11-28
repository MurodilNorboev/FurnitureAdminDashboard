import React, { useEffect, useState } from 'react';
import { Datas, TypesDatas } from '../../components/Admin/array';
import { useParams } from 'react-router-dom';
import Typography from '@mui/joy/Typography';
import Box from '@mui/joy/Box';
import Breadcrumbs from '@mui/joy/Breadcrumbs';
import Link from '@mui/joy/Link';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';

const CategorieComponent = () => {
  const [originalData] = useState<TypesDatas[]>(Datas);
  const [filteredData, setFilteredData] = useState<TypesDatas[] | null>(null);
  const { id } = useParams(); 
  const parsedId = id ? parseInt(id) : 0; 

  useEffect(() => {
    if (originalData) {
      const filterData = originalData.filter(value => value.id === parsedId);
      setFilteredData(filterData.length > 0 ? filterData : []);
    }
  }, [originalData, parsedId]); 

  return (
    <div>
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
                {filteredData?.map((val, ind) => (<div key={ind}>{val.name}</div>))}
              </Typography>

            </Breadcrumbs>
          </Box>
      <div>
        {filteredData && filteredData.length > 0 ? (
          filteredData.map(item => (
            <div key={item.id}>
              <h2>{item.name}</h2>
            </div>
          ))
        ) : (
          <p>No data found for this category.</p> 
        )}
      </div>
    </div>
  );
};

export default CategorieComponent;