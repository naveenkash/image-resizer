import Vue from "vue";
import Router from "vue-router";
import AppHeader from "./layout/AppHeader";
import AppImage from "./layout/AppImageUpload";
import AppImageSetting from "./layout/AppImageSetting";

Vue.use(Router);

export default new Router({
  mode:"history",
  routes: [
    
    {
      path: "/",
      name: "components",
      components: {
        header: AppHeader,
        default: AppImage,
      }
    },
    {
      path:'/',
      redirect:'/'
  },
  {
      path:'*',
      redirect:'/'
  },
  {
    path: "/settings",
    name: "settings",
    components: {
      header: AppHeader,
      default: AppImageSetting,
    }
  },
    
  ],
});
