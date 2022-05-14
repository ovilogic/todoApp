import React, { useEffect, useState } from 'react';
import '../style/modal.css'

const MyModal = ({ show, setShow }) => {
    
    const [title, setTitle] = useState('')
    const [descr, setDescr] = useState('')
    const [box, setBox] = useState({})
  
    
    
    const saveToDo = function() {
        fetch('http://localhost:8000/api/todos/', {
            method: 'POST',
            headers: {"Content-type": "application/json; charset=UTF-8"},
            body: JSON.stringify({
                title: title,
                description: descr
            }),
        }
        )
            .then(() => {
                setTitle('');
                setDescr('');
                console.log('new task added with title, description and submit object', title, descr )
                
            });

    }

   
  useEffect(() => {
    if (show) {
      setBox({display: 'block',
        height: '300px',
        width: '400px'}
      )
    }
    }, [show])
  

    
    
    return ( 
        <div className='modal' style={box}>
            
            <form onSubmit={(e) => {
                e.preventDefault();
                setBox({});
                setShow();
                saveToDo();               
                }
                }
            >
                <label htmlFor='title'>Title: </label>
                <input type='text' name='title' value={title}
                 onChange={(event) => setTitle(event.target.value)}>
                     </input><br />
                <label htmlFor='description'>
                    Description: </label><br />
                <textarea name='description' value={descr}
                 onChange={(event) => setDescr(event.target.value)}>
                     </textarea><br />
                
                <button type='submit' >Submit</button>
            </form>

        </div>
     );
}
 
export default MyModal;