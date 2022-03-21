import React, { useState } from 'react';



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

  return (
    <div className="content">
      <div className='row'>
        <div className='col-md-6 col-sm-10 mx-auto p-0'>
          <div className='card p-3'>
            <ul className='list-group list-group-flush'>
              {toDos.map(item => (
                <div>
                  <h1>{item.title}</h1>
                  <span>{item.description}</span>
                </div>
              ))}
            </ul>
          </div>
        </div>
      </div>


    </div>
  );
}

export default App;
