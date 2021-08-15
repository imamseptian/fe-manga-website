import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import React, { createRef, useEffect, useState } from "react";
import { CardHome, HomeComicSection, Loader, Shimmer } from "../components";
import { Helmet } from "react-helmet";
const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
    minWidth: 125,
  },
  myWrapper: {
    overflowX: "auto",
    maxWidth: "90vw",
    margin: "0 auto",
    display: "flex",
    // border: 1px solid #ddd;
    // display: flex;
    // overflow-x: auto;
    // max-width: 90vw;
    // margin: 0px auto;
  },
}));

export default function Home() {
  const classes = useStyles();
  const [mangaList, setmangaList] = useState([]);
  const [popularList, setpopularList] = useState([]);
  const [recommendedList, setrecommendedList] = useState([]);
  const [manhuaList, setmanhuaList] = useState([]);
  const [manhwaList, setmanhwaList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchManga();
  }, []);

  const fetchManga = () => {
    setIsLoading(true);

    const { REACT_APP_API_URL } = process.env;

    let mangaUrl = axios.get(`${REACT_APP_API_URL}api/manga/page/1`);
    let popularUrl = axios.get(`${REACT_APP_API_URL}api/manga/popular/1`);
    let recommendedUrl = axios.get(`${REACT_APP_API_URL}api/recommended`);
    let manhuaUrl = axios.get(`${REACT_APP_API_URL}api/manhua/1`);
    let manhwaUrl = axios.get(`${REACT_APP_API_URL}api/manhwa/1`);
    axios
      .all([mangaUrl, popularUrl, recommendedUrl, manhuaUrl, manhwaUrl])
      .then(
        axios.spread((...responses) => {
          setmangaList(responses[0].data.manga_list);
          setpopularList(responses[1].data.manga_list);
          setrecommendedList(responses[2].data.manga_list);
          setmanhuaList(responses[3].data.manga_list);
          setmanhwaList(responses[4].data.manga_list);
          setIsLoading(false);

          // use/access the results
        })
      )
      .catch((errors) => {
        // alert("error");
        setIsLoading(false);
        // react on errors.
      });
    // axios
    //   .get(`http://localhost:4000/api/manga/page/1`)
    //   .then((res) => {
    //     // console.log(res.data.manga_list);
    //     setmangaList(res.data.manga_list);
    //     setIsLoading(false);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     setIsLoading(false);
    //   });

    //   axios
    //   .get(`http://localhost:4000/api/manga/popular/1`)
    //   .then((res) => {
    //     // console.log(res.data.manga_list);
    //     setpopularList(res.data.manga_list);
    //     setIsLoading(false);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     setIsLoading(false);
    //   });
  };

  const shimmerVal = [
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  ];

  const ShimmerPlaceHolder = () => {
    return (
      <Box
        display="flex"
        flexWrap="wrap"
        p={1}
        m={1}
        //   bgcolor="blue"
        justifyContent="center"
        //   sx={{ maxWidth: 1000 }}
      >
        {shimmerVal.map((item, index) => {
          return <Shimmer />;
        })}
      </Box>
    );
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  const ListManga = () => {
    return (
      <Box
        display="flex"
        flexWrap="wrap"
        p={1}
        m={1}
        // bgcolor="blue"
        justifyContent="center"
        //   sx={{ maxWidth: 1000 }}
      >
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
  };

  return (
    <div>
      {isLoading ? <Loader /> : null}
      <Helmet>
        <meta charSet="utf-8" />
        <title>Pepe-Manga Homepage</title>
      </Helmet>
      <HomeComicSection
        title={"Populer"}
        isLoading={isLoading}
        mangaList={popularList}
        keyword="popular"
        endpoint="/popular/1"
      />

      <HomeComicSection
        title={"Update Terbaru"}
        isLoading={isLoading}
        mangaList={mangaList}
        keyword="manga"
        endpoint="/komik/1"
      />

      <HomeComicSection
        title={"Rekomendasi"}
        isLoading={isLoading}
        mangaList={recommendedList}
        keyword="recommended"
      />

      <HomeComicSection
        title={"Manhwa"}
        isLoading={isLoading}
        mangaList={manhwaList}
        keyword="manga"
        endpoint="/manhwa/1"
      />

      <HomeComicSection
        title={"Manhua"}
        isLoading={isLoading}
        mangaList={manhuaList}
        keyword="manga"
        endpoint="/manhua/1"
      />

      {/* {isLoading ? <ShimmerPlaceHolder /> : <ListManga />}
      <Box justifyContent="center" style={{ width: "100%", display: "flex" }}>
        <NavLink
          exact
          activeClassName="text-warning"
          aria-current="page"
          style={{
            color: "white",
            textDecoration: "none",
          }}
          to={`/komik/2`}
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
      </Box> */}
    </div>
  );
}
