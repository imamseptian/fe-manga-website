import React from "react";
import Typography from "@material-ui/core/Typography";
import { CardSlider, CardSliderShimmer } from "./";
import { NavLink } from "react-router-dom";
const HomeComicSection = ({
  title,
  mangaList,
  isLoading,
  keyword,
  endpoint,
}) => {
  const shimmerVal = [
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  ];

  const updateTime = () => {
    if (keyword === "manga") {
      return "updated_on";
    } else if (keyword === "popular") {
      return "upload_on";
    } else {
    }
  };

  const MangaList = () => {
    return (
      <div className="custom-wrapper">
        {mangaList.map((item, index) => {
          return (
            <CardSlider
              key={index}
              title={item.title}
              thumbnail={item.thumb}
              type={item.type}
              updated_on={keyword !== "recommended" ? item[updateTime()] : null}
              chapter={item.chapter}
              slug={item.endpoint}
            />
          );
        })}
      </div>
    );
  };

  const ShimmerList = () => {
    return (
      <div className="custom-wrapper">
        {shimmerVal.map((item, index) => {
          return <CardSliderShimmer />;
        })}
      </div>
    );
  };

  return (
    <div style={{ marginBottom: 10 }}>
      <div
        style={{
          display: "flex",
          margin: "0 3%",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography paragraph variant="h5">
          {title}
        </Typography>
        {endpoint && (
          <NavLink to={endpoint} style={{ textDecoration: "none" }}>
            <Typography paragraph variant="h7">
              Lihat Semua
            </Typography>
          </NavLink>
        )}
      </div>
      {/* <div
        // style={{
        //   display: "flex",
        //   flexDirection: "row",
        //   overflowX: "scroll",
        //   maxWidth: "90vw",
        //   margin: "0 auto",
        // }}
        className="custom-wrapper"
      > */}
      {isLoading ? <ShimmerList /> : <MangaList />}
      {/* </div> */}
    </div>
  );
};

export default HomeComicSection;
