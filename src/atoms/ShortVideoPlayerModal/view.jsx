import Box from "@mui/material/Box";
import { Button } from "@aws-amplify/ui-react";
import Modal from "@mui/material/Modal";
import VideoPlayer from "../VideoPlayer";
import { useEffect, useState } from "react";
import { getShortVideo, likeShortVideo, queryDB } from "../../utils/api";
import { getShortVideoRenderUrl } from "../../utils";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60vw",
  height: "auto",
};

export default function ShortVideoPlayerModal({
  user,
  isModalOpen,
  handleModalOpen,
  handleModalClose,
  isLoading,
  setIsLoading,
}) {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [videoList, setVideoList] = useState([]);
  const [lastVideo, setLastVideo] = useState(null);
  const [currentVideoUrl, setCurrentVideoUrl] = useState("");
  const [currentVideoId, setCurrentVideoId] = useState(null);
  const [isLikeButtonDisabled, setIsLikeButtonDisabled] = useState(true);

  //Function to fetch first video from Database
  const getFirstVideo = async () => {
    setIsLoading(true);
    let reqParams = {
      limit: 1,
    };
    let data = await getShortVideo(reqParams);
    if (data.Items.length === 0 || !data.Items[0].destinationBucketFilePath) {
      setIsLoading(false);
      return;
    }
    await isVideoLiked(data.Items[0].id);
    setVideoList(data.Items);
    setLastVideo(data.LastEvaluatedKey);
    setCurrentVideoIndex(0);
    setCurrentVideoUrl(
      getShortVideoRenderUrl(data.Items[0].destinationBucketFilePath[0])
    );
    setCurrentVideoId(data.Items[0].id);
    setIsLoading(false);
  };

  //Fetch next video and start playing
  const getNextVideo = async () => {
    setIsLoading(true);
    let reqParams = {
      limit: 1,
      LastEvaluatedKey: lastVideo,
    };
    let data = await getShortVideo(reqParams);
    if (data.Items.length === 0) {
      return;
    }
    await isVideoLiked(data.Items[0].id);
    setVideoList([...videoList, ...data.Items]);
    setLastVideo(data.LastEvaluatedKey);
    setCurrentVideoIndex((currentVideoIndex) => currentVideoIndex + 1);
    setCurrentVideoUrl(
      getShortVideoRenderUrl(data.Items[0].destinationBucketFilePath[0])
    );

    setCurrentVideoId(data.Items[0].id);
    setIsLoading(false);
  };
  //Go to previosly played video
  const getPreviousVideo = async () => {
    setIsLoading(true);
    await isVideoLiked(videoList[currentVideoIndex - 1].id);
    setCurrentVideoIndex((currentVideoIndex) => currentVideoIndex - 1);
    setCurrentVideoUrl(
      getShortVideoRenderUrl(
        videoList[currentVideoIndex - 1].destinationBucketFilePath[0]
      )
    );
    setCurrentVideoId(videoList[currentVideoIndex - 1].id);
    setIsLoading(false);
  };

  const handleLikeClick = async () => {
    let body = {
      user: user.attributes.email,
      videoId: currentVideoId,
      createdAt: Date.now(),
    };
    console.log("Like request Body:", body);
    await likeShortVideo(body);
    setIsLikeButtonDisabled(true);
  };

  const isVideoLiked = async (videoId) => {
    let params = {
      keyConditions: [
        {
          attributeName: "videoId",
          comparisonOperator: "EQ",
          attributeValueList: [videoId],
        },
        {
          attributeName: "user",
          comparisonOperator: "EQ",
          attributeValueList: [user.attributes.email],
        },
      ],
      tableName: process.env.REACT_APP_SHORT_VIDEO_LIKES_TABLE,
    };
    let queryRes = await queryDB(params);
    let isLiked = queryRes.Items.length;
    if (isLiked) {
      setIsLikeButtonDisabled(true);
    } else {
      setIsLikeButtonDisabled(false);
    }
    return isLiked;
  };

  //Fetch first video from database
  useEffect(() => {
    getFirstVideo();
  }, []);

  return (
    <div style={{ position: "relative", top: "50%", display: "inline-block" }}>
      <Button onClick={handleModalOpen} backgroundColor="black" color="white">
        Discover Now
      </Button>

      <Modal
        open={isModalOpen}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <VideoPlayer videoUrl={currentVideoUrl} autoplay={true} />
          <div style={{ justifyContent: "space-between", display: "flex" }}>
            {currentVideoIndex > 0 && (
              <Button
                onClick={async () => await getPreviousVideo()}
                backgroundColor="black"
                color="white"
              >
                Prev
              </Button>
            )}
            <Button disabled={isLikeButtonDisabled} onClick={handleLikeClick}>
              <FavoriteIcon
                style={{ color: isLikeButtonDisabled ? "red" : "white" }}
              />
            </Button>
            <Button
              onClick={getNextVideo}
              backgroundColor="black"
              color="white"
            >
              Next
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
