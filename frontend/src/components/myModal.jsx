import React, { useEffect, useState } from 'react';
import '../style/modal.css'

const MyModal = (props) => {
    
    const [title, setTitle] = useState('')
    const [descr, setDescr] = useState('')
    const [user, setUser] = useState('')
    const [submit, setSubmit] = useState(
        {
           title: '',
           description: '',
           asign_user: ''
        }
    )
    

    useEffect(() => {
        fetch('http://localhost:8000/api/todos/', {
            method: 'POST',
            headers: {"Content-type": "application/json"},
            body: JSON.stringify(submit)
        }
        )
            .then(async (resp) => await resp.json())
            .then(json =>  console.log(json, 'the json'))
            .catch(err =>  console.log(err))

    }, [submit]);


    
    
    return ( 
        <div className='modal' style={props.appear}>
            
            <form onSubmit={(e) => {
        
                setSubmit(
                    {
                        title: title,
                        description: descr,
                        asign_user: user
                    }
                    );
               
                }
                }
            >
                <label htmlFor='title'>Title: </label>
                <input type='text' name='title' value={title} onChange={(event) => setTitle(event.target.value)}></input><br />
                <label htmlFor='description'>Description: </label><br />
                <textarea name='description' value={descr} onChange={(event) => setDescr(event.target.value)}></textarea><br />
                <label htmlFor='user'>User: </label>
                <input type='text' name='user' placeholder='who' value={user} onChange={(event) => setUser(event.target.value)}></input>
                <button type='submit' >Submit</button>
            </form>
            

        </div>
     );
}
 
export default MyModal;