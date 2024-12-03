<script setup>
import { useAttrs } from "vue";

const props = defineProps(["errors"]);
const check = defineModel({ default: false });
const attrs = useAttrs();

const name = attrs.name.split("_").join(" ");
const label = name?.charAt(0).toUpperCase() + name.slice(1);
</script>

<template>
  <div class="flex flex-row items-center gap-2">
    <label :for="name">{{ label }}</label>
    <input
      v-model="check"
      class="w-auto"
      true-name="yes"
      false-name="no"
      type="checkbox"
      :name="name"
      :id="name"
    />
  </div>
</template>
