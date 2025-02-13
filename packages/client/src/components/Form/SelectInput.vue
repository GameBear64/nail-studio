<script setup>
import { useAttrs } from 'vue';

const props = defineProps(['options', 'errors']);
const model = defineModel();
// const optionsElement=()=>{

//  console.log( Object.entries(props.options))
// }
const attrs = useAttrs();
const label = attrs.name.charAt(0).toUpperCase() + attrs.name.slice(1);
// optionsElement()
</script>

<template>
  <div>
    <label
      class="font-medium"
      :for="$attrs.name"
    >{{ label.split('_').join(' ') }}</label>
    <select
      v-bind="$attrs"
      :id="$attrs.name"
      v-model="model"
    >
      <option
        v-for="data in options"
        :key="data.value"
        :selected="data.value===model"
        :value="data.value"
      >
        {{ data.label }}
      </option>
    </select>
    <p class="text-error">
      {{ props.errors }}
    </p>
  </div>
</template>
