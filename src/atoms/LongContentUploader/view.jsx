import { useEffect, useState } from "react";
import { indexOpensearch, onLongVideoUpload } from "../../utils/api";
import { v4 as uuidv4 } from "uuid";
import { Button, SelectField } from "@aws-amplify/ui-react";
import {
  TextField,
  Select,
  MenuItem,
  InputLabel,
  Backdrop,
  CircularProgress,
  Paper,
  Grid,
  Checkbox,
  FormControlLabel,
} from "@mui/material";

import { uploadFile } from "../../utils/storage";
import defaultLanguages from "../../utils/config/language";
import defaultGenres from "../../utils/config/genres";
import "../../css/fileinput.css";
import Footer from "../Footer";

export default function View({ singOut, user }) {
  const [fileName, setFileName] = useState("");
  const [fileData, setFileData] = useState(null);
  const [filetype, setFiletype] = useState(null);
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState([]);
  const [language, setLanguage] = useState("");
  const [about, setAbout] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [isPremium, setIsPremium] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  useEffect(() => {}, []);
  const handleInputChange = (e) => {
    setUploadError(null);
    setFileName(e.target.files[0].name);
    setFileData(e.target.files[0]);
    setFiletype(e.target.files[0].type);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const handleGenreChange = (e) => {
    setGenre(e.target.value);
  };
  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };
  const handleAboutChange = (e) => {
    setAbout(e.target.value);
  };
  const handlePremiumChange = (e) => {
    setIsPremium((isPremium) => !isPremium);
  };
  const uploadVideo = async () => {
    if (
      !fileName ||
      !fileData ||
      !filetype ||
      !title ||
      !genre ||
      !language ||
      !about
    ) {
      setUploadError("Invalid Input");
      return;
    }
    if (about.length > 200) {
      setUploadError("About field must be less than 200 Characters.");
      return;
    }
    setIsUploading(true);

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
      "longVideos"
    );
    console.log("RES LOG:", res);
    let sourceBucketFilePath = `/public/${res.key}`;
    let reqBody = new Object({
      id: fileId,
      name: fileName,
      title: title,
      uploadedBy: user.attributes.email,
      about: about,
      sourceBucketFilePath: sourceBucketFilePath,
      genres: genre,
      language: language,
      createdAt: Date.now(),
      isDeleted: false,
      isPremium,
    });
    console.log("Request Body: ", reqBody);
    await onLongVideoUpload(reqBody);
    console.log("Updated Database");
    console.log("File uploaded successfully.");
    let indexData = {
      id: fileId,
      title: title,
      genres: genre,
      about: about,
      _index: "videos",
      _type: "_doc",
    };
    await indexOpensearch(indexData);
    setIsUploading(false);
    window.location.href = "/long-content";
  };

  return (
    <div
      style={{
        textAlign: "center",
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

      <Grid
        container
        direction="column"
        justifyContent="center"
        textAlign="center"
        alignItems="center"
        height="100vh"
      >
        <h2>Upload Video</h2>
        <div style={{ margin: "10px" }}>
          <TextField
            id="outlined-name"
            label="Title"
            value={title}
            onChange={handleTitleChange}
            style={{ width: "35vw" }}
          />
        </div>
        <div style={{ margin: "10px" }}>
          <TextField
            id="outlined-name"
            label="About"
            value={about}
            onChange={handleAboutChange}
            style={{ width: "35vw" }}
          />
        </div>
        <div>
          <InputLabel
            id="genre-select-label"
            style={{ display: "flex", justifyContent: "left" }}
          >
            Genre
          </InputLabel>
          <Select
            labelId="genre-select-label"
            id="genre-select"
            value={genre}
            onChange={handleGenreChange}
            multiple
            style={{ width: "35vw" }}
          >
            {defaultGenres.map((defaultGenre) => (
              <MenuItem key={defaultGenre} value={defaultGenre}>
                {defaultGenre}
              </MenuItem>
            ))}
          </Select>
        </div>
        <div>
          <InputLabel
            id="language-select-label"
            style={{ display: "flex", justifyContent: "left" }}
          >
            Language
          </InputLabel>
          <Select
            labelId="language-select-label"
            id="language-select"
            value={language}
            onChange={handleLanguageChange}
            style={{ width: "35vw" }}
          >
            {defaultLanguages.map((defaultLanguage) => {
              return (
                <MenuItem key={defaultLanguage} value={defaultLanguage}>
                  {defaultLanguage}
                </MenuItem>
              );
            })}
          </Select>
        </div>
        <div>
          <FormControlLabel
            control={
              <Checkbox checked={isPremium} onChange={handlePremiumChange} />
            }
            label="Premium Content"
          />
        </div>
        <div
          className="fileUpload blue-btn btn width100"
          style={{ width: "35vw", textAlign: "center", margin: "5px" }}
        >
          <span>Select File</span>
          <input
            type="file"
            accept="video/*"
            onChange={handleInputChange}
            className="uploadlogo"
          />
        </div>
        {uploadError && <p style={{ color: "red" }}>{uploadError}</p>}

        <Button
          onClick={uploadVideo}
          disabled={fileData ? false : true}
          color="white"
          backgroundColor="black"
          width="35vw"
        >
          Upload
        </Button>
      </Grid>
      <div style={{ position: "absolute", left: "0", right: "0" }}>
        <Footer />
      </div>
    </div>
  );
}
