// src/App.jsx
import React from 'react';
import StationList from './components/station/StationList';

import { RouterProvider } from 'react-router-dom';
import { router } from './router';


const App = () => {

 //  return (<>
  // <StationForm/>
  // <StationList/>
  //  <footer className="p-4 text-center text-sm text-gray-600 bg-white shadow-inner">
  //         Gas Station Dashboard © 2025
  //       </footer>
  // </>
       
  //);
  return <RouterProvider router={router}/>
};

export default App;