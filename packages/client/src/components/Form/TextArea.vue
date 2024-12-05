<script setup>
import { useAttrs } from "vue";

const props = defineProps(["errors"]);
const model = defineModel();

const attrs = useAttrs();
const label = attrs.name.charAt(0).toUpperCase() + attrs.name.slice(1);
</script>

<template>
  <div>
    <label class="font-medium" :for="name">{{
      label.split("_").join(" ")
    }}</label>
    <textarea v-model="model" v-bind="$attrs" :id="$attrs.name"></textarea>
  </div>
  <p class="text-error">{{ props.errors }}</p>
</template>
