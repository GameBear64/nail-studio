<script setup>
import { computed, reactive } from 'vue';
import { useRouter } from 'vue-router';

import Artists from '@components/Booking/Artists.vue';
import Date from '@components/Booking/Date.vue';
import Procedures from '@components/Booking/Procedures.vue';

import { Shifts } from '@tools/consts';
import { successSnackBar } from '@tools/snackbars';
import useFetch from '@tools/useFetch';
import { data, readAllArtists } from '@api/artists';
import { readAllProcedures } from '@api/procedures';

const router = useRouter();

readAllArtists();
readAllProcedures();

const booking = reactive({
  artist: null,
  procedures: [],
  date: null,
});

const bookingReady = computed(() => booking.artist && booking.procedures.length > 0 && booking.date);

const artistDetails = computed(() => data.value?.find((artist) => artist._id == booking.artist));

// [start, end]
const artistShift = computed(() =>
  artistDetails?.value?.shift == Shifts.MORNING ? [9, 12] : artistDetails?.value?.shift == Shifts.AFTERNOON ? [13, 17] : [9, 17],
);

const totalPrice = computed(() => booking.procedures.reduce((sum, item) => sum + item.price, 0));

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
    <div class="flex h-72 w-screen items-center justify-center bg-[url(/blossom.jpg)]">
      <p
        class="text-bold text-md flex size-full items-center justify-center px-2 py-4 text-center italic text-pink-50 backdrop-brightness-50 sm:text-2xl">
        Schedule your next visit for flawless, salon-perfect nails.
      </p>
    </div>
    <div class="flex size-full items-center justify-center">
      <div class="flex w-[55rem] flex-col rounded bg-white p-16 shadow-sm">
        <div class="flex flex-col gap-10 sm:flex-row">
          <div class="flex flex-col items-center justify-center gap-5">
            <div>
              <p class="text-sm">First, choose an artist</p>
              <Artists v-model="booking.artist" class="w-64 sm:w-96" />
            </div>
            <div>
              <p class="text-sm">Second, choose a procedure</p>
              <Procedures v-model="booking.procedures" class="w-64 sm:w-96" />
            </div>
          </div>
          <Date
            v-model="booking.date"
            :start-hour="artistShift[0]"
            :end-hour="artistShift[1]"
            :booked="booking.artistDetails?.bookings" />
        </div>
        <button
          v-i18n
          class="btn mt-4 w-full"
          :class="{ 'bg-pink-300': !bookingReady }"
          :disabled="!bookingReady"
          type="button"
          @click="makeBooking">
          Make booking <span class="mx-1">({{ totalPrice }} лв)</span>
        </button>
      </div>
    </div>
  </div>
</template>
