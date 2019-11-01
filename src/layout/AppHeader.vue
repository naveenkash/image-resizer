<template>
  <header class="header-global">
    <div style="position: relative">
      <base-nav transparent type="primary" effect="light" expand>
        <router-link class="navbar-brand" to="/">Image Uploader</router-link>

        <div class="row" slot="content-header" slot-scope="{closeMenu}">
          <div class="col-10 collapse-brand">
            <h3>Image Uploader</h3>
          </div>
          <div class="col-2 collapse-close">
            <close-button @click="closeMenu"></close-button>
          </div>
        </div>

        <ul class="navbar-nav ml-lg-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="/">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/settings">Settings</router-link>
          </li>
        </ul>
      </base-nav>
    </div>
  </header>
</template>
<script>
import BaseDropdown from "@/components/BaseDropdown.vue";
import CloseButton from "@/components/CloseButton.vue";
import BaseNav from "@/components/BaseNav.vue";
export default {
  components: { BaseDropdown, CloseButton, BaseNav }
};
</script>
<style>
</style>
