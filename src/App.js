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
          On 07/30/2020, a source close to the LWA faculty provided the information below on the school's current staffing. This situation changes rapidly, and efforts will be made to keep this table updated. Regardless, parents should directly confirm this information with teachers before making any binding decisions. In no way should this data be interpreted as advice or a recommendation. This is a meager attempt at leveling an otherwise asymmetric field of information. 
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
