import { Button, Container, Grid, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { IMeal, IMealApi } from '../../types';
import axiosApi from '../../axiosApi.ts';
import MealItem from '../../components/MealItem/MealItem.tsx';
import { toast } from 'react-toastify';
import Loader from '../../components/UI/Loader/Loader.tsx';

const Home = () => {
  const [meals, setMeals] = useState<IMeal[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);


  const fetchMeals = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axiosApi<IMealApi | null>('/meals.json');
      if (response.data) {
        const mealsObject = response.data;
        const mealsArr = Object.keys(mealsObject).map((key) => {
          return {
            ...mealsObject[key],
            id: key,
          }
        });
        setMeals(mealsArr);
      }
    } catch (e) {
      alert(e)
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchMeals()
  }, [fetchMeals])

  const totalCalories = meals.reduce((acc, meal) => {
    return acc + Number(meal.calories);
  }, 0);

  const deleteMeal = useCallback(
    async (id: string) => {
      try {
        setDeleteLoading(true);

        if (window.confirm('Are you sure you want to delete meal?')) {
          await axiosApi.delete(`/meals/${id}.json`);
          setMeals([]);
          await fetchMeals();
          toast.info('Meal deleted successfully.');
        }
      } catch (error) {
        console.error(error);
      } finally {
        setDeleteLoading(false);
      }
    },
    [fetchMeals, meals],
  );

  return (
    <>
      {loading ? <Loader/> :
        <Container>
          <Grid container spacing={6} alignItems="center" justifyContent="space-between">
            <Grid item>
              <Typography variant="h6">
                <strong>Total calories:</strong> {totalCalories} kcal
              </Typography>
            </Grid>
            <Grid item>
              <Button variant="contained" component={NavLink} to="/new-meal">
                Add new meal
              </Button>
            </Grid>
          </Grid>
          {
            meals.map((meal) => (
              <MealItem key={meal.id}
                        meal={meal}
                        onDelete={deleteMeal}
                        loading={deleteLoading}
              />
            ))}
        </Container>
      }
    </>
  );
};

export default Home;