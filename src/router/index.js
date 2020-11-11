import {
  createRouter,
  createWebHashHistory
} from 'vue-router'

const Home = () => import( /* webpackChunkName: "about" */ '../views/Home.vue')
const Profile = () => import( /* webpackChunkName: "about" */ '../views/Profile.vue')
const Cart = () => import( /* webpackChunkName: "about" */ '../views/Cart.vue')
const Categories = () => import( /* webpackChunkName: "about" */ '../views/Categories.vue')


const routes = [{
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/categories',
    component: Categories
  },
  {
    path: '/profile',
    component: Profile
  },
  {
    path: '/cart',
    component: Cart
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router