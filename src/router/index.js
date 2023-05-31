/* eslint-disable prettier/prettier */
import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import { AppwriteService } from "../Services/AppwriteService";

Vue.use(VueRouter);

const routes = [
  { path: "/", name: "home", component: HomeView },
  { path: "/login", name: "login", component: () => import("../views/LoginView.vue") },
  { path: "/published", name: "published", component: () => import("../views/PublishedView.vue") },
  { path: "/collection", name: "collection", component: () => import("../views/CollectionView.vue") },
  { path: "/dashboard", name: "dashboard", component: () => import("../views/DashboardView.vue"), 
    beforeEnter: async (to, from, next) => {
      if(to.name !== 'login' && !await isAuthenticated()) next({ name: 'login' });
      else next();
    }},
];

const router = new VueRouter({
  mode: "history",
  base: import.meta.env.BASE_URL,
  routes: routes,
});

/**
 * Check if there is auth session
 * otherwise redirect back to login
 * 
 * @returns bool
 */
// eslint-disable-next-line no-unused-vars
const isAuthenticated = async () => {
  const account = AppwriteService().account();
  return account.get().then(() => true).catch(() => false);
}

export default router;
