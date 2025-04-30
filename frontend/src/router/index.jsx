import { createBrowserRouter } from 'react-router-dom';
import Layout from '../layouts/Layout';
import StationList from '../components/station/StationList';
import EmployeeList from '../components/employee/EmployeeList';
import FuelTypesList from '../components/fuelType/FuelTypesList';
import TanksList from '../components/tank/TanksList';
import PumpList from '../components/pump/PumpList ';
import SuppliersList from '../components/supplier/SuppliersList';
import StockEntriesList from '../components/stockEntry/StockEntriesList';
import SalePriceList from '../components/salePriceHistory/SalePriceList';
import MeterReadingsList from '../components/meterReading/MeterReadingsList';
import SalesList from '../components/sale/SalesList';
import PlanningList from '../components/planning/PlanningList';
import PresenceList from '../components/presence/PresenceList';

import Dashboard from '../components/dashboard/Dashboard';
import LoginForm from '../components/auth/LoginForm';
export const router = createBrowserRouter([
    {
        element: <Layout/>,
        children:[
            {
                path: '/',
                element: <Dashboard/>
            },
            {
                path: '/stations',
                element: <StationList/>
            },
            {
                path: '/employees',
                element: <EmployeeList/>
            },
            {
                path: '/fuel-types',
                element: <FuelTypesList/>
            },
            {
                path: '/tanks',
                element: <TanksList/>
            },
            {
                path: '/pumps',
                element: <PumpList/>
            },
            {
                path: '/suppliers',
                element: <SuppliersList/>
            },
            {
                path: '/stock-entries',
                element: <StockEntriesList/>
            },
            {
                path: '/sale-price-history',
                element: <SalePriceList/>
            },
            {
                path: '/meter-readings',
                element: <MeterReadingsList/>
            },
            {
                path: '/sales',
                element: <SalesList/>
            },
            {
                path: '/plannings',
                element: <PlanningList/>
            },
            {
                path: '/presences',
                element: <PresenceList/>
            },
        ]
    },
    {
        path:'/login',
        element:<LoginForm/>
    }
]);