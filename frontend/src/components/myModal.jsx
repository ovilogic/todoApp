import React, { useEffect, useState } from 'react';
import '../style/modal.css'

const MyModal = (props) => {
    
    const [title, setTitle] = useState('')
    const [descr, setDescr] = useState('')
    
    const [submit, setSubmit] = useState(
        {
           title: '',
           description: '',
        }
    )
    

    const saveToDo = function() {
        fetch('http://localhost:8000/api/todos/', {
            method: 'POST',
            headers: {"Content-type": "application/json; charset=UTF-8"},
            body: JSON.stringify(submit),
            
        }
        )
            .then(() => {
                setSubmit(
                    {
                        title: title,
                        description: descr,
        
                    }
                    );
                    
                setTitle('');
                setDescr('');
                console.log('new task added')
            });

        
        
    }

    
    return ( 
        <div className='modal' style={props.appear}>
            
            <form onSubmit={() => {
                // e.preventDefault();
                saveToDo()
                }
                
                }
            >
                <label htmlFor='title'>Title: </label>
                <input type='text' name='title' value={title} onChange={(event) => setTitle(event.target.value)}></input><br />
                <label htmlFor='description'>Description: </label><br />
                <textarea name='description' value={descr} onChange={(event) => setDescr(event.target.value)}></textarea><br />
                
                <button type='submit' >Submit</button>
            </form>
            

        </div>
     );
}
 
export default MyModal;