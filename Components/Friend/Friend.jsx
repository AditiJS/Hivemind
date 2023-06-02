import React, { useEffect, useState, useContext } from "react";
import Style from "./Friend.module.css";
import images from "../../assets/index";
import { ChatAppContext } from "../../Context/ChatAppContext";
import Image from "next/image";
import Link from "next/link";
import Card from "./Card/Card";
import Chat from "./Chat/Chat";

const Friend = () => {
  // const array = [1,2,3,4,5,6];

  const {sendMessage, account, friendLists, readMessage, userName,loading,currentUserName,currentUserAddress,readUser,friendMsg} = useContext(ChatAppContext);


  return (
    <div className={Style.Friend}>
      <div className={Style.Friend_box}>
        <div className={Style.Friend_box_left}>
          {
            friendLists.map((el,i)=>(
              <Card key={i+1}
              el={el}
              i={i}
              readMessage={readMessage}
              readUser={readUser}
               />
            ))
          }
        </div>
        <div className={Style.Friend_box_right}>
          <Chat functionName={sendMessage}
          readMessage={readMessage}
          friendMsg={friendMsg}
          account={account}
          userName={userName}
          Loading={loading}
          currentUserAddress={currentUserAddress}
          currentUserName={currentUserName}
          />
        </div>
      </div>
    </div>
  );
};

export default Friend;
