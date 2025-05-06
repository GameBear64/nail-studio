<script setup>
import { bgEnToggle, locale } from '@store/translationStore';
</script>

<template>
  <div>
    <button
      class="bg-base text-txtPrimary rounded-md px-2 py-1 font-medium"
      @click="bgEnToggle"
    >
      {{ locale.toUpperCase() }}
    </button>
  </div>
</template>
