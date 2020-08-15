import React from "react";
import $ from "jquery";

window.jQuery = $;
window.$ = $;
global.jQuery = $;

// Dashboard
const Dashboard = React.lazy(() => import("./Demo/Dashboard/Default"));

// Pages
const Home = React.lazy(() => import("./Demo/Pages/Home/Home"));

const routes = [
  {
    path: "/dashboard",
    exact: true,
    name: "Default",
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
];

export default routes;
