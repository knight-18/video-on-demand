import Storage from "@aws-amplify/storage";
export async function uploadFile(
  bucket,
  level,
  region,
  identityPoolId,
  fileName,
  fileData,
  fileType,
  fileId,
  prefix
) {
  Storage.configure({
    bucket,
    level,
    region,
    identityPoolId,
  });

  console.log("Filedata: ", fileData);
  try {
    let response = await Storage.put(
      `${prefix}/${fileId}.${fileName.split(".")[1]}`,
      fileData,
      {
        contentType: fileType,
      }
    );
    return response;
  } catch (error) {
    console.log("Upload function error: ", error);
    return null;
  }
}
