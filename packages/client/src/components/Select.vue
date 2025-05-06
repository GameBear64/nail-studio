<script setup>
import { computed, defineModel, ref } from 'vue';

const modelValue = defineModel();
const props = defineProps({
  options: {
    type: Array,
    required: true,
  },
});

const isOpen = ref(false);
const selected = computed(() => props.options.find((option) => option.value === modelValue.value) || null);

const selectOption = (option) => {
  modelValue.value = option.value;
  isOpen.value = false;
};
</script>

<template>
  <div class="border-base-s relative w-full rounded border border-gray-300 p-2 hover:border-pink-100">
    <button
      class="w-full rounded bg-white p-1 focus:outline-none"
      @click="isOpen = !isOpen"
    >
      <slot
        name="selected"
        :selected="selected"
      >
        {{ selected?.label || 'Select an option' }}
      </slot>
    </button>
    <div
      v-if="isOpen"
      class="absolute z-10 w-full rounded-md border shadow-lg"
    >
      <slot
        name="options"
        :options="options"
        :select="selectOption"
      >
        <div
          v-for="option in options"
          :key="option.value"
          class="cursor-pointer hover:bg-gray-100"
          @click="selectOption(option)"
        >
          {{ option.label }}
        </div>
      </slot>
    </div>
  </div>
</template>
