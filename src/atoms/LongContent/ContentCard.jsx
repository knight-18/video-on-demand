import { Typography, Rating, Paper, Grid } from "@mui/material";
import { Button } from "@aws-amplify/ui-react";
import StarIcon from "@mui/icons-material/Star";
// import "../../css/content-card.css";
const ContentCard = ({ video }) => {
  return (
    <div>
      <Paper elevation={5}>
        {video.isPremium && (
          <StarIcon
            style={{ position: "absolute", color: "aqua", margin: "-5px" }}
          />
        )}
        <Grid
          container
          direction="column"
          p={1}
          style={{
            backgroundColor: "#1e1b26",
            height: "40vh",
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <Grid item>
            <Typography variant="h4" color="#e7e7e7">
              {video.title.length > 36
                ? `${video.title.slice(0, 35)}...`
                : video.title}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="p" color="#818181" fontSize="12px">
              {video.language} / {video.genres.join(",")}
            </Typography>
          </Grid>
          <Grid item alignItems="center">
            <Rating
              name="read-only"
              value={video.averageRating ? video.averageRating : 1}
              readOnly
            />
          </Grid>
          <Grid item mt={1}>
            <Typography variant="p" color="#e7e7e7">
              SUMMARY
            </Typography>
            <br />
            <Typography variant="p" color="#818181" fontSize="12px">
              {video.title.length > 20
                ? `${video.about.slice(0, 100)}...`
                : video.about}
            </Typography>
          </Grid>

          <Grid item>
            <Button
              width="100%"
              color="#fe4141"
              border="solid 1px #fe4141"
              onClick={() =>
                (window.location.href = `/long-content-player?id=${video.id}`)
              }
            >
              Watch Now
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default ContentCard;
