import Skeleton from "@material-ui/lab/Skeleton";
import React from "react";

export default function CardSliderShimmer() {
  return (
    <div className="wrapper-item">
      <Skeleton variant="rect" width={200} height={135} />
      <div style={{ margin: "10px 5px" }}>
        <Skeleton variant="text" />
        <Skeleton variant="text" />
      </div>
    </div>
  );
}
