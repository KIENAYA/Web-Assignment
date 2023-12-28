import { lazy } from 'react';
const Employees=lazy(()=>import('../pages/Employees'))
const Orders=lazy(()=>import('../pages/Orders'))
const ECommerce = lazy(() => import('../pages/Dashboard/ECommerce'));
const Chart = lazy(() => import('../pages/Chart'));
const AddEmployees = lazy(() => import('../pages/Append/AddEmployees'));
const AddOrder = lazy(() => import('../pages/Append/AddOrder'));
const Profile = lazy(() => import('../pages/Profile'));
const Settings = lazy(() => import('../pages/Settings'));
const Orders = lazy(() => import('../pages/Orders'))
const Alerts = lazy(() => import('../pages/UiElements/Alerts'));
const Buttons = lazy(() => import('../pages/UiElements/Buttons'));
const SignIn = lazy(() => import('../pages/Authentication/SignIn'));

const coreRoutes = [
  {
    path: '/',
    title: 'Dashboard',
    component: ECommerce,
  },
  {
    path: '/profile',
    title: 'Profile',
    component: Profile,
  },
  {
    path: '/add/order',
    title: 'Add Order',
    component: AddOrder,
  },
  {
    path: '/add/employee',
    title: 'Add Employee',
    component: AddEmployees,
  },
  {
    path: '/orders',
    title: 'Orders',
    component: Orders,
  },
  {
    path: '/employees',
    title: 'Employess',
    component: Employees,
  },
  {
    path: '/settings',
    title: 'Settings',
    component: Settings,
  },
  {
    path: '/chart',
    title: 'Chart',
    component: Chart,
  },
  {
    path: '/ui/alerts',
    title: 'Alerts',
    component: Alerts,
  },
  {
    path: '/ui/buttons',
    title: 'Buttons',
    component: Buttons,
  },
];

const routes = [...coreRoutes];
export default routes;
