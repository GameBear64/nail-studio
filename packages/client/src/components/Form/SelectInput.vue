<script setup>
import { useAttrs } from 'vue';

const props = defineProps(['options', 'errors']);
const model = defineModel();

const attrs = useAttrs();
const label = attrs.name.charAt(0).toUpperCase() + attrs.name.slice(1);
</script>

<template>
  <div>
    <label
      v-i18n
      class="font-medium"
      :for="$attrs.name"
    >{{ label.split('_').join(' ') }}</label>
    <select
      v-for="{ option, value } in options"
      v-bind="$attrs"
      :id="$attrs.name"
      :key="value"
      v-model="model"
    >
      <option :value="value">
        {{ option }}
      </option>
    </select>
    <p
      v-i18n
      class="text-error"
    >
      {{ props.errors }}
    </p>
  </div>
</template>
