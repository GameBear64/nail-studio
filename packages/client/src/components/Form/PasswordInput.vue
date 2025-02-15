<script setup>
import { computed, ref } from 'vue';

import Icon from '../Icon.vue';

const value = defineModel();
const props = defineProps({
  errors: String,
  hideErrors: { type: Boolean, default: false },
});
const visibility = ref(false);

const passwordVisibility = computed(() => (visibility.value ? 'text' : 'password'));

const iconVisible = computed(() => (visibility.value ? 'visibility' : 'visibility_off'));
</script>

<template>
  <div>
    <label
      v-i18n
      class="font-medium"
      :for="$attrs.name"
    >Password</label>
    <div class="relative flex flex-row items-center">
      <input
        :id="$attrs.name"
        v-bind="$attrs"
        v-model="value"
        class="relative pr-9"
        :type="passwordVisibility"
      >
      <Icon
        class="absolute right-0 mr-1.5"
        :onclick="() => (visibility = !visibility)"
        :icon="iconVisible"
        clickable
      />
    </div>
    <p
      v-if="!hideErrors"
      v-i18n
      class="text-error"
    >
      {{ props.errors }}
    </p>
  </div>
</template>
