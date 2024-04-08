import './App.css';
import { useState,useEffect } from 'react'
import { BsTrash,BsBookmarkCheck,BsBookmarkCheckFill } from 'react-icons/bs'


const [addres,url] = window.location.href.split(":");
const API = `${addres}:${url}:5000`

function App() {
  const [title,setTitle] = useState("");
  const [time,setTime] = useState("");
  const [todos,setTodos] = useState([]);
  const [loading,setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const todo = {
      id:Math.random(),
      title,
      time,
      done:false
    }
    
    setTitle("")
    setTime("")
  }

  return (
    <div className="App">
      <div className='todo-header'>
        <h1>React Todo</h1>
      </div>
      <div className='form-todo'>
        <h2>Insira a sua tarefa</h2>
        <form onSubmit={handleSubmit}>
          <div className='form-control'>
            <label htmlFor='title'>O que vai fazer ?</label>
            <input type='text' name="title" placeholder='Titulo da Tarefa' onChange={(e)=>setTitle(e.target.value)} value={title || ""} required/>
          </div>
          <div className='form-control'>
            <label htmlFor='time'>Duração: </label>
            <input type='text' name="time" placeholder='Tempo estimado em  horas' onChange={(e)=>setTime(e.target.value)} value={time || ""} required/>
          </div>
          <input type='submit' value="Enviar"/>
        </form>
      </div>
      <div className='list-todo'>
        <p>Lista</p>
        {todos.length === 0 && <p>Não ha tarefas!</p>}
      </div>
    </div>
  );
}

export default App;
