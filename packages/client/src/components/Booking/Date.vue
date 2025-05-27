<script setup>
import { computed, ref } from 'vue';

import Icon from '@components/Icon.vue';

const props = defineProps({
  startHour: { type: Number, default: 9 },
  endHour: { type: Number, default: 17 },
  breaks: { type: Array, default: () => ['12:00', '12:30'] }, // labels
  booked: { type: Array, default: () => [[]] }, // seconds, [start, end]
  duration: { type: Number, default: 30 }, // in minutes
});

const slotInterval = 30; // 30 minutes in seconds

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

const isSlotBooked = (ts) => props.booked.some(([start, end]) => ts >= start && ts <= end);

function isSlotAvailable(startTs) {
  const requiredSpan = props.duration * 60;
  const endTs = startTs + requiredSpan;

  const closingTs = new Date(currentDay.value * 1000);
  closingTs.setHours(props.endHour, 0, 0, 0);
  const closingTime = Math.floor(closingTs.getTime() / 1000);

  if (endTs > closingTime) return false;

  for (let ts = startTs; ts < endTs; ts += slotInterval) {
    const label = formatTime(ts);
    if (isSlotBooked(ts) || props.breaks.includes(label)) {
      return false;
    }
  }

  const date = new Date();
  if (startTs < Math.floor(date.getTime() / 1000)) {
    return false;
  }

  return true;
}

const slots = computed(() => {
  const result = [];
  for (let h = props.startHour * 60; h < props.endHour * 60; h += slotInterval) {
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
        isBooked: isSlotBooked(ts),
        isAvailable: isSlotAvailable(ts),
      });
    }
  }

  return result;
});

const selected = computed(() => {
  if (!model.value) return [];
  const end = model.value + props.duration * 60;
  return slots.value.filter((slot) => slot.timestamp >= model.value && slot.timestamp < end).map((slot) => slot.timestamp);
});

function selectSlot(ts) {
  if (!isSlotAvailable(ts)) return;
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

function getSlotClass(slot) {
  if (selected.value.includes(slot.timestamp)) {
    return 'bg-pink-500 text-white';
  } else if (slot.isBooked) {
    return 'cursor-not-allowed bg-gray-300';
  } else if (!slot.isAvailable) {
    return 'cursor-not-allowed bg-gray-100';
  } else {
    return 'bg-white hover:bg-pink-100';
  }
}
</script>

<template>
  <div class="w-full max-w-xl rounded-lg bg-white p-4 shadow">
    <!-- Date Navigation -->
    <div class="mb-4 flex items-center justify-between">
      <button
        class="px-2 text-xl hover:text-pink-500"
        @click="prevDay"
      >
        <Icon icon="arrow_back" />
      </button>
      <h2 class="select-none text-lg font-semibold">
        {{ formattedDate }}
      </h2>
      <button
        class="px-2 text-xl hover:text-pink-500"
        @click="nextDay"
      >
        <Icon icon="arrow_forward" />
      </button>
    </div>

    <div class="grid grid-cols-2 gap-2">
      <button
        v-for="(slot, i) in slots"
        :key="i"
        :class="['rounded border px-4 py-2 text-sm transition', getSlotClass(slot)]"
        :disabled="slot.isBooked || !slot.isAvailable"
        @click="selectSlot(slot.timestamp)"
      >
        {{ slot.label }}
      </button>
    </div>
  </div>
</template>
