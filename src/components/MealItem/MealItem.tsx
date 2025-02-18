import { Button, Card, CardContent, Grid, Typography } from '@mui/material';
import editIcon from '../../assets/edit.svg';
import { NavLink } from 'react-router-dom';
import React from 'react';
import { IMeal } from '../../types';

interface Props {
  meal: IMeal;
  onDelete: (id: string) => void;
  loading: boolean;}

function SaveIcon() {
  return null;
}

const MealItem: React.FC<Props> = (({meal, onDelete, loading}) => {
  return (
    <Card
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        p: 2,
        mt: 2,
        border: '1px solid lightgray',
        borderRadius: '10px',
      }}
    >
      <CardContent sx={{flexGrow: 1}}>
        <Typography variant="subtitle1" color="textSecondary">
          {meal.mealTime}
        </Typography>
        <Typography variant="body1">{meal.description}</Typography>
      </CardContent>

      <Typography variant="body1" sx={{fontWeight: 'bold', mx: 30}}>
        {meal.calories} kcal
      </Typography>
      <Grid>
        <Button component={NavLink} to={`edit-meal/${meal.id}`}>
          <img style={{width: 20}} src={editIcon} alt="Edit"/>
        </Button>
        <Button
          size="small"
          color="error"
          onClick={() => onDelete(meal.id)}
          loading={loading}
          loadingPosition="start"
          startIcon={<SaveIcon />}
          variant="contained"
        >
          Delete
        </Button>
      </Grid>
    </Card>
  );
}
)
export default MealItem;