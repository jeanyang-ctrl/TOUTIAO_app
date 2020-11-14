import {
  createRouter,
  // createWebHashHistory,
  createWebHistory,
} from "vue-router";

const Home = () =>
  import(/* webpackChunkName: "about" */ "@/views/home/Home.vue");
const Profile = () =>
  import(/* webpackChunkName: "about" */ "../views/Profile/Profile.vue");
const Cart = () =>
  import(/* webpackChunkName: "about" */ "../views/Cart/Cart.vue");
const Categories = () =>
  import(/* webpackChunkName: "about" */ "../views/Categories/Categories.vue");
// const LayOut = () => import( /* webpackChunkName: "about" */ '../views/Layout/LayOut.vue')
  const LogReg = () =>
  import(/* webpackChunkName: "about" */ "@/views/Profile/Logreg/LogReg.vue");



const routes = [
  {
    path: "/",
    redirect: "/profile",
  },
  {
    path: "/login",
    name: "login",
    component: LogReg,
  },

  {
    path: "/home",
    component: Home,
  },
  {
    path: "/categories",
    component: Categories,
  },
  {
    path: "/profile",
    component: Profile,
  },
   {
    path: "/cart",
    component: Cart,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
