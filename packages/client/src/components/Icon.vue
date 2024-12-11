<script setup>
const props = defineProps(['icon', 'clickable', 'fill', 'dense']);
</script>

<template>
  <span
    class="material-symbols-rounded"
    :class="{ 'cursor-pointer': props.clickable, 'tracking-tight': props.dense }"
    :style="`font-variation-settings: 'FILL' ${props.fill ? 1 : 0} `"
    :v-bind="$attrs"
  >
    {{ props.icon }}
  </span>
</template>
