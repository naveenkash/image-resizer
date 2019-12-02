import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import firebase from "firebase";
import Argon from "./plugins/argon-kit";

import  store  from './store'
import "./registerServiceWorker";
var firebaseConfig = {
    apiKey: process.env.VUE_APP_apiKey,
    authDomain: process.env.VUE_APP_authDomain,
    databaseURL: process.env.VUE_APP_databaseURL,
    projectId: process.env.VUE_APP_projectId,
    storageBucket: process.env.VUE_APP_storageBucket,
    messagingSenderId: process.env.VUE_APP_messagingSenderId,
    appId: process.env.VUE_APP_appId
};
Vue.config.productionTip = false;

firebase.initializeApp(firebaseConfig);
Vue.use(Argon);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
