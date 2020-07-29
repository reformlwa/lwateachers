import React from 'react';
import './App.css';
import TeacherTable from './TeacherTable'

function App() {
  return (
    <div className="App">
      <div className="jumbo" style={{ background: `url(${process.env.PUBLIC_URL}/img/school.jpg)` }}>
        <div className="container">
          <div className="jumbo-text">
            <h1>LWA Teachers and Their Future</h1>
            <p>
              Deciding where your child goes to school is hard.
            <br />
            Not knowing who will teach them makes it harder.
          </p>
          </div>
        </div>
      </div>
      <div className="pt-4 pb-4 container">
        <h1>
          Data on LWA Faculty
        </h1>
        <p>
          On 07/30/2020, a source close to LWA faculty provided the information below on the staffing situation at the school. This situation is constantly shifting, and efforts will be made to keep this table updated. You should confirm any information below with your child's favorite teachers before making any final decisions on your child's enrollment. In no way should this data be interpreted as advice or a recommendation.
        </p>
        <p>
          These are uncertain times for many. If there's a teacher below that you or your child cares about, send them a message and let them know what an impact they've made.
        </p>
        <TeacherTable />
      </div>
    </div >
  );
}

export default App;
