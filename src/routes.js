import React from "react";
import $ from "jquery";

window.jQuery = $;
window.$ = $;
global.jQuery = $;

// Dashboard
const Dashboard = React.lazy(() => import("./containers/Dashboard/Default"));

// Pages
const Home = React.lazy(() => import("./containers/Pages/Home/Home"));
const Profile = React.lazy(() => import("./containers/Profile/Profile"));

const routes = [
  {
    path: "/dashboard",
    exact: true,
    name: "Dashboard",
    component: Dashboard,
    isPrivate: true,
  },
  {
    path: "/page/home",
    exact: true,
    name: "Home",
    component: Home,
    isPrivate: true,
  },
  {
    path: "/profile",
    exact: true,
    name: "Profile",
    component: Profile,
    isPrivate: true,
  },
];

export default routes;
