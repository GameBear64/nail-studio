export async function readFile(file, f) {
  if (!file) return Promise.reject('No file provided');

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = (event) => {
      f = event.target.result.split(';base64,').pop();
      console.log(f);
    };

    reader.onerror = (error) => reject(error);
  });
}
