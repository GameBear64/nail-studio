<script setup>
import Icon from '@components/Icon.vue';

import useFetch from '@tools/useFetch';

import Modal from './Modal.vue';
import Table from './Table.vue';
// url, method, body, noError
// useFetch({url:"artist", method:"GET"}).then(res=>console.log(res))
</script>

<template>
  <Teleport
    to="#teleport-target"
  >
    <div class="fixed z-50 size-full bg-gray-950/40 drop-shadow-sm backdrop-blur-sm">
      <div class="flex size-full items-center justify-center">
        <div class="flex max-w-96 flex-col rounded border bg-white px-5 py-2 drop-shadow-sm">
          <div class="flex justify-end">
            <Icon
              class="text-lg"
              icon="close"
            />
          </div>
          <div class="flex flex-col gap-5 p-3">
            <p class="">
              Are you sure you want to delete this user?
            </p>
       
            <div class="flex flex-row justify-end gap-5">
              <button class="btn-outlined">
                Cancel
              </button>
              <button class="btn-outlined bg-red-600 text-white">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
  <div class="mt-10 flex size-full justify-center">
    <Table
      table-name="Artists Management"
      :headers="['Image', 'Name', 'Email', 'Phone', 'Actions']"
      :actions="[
        { icon: 'edit_square', styles: 'text-gray-800', action: () => {} },
        { icon: 'delete', styles: 'text-red-600', action: () => {} },
      ]"
      :data="[['CX', 'Catherine Nikiforova', 'catxrin@gmail.com', '0899999999']]"
    />
  </div>
</template>
