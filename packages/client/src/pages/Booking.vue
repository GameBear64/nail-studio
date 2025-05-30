<script setup>
import { computed, reactive, ref, watch } from 'vue';
import { useRouter } from 'vue-router';

import Artists from '@components/Booking/Artists.vue';
import Date from '@components/Booking/Date.vue';
import Procedures from '@components/Booking/Procedures.vue';

import { Shifts } from '@tools/consts';
import { successSnackBar } from '@tools/snackbars';
import useFetch from '@tools/useFetch';
import { data, readAllArtists } from '@api/artists';
import { data as procedureData, readAllProcedures } from '@api/procedures';

const router = useRouter();

readAllArtists();
readAllProcedures();

const booking = reactive({
  artist: null,
  procedures: [],
  date: null,
});

const bookedHours = ref([]);

watch(
  () => booking.artist,
  (artist) => {
    useFetch({ url: 'booking/for/' + artist, method: 'GET', noError: true }).then((res) => {
      bookedHours.value = res;
      booking.procedures = [];
    });
  },
);

const bookingReady = computed(() => booking.artist && booking.procedures.length > 0 && booking.date);

const artistDetails = computed(() => data.value?.find((artist) => artist._id == booking.artist));

// [start, end]
const artistShift = computed(() =>
  artistDetails?.value?.shift == Shifts.MORNING ? [9, 12] : artistDetails?.value?.shift == Shifts.AFTERNOON ? [13, 17] : [9, 17],
);
const artistProcedures = computed(() => procedureData.value.filter((p) => artistDetails?.value?.procedures?.includes(p._id)));

const totalPrice = computed(() =>
  procedureData.value.filter((p) => booking.procedures.includes(p._id)).reduce((sum, item) => sum + item.price, 0),
);
const totalDuration = computed(() =>
  procedureData.value.filter((p) => booking.procedures.includes(p._id)).reduce((sum, item) => sum + item.duration, 0),
);

const makeBooking = () => {
  const body = {
    ...booking,
    procedures: booking.procedures.map((p) => p.value),
  };

  useFetch({ url: 'booking', method: 'POST', body }).then(() => {
    successSnackBar('Booking created');
    router.push({ name: 'appointments' });
  });
};
</script>

<template>
  <div class="flex flex-col bg-pink-50">
    <div class="relative h-52 w-screen">
      <img
        src="/blossom.jpg"
        class="size-full object-cover"
      >
      <div class="absolute top-0 m-auto flex size-full items-center justify-center bg-black/50">
        <p
          v-i18n
          class="text-bold text-md text-center italic text-pink-50 sm:text-2xl"
        >
          Schedule your next visit for flawless, salon-perfect nails.
        </p>
      </div>
    </div>
    <div class="flex size-full items-center justify-center">
      <div class="flex w-[55rem] flex-col rounded bg-white p-16 shadow-sm">
        <div class="flex w-full flex-col gap-10 sm:flex-row">
          <div class="flex w-full flex-col items-center justify-center gap-10">
            <div>
              <p
                v-i18n
                class="text-sm"
              >
                First, choose an artist
              </p>
              <Artists
                v-model="booking.artist"
                class="min-w-64 sm:w-96"
              />
            </div>
            <div>
              <p
                v-i18n
                class="text-sm"
              >
                Second, choose a procedure
              </p>
              <Procedures
                v-model="booking.procedures"
                :options="artistProcedures"
                class="min-w-64 sm:w-96"
              />
            </div>
          </div>
          <Date
            v-model="booking.date"
            :start-hour="artistShift[0]"
            :end-hour="artistShift[1]"
            :booked="bookedHours"
            :duration="totalDuration"
          />
        </div>
        <button
          class="btn mt-4 w-full"
          :class="{ 'bg-pink-300': !bookingReady }"
          :disabled="!bookingReady"
          type="button"
          @click="makeBooking"
        >
          <span v-i18n>Make booking</span> ({{ totalPrice }} <span v-i18n>lv</span>)
        </button>
      </div>
    </div>
  </div>
</template>
