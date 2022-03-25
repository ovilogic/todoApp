import React from 'react';
import '../style/modal.css'

const MyModal = (props) => {
    return ( 
        <div className='modal' style={props.appear}>
            
            <form>
                <label htmlFor='title'>Title: </label>
                <input type='text' name='title'></input><br />
                <label htmlFor='description'>Description: </label><br />
                <textarea name='description'></textarea><br />
                <label htmlFor='user'>User: </label>
                <input type='text' name='user' placeholder='user'></input>
            </form>
            

        </div>
     );
}
 
export default MyModal;