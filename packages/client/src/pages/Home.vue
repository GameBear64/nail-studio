<script setup>
import Footer from '@components/Layout/Footer.vue';
import Banner from '@partials/Home/Banner.vue';
import BestArtists from '@partials/Home/BestArtists.vue';
</script>

<template>
  <div class="flex flex-col overflow-x-hidden">
    <Banner />
    <BestArtists />
    <Footer />
  </div>
</template>
