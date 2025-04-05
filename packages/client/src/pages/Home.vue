<script setup>
import Banner from '@components/Home/Banner.vue';
import BestArtists from '@components/Home/BestArtists.vue';
import Showcase from '@components/Home/Showcase.vue';
import Footer from '@components/Layout/Footer.vue';
</script>

<template>
  <div class="flex flex-col overflow-x-hidden">
    <Banner />
    <BestArtists />
    <Showcase group="studio" />
    <Showcase group="nails" />
    <Footer />
  </div>
</template>
