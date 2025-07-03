export const sidebarItems = [
  {
    to: { name: "Home" },
    name: "Home",
    icon: "material-symbols:home-rounded",
    match: (route: any) => route.name === "Home",
  },
  {
    to: "/favorites",
    name: "Favorites",
    icon: "material-symbols:favorite-rounded",
    match: (route: any) => route.path.startsWith("/favorites"),
  },
];
