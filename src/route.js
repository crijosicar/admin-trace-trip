import React from "react";

const Signin1 = React.lazy(() =>
  import("./Demo/Authentication/SignIn/SignIn1")
);

const route = [
  {
    path: "/auth/signin",
    exact: true,
    name: "Signin",
    component: Signin1,
    isPrivate: false,
  },
];

export default route;
