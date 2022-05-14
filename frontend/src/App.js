import React, { useState, useEffect } from 'react';
import MyModal from './components/myModal'
import './style/app.css'
import Pagination from 'react-bootstrap/Pagination'
import PageItem from 'react-bootstrap/PageItem'
import 'bootstrap/dist/css/bootstrap.min.css'



function App() {
  const [toDos, setToDo] = useState([])
  const [viewCompleted, setView] = useState(false)
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
  const [active, setActive] = useState(1)

 

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
      headers: {"Content-type": "application/json; charset=UTF-8"}
    })
  };
      
    

  var renderItems = () => {
    console.log(res)
    if (res != null) {
      
    const newItems = res.results
      // .filter(item => item.completed == viewCompleted);
    return newItems.map(item => (
      <li key={item.id}>
          <span
            title={item.description}>
              {item.title} - Completed: {String(item.completed)}   
              <button className='mark'
               onClick={() => completed(item) }>
                 {viewCompleted ? 'mark as incomplete' :
                  'mark as complete'}</button>
              <button className='delete'
               onClick={() =>  {
                deleteItem(item);
                console.log('delete fetch follows')
                res.results.splice(res.results.indexOf(item), 1)
                setRes(res)
                fetchPage(page);         
                }}>
                 Delete
              </button>

            </span>
        </li>
    )
    )
    }
    else return '';
  }

  useEffect(() => {
    fetchPage(1);
    setActive(1)
    }, [viewCompleted]);

 
  
  const fetchPage = function(number) {
    try {
      fetch('http://localhost:8000/api/todos/?page=' + number +
       '&completed=' + viewCompleted)
      .then( fetchedList => fetchedList.json() )
      .then( list => {
       
        setRes(list);
      
      })
    }  
    catch (eroare) {
      console.log(eroare)
      }
  }

  console.log('ran through main')

  const fetchPageClick = function(e) {
    const pageIndex = e.target.text;
    setPage(Number(pageIndex));
    fetchPage(pageIndex);
  }

  useEffect(() => {
    renderPagination()
    }, [active, res])
  
  const renderPagination = function() {
    let total = res != null ? res.count : 0;
    let pageCount = total / 5
    if (total % 5 > 0) pageCount++;

    
    let items = [];
    
    for (let number = 1; number <= pageCount; number++) {
      items.push(
        <Pagination.Item onClick={(e) => {
          if (number != active) {
          fetchPageClick(e);
          setActive(Number(e.target.text))}
          }}
          key={number}
          active={number === active}>
          {number}
        </Pagination.Item>,
      );
    }
    const paginationRow = (
      <div>
        <Pagination>{items}</Pagination>
        <br />

      </div>
    );
    return paginationRow;
  }

  let completion = ''
  if (viewCompleted) completion = 'completed'
  else completion = 'not completed'

  return (
   
    <div className='switchboard'>
      <div>
        <h1>Tasks that are {completion}: </h1>
      </div>
      <div>
        <ul >
          {renderItems()}
        </ul>
        {renderPagination()}
        <button className='button' onClick={() => {
          setShow(!show)
        }
        }>Add a task </button>
        <label className='switch'>
          <input type='checkbox'
          onClick={() => setView(!viewCompleted) }>
          </input>
          <span className='slider' />
        </label>
        <label id='toggle-text'>{ viewCompleted ?
          'switch to completed tasks' :
          'switch to tasks that are completed' }            
        </label>
      </div>

      <div className='modalBox'>
        <MyModal
        show={show}
        setShow={() => setShow(!show)}/>
          {console.log(show, 'is show')}
      </div>
            
          
  
    </div>
  );
}

export default App;
