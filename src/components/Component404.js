import React from "react";
import Typography from "@material-ui/core/Typography";
import { Helmet } from "react-helmet";
const Component404 = () => {
  return (
    <div
      style={{
        height: "70vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Helmet>
        <meta charSet="utf-8" />
        <title>Halaman Tidak Ditemukan</title>
      </Helmet>
      <Typography paragraph variant="h4" align="center">
        Maaf Halaman Tidak Ditemukan
      </Typography>
    </div>
  );
};

export default Component404;
