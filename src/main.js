import { createApp } from "vue";
import {
  Button,
  Image as VanImage,
  Dialog,
  Grid,
  GridItem,
  Cell,
  CellGroup,
  NavBar,
  Form,
  Field,
  Icon,
  Toast,
  CountDown,
} from "vant";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "amfe-flexible";
import "vant/lib/index.css"; // 全局引入样式
// import './index.css'

createApp(App)
  .use(Button)
  .use(NavBar)
  .use(Form)
  .use(Dialog)
  .use(Toast)
  .use(Cell)
  .use(CellGroup)
  .use(VanImage)
  .use(Grid)
  .use(GridItem)
  .use(CountDown)
  .use(Icon)
  .use(Field)
  .use(store)
  .use(router)
  .mount("#app");
