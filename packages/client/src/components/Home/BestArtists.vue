<script setup>
import ArtistCart from '@components/Home/ArtistCard.vue';
import Swiper from '@components/Swiper.vue';

import { data, readAllArtists } from '@api/artists';

readAllArtists();
</script>

<template>
  <div class="min-h-1 bg-linear-to-r from-pink-200 to-pink-50" />
  <div
    class="flex w-screen flex-col gap-1 bg-linear-to-t from-pink-200 to-white py-10!"
  >
    <div>
      <div class="flex flex-col items-center justify-center gap-1 text-center">
        <p
          v-i18n
          class="font-fancy text-5xl sm:text-7xl"
        >
          Our best artists
        </p>
        <p
          v-i18n
          class="sm:text-md max-w-[21rem] text-sm italic sm:max-w-md"
        >
          With years of experience and happy clients, we can proudly suggest one of our best artists.
        </p>
      </div>
    </div>
    <Swiper
      v-slot="slotProps"
      :data="data"
    >
      <ArtistCart :data="slotProps.data" />
    </Swiper>
  </div>
  <div class="min-h-1 w-screen bg-linear-to-r from-pink-300 to-pink-50" />
</template>
