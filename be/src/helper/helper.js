import cloudinary from "../lib/cloudinary.js";

export const uploadToCloudinary = async (file) => {
  try {
    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      resource_type: "auto",
    });
    return result.secure_url;
  } catch (error) {
    console.log("Error in uploadToCloudinary ", error);
    throw new Error("Error uploading to cloudinary");
  }
};

export const deleteFromCloudinary = async (url, resource_type = "image") => {
  try {
    const pathPart = url.split(`/${resource_type}/upload/`)[1];
    if (!pathPart) {
      console.warn(`[Cloudinary] Not found path: ${url}`);
      return;
    }

    const publicId = pathPart.substring(
      pathPart.indexOf("/") + 1,
      pathPart.lastIndexOf(".")
    );

    if (!publicId) {
      console.warn(`[Cloudinary] Not found public_id: ${pathPart}`);
      return;
    }

    await cloudinary.uploader.destroy(publicId, {
      resource_type: resource_type,
    });
  } catch (error) {
    next(error);
  }
};
