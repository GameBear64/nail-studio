<script setup>
import { reactive } from 'vue';

import Artists from '@components/Booking/Artists.vue';
import Date from '@components/Booking/Date.vue';
import Procedures from '@components/Booking/Procedures.vue';

import { readAllArtists } from '@api/artists';

readAllArtists();

const booking = reactive({
  artist: null,
  procedures: [],
  date: null
})

</script>

<template>
  {{ booking.artist }}

  <Artists v-model="booking.artist" />
  <Procedures
    v-model="booking.artist"
    :artist="booking.procedures"
  />
  <Date />
</template>