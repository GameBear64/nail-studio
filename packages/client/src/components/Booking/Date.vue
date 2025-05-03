<script setup>
import { computed, ref } from 'vue';

import Icon from '@components/Icon.vue';

const props = defineProps({
  startHour: { type: Number, default: 9 },
  endHour: { type: Number, default: 17 },
  breaks: { type: Array, default: () => ['12:00', '12:30'] }, // labels
  booked: { type: Array, default: () => [] }, // seconds
});

const model = defineModel();

const currentDay = ref(getStartOfDay(Date.now() / 1000));

function getStartOfDay(ts) {
  const d = new Date(ts * 1000);
  d.setHours(0, 0, 0, 0);
  return Math.floor(d.getTime() / 1000);
}

// Format timestamp to HH:mm
function formatTime(ts) {
  const d = new Date(ts * 1000);
  const h = String(d.getHours()).padStart(2, '0');
  const m = String(d.getMinutes()).padStart(2, '0');
  return `${h}:${m}`;
}

const formattedDate = computed(() => {
  const d = new Date(currentDay.value * 1000);
  return d.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
});

const selected = computed(() => model.value);

const slots = computed(() => {
  const result = [];
  for (let h = props.startHour * 60; h < props.endHour * 60; h += 30) {
    const hours = Math.floor(h / 60);
    const minutes = h % 60;

    const slotDate = new Date(currentDay.value * 1000);
    slotDate.setHours(hours, minutes, 0, 0);

    const ts = Math.floor(slotDate.getTime() / 1000);

    const label = formatTime(ts);
    if (!props.breaks.includes(label)) {
      result.push({
        timestamp: ts,
        label: label,
        isBooked: props.booked.includes(ts),
      });
    }
  }

  return result;
});

function selectSlot(ts) {
  model.value = ts;
}

function prevDay() {
  currentDay.value -= 86400;
  model.value = null;
}

function nextDay() {
  currentDay.value += 86400;
  model.value = null;
}
</script>

<template>
  <div class="w-full max-w-xl rounded-lg bg-white p-4 shadow">
    <!-- Date Navigation -->
    <div class="mb-4 flex items-center justify-between">
      <button class="px-2 text-xl hover:text-pink-500" @click="prevDay">
        <Icon icon="arrow_back" />
      </button>
      <h2 class="select-none text-lg font-semibold">
        {{ formattedDate }}
      </h2>
      <button class="px-2 text-xl hover:text-pink-500" @click="nextDay">
        <Icon icon="arrow_forward" />
      </button>
    </div>

    <div class="grid grid-cols-2 gap-2">
      <button
        v-for="(slot, i) in slots"
        :key="i"
        :disabled="slot.isBooked"
        :class="[
          'rounded border px-4 py-2 text-sm transition',
          slot.isBooked
            ? 'cursor-not-allowed bg-gray-300'
            : slot.timestamp === selected
              ? 'bg-pink-500 text-white'
              : 'bg-white hover:bg-pink-100',
        ]"
        @click="selectSlot(slot.timestamp)">
        {{ slot.label }}
      </button>
    </div>
  </div>
</template>
