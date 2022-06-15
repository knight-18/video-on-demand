import { Grid } from "@material-ui/core";
import { Typography, CircularProgress, Backdrop, Rating } from "@mui/material";
import { Button } from "@aws-amplify/ui-react";
import VideoPlayer from "../../atoms/VideoPlayer";
import { useEffect, useState } from "react";
import LongVideoRatingModal from "../../atoms/LongVideoRatingModal";
import { queryDB } from "../../utils/api";
import { useSearchParams } from "react-router-dom";
import { getLongVideoRenderUrl } from "../../utils";
import Footer from "../../atoms/Footer";

export default function View({ user }) {
  const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);
  const handleRatingModalOpen = () => setIsRatingModalOpen(true);
  const handleRatingModalClose = () => setIsRatingModalOpen(false);
  const [ratingValue, setRatingValue] = useState(2);

  const [URLSearchParams] = useSearchParams();
  const [video, setVideo] = useState(null);
  const [videoUrl, setVideoUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fetchVideoDetails = async () => {
    setIsLoading(true);
    let videoId = URLSearchParams.get("id");
    let queryParams = {
      keyConditions: [
        {
          attributeName: "id",
          comparisonOperator: "EQ",
          attributeValueList: [videoId],
        },
      ],
      tableName: process.env.REACT_APP_LONG_VIDEOS_TABLE_NAME,
    };

    let data = await queryDB(queryParams);
    let fetchedData = data.Items[0];
    console.log("Fetched Data:", fetchedData);
    setVideo(fetchedData);
    setVideoUrl(
      getLongVideoRenderUrl(fetchedData.destinationBucketFilePath[0])
    );
    setIsLoading(false);
  };

  useEffect(() => {
    fetchVideoDetails();
  }, []);

  return (
    <div>
      {isLoading && (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isLoading}
        >
          <CircularProgress color="primary" />
        </Backdrop>
      )}
      {!isLoading && video && (
        <div
          style={{
            padding: "4px",
            background:
              "url(https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974)",
          }}
        >
          <Grid container p={0} m={0}>
            <Grid item xs={12} sm={12} md={12}>
              <VideoPlayer
                // videoUrl="https://d3u60069gw2t12.cloudfront.net/public/shortVideos/6792adab-701e-4166-bd06-6a6254225f1f/AppleHLS1/6792adab-701e-4166-bd06-6a6254225f1f.m3u8"
                videoUrl={videoUrl}
                autoplay={false}
              />
            </Grid>
          </Grid>

          <Grid
            container
            direction="column"
            style={{
              marginTop: "-6px",
            }}
          >
            <Grid item>
              <Typography variant="h4" color="#e7e7e7" p={2}>
                {video.title}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="p" color="#818181" fontSize="12px" p={2}>
                2h 49min / {video.language} / {video.genres.join(",")}
              </Typography>
            </Grid>
            <Grid item alignItems="center">
              <Typography variant="p" p={2}>
                <Rating
                  name="read-only"
                  value={video.averageRating ? video.averageRating : 1}
                  readOnly
                />
              </Typography>
            </Grid>
            <Grid item mt={1} p={2}>
              <Typography variant="p" color="#e7e7e7" p={2}>
                SUMMARY
              </Typography>
              <br />
              <Typography variant="p" color="#818181" fontSize="12px" p={2}>
                {video.about}
              </Typography>
            </Grid>
            <Grid item>
              <LongVideoRatingModal
                user={user}
                video={video}
                isRatingModalOpen={isRatingModalOpen}
                handleRatingModalOpen={handleRatingModalOpen}
                handleRatingModalClose={handleRatingModalClose}
              />
            </Grid>
          </Grid>
        </div>
      )}
      <Footer />
    </div>
  );
}
