<script setup>
import ArtistCart from '@components/Home/ArtistCard.vue';

import { data, readAllArtists } from '@api/artists';

readAllArtists();
</script>

<template>
  <div class="min-h-1 bg-gradient-to-r from-pink-200 to-pink-50" />
  <div class="flex w-screen flex-col gap-8 bg-gradient-to-t from-pink-200 to-white !py-11 px-16">
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
          class="lg:text-md max-w-[21rem] text-sm italic lg:max-w-md"
        >
          With years of experience and happy clients, we can proudly suggest one of our best artists.
        </p>
      </div>
    </div>

    <div class="flex w-full flex-col items-center justify-center gap-5 lg:flex-row lg:justify-between">
      <ArtistCart
        v-for="artist in data.slice(0, 4)"
        :key="artist._id"
        class="w-80 md:w-96"
        :data="artist"
      />
    </div>
  </div>
  <div class="min-h-1 w-screen bg-gradient-to-r from-pink-300 to-pink-50" />
</template>
