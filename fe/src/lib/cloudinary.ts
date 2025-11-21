export const optimizeCloudinary = (url: string): string => {
  if (!url) return url;
  if (!url.includes("res.cloudinary.com")) return url;
  if (url.includes("f_auto")) return url;

  return url.replace("/upload/", "/upload/f_auto,q_auto/");
};
