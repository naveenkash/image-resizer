import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import firebase from "firebase";
import Argon from "./plugins/argon-kit";

import store from "./store";
import "./registerServiceWorker";
var firebaseConfig = {
  apiKey: process.env.VUE_APP_APIKEY,
  authDomain: process.env.VUE_APP_AUTHDOMAIN,
  databaseURL: process.env.VUE_APP_DATABASEURL,
  projectId: `${process.env.VUE_APP_PROJECTID}`,
  storageBucket: process.env.VUE_APP_STORAGEBUCKET,
  messagingSenderId: process.env.VUE_APP_MESSAGINGSENDERID,
  appId: process.env.VUE_APP_APPID
};
Vue.config.productionTip = false;

firebase.initializeApp(firebaseConfig);
Vue.use(Argon);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
