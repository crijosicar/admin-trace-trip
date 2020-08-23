import React from "react";

const Signin = React.lazy(() =>
  import("./containers/Authentication/SignIn/SignIn")
);

const route = [
  {
    path: "/auth/signin",
    exact: true,
    name: "Signin",
    component: Signin,
    isPrivate: false,
  },
];

export default route;
