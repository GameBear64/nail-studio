import { ref } from 'vue';

import useFetch from '../toolbox/useFetch';

export const data = ref([]);

export const deleteUser = (userId) => {
  // useFetch({ url: 'artist/' + userId, method: 'DELETE' }).then(() => {
  // Waiting for the back end to be fixed
  console.log(data.value.filter((d) => d.userId != userId));
  console.log(data.value, userId);
  // });
};

export const updateUser = (userId, body) => {
  console.log(body);
  useFetch({ url: 'artist/' + userId, method: 'PATCH', body })
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};

export const loadImage = (img) => {
  if (!img || img.length < 1) {
    return new URL('../../public/defaultUserImage.jpg', import.meta.url).href;
  }
  return new URL(origin + '/api/resource/' + img, import.meta.url).href;
};
