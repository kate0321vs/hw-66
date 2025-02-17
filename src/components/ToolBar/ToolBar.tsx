import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';

const ToolBar = () => {
  return (
    <Box sx={{mb: 5}}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            color='inherit'
            component={NavLink}
            to='/'
            sx={{ flexGrow: 1, textDecoration: 'none' }}
          >
            Calorie Tracker
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default ToolBar;