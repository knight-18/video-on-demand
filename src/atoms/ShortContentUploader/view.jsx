import { useEffect, useState } from "react";
import { onShortVideoUpload } from "../../utils/api";
import { v4 as uuidv4 } from "uuid";
import { Button } from "@aws-amplify/ui-react";
import { uploadFile } from "../../utils/storage";
import { Backdrop, CircularProgress, Paper, Box, Grid } from "@mui/material";
import "../../css/fileinput.css";
import Footer from "../Footer";

export default function View({ singOut, user }) {
  const [fileName, setFileName] = useState(null);
  const [fileData, setFileData] = useState(null);
  const [filetype, setFiletype] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [fileDuration, setFileDuration] = useState(null);
  const [uploadError, setUploadError] = useState(null);
  useEffect(() => {}, []);
  const handleInputChange = async (e) => {
    setUploadError(null);
    setFileName(e.target.files[0].name);
    setFileData(e.target.files[0]);
    setFiletype(e.target.files[0].type);
    const video = await loadVideo(e.target.files[0]);
    setFileDuration(video.duration);
  };
  const loadVideo = (file) =>
    new Promise((resolve, reject) => {
      try {
        let video = document.createElement("video");
        video.preload = "metadata";

        video.onloadedmetadata = function () {
          resolve(this);
        };

        video.onerror = function () {
          reject("Invalid video. Please select a video file.");
        };

        video.src = window.URL.createObjectURL(file);
      } catch (e) {
        reject(e);
      }
    });

  const uploadVideo = async () => {
    if (!fileData || !filetype || !fileName || fileName === "") {
      setUploadError("Please select correct file.");
      return;
    }
    setIsUploading(true);
    try {
      console.log("Video Duration: ", fileDuration);
      if (fileDuration < 3 || fileDuration > 30) {
        setUploadError("File duration must be 3-30 seconds.");
        setIsUploading(false);
        return;
      }
      let fileId = uuidv4();

      const res = await uploadFile(
        process.env.REACT_APP_SOURCE_VIDEO_BUCKET_NAME,
        "public",
        process.env.REACT_APP_VIDEO_BUCKET_REGION,
        process.env.REACT_APP_COGNITO_IDENTITY_POOL_ID,
        fileName,
        fileData,
        filetype,
        fileId,
        "shortVideos"
      );
      console.log("RES LOG:", res);
      let sourceBucketFilePath = `/public/${res.key}`;
      let reqBody = new Object({
        id: fileId,
        name: fileName,
        uploadedBy: user.attributes.email,
        sourceBucketFilePath: sourceBucketFilePath,
        createdAt: Date.now(),
        isDeleted: false,
      });
      await onShortVideoUpload(reqBody);
      console.log("Updated Database");
      console.log("File uploaded successfully.");
      setIsUploading(false);
      setUploadSuccess(true);
      window.location.href = "/short-content";
    } catch (err) {
      setUploadError("Failed to upload. Please try again");
      setIsUploading(false);
    }
  };

  return (
    <Grid
      container
      direction="row"
      style={{
        display: "flex",
        justifyContent: "center",
        textAlign:"center"
      }}
    >
      {isUploading && (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isUploading}
        >
          <CircularProgress color="primary" />
        </Backdrop>
      )}
      <Grid item md={6} sm={6} m={2} minHeight={"70vh"}>
        <h2 >Upload Video</h2>
        <Paper
          elevation={5}
          style={{
            padding: "2%",
            minHeight: "60%",
            flexDirection: "column",
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <div
            className="fileUpload blue-btn btn width100"
            style={{ width: "50%", textAlign: "center" }}
          >
            <span>Select File</span>
            <input
              type="file"
              accept="video/*"
              onChange={handleInputChange}
              className="uploadlogo"
            />
          </div>
          {fileName && <p>Selected Filename: {fileName}</p>}
          <Button
            disabled={fileData ? false : true}
            onClick={uploadVideo}
            style={{ width: "50%" }}
            color="#27a9e0"
            backgroundColor="black"
          >
            Upload
          </Button>
          {uploadError && <p style={{ color: "red" }}>{uploadError}</p>}
        </Paper>
      </Grid>
      <Footer />
    </Grid>
  );
}
