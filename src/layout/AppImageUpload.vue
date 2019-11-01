<template>
  <div class="container mt-nav">
    <div class="col-md-12">
      <!-- image input drag and drop or select -->
      <image-uploader
        :preview="false"
        :className="['fileinput', { 'fileinput--loaded': hasImage }]"
        capture="environment"
        :debug="0"
        :quality="quality"
        doNotResize="gif"
        :autoRotate="true"
        outputFormat="blob"
        :maxSize="35000"
        :scaleRation="scale"
        @input="setImage"
      >
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
      </image-uploader>
      <!-- image input drag and drop or select -->
    </div>

    <!-- uploaded images -->
    <h2
      class="font-weight-light text-center text-lg-left mt-4 mb-0"
    >{{this.image.length?"Uploaded Images" : "Upload Images"}}</h2>

    <hr class="mt-2 mb-2" />
    <div class="row text-center text-lg-left mt-4">
      <div class="col-lg-3 col-md-4 col-6 mb-4" v-for="img in image" :key="img">
        <a target="_blank" :href="img" class="d-block h-100">
          <img class="img-fluid img-thumbnail" :src="img" alt />
        </a>
      </div>
    </div>

    <!-- uploaded images -->
  </div>
</template>
<script>
var firebase = require("firebase/app");
require("firebase/storage");
export default {
  name: "app-input",
  data() {
    return {
      hasImage: false,
      uploading: false,
      image: JSON.parse(localStorage.getItem("images")) || [],
      quality: parseInt(localStorage.getItem("quality")) || 0.7,
      scale: parseInt(localStorage.getItem("scale")) || 0.5
    };
  },
  methods: {
    setImage(output) {
      this.hasImage = true;
      this.uploadFiles(null, output);
    },
    overrideDefault(e) {
      e.preventDefault();
      e.stopPropagation();
    },
    overrideDefaultAndUpload(e) {
      e.preventDefault();
      e.stopPropagation();
      this.uploadFiles(e, null);
    },
    uploadFiles(e, image) {
      if (image) {
        this.saveToDataBase(image);
        return;
      } else {
        this.saveToDataBase(e.dataTransfer.files[0]);
      }
    },
    saveToDataBase(image) {
      var storage = firebase.storage();
      this.uploading = true;
      var path = "/attachments/" + "/UserImages/" + Date.now() + ".jpg";
      var storageRef = storage.ref(path);
      var task = storageRef.put(image);
      task
        .then(snapshot => {
          this.uploading = false;
          return task.snapshot.ref.getDownloadURL();
        })
        .then(url => {
          this.image.push(url);
          this.uploading = false;
          var array = [];
          // Parse the serialized data back into an aray of objects
          array = JSON.parse(localStorage.getItem("images")) || [];
          // Push the new data (whether it be an object or anything else) onto the array
          array.push(url);
          // Re-serialize the array back into a string and store it in localStorage
          localStorage.setItem("images", JSON.stringify(array));
        })
        .catch(error => {
          alert(error.message);
          this.uploading = false;
        });
    }
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
.mt-nav {
  margin-top: 55px;
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
</style>
