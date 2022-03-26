import React, { useState, useEffect } from 'react';
import MyModal from './components/myModal'
import './style/app.css'



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
  const [show, setShow] = useState(false)

  
  let display = {}
  if (show) {
    display = {display: 'block'}
  }
 

  useEffect(() => {
    setTimeout(
    async () => {
    try {
      const res = await fetch('http://localhost:8000/api/todos/');
      const fetchedList = await res.json();
      setList(fetchedList)
    }
    
    catch (eroare) {
      console.log(eroare)
    }
  }, 10000);
  });

 
  
  var renderItems = () => {
    const newItems = toDoList.filter(item => item.completed == viewCompleted);
    return newItems.map(item => (
      <li 
        key={item.id}
        >
          <span
            title={item.description}>
              {item.title}
            </span>
        </li>
    ))
  }

  return (
   
    <div className='switchboard'>
            <ul >
              {renderItems()}
            </ul>
            <button onClick={() => {
              setShow(!show)
             
            }
            }>Add a task </button>
            <MyModal appear={display}/>
          
   

    </div>
  );
}

export default App;
