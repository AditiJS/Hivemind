import React, { useEffect, useState, useContext } from "react";
import Style from "./Error.module.css";
// import images from "../../assets/index";
// import Image from "next/image";

const Error = ({ error }) => {
  return <div className={Style.Error}>
    <div className={Style.Error_box}>
      <h1>Please fix this error and reload</h1>
      {error}
    </div>
  </div>;
};

export default Error;
