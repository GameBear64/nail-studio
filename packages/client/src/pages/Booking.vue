<script setup>
import { reactive } from 'vue';

import Artists from '@components/Booking/Artists.vue';
import Date from '@components/Booking/Date.vue';
import Procedures from '@components/Booking/Procedures.vue';

import { readAllArtists } from '@api/artists';
import { readAllProcedures } from '@api/procedures';

readAllArtists();
readAllProcedures();

const booking = reactive({
  artist: null,
  procedures: [],
  date: null
})

</script>

<template>
  {{ booking.procedures }}

  <Artists v-model="booking.artist" />
  <Procedures
    v-if="booking?.artist"
    v-model="booking.procedures"
  />
  <Date
    v-if="booking?.procedures?.length > 0"
    v-model="booking.date"
  />
</template>