<template>
   <div class="row text-center text-lg-left mt-4">
      <div class="col-lg-3 col-md-4 col-6 mb-4" v-for="img in images" :key="img.id">
        <a target="_blank" :href="img.url" class="d-block h-100">
          <img class="img-fluid img-thumbnail" :src="img.url" alt />
        </a>
      </div>
    </div>
</template>
<script>
export default {
    props:["images"]
    
}
</script>
