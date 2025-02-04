import * as React from 'react';
import GlobalStyles from '@mui/joy/GlobalStyles';
import Sheet from '@mui/joy/Sheet';
import IconButton from '@mui/joy/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import { toggleSidebar } from './utils';

export default function Header() {
  return (
    <Sheet
      sx={{
        display: { xs: 'flex', md: 'none' },
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'absolute',
         borderRadius:"5px",
        background:"transparent",
        top: 0,
        height: 'var(--Header-height)',
        zIndex: 9995,
        p: 2,
        gap: 1,
      }}
    >
      <GlobalStyles
        styles={(theme) => ({
          borderColor: 'background.level1',
          zIndex: 9995,
          ':root': {
            '--Header-height': '52px',
            [theme.breakpoints.up('md')]: {
              '--Header-height': '0px',
            },
          },
        })}
      />
      <IconButton
        onClick={() => toggleSidebar()}
        variant="outlined"
        color="neutral"
        size="sm"
      >
        <MenuIcon /> 
      </IconButton>
    </Sheet>
  );
}


