<template>
  <div class="container mt-nav">
    <div class="col-md-12">
      <div class="row mb-3 align-items-center">
        <h3>Scale</h3>
        <h6 class="mb-1 ml-2">{{setting.scale}} :</h6>
        <h6 class="mb-1 ml-2">( Example: a value of 0.50 will reduce the size by half. )</h6>
      </div>
      <base-slider v-model="setting.scale" :range="{min: 0, max: 1}"></base-slider>
    </div>
    <div class="col-md-12">
      <div class="row mb-3 align-items-center">
        <h3>Quality</h3>
        <h6 class="mb-1 ml-2">{{setting.quality}} :</h6>
        <h6 class="mb-1 ml-2">(Image quality between 0 - 1 )</h6>
      </div>
      <base-slider v-model="setting.quality" :range="{min: 0, max: 1}"></base-slider>
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
        scale: localStorage.getItem("scale") || 0.5,
        quality: localStorage.getItem("quality") || 0.7
      }
    };
  },
  methods: {
    saveSetting() {
      localStorage.setItem("scale", this.setting.scale);
      localStorage.setItem("quality", this.setting.quality);
    }
  }
};
</script>
<style lang="css">
</style>