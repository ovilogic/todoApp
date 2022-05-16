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
  const [ load, setLoad ] = useState(false)


  const link = 'http://localhost:8000/api/todos/'


 
  /* Delete item in database */
  const deleteItem = function(item) {
    fetch(link + item.id, {
      method: 'DELETE',
      headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then( () => {
      res.results.splice(res.results.indexOf(item), 1)
      setRes(res);
    })
  };
      
  // The main chunk of the page. The list of tasks with buttons next:
  var renderItems = () => {
    
    if (res != null) {
      
    const newItems = res.results
      // .filter(item => item.completed == viewCompleted);
      // This is where we get the item from.
    return newItems.map(item => (
      <li key={item.id}>
          <span
            title={item.description}>
              {item.title} - Completed: {String(item.completed)}   
              <button className='mark'
               onClick={() => {
                 completed(item);
                 setLoad(!load)
                  }
                }>
                 {viewCompleted ? 'mark as incomplete' :
                  'mark as complete'}</button>
              <button className='delete'
                onClick={() =>  {
                  deleteItem(item);
                  setLoad(!load)
                  }
                }>
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

  useEffect(() => {
    fetchPage(active);
    renderPagination();
    renderItems();
    console.log('this is the Request object used: ', res)
    console.log('useEffect cycle for load')
  }, [load]);

 
  // Where we get the 'res' from. Basically, the response body: the data your 
  // your API sends to the client.
  const fetchPage = function(number) {
    try {
      fetch('http://localhost:8000/api/todos/?page=' + number +
       '&completed=' + viewCompleted)
      .then( fetchedList => fetchedList.json() )
      .then( list => {
        setRes(list);
        console.log('this is the list, aka the res object retrieved: ', list)
      })
    }  
    catch (eroare) {
      console.log(eroare)
      }
  }

  console.log('App rendered once')

  const fetchPageClick = function(e) {
    const pageIndex = e.target.text;
    setPage(Number(pageIndex));
    fetchPage(pageIndex);
  }

  useEffect(() => {
    renderPagination()
    }, [active, res])


  /* This is where you get the 'active' page state from */
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

  /* Modify item in database */
  const completed = function(item) {
    item.completed = !item.completed;
  
    fetch(link + item.id + '/', {
      method: 'PUT',
      headers: {"Content-type": "application/json; charset=UTF-8"},
      body: JSON.stringify(item)})
      .then( modifiedItem => modifiedItem.json() )
      .then( () => {
       
        res.results.splice(res.results.indexOf(item), 1)
        setRes(res);
      });
  }




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
          
      </div>
            
          
  
    </div>
  );
}

export default App;
