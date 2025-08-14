export const isValidUrl = (url: string) => {
  try {
    new URL(url);
    return true;
  } catch (err) {
    console.error('Invalid URL:', err);
    return false;
  }
};
