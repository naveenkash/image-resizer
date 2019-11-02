import Vue from "vue";
import Vuex from "vuex";
import firebase from "firebase";
require("firebase/firestore");
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    images: []
  },
  getters: {
    getImages(state) {
      return state.images;
    }
  },
  mutations: {
    setImages(state, value) {
      state.images = value;
    },
    updateLocalImageArray(state,value) {
      state.images.push(value);
    }
  },
  actions: {
    getImagesFromDatabase(context, value) {
      var db = firebase.firestore();
      let imagesRef = db.collection("images");

      imagesRef
        .get()
        .then(snapshot => {
          var localArray = [];
          snapshot.forEach(doc => {
            var imageData = {
              id: doc.id,
              url: doc.data().image
            };
            localArray.push(imageData);
          });
          context.commit("setImages", localArray);
        })
        .catch(err => {
          console.log("Error getting documents", err);
        });
    },
    updateLocalImageArray(context, value) {
      context.commit("updateLocalImageArray", value);
    }
  }
});
