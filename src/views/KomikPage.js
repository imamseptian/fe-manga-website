import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import NextIcon from "@material-ui/icons/SkipNext";
import PrevIcon from "@material-ui/icons/SkipPrevious";
import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { NavLink, useHistory, useParams } from "react-router-dom";
import { CardHome, Loader, Shimmer } from "../components";
import { Helmet } from "react-helmet";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
    minWidth: 125,
  },
}));

export default function KomikPage({ title, endpoint, keyword, reactPath }) {
  const classes = useStyles();
  const topSectionRef = useRef(null);

  const [mangaList, setmangaList] = useState([]);

  let { page } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const { REACT_APP_API_URL } = process.env;

  useEffect(() => {
    fetchManga();
    topSectionRef.current.scrollIntoView({ behavior: "smooth" });
  }, [page]);

  const fetchManga = () => {
    setIsLoading(true);
    axios
      .get(`${REACT_APP_API_URL}api/${endpoint}/${page}`)
      .then((res) => {
        // console.log(res.data.manga_list);
        setmangaList(res.data.manga_list);
        // console.log(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  const shimmerVal = [
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  ];

  const ShimmerPlaceHolder = () => {
    return (
      <Box display="flex" flexWrap="wrap" p={1} m={1} justifyContent="center">
        {shimmerVal.map((item, index) => {
          return <Shimmer />;
        })}
      </Box>
    );
  };

  const ListManga = () => {
    return (
      <Box display="flex" flexWrap="wrap" p={1} m={1} justifyContent="center">
        {mangaList.map((item, index) => {
          return (
            <CardHome
              key={index}
              title={item.title}
              thumbnail={item.thumb}
              type={item.type}
              updated_on={keyword === "all" ? item.updated_on : item.upload_on}
              chapter={item.chapter}
              slug={item.endpoint}
            />
          );
        })}
      </Box>
    );
  };

  return (
    <div ref={topSectionRef}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>
          {title} | Page {page}
        </title>
      </Helmet>
      {isLoading ? <Loader /> : null}
      <Typography paragraph variant="h5" align="center">
        {title}
      </Typography>
      {isLoading ? <ShimmerPlaceHolder /> : <ListManga />}
      <Box justifyContent="center" style={{ width: "100%", display: "flex" }}>
        {parseInt(page) > 1 ? (
          <NavLink
            exact
            style={{
              color: "white",
              textDecoration: "none",
            }}
            to={`/${reactPath}/${parseInt(page) - 1}`}
          >
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              startIcon={<PrevIcon />}
              disabled={isLoading}
            >
              Previous
            </Button>
          </NavLink>
        ) : null}
        <NavLink
          exact
          style={{
            color: "white",
            textDecoration: "none",
          }}
          to={`/${reactPath}/${parseInt(page) + 1}`}
        >
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            endIcon={<NextIcon />}
            disabled={isLoading}
          >
            Next
          </Button>
        </NavLink>
      </Box>
    </div>
  );
}
