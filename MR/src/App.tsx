import React from 'react';
import Sidebar from './options/Sidebar'
import './styles/app.scss'

const App:React.FC = () => {
  
  return (
    <div id = "app" className = "App">
      <Sidebar/>
    </div>
  );
}

export default App;
