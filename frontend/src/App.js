// src/App.jsx
import React from 'react';

import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import UserContext from './context/UserContext';


const App = () => {

 //  return (<>
  // <StationForm/>
  // <StationList/>
  //  <footer className="p-4 text-center text-sm text-gray-600 bg-white shadow-inner">
  //         Gas Station Dashboard © 2025
  //       </footer>
  // </>
       
  //);
  return <UserContext>
    <RouterProvider router={router}/>
  
  </UserContext>
}
export default App;