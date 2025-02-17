import { Button } from '@mui/material';
import { NavLink } from 'react-router-dom';

const Home = () => {

  return (
    <Button variant="contained" component={NavLink} to="/new-meal">
      Add new meal
    </Button>
  );
};

export default Home;