import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import './App.css';
import HomeScreen from './screens/HomeScreen';

function App() {
  const [renderComponent, setRenderComponent] = useState(false);

    if (renderComponent) 
      return <HomeScreen />
  
  return (
    <div className="container">
      <h1 className="mainHead">WELLCOME TO QUIZ APP</h1>
      <div style={{ width: '360px', margin: '0 auto' }}>
        <ul>
          <li>Total number of questions 5</li>
          <li>Questions relate any type of information in the world</li>
          <li>Category defined of every question</li>
          <li>You must give correct answer 3 </li>
          <li>Passing criteria 60% </li>
          <li>If you ready to dudge your Knowledge then click on Start Button</li>
        </ul>
      </div>
      <div style={{textAlign: 'center',paddingTop:'50px'}}>
        <Button onClick={()=>setRenderComponent(true)} variant="contained" color="secondary">
          START QUIZ
        </Button>
      </div>
      {/* <HomeScreen /> */}
    </div>
  );
}

export default App;
