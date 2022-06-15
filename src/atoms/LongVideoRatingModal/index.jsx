import Box from "@mui/material/Box";
import { Button } from "@aws-amplify/ui-react";
import Modal from "@mui/material/Modal";
import { Typography, Rating, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { rateLongVideos } from "../../utils/api";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  textAlign: "center",
};

export default function View({
  user,
  video,
  isRatingModalOpen,
  handleRatingModalOpen,
  handleRatingModalClose,
}) {
  const [ratingValue, setRatingValue] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const submitRating = async () => {
    //Make API CALL
    console.log("USER LOG:", user);
    setIsLoading(true);
    let reqBody = {
      videoId: video.id,
      user: user.attributes.email,
      createdAt: Date.now(),
      rating: ratingValue,
    };
    console.log("ReqBody: ", reqBody);
    await rateLongVideos(reqBody);
    console.log("Submitted Rating");
    setIsLoading(false);
    handleRatingModalClose();
  };

  return (
    <div style={{margin:"5px"}}>
      <Button
        width="100%"
        color="#fe4141"
        border="solid 1px #fe4141"
        onClick={handleRatingModalOpen}
      >
        Submit Your Rating
      </Button>
      <Modal
        open={isRatingModalOpen}
        onClose={handleRatingModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Submit your rating
          </Typography>
          <Rating
            name="simple-controlled"
            value={ratingValue}
            onChange={(event, newValue) => {
              setRatingValue(newValue);
            }}
          />
          <Typography>
            <Button onClick={submitRating}>Submit</Button>
          </Typography>
          {isLoading && <CircularProgress />}
        </Box>
      </Modal>
    </div>
  );
}
