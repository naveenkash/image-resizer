<template>
  <div class="container mt-nav">
    <div class="col-md-12">
      <div class="row mb-3 align-items-center">
        <h3>Quality</h3>
        <h6 class="mb-1 ml-2">{{setting.quality}} :</h6>
        <h6 class="mb-1 ml-2">( Image quality between 0 - 1 )</h6>
      </div>
      <base-slider v-model="setting.quality" :range="{min: 0, max: 1}"></base-slider>
    </div>
    <div class="col-md-12">
      <div class="row mb-3 align-items-center">
        <h3>Max Width</h3>
        <h6 class="mb-1 ml-2">{{setting.width}} :</h6>
        <h6 class="mb-1 ml-2">( Image width between 0 - 2560 px )</h6>
      </div>
      <base-slider v-model="setting.width" :range="{min: 100, max: 2560}"></base-slider>
    </div>

    <div class="col-md-12">
      <div class="row mb-3 align-items-center">
        <h3>Max Height</h3>
        <h6 class="mb-1 ml-2">{{setting.height}} :</h6>
        <h6 class="mb-1 ml-2">( Image height between 0 - 2560 px )</h6>
      </div>
      <base-slider v-model="setting.height" :range="{min: 100, max: 2560}"></base-slider>
    </div>
    <base-button class="mt-4" @click="this.saveSetting" type="primary">Save</base-button>
    <!-- <p> message: "{{ this.scale }}"</p> -->
  </div>
</template>
<script>
import BaseSlider from "@/components/BaseSlider.vue";
import BaseButton from "@/components/BaseButton.vue";
export default {
  components: {
    BaseSlider,
    BaseButton
  },
  data() {
    return {
      setting: {
        height: localStorage.getItem("height") || 1920,
        width: localStorage.getItem("width") || 1920,
        quality: localStorage.getItem("quality") || 0.7
      }
    };
  },
  methods: {
    saveSetting() {
      localStorage.setItem("height", this.setting.height);
      localStorage.setItem("width", this.setting.width);
      localStorage.setItem("quality", this.setting.quality);
    }
  }
};
</script>
<style lang="css">
</style>