export async function readFile(file) {
  if (!file) return Promise.reject('No file provided');

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = (event) => {
      return event.target.result;
    };

    reader.onerror = (error) => reject(error);
  });
}
