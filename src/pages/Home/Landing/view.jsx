import Banner from "../Common/banner";
import {
  Grid,
  TextField,
  Typography,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Footer from "../../../atoms/Footer";
import "../../../css/styles.css";
const View = ({ user }) => {
  return (
    <>
      <Banner user={user} />
      <Box
        sx={{
          backgroundColor: "#000000",
          backgroundImage:
            "linear-gradient(225deg, #000000 0%, #784BA0 50%, #043e50 100%)",
        }}
      >
        <Grid container>
          <Grid
            item
            md={12}
            sm={12}
            xs={12}
            justifyContent="center"
            display={"flex"}
          >
            <Typography
              variant="h3"
              component="div"
              p={5}
              className="typing-demo"
            >
              <span style={{ color: "white" }}>Media </span>
              <span>
                <i style={{ color: "lime" }}>Streaming</i>
              </span>
            </Typography>
          </Grid>
        </Grid>

        <Grid
          container
          spacing={2}
          direction="row"
          justifyContent="space-evenly"
          alignItems="center"
          mt={4}
        >
          <Grid item md={6} sm={12} textAlign="center">
            <Typography variant="h4" color={"lime"}>
              Enjoy Movies and Videos
            </Typography>
            <Typography variant="h5" color="white">
              Watch short videos and long videos <br />
              and more
            </Typography>
          </Grid>
          <Grid
            item
            md={6}
            sm={12}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <img
              src="https://cdn.wallpapersafari.com/20/76/yasrYd.jpg"
              alt=""
              width="50%"
            />
          </Grid>
        </Grid>
        <Grid container justifyContent="center">
          <Typography variant="h4" color="white">
            Frequently Asked Questions
          </Typography>
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
                backgroundColor: "rgb(3, 200, 117)",
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
                    What is VOD?
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="p" color="white">
                    VOD stands for Video On Demand which is a media distribution
                    system that allows users to access videos. With VOD, viewers
                    can choose what to watch, when they want.
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </Grid>
            <Grid
              item
              m={1}
              style={{
                backgroundColor: "rgb(3, 200, 117)",
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
            <Grid
              item
              m={1}
              style={{
                backgroundColor: "rgb(3, 200, 117)",
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
                    What is OTT Streaming?
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="p" color="white">
                    OTT stands for “over-the-top” and refers to the productized
                    practice of streaming content to customers directly over the
                    web.
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </Grid>
          </Grid>
        </Grid>
        <Footer />
      </Box>
    </>
  );
};

export default View;
