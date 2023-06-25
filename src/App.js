import React,{useState} from 'react';
import AddUser from './AddUser';
import './App.css';
import Table from './Table';
import EditForm from './EditUser';
function App() {
  
  const [open, setOpen] = useState(false);
  const [createUserSwitch, setSwitch] = useState(false);
  const [id,setId]= useState('');


  const handleClose = () => {
    setSwitch(false);
  };

  const handleEdit = (id) => {
      setId(id);
      console.log(id)
      setOpen(true);
  }
  return (
    <div className='container'>
      <Table setSwitch={setSwitch} createUserSwitch={createUserSwitch} handleEdit={handleEdit}/>
      <AddUser handleClose={handleClose} open={createUserSwitch} />
     {id !=='' ? <EditForm open={open} setOpen={setOpen} id={id}/> : ''}
    </div>
  );
}

export default App;
