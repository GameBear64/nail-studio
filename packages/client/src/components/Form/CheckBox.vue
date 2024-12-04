<script setup>
const props = defineProps(["name", "label", "errors"]);
const model = defineModel();
</script>

<template>
  <div class="flex flex-row items-center gap-2">
    <label :for="name">{{ label }}</label>
    <input type="checkbox" class="w-auto" v-model="model" v-bind="$attrs" />
    <input
      :id="name"
      :name="name"
      type="hidden"
      value="false"
      v-model="model"
    />
    <p class="text-error">
      {{ props.errors }}
    </p>
  </div>
</template>
