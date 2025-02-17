import { Button, Container } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { IMeal } from '../../types';
import axiosApi from '../../axiosApi.ts';
import Spinner from '../../components/UI/Spinner/Spinner.tsx';
import MealItem from '../../components/MealItem/MealItem.tsx';

const Home = () => {
  const [meals, setMeals] = useState<IMeal[]>([])
  const [loading, setLoading] = useState<boolean>(true);

  const fetchMeals = useCallback( async () => {
    try {
      setLoading(true);
      const response = await axiosApi('/meals.json');
      if (response.data) {
        const mealsObject = response.data;
        const mealsArr = Object.keys(mealsObject).map((key) => {
          return{
            ...mealsObject[key],
            id: key
          }
        });
        setMeals(mealsArr);
      }
    } catch(e) {
      alert(e)
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchMeals()
  }, [fetchMeals])

  const deleteMeal = async (id: string) => {
    if (id) {
      if (window.confirm("Are you sure you want to delete this meal?")) {
        try {
          await axiosApi.delete(`/meals/${id}.json`);
          setMeals([]);
          void fetchMeals();
        } catch(e) {
          alert(e)
        }
      }
    }
  };

  return (
    <>
      <Container>
        <Button variant="contained" component={NavLink} to="/new-meal">
          Add new meal
        </Button>
        {loading ? <Spinner/> :
          meals.map((meal) => (
            <MealItem key={meal.id}
                      mealTime={meal.mealTime}
                      description={meal.description}
                      calories={meal.calories}
                      onDelete={() => deleteMeal(meal.id)}
                     />
          ))}
      </Container>
    </>

  );
};

export default Home;