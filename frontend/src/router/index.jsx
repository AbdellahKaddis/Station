import { createBrowserRouter } from 'react-router-dom';
import Layout from '../layouts/Layout';
import StationList from '../components/station/StationList';
export const router = createBrowserRouter([
    {
        element: <Layout/>,
        children:[
            {
                path: '/stations',
                element: <StationList/>
            },
       
        ]
    },
]);