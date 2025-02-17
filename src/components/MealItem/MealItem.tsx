import { Button, Card, CardContent, Grid, Typography } from '@mui/material';
import editIcon from '../../assets/edit.svg';
import deleteIcon from '../../assets/delete.svg';

interface Props {
  mealTime: string;
  description: string;
  calories: number;
  onDelete: () => void;
  isLoading?: boolean;
}

const MealItem: React.FC<Props> = ({mealTime, description, calories, onDelete}) => {
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
          {mealTime}
        </Typography>
        <Typography variant="body1">{description}</Typography>
      </CardContent>

      <Typography variant="body1" sx={{fontWeight: 'bold', mx: 30}}>
        {calories} kcal
      </Typography>
      <Grid>
        <Button>
          <img style={{width: 20}} src={editIcon} alt="Edit"/>
        </Button>
        <Button onClick={onDelete}>
          <img style={{width: 20}} src={deleteIcon} alt="Delete"/>
        </Button>
      </Grid>
    </Card>
  );
};

export default MealItem;