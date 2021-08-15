import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import NextIcon from "@material-ui/icons/SkipNext";
import PrevIcon from "@material-ui/icons/SkipPrevious";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, useHistory, useParams } from "react-router-dom";
import { CardHome, Loader, Shimmer } from "../components";
import { Helmet } from "react-helmet";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
    minWidth: 125,
  },
}));

export default function SearchKomik() {
  const classes = useStyles();

  const [mangaList, setmangaList] = useState([]);

  let { query } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const { REACT_APP_API_URL } = process.env;

  useEffect(() => {
    fetchManga();
  }, [query]);

  const fetchManga = () => {
    setIsLoading(true);
    axios
      .get(`${REACT_APP_API_URL}api/search/${query}`)
      .then((res) => {
        // console.log(res.data.manga_list);
        setmangaList(res.data.manga_list);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  const shimmerVal = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

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
    if (mangaList.length > 0) {
      return (
        <Box display="flex" flexWrap="wrap" p={1} m={1} justifyContent="center">
          {mangaList.map((item, index) => {
            return (
              <CardHome
                key={index}
                title={item.title}
                thumbnail={item.thumb}
                type={item.type}
                updated_on={item.updated_on}
                chapter={item.chapter}
                slug={item.endpoint}
              />
            );
          })}
        </Box>
      );
    } else {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            height: "70vh",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography paragraph variant="h4" align="center">
            Maaf Manga yang Anda Cari Tidak Ditemukan
          </Typography>
        </div>
      );
    }
  };

  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Cari Manga {decodeURIComponent(query)}</title>
      </Helmet>
      {isLoading ? <Loader /> : null}
      <Typography paragraph variant="h5" align="center">
        Hasil Pencarian : {mangaList.length}
      </Typography>
      {isLoading ? <ShimmerPlaceHolder /> : <ListManga />}
    </div>
  );
}
