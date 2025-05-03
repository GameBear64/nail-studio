<script setup>
import { computed } from 'vue';

import MultiSelect from '@components/MultiSelect.vue';

import { data } from '@api/procedures';

const selectedOption = defineModel();

const procedures = computed(() => data.value.map((p) => ({ label: `${p.name} (${p.price} лв)`, value: p._id, price: p.price })));
</script>

<template>
  <MultiSelect
    v-model="selectedOption"
    class="w-96"
    :options="procedures"
  />
</template>
