import React, { useEffect, useState, useContext } from "react";
import Style from './usercard.module.css';
import images from "../../assets/index";
import Image from "next/image"; 


const UserCard = ({el,i,addFriends}) => {
  console.log(el)

  return (
    <div className={Style.UserCard}>
      <div className={Style.UserCard_box}>
        <Image
          className={Style.UserCard_box_img}
          src={images[`image${i + 1}`]}
          alt="user"
          width={100}
          height={100}
        />
        <div className={Style.UserCard_box_info}>
          <h3 className={Style.UserCard_box_info_name}>{el.name}</h3>
          {/* {console.log("name :" + el.name)} */}
          <p className={Style.UserCard_box_info_address}></p>
          {/* {el.accountAddress.slice(0, 25)} */}
          <button
            onClick={() =>
              addFriends({ name: el.name, accountAddress: el.accountAddress })
            }
          >
            Add Friend
          </button>
        </div>
      </div>

      <small className={Style.number}>{i + 1}</small>
    </div>
  );
};

export default UserCard;
