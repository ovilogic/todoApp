import React, { useState, useEffect } from 'react';
import Modal from './components/modal'



const toDoItems = [
  {
    id: 1,
    title: 'nature walk',
    description: 'visit the park',
    completed: true
  },
  {
    id: 2,
    title: 'water begonias',
    description: 'use one big jug of water',
    completed: true
  },
  {
    id: 3,
    title: 'circadian',
    description: 'learn more about the importance of daylight',
    completed: true
  }
]

function App() {
  const [toDos, setToDo] = useState(toDoItems)
  const [viewCompleted, setView] = useState(false)
  const [toDoList, setList] = useState([]);
  const [activeItem, setItem] = useState(
    {
      title: '',
      description: '',
      completed: false
    },
  )
  

  useEffect(async () => {
    try {
      const res = await fetch('http://localhost:8000/api/todos/');
      const fetchedList = await res.json();
      setList(fetchedList)
    }
    
    catch (eroare) {
      console.log(eroare)
    }
  });

  const [modal, setModal] = useState(false)
/*
  let toggle = () => {
    setModal(!modal)
  }

  let handleSubmit = item => {
    toggle();
   

  }
  */

  var renderItems = () => {
    const newItems = toDoList.filter(item => item.completed == viewCompleted);
    return newItems.map(item => (
      <li 
        key={item.id}
        className='list-group-item d-flex justify-content-between align-items-center'>
          <span
            className={"todo-title mr-2 ${ viewCompleted ? 'completed-todo' : ''}"
            }
            title={item.description}>
              {item.title}
            </span>
        </li>
    ))
  }

  return (
    <div className="content">
      <div className='row'>
        <div className='col-md-6 col-sm-10 mx-auto p-0'>
          <div className='card p-3'>
            <ul className='list-group list-group-flush'>
              {renderItems()}
            </ul>
            <Modal activeItem={activeItem} />
          </div>
        </div>
      </div>


    </div>
  );
}

export default App;
