import { DefaultLayout, LoginLayout, LeftNavLayout } from "./layouts";
import MainHome from './components/exhiTemplate/Home'
import Login from './components/exhiTemplate/Login'
import Register from './components/exhiTemplate/Register'
import Event from './components/exhiTemplate/Event'
import EventWebGL from './components/exhiTemplate/EventWebGL'
import Dashboard from './components/dashboard/Dashboard'
import EventFeedback from "./components/exhiTemplate/EventFeedback";
import Feedback from "./components/exhiTemplate/Feedback";
import ResetPassword from "./components/exhiTemplate/ResetPassword";
import AdminDashboard from "./components/dashboard/AdminDashboard";
import EventChat from "./components/exhiTemplate/EventChat";
import EventConfiguration from "./components/dashboard/EventConfiguration"
export default [
  {
    path: "/",
    exact: true,
    layout: LoginLayout,
    component: MainHome
  },
  {
    path: "/login",
    layout: LoginLayout,
    component: MainHome
  },
  {
    path: "/inviteLogin",
    layout: LoginLayout,
    component: Login
  },
  {
    path: "/register",
    layout: LoginLayout,
    component: Register
  },
  {
    path: "/reset",
    layout: LoginLayout,
    component: ResetPassword
  },
  {
    path: "/event",
    layout: LoginLayout,
    component: Event
  },
  {
    path: "/eventGL",
    layout: LoginLayout,
    component: EventWebGL
  },
  {
    path: "/eventChat",
    layout: LoginLayout,
    component: EventChat
  },
  {
    path: "/feedback",
    layout: LoginLayout,
    component: EventFeedback
  },
  {
    path:'/dashboard',
    layout:LoginLayout,
    component:Dashboard
  },
  {
    path:'/admindashboard',
    layout:LoginLayout,
    component:AdminDashboard
  },
  {
    path:'/eventConfiguration',
    layoyt:LoginLayout,
    component:EventConfiguration
  }
];
