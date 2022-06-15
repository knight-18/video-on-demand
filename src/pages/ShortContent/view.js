import { Button } from "@aws-amplify/ui-react";
import { makeStyles } from "@material-ui/core/styles";
import { useEffect, useState } from "react";
import ShortVideoPlayerModal from "../../atoms/ShortVideoPlayerModal";
import {
  Paper,
  Grid,
  Box,
  Typography,
  Backdrop,
  CircularProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import axios from "axios";
import Footer from "../../atoms/Footer";
const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(12, 4),
  },
  card: {
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    border: "1px solid black",
    borderRadius: "5px",
    textAlign: "center",
  },
  icon: {
    padding: theme.spacing(2, 0),
  },
  title: {
    padding: theme.spacing(2),
  },
  featureList: {
    padding: theme.spacing(2),
  },
}));
export default function View({ user }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleModalOpen = () => setIsModalOpen(true);
  const handleModalClose = () => setIsModalOpen(false);
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div
      style={{
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        background:
          "url(https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974)",
        // height:"100vh"
      }}
    >
      {isLoading && (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isLoading}
        >
          <CircularProgress color="primary" />
        </Backdrop>
      )}

      <Grid container direction="row">
        <Grid item md={12} sm={12} m={2}>
          <Paper
            elevation={5}
            style={{
              backgroundColor: "#000000",
              backgroundImage:
                "linear-gradient(225deg, #000000 0%, #784BA0 50%, #043e50 100%)",
              color: "white",
              alignItems: "center",
              alignContent: "center",
              textAlign: "left",
              padding: "2%",
              minHeight: "50vh",
            }}
          >
            <Grid
              container
              direction="column"
              style={{
                dipslay: "flex",
                justifyContent: "space-around",
              }}
            >
              <Grid item>
                <Typography variant="h4">Social Media Streaming</Typography>
                <Typography variant="h2">
                  Short, entertaining <br /> videos to express your creativity
                </Typography>
              </Grid>
              <Grid item mt="5px">
                <ShortVideoPlayerModal
                  user={user}
                  isModalOpen={isModalOpen}
                  handleModalOpen={handleModalOpen}
                  handleModalClose={handleModalClose}
                  isLoading={isLoading}
                  setIsLoading={setIsLoading}
                />
                <Button
                  backgroundColor="black"
                  color="white"
                  onClick={() => {
                    window.location.href = "/upload-short-content";
                  }}
                  style={{ display: "inline-block", marginLeft: "5px" }}
                >
                  Upload Video
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid container justifyContent="center" m={2}>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <Grid
              item
              m={1}
              style={{
                backgroundColor: "#1cd71c",
                width: "40%",
                borderRadius: "5px",
              }}
            >
              <Accordion style={{ backgroundColor: "rgb(3, 200, 117)" }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography variant="h5" color="white">
                    What is Social Media Streaming?
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="p" color="white">
                    Social Media Streaming refers to the short, entertaining
                    videos. Users can interact with the videos and also express
                    their creativity.
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <div style={{ position: "absolute", left: "0", right: "0", bottom: "0" }}>
        <Footer />
      </div>
    </div>
  );
}
