import FormMeal from '../../components/FormMeal/FormMeal.tsx';
import { IMealForm } from '../../types';
import axiosApi from '../../axiosApi.ts';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Spinner from '../../components/UI/Spinner/Spinner.tsx';

const AddNewMeal = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onSubmitAction = (newMeal: IMealForm) => {
    try {
      setLoading(true);
      axiosApi.post('meals.json', newMeal);
      navigate('/');
    } catch (e) {
      alert(e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {loading ? <Spinner /> :
        <FormMeal onSubmitAction={onSubmitAction}/>
      }
    </>
  );
};

export default AddNewMeal;