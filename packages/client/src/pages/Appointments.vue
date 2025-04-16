<script setup>
import { ref } from 'vue';

import useFetch from '@tools/useFetch';

const data = ref([]);

function formatDate(timestamp) {
  const d = new Date(timestamp * 1000)
  return d.toLocaleString(undefined, {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function totalPrice(procedures) {
  return procedures.reduce((sum, p) => sum + p.price, 0)
}

useFetch({ url: 'booking', method: 'GET' }).then((res) => {
  data.value = res;
});
</script>

<template>
  <div class="mx-auto max-w-4xl space-y-6 p-6">
    <h1 class="mb-4 text-2xl font-bold">
      Your Bookings
    </h1>

    <div
      v-for="booking in data"
      :key="booking._id"
      class="space-y-4 rounded-lg border bg-white p-4 shadow-xs"
    >
      <!-- Header -->
      <div class="flex items-center gap-4">
        <img
          :src="'/api/resource/' + booking.artist.picture + '?size=50'"
          alt="Artist"
          class="size-12 rounded-full object-cover"
        >
        <div>
          <p class="text-lg font-semibold">
            {{ booking.artist.name }}
          </p>
          <p class="text-sm text-gray-500">
            with {{ booking.client.name }}
          </p>
        </div>
        <div class="ml-auto text-sm text-gray-600">
          {{ formatDate(booking.date) }}
        </div>
      </div>

      <!-- Procedures -->
      <div class="space-y-1 rounded-sm bg-pink-50 p-3">
        <p class="text-sm font-medium">
          Procedures:
        </p>
        <ul class="list-disc pl-4 text-sm">
          <li
            v-for="procedure in booking.procedures"
            :key="procedure._id"
            class="flex justify-between"
          >
            <span>{{ procedure.name }}</span>
            <span class="text-gray-600">{{ procedure.price }} лв</span>
          </li>
        </ul>
        <div class="mt-2 text-right font-semibold">
          Total: {{ totalPrice(booking.procedures) }} лв
        </div>
      </div>
    </div>
  </div>
</template>