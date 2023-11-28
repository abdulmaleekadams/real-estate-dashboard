export function readFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    // Set up the FileReader event listeners
    reader.onload = () => {
      // FileReader successfully loaded the file
      const content = reader.result;
      resolve(content);
    };

    reader.onerror = (error) => {
      // FileReader encountered an error
      reject(error);
    };

    // Read the file as text
    reader.readAsDataURL(file);
  });
}
