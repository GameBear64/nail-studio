<script setup>
import { computed, ref } from "vue";
import { useAttrs } from "vue";
import Icon from "../Icon.vue";

const value = defineModel();
const props = defineProps({
  errors: String,
  hideErrors: { type: Boolean, default: false },
});
const visibility = ref(false);

const attrs = useAttrs();
const name = attrs.name?.split("_").join(" ");

const passwordVisibility = computed(() =>
  visibility.value ? "text" : "password"
);

console.log(props.errors, value);

const iconVisible = computed(() =>
  visibility.value ? "visibility" : "visibility_off"
);
</script>

<template>
  <div>
    <label class="font-medium" for="password">Password</label>
    <div class="flex flex-row relative items-center">
      <input
        :id="name"
        class="relative pr-9"
        v-bind="$attrs"
        :type="passwordVisibility"
        v-model="value"
      />
      <Icon
        class="absolute right-0 mr-1.5"
        :onclick="() => (visibility = !visibility)"
        :icon="iconVisible"
        :clickable="true"
      />
    </div>
    <p
      v-if="!hideErrors"
      class="text-red-600 leading-none text-sm h-4 mt-1 font-medium"
    >
      {{ props.errors }}
    </p>
  </div>
</template>
