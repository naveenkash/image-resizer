<template>
  <header class="header-global">
    <div style="position: relative">
      <base-nav type="primary" effect="dark" title="Image Resizer" expand>
        <div class="row" slot="content-header" slot-scope="{closeMenu}">
          <div class="col-8 collapse-brand">
            <a href="/">Image Resizer</a>
          </div>
          <div class="col-4 collapse-close">
            <close-button @click="closeMenu"></close-button>
          </div>
        </div>

        <ul class="navbar-nav ml-lg-auto">
          <li class="nav-item">
            <a class="nav-link nav-link-icon" href="/">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link nav-link-icon" href="settings">Settings</a>
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
