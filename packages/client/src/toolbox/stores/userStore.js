import { reactive } from 'vue';

import useFetch from '../useFetch';

export const userStore = reactive({ id: null, role: null });

export const setUserData = async () => {
  const res = await useFetch({ url: 'user', method: 'GET', noError: true });
  userStore.id = res?.id;
  userStore.role = res?.role;
};

export const removeUserData = () => {
  userStore.id = null;
  userStore.role = null;
};
