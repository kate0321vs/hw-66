import FormMeal from '../../components/FormMeal/FormMeal.tsx';
import { IMeal, IMealForm } from '../../types';
import axiosApi from '../../axiosApi.ts';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'react-toastify';
import Loader from '../../components/UI/Loader/Loader.tsx';

const AddNewMeal = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onSubmitAction = async (newMeal: IMealForm) => {
    try {
      setLoading(true);
      await axiosApi.post<IMeal>('meals.json', newMeal);
      toast.success('Meal was added Successfully!');
      navigate('/');
    } catch (e) {
      alert(e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {loading ? <Loader/> :
        <FormMeal onSubmitAction={onSubmitAction}/>
      }
    </>
  );
};

export default AddNewMeal;