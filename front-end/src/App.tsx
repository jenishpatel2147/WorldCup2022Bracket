import React from 'react';
import './App.css';
import GroupStageForm from './components/Group-Stage/group-stage-form.component';
import EliminationForm from './components/Eliminations/elimination-form.component';

import { BrowserRouter } from "react-router-dom"; 

function App() {
  return (
    
  //   <BrowserRouter>
  //   <Routes>
  //     <Route path="/" element={<App />} />
  //     <Route path="expenses" element={<Expenses />} />
  //     <Route path="invoices" element={<Invoices />} />
  //   </Routes>
  // </BrowserRouter>
    <div className="App">
      <GroupStageForm />
      {/* <EliminationForm /> */}
      {/* <GroupStageForm /> */}
    </div>
  );
}

export default App;
