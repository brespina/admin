import { h, resolveComponent } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/auth";

import DefaultLayout from "@/layouts/DefaultLayout";

const routes = [
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/pages/Login"),
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("@/views/pages/Register"),
  },
  {
    path: "/404",
    name: "404",
    component: () => import("@/views/pages/Page404"),
  },
  {
    path: "/500",
    name: "500",
    component: () => import("@/views/pages/Page500"),
  },
  {
    path: "/",
    name: "Home",
    component: DefaultLayout,
    redirect: "/dashboard",
    meta: { requiresAuth: true },
    children: [
      {
        path: "/dashboard",
        name: "Dashboard",
        component: () => import("@/views/dashboard/Dashboard.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/users",
        name: "Users",
        component: () => import("@/views/users/Users.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/events",
        name: "Events",
        component: () => import("@/views/events/Events.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/matches",
        name: "Matches",
        component: () => import("@/views/matches/Matches.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/teams",
        name: "Teams",
        component: () => import("@/views/teams/Teams.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/media",
        name: "Media",
        component: () => import("@/views/media/Media.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/officers",
        name: "Officers",
        component: () => import("@/views/officers/Officers.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/sponsors",
        name: "Sponsors",
        component: () => import("@/views/sponsors/Sponsors.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/coordinators",
        name: "Coordinators",
        component: () => import("@/views/coordinators/Coordinators.vue"),
        meta: { requiresAuth: true },
      },

      //BELOW NEED TO DELETE. AFTER. THIS IS FOR FRONT END INSPO
      //
      {
        path: "/charts",
        name: "Charts",
        component: () => import("@/views/coreui_defaults/charts/Charts.vue"),
      },
    ],
  },
  // {
  //   path: "/pages",
  //   redirect: "/pages/404",
  //   name: "Pages",
  //   component: {
  //     render() {
  //       return h(resolveComponent("router-view"));
  //     },
  //   },
  //   children: [
  //     {
  //       path: "404",
  //       name: "Page404",
  //       component: () => import("@/views/pages/Page404"),
  //     },
  //     {
  //       path: "500",
  //       name: "Page500",
  //       component: () => import("@/views/pages/Page500"),
  //     },
  //     {
  //       path: "register",
  //       name: "Register",
  //       component: () => import("@/views/pages/Register"),
  //     },
  //   ],
  // },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("@/views/pages/Page404"),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    // always scroll to top
    return { top: 0 };
  },
});

// Navigation guard
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  
  if (to.meta.requiresAuth && !authStore.isAuthenticated()) {
    next('/login');
  } else if (to.path === '/login' && authStore.isAuthenticated()) {
    next('/dashboard');
  } else {
    next();
  }
});

export default router;
