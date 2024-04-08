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

  useEffect(()=> {
    const loadData = async () => {
      setLoading(true);
      const res = await fetch(API + '/todos')
        .then((res) => res.json())
        .then((data) => data)
        .catch((error) => console.log(error))

      setLoading(false);

      setTodos(res);
    }

    loadData();
  },[])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const todo = {
      id:Math.random(),
      title,
      time,
      done:false
    }

    await fetch(API + '/todos', {
      method: 'POST',
      body: JSON.stringify(todo),
      headers: { 'Content-Type': 'application/json' },
    })

    setTodos((prevState)=> [...prevState,todo])

    setTitle("")
    setTime("")
  }

  if(loading) {
    return <p>Loading...</p>
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
        <h2>Lista De Tarefas</h2>
        {todos.length === 0 && <p>Não ha tarefas!</p>}
        {todos.map((todo)=> (
          <div className='todo' key={todo.id}>
            <p>{todo.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
