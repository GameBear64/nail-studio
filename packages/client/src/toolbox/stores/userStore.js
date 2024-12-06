import { reactive } from "vue";

export const userId = reactive({ id: null });

export const setUserId = (id) => {
  userId.id = id;
};

export const removeUserId = (id) => {
  userId.id = null;
};
