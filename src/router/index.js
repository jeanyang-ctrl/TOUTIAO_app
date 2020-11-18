import {
  createRouter,
  // createWebHashHistory,
  createWebHistory,
} from "vue-router";

const Home = () =>
  import(/* webpackChunkName: "about" */ "@/views/Home/Home.vue");
const Profile = () =>
  import(/* webpackChunkName: "about" */ "../views/Profile/Profile.vue");
const Cart = () =>
  import(/* webpackChunkName: "about" */ "../views/Cart/Cart.vue");
const Categories = () =>
  import(/* webpackChunkName: "about" */ "../views/Categories/Categories.vue");
const LogReg = () =>
  import(/* webpackChunkName: "about" */ "@/views/Profile/logreg/LogReg.vue");
const LayOut = () => import("@/views/Layout/LayOut.vue");
const HomeSearch = () =>
  import(
    /* webpackChunkName: "about" */ "@/views/Home/childcpns/HomeSearch.vue"
  );
const routes = [
  // {
  //   path: "/",
  //   redirect: "/login",
  // },
  {
    path: "/login",
    name: "login",
    component: LogReg,
  },{
    path: "/search",
    name: "search ",
    component: HomeSearch,
  },
  // {
  //   path: "/login",
  //   name: "login",
  //   component: LogReg,
  // },
  {
    path: "/",
    name: "layout",
    component: LayOut,
    children: [
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
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
