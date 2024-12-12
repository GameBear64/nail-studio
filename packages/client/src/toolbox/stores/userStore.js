import { reactive } from 'vue';

import useFetch from '../useFetch';

export const userStore = reactive({ id: null });

export const setUserId = async () => {
  const res = await useFetch({ url: 'user', method: 'GET', noError: true });
  userStore.id = res?.id;
};

export const removeUserId = () => {
  userStore.id = null;
};
