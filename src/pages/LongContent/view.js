import { useEffect, useState } from "react";
import {
  Grid,
  Select,
  MenuItem,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import defaultLanguages from "../../utils/config/language";
import defaultGenres from "../../utils/config/genres";
import { getLongVideos, fetchOpensearch } from "../../utils/api";
import "../../css/searchbar.css";
import Footer from "../../atoms/Footer";
import ContentCard from "../../atoms/LongContent/ContentCard";

export default function View({ user }) {
  const filterMap = {
    "Filter By Genre": defaultGenres,
    "Filter By Language": defaultLanguages,
  };
  const MAX_VIDEOS_ON_PAGE = 9;
  const availableFiltersKeys = Object.keys(filterMap);
  const [filterType, setFilterType] = useState(availableFiltersKeys[0]);
  const [filterValue, setFilterValue] = useState(
    filterMap[availableFiltersKeys[0]][0]
  );
  const [videoList, setVideoList] = useState([]);
  const [currentVideoList, setCurrentVideoList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [lastEvaluatedKey, setLastEvaluatedKey] = useState(null);
  const [isNextEnabled, setIsNextEnabled] = useState(true);
  const [isPrevEnabled, setIsPrevEnabled] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const handleFilterChange = (e) => {
    setVideoList([]);
    setLastEvaluatedKey(null);
    setFilterType(e.target.value);
    setFilterValue(filterMap[e.target.value][0]);
    setPage(1);
  };
  const handleFilterValueChange = (e) => {
    setVideoList([]);
    setLastEvaluatedKey(null);
    setPage(1);
    setFilterValue(e.target.value);
  };
  const handleSearchInputChange = (e) => {
    let query = e.target.value;
    setSearchInput(e.target.value);
    if (query.length > 2) {
      setShowSearchResults(true);
      setIsSearchLoading(true);
      fetchOpensearch(query).then((response) => {
        setSearchResults(response.data.hits.hits);
        setIsSearchLoading(false);
      });
    } else {
      setShowSearchResults(false);
      setIsSearchLoading(false);
    }
  };
  const fetchVideos = async () => {
    setIsLoading(true);
    let reqBody = {
      filterType: filterType,
      filterValue: filterValue,
    };
    if (lastEvaluatedKey) {
      reqBody.lastEvaluatedKey = lastEvaluatedKey;
    }
    console.log("Sending Request: ", reqBody);
    let queryResponse = await getLongVideos(reqBody);
    console.log("REPONSE DATA:", queryResponse.data);

    if (queryResponse.data.LastEvaluatedKey) {
      setLastEvaluatedKey(queryResponse.data.LastEvaluatedKey);
    } else {
      setLastEvaluatedKey(null);
    }
    if (
      queryResponse.data.Responses[process.env.REACT_APP_LONG_VIDEOS_TABLE_NAME]
        .length === 0
    )
      setIsNextEnabled(false);
    else setIsNextEnabled(true);
    setVideoList([
      ...videoList,
      ...queryResponse.data.Responses[
        process.env.REACT_APP_LONG_VIDEOS_TABLE_NAME
      ],
    ]);
    setIsLoading(false);
    return [
      ...videoList,
      ...queryResponse.data.Responses[
        process.env.REACT_APP_LONG_VIDEOS_TABLE_NAME
      ],
    ];
  };

  const handleNextButtonClick = async () => {
    let videoResponse = await fetchVideos();
    let startingIndex = page * MAX_VIDEOS_ON_PAGE;
    let endIndex = startingIndex + MAX_VIDEOS_ON_PAGE;
    setCurrentVideoList(videoResponse.slice(startingIndex, endIndex));
    setPage((page) => page + 1);
    setIsPrevEnabled(true);
  };
  const handlePrevButtonClick = async () => {
    let startingIndex = (page - 2) * MAX_VIDEOS_ON_PAGE;
    let endIndex = startingIndex + MAX_VIDEOS_ON_PAGE;
    setCurrentVideoList(videoList.slice(startingIndex, endIndex));
    setPage((page) => page - 1);
    if (page === 2) setIsPrevEnabled(false);
  };

  useEffect(() => {
    fetchVideos().then((videoResponse) => setCurrentVideoList(videoResponse));
  }, [filterType, filterValue]);

  return (
    <>
      <div
        style={{
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "grayscale",
          backgroundRepeat: "repeat-y",
          backgroundSize: "cover",
          background:
            "url(https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974)",
          height: "auto",
          width: "auto",
          minWidth: "100%",
          minHeight: "100%",
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
        <Grid
          container
          textAlign="center"
          alignItems="center"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <Grid item md={12} sm={12}>
            <div className="search-container">
              <div className="search-box">
                <div className="search-icon">
                  <i className="fa fa-search"></i>
                </div>
                <input
                  className="search-input"
                  id="search"
                  type="text"
                  placeholder="What are you looking for ?"
                  onChange={handleSearchInputChange}
                />
                <ul className="search-results" id="results">
                  {showSearchResults &&
                    searchResults.map((searchResult) => {
                      return (
                        <a
                          key={searchResult._id}
                          href={`/long-content-player?id=${searchResult._id}`}
                          style={{ textDecoration: "none", color: "white" }}
                        >
                          <li>{searchResult._source.title}</li>
                        </a>
                      );
                    })}
                </ul>
              </div>
            </div>
          </Grid>
        </Grid>
        <Grid
          container
          direction="row"
          spacing={2}
          textAlign="center"
          alignItems="center"
          justifyContent="space-evenly"
          mb={3}
        >
          {/* <Grid item md={6} sm={6}>
            <Button>
              <a
                href="/upload-long-content"
                style={{ textDecoration: "none", color: "grey" }}
              >
                Upload Video
              </a>
            </Button>
          </Grid> */}
          <Grid item md={6} sm={6}>
            <div>
              <Select
                labelId="filter-type-select-label"
                id="filter-type-select"
                value={filterType}
                onChange={handleFilterChange}
                style={{
                  borderBottom: "grey solid 2px",
                  color: "grey",
                }}
              >
                {availableFiltersKeys.map((filter) => {
                  return (
                    <MenuItem value={filter} key={filter}>
                      {filter}
                    </MenuItem>
                  );
                })}
              </Select>
              <Select
                labelId="filter-value-select-label"
                id="filter-value-select"
                value={filterValue}
                onChange={handleFilterValueChange}
                style={{
                  borderBottom: "grey solid 2px",
                  color: "grey",
                }}
              >
                {filterMap[filterType].map((filter) => {
                  return (
                    <MenuItem value={filter} key={filter}>
                      {filter}
                    </MenuItem>
                  );
                })}
              </Select>
            </div>
          </Grid>
        </Grid>

        <Grid container spacing={2} justifyContent="space-evenly">
          {currentVideoList &&
            currentVideoList.map((video) => {
              return (
                <Grid item md={3} sm={5} xs={12} m={1} key={video.id}>
                  <ContentCard video={video} />
                </Grid>
              );
            })}
        </Grid>
        {/* <Grid container mt={2} pb={2}>
          <Grid
            item
            md={12}
            sm={12}
            style={{ display: "flex", justifyContent: "center" }}
            alignItems="center"
            alignContent="center"
          >
            {isPrevEnabled && (
              <Button onClick={handlePrevButtonClick} color="white">
                Prev
              </Button>
            )}
            <Typography variant="p" color="white" m={1}>
              Page: {page}
            </Typography>
            {isNextEnabled && (
              <Button onClick={handleNextButtonClick} color="white">
                Next
              </Button>
            )}
          </Grid>
        </Grid> */}
      </div>
      <Footer />
    </>
  );
}
