export const convertToBase64 = (
  file: File,
  callback: (base64String: string) => void
) => {
  const reader = new FileReader();
  reader.onloadend = () => {
    if (reader.result !== null && typeof reader.result === "string") {
      callback(reader.result);
    }
  };
  reader.readAsDataURL(file);
};
