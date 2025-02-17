import { Button, Grid, MenuItem, Select, SelectChangeEvent, TextField, Typography } from '@mui/material';
import { FormEvent, useState } from 'react';
import { IMealForm } from '../../types';

interface Props {
  isEdit?: boolean;
  onSubmitAction: (newMeal: IMealForm) => void;
}

const initialState = {
  mealTime: '',
  description: '',
  calories: '',
}

const FormMeal: React.FC<Props> = ({isEdit = false, onSubmitAction}) => {
  const [form, setForm] = useState<IMealForm>(initialState);
  const meals = [
    {title: 'Breakfast', id: 'breakfast'},
    {title: 'Snack', id: 'Snack'},
    {title: 'Lunch', id: 'lunch'},
    {title: 'Dinner', id: 'dinner'}
  ];

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmitAction({...form});
    console.log(form);
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>) => {
    const {name, value} = e.target;
    setForm({...form, [name]: value});
  }


  return (
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
            required
          />
        </Grid>

        <Grid xs={12}>
          <TextField
            sx={{width: '100%'}}
            label="Calories"
            name="calories"
            variant="outlined"
            onChange={onChange}
            value={form.calories}
            required
          />
        </Grid>

        <Grid xs={12}>
          <Button sx={{width: '100%'}} type="submit" variant="contained">
            {isEdit ? 'Edit' : 'Add'}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
export default FormMeal;