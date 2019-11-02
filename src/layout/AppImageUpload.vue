<template>
  <div class="container">
    <div class="col-md-12">
      <!-- image input drag and drop or select -->
      <input type="file" @change="setImage" id="fileInput" />
      <label
        for="fileInput"
        @drag="overrideDefault"
        @dragenter="overrideDefault"
        @dragleave="overrideDefault"
        @drop="overrideDefaultAndUpload"
        @dragstart="overrideDefault"
        @dragend="overrideDefault"
        @dragover="overrideDefault"
        slot="upload-label"
        class="col-md-12 text-center"
      >
        <div class="labelText text-center">
          <i class="fa fa-file-image-o" aria-hidden="true"></i>
          <br />
          <span
            class="font-weight-light"
          >{{this.uploading?" Uploading " : "Choose File or Drop Image Here"}}</span>
        </div>
      </label>
      <!-- image input drag and drop or select -->
    </div>

    <!-- uploaded images -->
    <h2
      class="font-weight-light text-center text-lg-left mt-4 mb-0"
    >{{this.getImages.length?"Uploaded Images" : "Upload Images"}}</h2>

    <hr class="mt-2 mb-2" />

    <Images :images="this.getImages" />
    <!-- uploaded images -->
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import Images from "./AppUploadedImages";
const Compress = require("compress.js");
var firebase = require("firebase/app");
require("firebase/storage");
require("firebase/firestore");
export default {
  name: "app-input",
  components: {
    Images
  },
  data() {
    return {
      hasImage: false,
      uploading: false,
      image: [],
      quality: parseInt(localStorage.getItem("quality")) || 0.7,
      maxWidth: parseInt(localStorage.getItem("width")) || 800,
      maxHeight: parseInt(localStorage.getItem("height")) || 600
    };
  },
  methods: {
    setImage(e) {
      this.hasImage = true;
      this.uploadFiles(e);
    },
    overrideDefault(e) {
      e.preventDefault();
      e.stopPropagation();
    },
    overrideDefaultAndUpload(e) {
      e.preventDefault();
      e.stopPropagation();
      this.uploadFiles(e);
    },
    uploadFiles(e) {
      if (e.target.files) {
        this.saveToDataBase(e.target.files);
      } else if (e.dataTransfer.files) {
        this.saveToDataBase(e.dataTransfer.files);
      }
    },
    saveToDataBase(images) {
      const options = {
        size: 35, // the max size in MB, defaults to 2MB
        quality: this.quality, // the quality of the image, max is 1,
        maxWidth: this.maxWidth, // the max width of the output image,
        maxHeight: this.maxHeight, // the max height of the output image,
        resize: true // defaults to true, set false if you do not want to resize the image width and height it will not be compressed as much
      };
      const compress = new Compress();
      const files = [...images];
      compress
        .compress(files, options)
        .then(data => {
          // returns an array of compressed images
          const img1 = data[0];
          const base64str = img1.data;
          const imgExt = img1.ext;
          const file = Compress.convertBase64ToFile(base64str, imgExt); // converting base64 to file
          return file;
        })
        .then(file => {
          var storage = firebase.storage();
          this.uploading = true;
          var path = "/attachments/" + "/UserImages/" + Date.now() + ".jpg";
          var storageRef = storage.ref(path);
          var task = storageRef.put(file);
          task
            .then(snapshot => {
              this.uploading = false;
              return task.snapshot.ref.getDownloadURL();
            })
            .then(url => {
              var localUpdateObject = {
                id:
                  Math.random()
                    .toString(36)
                    .substring(2, 15) +
                  Math.random()
                    .toString(36)
                    .substring(2, 15),
                url
              };
              this.image.push(url);
              this.saveUrlToDatabase(url);
              this.updateLocalImageArray(localUpdateObject);
              this.uploading = false;
            })
            .catch(error => {
              alert(error.message);
              this.uploading = false;
            });
        });
    },
    saveUrlToDatabase(url) {
      const db = firebase.firestore();
      var image = {
        image: url
      };
      db.collection("images")
        .doc()
        .set(image);
    },
    ...mapActions(["updateLocalImageArray"])
  },
  computed: {
    ...mapGetters(["getImages"])
  }
};
</script>
<style>
#fileInput {
  display: none;
}
main {
  padding-top: 55px;
}

.inputfile {
  width: 100%;
  height: 250px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
}
#fileInput + label {
  font-size: 1.25em;
  width: 100%;
  height: 250px;
  font-weight: 700;
  color: rgb(175, 175, 175);
  background-color: rgb(255, 255, 255);

  border: 2px dashed rgb(230, 230, 230);
  display: inline-block;
  border-radius: 5px;
  display: flex;
  align-items: center;
}

#fileInput + label {
  cursor: pointer; /* "hand" cursor */
}

#fileInput + label * {
  pointer-events: none;
}
.labelText {
  width: 100%;
  height: auto;
  border-radius: 5px;
  padding: 0 10px;
}
.labelText i {
  /* width: 50px;
    height: 50px */
  font-size: 1.8em;
}
.img-preview {
  display: none;
}
.img-fluid {
  height: 100% !important;
  width: 100%;
  object-fit: cover;
}
.col-lg-3 {
  height: 150px;
}
@media only screen and (max-width: 550px) {
  #fileInput + label {
    height: 150px;
  }
}
</style>
