<script setup>
import ArtistCart from '@components/Home/ArtistCard.vue';

import { data, readAllArtists } from '@api/artists';

readAllArtists();
</script>

<template>
  <div class="m-10 flex flex-wrap justify-center gap-10">
    <div
      v-for="artist in data"
      :key="artist._id"
      class="w-80"
    >
      <ArtistCart :data="artist" />
    </div>
  </div>
</template>
