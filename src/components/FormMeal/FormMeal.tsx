import { Button, Grid, MenuItem, Select, SelectChangeEvent, TextField, Typography } from '@mui/material';
import { FormEvent, useCallback, useEffect, useState } from 'react';
import {  IMealForm } from '../../types';
import axiosApi from '../../axiosApi.ts';
import ButtonSpinner from '../UI/Loader/ButtonSpinner/ButtonSpinner.tsx';
import Loader from '../UI/Loader/Loader.tsx';

interface Props {
  isEdit?: boolean;
  onSubmitAction: (newMeal: IMealForm) => void;
  idMeal?: string;
  isLoading?: boolean;
}

const initialState = {
  mealTime: '',
  description: '',
  calories: '',
}

const FormMeal: React.FC<Props> = ({isEdit = false, onSubmitAction, idMeal, isLoading = false }) => {
  const [form, setForm] = useState<IMealForm>(initialState);
  const [loading, setLoading] = useState(false);
  const meals = [
    {title: 'Breakfast', id: 'breakfast'},
    {title: 'Snack', id: 'snack'},
    {title: 'Lunch', id: 'lunch'},
    {title: 'Dinner', id: 'dinner'}
  ];

  const fetchOneMeal = useCallback( async () => {
    if (idMeal) {
      try {
        setLoading(true);
        const response = await axiosApi<IMealForm | null>(`meals/${idMeal}.json`)
        console.log(response)
        if (response.data) {
          setForm(response.data);
        }
      } catch(e) {
        alert(e)
      } finally {
        setLoading(false);
      }
    }
  }, [idMeal])

  useEffect(() => {
    void fetchOneMeal()
  }, [fetchOneMeal])


  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmitAction({...form});
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>) => {
    const {name, value} = e.target;
    console.log(typeof value);
    setForm({...form, [name]: value});
  }

  console.log(idMeal);


  return (
    loading ? <Loader /> :
    <form onSubmit={onSubmit}>
      <Typography variant="h4" sx={{flexGrow: 1, textAlign: 'center'}}>
        {isEdit ? 'Edit Meal' : 'Add Meal'}
      </Typography>

      <Grid container spacing={2} sx={{mx: 'auto', width: '50%', mt: 4}}>
        <Grid xs={12}>
          <Select
            name="mealTime"
            value={form.mealTime}
            fullWidth
            displayEmpty
            onChange={onChange}
            disabled={isLoading}
            required
          >
            <MenuItem value="" disabled>
              Select meal time
            </MenuItem>
            {meals.map((meal) => (
              <MenuItem key={meal.id} value={meal.id}>
                {meal.title}
              </MenuItem>
            ))}
          </Select>
        </Grid>

        <Grid xs={12}>
          <TextField
            sx={{width: '100%', my: 3}}
            label="Description"
            name="description"
            variant="outlined"
            onChange={onChange}
            value={form.description}
            disabled={isLoading}
            required
          />
        </Grid>

        <Grid xs={12}>
          <TextField
            sx={{width: '100%'}}
            label="Calories"
            name="calories"
            variant="outlined"
            type="number"
            onChange={onChange}
            value={form.calories}
            disabled={isLoading}
            required
          />
        </Grid>

        <Grid xs={12}>
          <Button sx={{width: '100%', marginTop: 3}} type="submit" variant="contained" disabled={isLoading}>
            {isLoading ? <ButtonSpinner/> : (isEdit ? 'Edit' : 'Add')}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
export default FormMeal;