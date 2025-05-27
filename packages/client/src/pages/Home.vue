<script setup>
import Banner from '@components/Home/Banner.vue';
import BestArtists from '@components/Home/BestArtists.vue';
import Procedures from '@components/Home/Procedures.vue';
import Footer from '@components/Layout/Footer.vue';
</script>

<template>
  <div class="flex flex-col overflow-x-hidden">
    <Banner />
    <BestArtists />
    <Procedures />
    <Footer />
  </div>
</template>
