import { useParams } from 'react-router-dom';
import axiosApi from '../../axiosApi.ts';
import { IMealForm } from '../../types';
import FormMeal from '../../components/FormMeal/FormMeal.tsx';
import { useState } from 'react';
import { toast } from 'react-toastify';

const EditMeal = () => {
 const {idMeal} = useParams();
  const [loading, setLoading] = useState<boolean>(false);

 const fetchEditMeal = async (newMeal: IMealForm) => {
   try  {
     setLoading(true);
     await axiosApi.put(`meals/${idMeal}.json`, newMeal)
     toast.success('Meal was edit Successfully!');
   } catch(e) {
     alert(e)
   } finally {
     setLoading(false);
   }
 }

  return (
    <>
     <FormMeal onSubmitAction={fetchEditMeal} isEdit idMeal={idMeal} isLoading={loading} />
    </>
  );
};

export default EditMeal;