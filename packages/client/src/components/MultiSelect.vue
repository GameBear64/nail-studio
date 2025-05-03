<script setup>
import { onBeforeUnmount,onMounted, ref } from 'vue'

const modelValue = defineModel({ type: Array, default: () => [] })

defineProps({
  options: {
    type: Array,
    required: true
  }
})

const isOpen = ref(false)
const dropdown = ref(null)

const handleClickOutside = (event) => {
  if (!dropdown.value.contains(event.target)) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})
onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const isSelected = (option) =>
  modelValue.value.some((o) => o.value === option.value)

const toggleOption = (option) => {
  const index = modelValue.value.findIndex((o) => o.value === option.value)
  if (index >= 0) {
    modelValue.value.splice(index, 1)
  } else {
    modelValue.value.push(option)
  }
}

const removeOption = (option) => {
  modelValue.value = modelValue.value.filter(
    (o) => o.value !== option.value
  )
}
</script>

<template>
  <div
    ref="dropdown"
    class="relative w-full"
  >
    <div
      class="flex cursor-pointer flex-wrap gap-2 rounded border border-gray-300 p-2"
      @click="toggleDropdown"
    >
      <span
        v-for="(option, index) in modelValue"
        :key="index"
        class="flex items-center gap-1 rounded-full bg-pink-100 px-2 py-1 text-sm text-pink-700"
      >
        {{ option.label }}
        <button
          class="text-pink-500 hover:text-pink-800"
          @click.stop="removeOption(option)"
        >
          &times;
        </button>
      </span>
      <span
        v-if="!modelValue.length"
        class="text-gray-400"
      >Select options...</span>
    </div>

    <div
      v-if="isOpen"
      class="absolute z-10 mt-1 w-full overflow-y-auto rounded-lg border border-gray-300 bg-white shadow-lg"
    >
      <div
        v-for="option in options"
        :key="option.value"
        class="cursor-pointer p-2 hover:bg-pink-200"
        :class="{'bg-pink-100': isSelected(option)}"
        
        @click="toggleOption(option)"
      >
        {{ option.label }}
      </div>
    </div>
  </div>
</template>