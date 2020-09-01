export default {
  items: [
    {
      id: "navigation",
      title: "Navigation",
      type: "group",
      icon: "icon-navigation",
      children: [
        {
          id: "dashboard",
          title: "Dashboard",
          type: "item",
          url: "/dashboard",
          icon: "feather icon-home",
        },
      ],
    },
    {
      id: "Pages",
      title: "Pages",
      type: "group",
      icon: "icon-ui",
      children: [
        {
          id: "pages",
          title: "Pages",
          type: "collapse",
          icon: "feather icon-box",
          children: [
            {
              id: "home",
              title: "Home",
              type: "item",
              url: "/page/home",
            },
          ],
        },
      ],
    },
  ],
};
