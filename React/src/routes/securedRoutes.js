import { lazy } from "react";
const ApplicationForm = lazy(() =>
  import("../components/applications/ApplicationForm")
);
const ViewApplications = lazy(() =>
  import("../components/applications/ViewApplications")
);
const AppointmentsView = lazy(() =>
  import("../components/appointments/AppointmentsView")
);
const AppointmentForm = lazy(() =>
  import("../components/appointments/AppointmentForm")
);
const Kanban = lazy(() => import("../components/kanban/Kanban"));

const securedRoutes = [
  {
    path: "/appform",
    name: "ApplicationForm",
    exact: true,
    element: ApplicationForm,
    roles: ["Admin"],
    isAnonymous: false,
  },
  {
    path: "/appview",
    name: "ViewApplications",
    exact: true,
    element: ViewApplications,
    roles: ["Admin"],
    isAnonymous: false,
  },
  {
    path: "/appointments",
    name: "AppointmentsView",
    exact: true,
    element: AppointmentsView,
    roles: ["Admin"],
    isAnonymous: false,
  },
  {
    path: "/appointmentform",
    name: "AppointmentForm",
    exact: true,
    element: AppointmentForm,
    roles: ["Admin"],
    isAnonymous: false,
  },
  {
    path: "/kanban",
    name: "Kanban",
    exact: true,
    element: Kanban,
    roles: ["Admin"],
    isAnonymous: true,
  },
];

const secRoutes = [...securedRoutes];
export default secRoutes;
