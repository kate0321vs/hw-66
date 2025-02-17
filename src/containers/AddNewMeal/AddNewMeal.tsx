import FormMeal from '../../components/FormMeal/FormMeal.tsx';
import { IMealForm } from '../../types';
import axiosApi from '../../axiosApi.ts';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Spinner from '../../components/UI/Spinner/Spinner.tsx';
import { toast } from 'react-toastify';

const AddNewMeal = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onSubmitAction = async (newMeal: IMealForm) => {
    try {
      setLoading(true);
      await axiosApi.post('meals.json', newMeal);
      toast.success('Game was added Successfully!');
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