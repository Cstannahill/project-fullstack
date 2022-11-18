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
const Collection = lazy(() => import("../components/music/Collection"));
const Chat = lazy(() => import("../components/chat/Chat"));
const MusicHome = lazy(() => import("../components/music/home/MusicHome"));
const Player = lazy(() => import("../components/music/player/Player"));
const Login = lazy(() => import("../components/music/login/Login"));
const Playlists = lazy(() => import("../components/music/playlists/Playlists"));
const Error404 = lazy(() => import("../components/error/Error404"));

export const schedRoutes = {
  label: "Scheduling",
  children: [
    {
      name: "Scheduling",
      active: true,
      icon: "calendar-alt",
      children: [
        {
          path: "/appform",
          name: "Add Application",
          exact: true,
          active: true,
          element: ApplicationForm,
          roles: ["Admin"],
          isAnonymous: false,
        },
        {
          path: "/appview",
          name: "Applications",
          exact: true,
          active: true,
          element: ViewApplications,
          roles: ["Admin"],
          isAnonymous: false,
        },
        {
          path: "/appointments",
          name: "Appointments",
          exact: true,
          active: true,
          element: AppointmentsView,
          roles: ["Admin"],
          isAnonymous: false,
        },
        {
          path: "/appointmentform",
          name: "Add Appointment",
          exact: true,
          active: true,
          element: AppointmentForm,
          roles: ["Admin"],
          isAnonymous: false,
        },
      ],
    },
  ],
};
export const taskRoutes = {
  label: "Tasks",
  children: [
    {
      name: "Tasks",
      active: true,
      icon: "tasks",
      children: [
        {
          path: "/kanban",
          name: "Kanban",
          exact: true,
          active: true,
          element: Kanban,
          roles: ["Admin"],
          isAnonymous: true,
        },
      ],
    },
  ],
};
export const musicRoutes = {
  label: "Music",
  children: [
    {
      name: "Music",
      active: true,
      icon: "music-note",
      children: [
        {
          path: "/music",
          name: "Collection",
          exact: true,
          element: Collection,
          roles: [],
          isAnonymous: false,
        },
        {
          path: "/music/login",
          name: "Login",
          exact: true,
          element: Login,
          roles: [],
          isAnonymous: false,
        },
        {
          path: "/music/home",
          name: "Home",
          exact: true,
          element: MusicHome,
          roles: [],
          isAnonymous: false,
        },
        {
          path: "/music/playlists",
          name: "Playlists",
          exact: true,
          element: Playlists,
          roles: [],
          isAnonymous: false,
        },
        {
          path: "/music/player",
          name: "Player",
          exact: true,
          element: Player,
          roles: [],
          isAnonymous: false,
        },
      ],
    },
  ],
};
export const socialRoutes = {
  label: "Social",
  children: [
    {
      name: "Social",
      active: true,
      icon: "comments",
      children: [
        {
          path: "/chat",
          name: "Chat",
          exact: true,
          active: true,
          element: Chat,
          roles: [],
          isAnonymous: false,
          badge: {
            type: "success",
            text: "New",
          },
        },
      ],
    },
  ],
};
// export const error = {
//   label: "Error",
//   labelDisable: true,
//   children: [
//     {
//       path: "*",
//       name: "Error - 404",
//       element: Error404,
//       roles: [],
//       exact: true,
//       isAnonymous: false,
//       isSimple: false,
//     },
//   ],
// };

const secRoutes = [schedRoutes, taskRoutes, socialRoutes, musicRoutes];
export default secRoutes;
