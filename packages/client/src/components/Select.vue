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
  <div class="border-base-s relative size-full rounded border border-gray-300 hover:border-pink-100">
    <button
      class="size-full rounded bg-white px-2 focus:outline-none"
      @click="isOpen = !isOpen"
    >
      <slot
        v-if="selected"
        name="selected"
        :selected="selected"
      >
        <span v-i18n>
          {{ selected?.label }}
        </span>
      </slot>

      <p
        v-else
        v-i18n
        class="text-start text-gray-400"
      >
        Select an option...
      </p>
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
          v-i18n
          class="cursor-pointer hover:bg-gray-100"
          @click="selectOption(option)"
        >
          {{ option.label }}
        </div>
      </slot>
    </div>
  </div>
</template>
