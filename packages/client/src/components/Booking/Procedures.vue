<script setup>
import { computed } from 'vue';

import MultiSelect from '@components/MultiSelect.vue';

const selectedOption = defineModel();

const props = defineProps({
  options: {
    type: Array,
    required: true,
  },
});

const procedures = computed(() =>
  props.options.map((p) => ({
    label: `${p.name} (${p.price} лв)`,
    value: p._id,
    price: p.price,
    duration: p.duration,
  })),
);
</script>

<template>
  <MultiSelect
    v-model="selectedOption"
    class="w-96"
    :options="procedures"
  />
</template>
