import React, { useEffect, useState, useContext } from "react";
import Style from "./Card.module.css";
import images from "../../../assets/index";

import Image from "next/image";
import Link from "next/link";

function Card({readMessage,el,i,readUser}) {
    console.log(el)
  return (
    <Link className={Style.Card_link}
      href={{
        pathname: "/",
        query: { name: `${el.name}`, address: `${el.pubkey}` },
      }}
    >
      <div
        className={Style.card}
        onClick={() => (readMessage(el.pubkey), readUser(el.pubkey))}
      >
        <div className={Style.Card_box}>
          <div className={Style.Card_box_left}>
            <Image
              src={images.accountName}
              alt="username"
              width={50}
              height={50}
              className={Style.Card_box_left_img}
            />
          </div>
          <div className={Style.Card_box_right}>
            <div className={Style.Card_box_right_middle}>
              <h4 className={Style.Card_box_right_middle_name}>{el.name}</h4>
              <small className={Style.Card_box_right_middle_address}>{el.pubkey.slice(0, 25)}</small>
            </div>
            <div className={Style.Card_box_right_end}>
              <small>{i + 1}</small>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default Card
