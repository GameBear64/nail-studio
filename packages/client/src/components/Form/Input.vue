<script setup>
import { useAttrs } from "vue";
const props = defineProps(["errors"]);
const value = defineModel();

const attrs = useAttrs();
const name = attrs.name.split("_").join(" ");
</script>

<template>
  <div>
    <label class="font-medium" :for="name">{{
      name.charAt(0).toUpperCase() + name.slice(1)
    }}</label>
    <input
      :id="name"
      v-bind="$attrs"
      :class="props?.errors && `input-error`"
      v-model="value"
    />
    <p class="text-red-600 leading-none text-sm h-4 mt-1 font-medium">
      {{ props.errors }}
    </p>
  </div>
</template>
