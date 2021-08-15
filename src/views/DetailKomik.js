import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import { red } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import clsx from "clsx";
import Typography from "@material-ui/core/Typography";
import { Helmet } from "react-helmet";
import { ChapterItem } from "../components";

const useStyles = makeStyles((theme) => ({
  root: {
    // maxWidth: 345,
    width: "90%",
    // marginRight: 30,
    // marginBottom: 20,
    margin: "10px auto",
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      margin: "0px 0px",
    },

    // alignSelf: "center",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
  list: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  contentBottom: {
    marginTop: "auto",
  },
  thumbnailImage: {
    margin: "10px auto",
    width: 300,
    borderRadius: 10,
    [theme.breakpoints.down("sm")]: {
      width: 250,
    },
  },
  showOverflow: {
    color: theme.palette.primary.main,
    cursor: "pointer",
    width: 100,
  },
}));

export default function DetailKomik() {
  const classes = useStyles();
  let { slug } = useParams();
  const { REACT_APP_API_URL } = process.env;

  const [mangaDetail, setmangaDetail] = useState(null);
  const [showMore, setShowMore] = useState(false);
  const fetchMangaDetail = () => {
    axios
      .get(`${REACT_APP_API_URL}api/manga/detail/${slug}`)
      .then((res) => {
        console.log(res.data);
        setmangaDetail(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchMangaDetail();
  }, []);

  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{mangaDetail ? mangaDetail.title : "Detail Manga"}</title>
      </Helmet>
      {mangaDetail !== null ? (
        <Card className={classes.root}>
          <img
            src={mangaDetail.thumb}
            alt=""
            // style={{
            //   borderRadius: 10,
            //   maxWidth: "100%",
            //   width: "250px",
            //   height: "auto",
            //   margin: "10px auto",
            // }}
            className={clsx(classes.thumbnailImage)}
          />
          {/* <CardHeader
            title={mangaDetail.title}
            subheader={
              <div>
                
              </div>
            }
            titleTypographyProps={{ variant: "h5" }}
          /> */}
          <div style={{ margin: "10px 20px" }}>
            <Typography variant="h5">{`${mangaDetail.title}`}</Typography>
            <Typography variant="subtitle2">{`${mangaDetail.type} - ${mangaDetail.status}`}</Typography>
            <Typography variant="subtitle2">{`By ${mangaDetail.author}`}</Typography>
            <Typography
              variant="subtitle2"
              style={{ marginBottom: 10 }}
            >{`Genre : ${mangaDetail.genre_list.map((item, index) => {
              return `${item.genre_name}, `;
            })}`}</Typography>
            <Typography variant="h6">Synopsis</Typography>
            <Typography
              variant="body1"
              align="justify"
              style={{
                maxHeight: showMore ? "100%" : 90,
                overflow: showMore ? "visible" : "hidden",
                marginBottom: 10,
              }}
            >
              {mangaDetail.synopsis}
            </Typography>
            <Typography
              variant="body1"
              align="justify"
              className={clsx(classes.showOverflow)}
              onClick={() => {
                setShowMore(!showMore);
              }}
            >
              Show {showMore ? "Less" : "More"}
            </Typography>

            <Typography variant="h6">Chapter</Typography>
            {mangaDetail.chapter.map((item, index) => {
              return (
                <ChapterItem
                  key={index}
                  chapter={item.chapter_title}
                  slug={item.chapter_endpoint}
                />
              );
            })}
          </div>
        </Card>
      ) : null}
    </div>
  );
}
