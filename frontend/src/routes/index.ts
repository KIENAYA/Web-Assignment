import { lazy } from 'react';
const ECommerce=lazy(()=>import('../pages/Dashboard/ECommerce'))
const Chart = lazy(() => import('../pages/Chart'));
const AddEmployees = lazy(() => import('../pages/Append/AddEmployees'));
const AddOrder = lazy(() => import('../pages/Append/AddOrder'));
const Profile = lazy(() => import('../pages/Profile'));
const Settings = lazy(() => import('../pages/Settings'));
const Tables = lazy(() => import('../pages/Tables'));
const Alerts = lazy(() => import('../pages/UiElements/Alerts'));
const Buttons = lazy(() => import('../pages/UiElements/Buttons'));
const SignIn= lazy(()=>import('../pages/Authentication/SignIn'))

const coreRoutes = [
{
  path:'/authentication',
  title: 'Log In',
  component:SignIn
},
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
    component: Tables,
  },
  {
    path: '/employees',
    title: 'Employess',
    component: Tables,
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
