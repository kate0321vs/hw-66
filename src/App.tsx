import { Route, Routes } from 'react-router-dom';
import Home from './containers/Home/Home.tsx';
import EditMeal from './containers/EditMeal/EditMeal.tsx';
import AddNewMeal from './containers/AddNewMeal/AddNewMeal.tsx';
import ToolBar from './components/ToolBar/ToolBar.tsx';

const App = () => {
  return (
    <>
      <header>
        <ToolBar/>
      </header>
      <main>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/meals' element={<Home/>}/>
          <Route path='edit-meal/:idMeal' element={<EditMeal/>}/>
          <Route path="/new-meal" element={<AddNewMeal/>}/>
          <Route path="*" element={(<h1>Not page found</h1>)}/>
        </Routes>
      </main>
    </>
  );
};

export default App;