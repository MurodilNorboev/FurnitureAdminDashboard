import React from 'react'
import Typography from '@mui/joy/Typography';
import Box from '@mui/joy/Box';
import Breadcrumbs from '@mui/joy/Breadcrumbs';
import Link from '@mui/joy/Link';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';

const Settingcomponent = () => {
  return (
    <div>
      <Box sx={{ display: 'flex', alignItems: 'center',position:"fixed", top: 30 }}>
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
          <Typography color="primary" sx={{ fontWeight: 500, fontSize: 12 }}>
            Settings
          </Typography>
        </Breadcrumbs>
      </Box>
      Settingcomponent
    </div>
  )
}

export default Settingcomponent