import { h, resolveComponent } from "vue";
import { createRouter, createWebHashHistory } from "vue-router";

import DefaultLayout from "@/layouts/DefaultLayout";

const routes = [
  {
    path: "/",
    name: "Home",
    component: DefaultLayout,
    redirect: "/dashboard",
    children: [
      {
        path: "/dashboard",
        name: "Dashboard",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(
            /* webpackChunkName: "dashboard" */ "@/views/dashboard/Dashboard.vue"
          ),
      },
      {
        path: "/theme",
        name: "Theme",
        redirect: "/theme/typography",
      },
      {
        path: "/theme/colors",
        name: "Colors",
        component: () => import("@/views/theme/Colors.vue"),
      },
      {
        path: "/theme/typography",
        name: "Typography",
        component: () => import("@/views/theme/Typography.vue"),
      },
      {
        path: "/users",
        name: "Users",

        component: () => import("@/views/users/Users.vue"),
      },
      {
        path: "/events",
        name: "Events",
        component: () => import("@/views/events/Events.vue"),
      },
      {
        path: "/matches",
        name: "Matches",
        component: () => import("@/views/matches/Matches.vue"),
      },
      {
        path: "/teams",
        name: "Teams",
        component: () => import("@/views/teams/Teams.vue"),
      },
      {
        path: "/media",
        name: "Media",
        component: () => import("@/views/media/Media.vue"),
      },
      {
        path: "/officers",
        name: "Officers",
        component: () => import("@/views/officers/Officers.vue"),
      },
      {
        path: "/sponsors",
        name: "Sponsors",
        component: () => import("@/views/sponsors/Sponsors.vue"),
      },
      {
        path: "/coordinators",
        name: "Coordinators",
        component: () => import("@/views/coordinators/Coordinators.vue"),
      },

      //BELOW NEED TO DELETE. AFTER. THIS IS FOR FRONT END INSPO
      //
      {
        path: "/charts",
        name: "Charts",
        component: () => import("@/views/charts/Charts.vue"),
      },
      {
        path: "/notifications",
        name: "Notifications",
        component: {
          render() {
            return h(resolveComponent("router-view"));
          },
        },
        redirect: "/notifications/alerts",
        children: [
          {
            path: "/notifications/alerts",
            name: "Alerts",
            component: () => import("@/views/notifications/Alerts.vue"),
          },
          {
            path: "/notifications/badges",
            name: "Badges",
            component: () => import("@/views/notifications/Badges.vue"),
          },
          {
            path: "/notifications/modals",
            name: "Modals",
            component: () => import("@/views/notifications/Modals.vue"),
          },
          {
            path: "/notifications/toasts",
            name: "Toasts",
            component: () => import("@/views/notifications/Toasts.vue"),
          },
        ],
      },
      {
        path: "/widgets",
        name: "Widgets",
        component: () => import("@/views/widgets/Widgets.vue"),
      },
    ],
  },
  {
    path: "/pages",
    redirect: "/pages/404",
    name: "Pages",
    component: {
      render() {
        return h(resolveComponent("router-view"));
      },
    },
    children: [
      {
        path: "404",
        name: "Page404",
        component: () => import("@/views/pages/Page404"),
      },
      {
        path: "500",
        name: "Page500",
        component: () => import("@/views/pages/Page500"),
      },
      {
        path: "login",
        name: "Login",
        component: () => import("@/views/pages/Login"),
      },
      {
        path: "register",
        name: "Register",
        component: () => import("@/views/pages/Register"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    // always scroll to top
    return { top: 0 };
  },
});

export default router;
