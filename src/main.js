import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import firebase from "firebase";
import Argon from "./plugins/argon-kit";
import "./registerServiceWorker";
import ImageUploader from "vue-image-upload-resize";
var firebaseConfig = {
    apiKey: "AIzaSyAtD0mA0ZF5xLJvfYdhTcj7P_HOUgSH0eE",
    authDomain: "image-uploader-ff3a6.firebaseapp.com",
    databaseURL: "https://image-uploader-ff3a6.firebaseio.com",
    projectId: "image-uploader-ff3a6",
    storageBucket: "image-uploader-ff3a6.appspot.com",
    messagingSenderId: "791840473461",
    appId: "1:791840473461:web:b56158add9acd5a9e1133c"
};
Vue.config.productionTip = false;

firebase.initializeApp(firebaseConfig);

Vue.use(ImageUploader);
Vue.use(Argon);
new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
