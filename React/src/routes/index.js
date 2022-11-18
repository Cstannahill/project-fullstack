import secRoutes from "./securedRoutes";
import publicRoutes from "./publicRoutes";

// flatten the list of all nested routes
const flattenRoutes = (routes) => {
  secRoutes.concat(publicRoutes);
  //   let flatRoutes = [];

  //   routes = routes || [];
  //   routes.forEach((item) => {
  //     flatRoutes.push(item);
  //     if (typeof item.children !== "undefined") {
  //       flatRoutes = [...flatRoutes, ...flattenRoutes(item.children)];
  //     }
  //   });
  //   return flatRoutes;
};

const routes = flattenRoutes(publicRoutes);
export { routes };
