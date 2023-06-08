import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import { Auth } from "../resources/AuthService";

Vue.use(VueRouter);

const DEFAULT_TITLE = "postapi | patienceman";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: { title: "Home" },
    // beforeEnter: async (to, from, next) => await Auth().guard(to, from, next),
  },
  {
    path: "/login",
    name: "login",
    meta: { title: "Login" },
    component: () => import("../views/LoginView.vue"),
    // beforeEnter: async (to, from, next) => await Auth().guard(to, from, next),
  },
  {
    path: "/published",
    name: "published",
    meta: { title: "Published Collections" },
    component: () => import("../views/PublishedView.vue"),
    beforeEnter: async (to, from, next) => await Auth().guard(to, from, next),
  },
  {
    path: "/collection/:collection",
    name: "collection",
    meta: { title: "Collection" },
    component: () => import("../views/CollectionView.vue"),
  },
  {
    path: "/dashboard",
    name: "dashboard",
    meta: { title: "Dashboard" },
    component: () => import("../views/DashboardView.vue"),
    beforeEnter: async (to, from, next) => await Auth().guard(to, from, next),
  },
  {
    path: "*",
    meta: { title: "Not found" },
    component: () => import("../views/NotFound.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: import.meta.env.BASE_URL,
  routes: routes,
});

router.afterEach((to) => {
  Vue.nextTick(() => {
    document.title = `${to.meta.title} | ${DEFAULT_TITLE}`;
  });
});

export default router;
