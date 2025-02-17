import { Button, Card, CardContent, Container, Grid, IconButton, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { IMeal } from '../../types';
import axiosApi from '../../axiosApi.ts';
import Spinner from '../../components/UI/Spinner/Spinner.tsx';
import editIcon from "../../assets/edit.svg";
import deleteIcon from "../../assets/delete.svg";

const Home = () => {
  const [meals, setMeals] = useState<IMeal[]>([])
  const [loading, setLoading] = useState(false);

  const fetchMeals = useCallback( async () => {
    try {
      setLoading(true);
      const response = await axiosApi('/meals.json');
      const mealsObject = response.data;
      const mealsArr = Object.keys(mealsObject).map((key) => {
        return{
        ...mealsObject[key],
          id: key
        }
      });
      setMeals(mealsArr);
    } catch(e) {
      alert(e)
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchMeals()
  }, [fetchMeals])

  return (
    <>
      <Container>
        <Button variant="contained" component={NavLink} to="/new-meal">
          Add new meal
        </Button>
        {loading ? <Spinner/> :
          meals.map((meal) => (
            <Card key={meal.id}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    p: 2,
                    mt: 2,
                    border: "1px solid lightgray",
                    borderRadius: "10px",
                  }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="subtitle1" color="textSecondary">
                  {meal.mealTime}
                </Typography>
                <Typography variant="body1">{meal.description}</Typography>
              </CardContent>

              <Typography variant="body1" sx={{ fontWeight: "bold", mx: 30 }}>
                {meal.calories} kcal
              </Typography>
              <Grid>
                <IconButton>
                  <img style={{width: 20}} src={editIcon} alt="Edit"/>
                </IconButton>
                <IconButton>
                  <img style={{width: 20}} src={deleteIcon} alt="Delete"/>
                </IconButton>
              </Grid>
            </Card>
          ))}
      </Container>
    </>

  );
};

export default Home;