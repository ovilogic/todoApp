import React, { useState } from 'react';
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


        

    
    
    return ( 
        <div className='modal' style={props.appear}>
            
            <form onSubmit={(e) => 
        
                setSubmit(
                    {
                        title: title,
                        description: descr,
                        asign_user: user
                    }
                    )
                }>
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