<script setup>
import { data, readAllArtists } from '@api/artists';

readAllArtists()
</script>

<template>
  <div class="flex flex-col overflow-x-hidden">
    hello {{ data }}
  </div>
</template>
