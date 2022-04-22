import React, { useState, useEffect } from 'react';
import MyModal from './components/myModal'
import './style/app.css'
import Pagination from 'react-bootstrap/Pagination'
import PageItem from 'react-bootstrap/PageItem'
import 'bootstrap/dist/css/bootstrap.min.css'





function App() {
  const [toDos, setToDo] = useState([])
  const [viewCompleted, setView] = useState(false)
  const [toDoList, setList] = useState([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1)
  const [activeItem, setItem] = useState(
    {
      title: '',
      description: '',
      completed: false
    },
  )
  const [show, setShow] = useState(false)
  const [res, setRes] = useState(null)

  
  let display = {}
  if (show) {
    display = {display: 'block'}
  }
 

   useEffect(() => {
  let timer1 = setTimeout( () => fetchPage(), 20000);
  
  return () => {
    clearTimeout(timer1)
  }
  
  
  }, []);


 const link = 'http://localhost:8000/api/todos/'



const completed = function(item) {
  
  item.completed = !item.completed;
  fetch(link, {
    method: 'POST',
    headers: {"Content-type": "application/json; charset=UTF-8"},
    body: JSON.stringify(item),})
    .then(() => {
      console.log('task marked as completed')
  });
}


const deleteItem = function(item) {
  
  fetch(link + item.id, {
    method: 'DELETE',
    headers: {"Content-type": "application/json; charset=UTF-8"},
    // body: JSON.stringify(item),
  })
    .then(() => {
      console.log('task marked as DELETED')
  });
    
}


  
  var renderItems = () => {

    if (res != null) {
    const newItems = res.results.filter(item => item.completed == viewCompleted);
    return newItems.map(item => (
      <li 
        key={item.id}
        >
          <span
            title={item.description}>
              {item.title}
              
              <button className='mark' onClick={(event) =>  completed(item) }>{viewCompleted ? 'mark as incomplete' : 'mark as complete'}</button>
              <button className='delete' onClick={(event) =>  deleteItem(item) }>Delete</button>
 
            </span>
        </li>
    )
    )
    }
    else return '';
  }

  const fetchPage = function(number) {
    //  setPage(number);
    try {
      fetch('http://localhost:8000/api/todos/?page=' + number)
      .then( fetchedList => fetchedList.json() )
      .then( list => {
        
        console.log(list)
        setRes(list);
        // setList(list.results);
        // setCount(list.count);
      })
        
    }
    
    catch (eroare) {
      console.log(eroare)
    }
  }

  

  const renderPagination = function() {
    let total = res != null ? res.count : 0;

    let active = 1;
    let items = [];
    
    for (let number = 1; number <= total / 5; number++) {
      console.log('number', number)
      items.push(
        <Pagination.Item onClick={ fetchPage(number) } key={number} active={number === active}>
          {number}
        </Pagination.Item>,
      );
    }

    const paginationBasic = (
      <div>
        <Pagination>{items}</Pagination>
        <br />

      </div>
    );
    
    return paginationBasic;
  }

  console.log('page number', page)

  return (
   
    <div className='switchboard'>
      <h1>Tasks that remain to be done: </h1>
            <ul >
              {renderItems()}
            </ul>
            {renderPagination()}
            <button className='button' onClick={() => {
              setShow(!show)
             
            }
            }>Add a task </button>
            
            <input type='checkbox' onClick={(event) => setView(!viewCompleted) }></input>
            <label>{ viewCompleted ? 'show not completed tasks' : 'show tasks that are completed' }            
            </label>
            <MyModal appear={display}/>
          
   

    </div>
  );
}

export default App;
