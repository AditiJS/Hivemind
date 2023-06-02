import React, { useEffect, useState, useContext } from "react";
import Style from "./Chat.module.css";
import images from "../../../assets/index";
import {useRouter} from 'next/router'
import Image from "next/image";
import Link from "next/link";

import {convertTime} from '../../../Utils/apiFeature'
import {Loader} from '../../index'

function Chat({
  functionName,
  readMessage,
  friendMsg,
  account,
  userName,
  Loading,
  currentUserName,
  currentUserAddress,
}) {

  const [message,setMessage] = useState("");
  const [chatData,setChatData] =useState({
    name:"",
    address:"",
  })

  const router = useRouter();
  useEffect(()=>{
    if(!router.isReady) return;
    setChatData(router.query);
  },[router.isReady]) ;

  // console.log(chatData.address,chatData.name)


  return (
    <div className={Style.Chat}>
      {currentUserAddress && currentUserName ? (
        <div className={Style.Chat_user_info}>
          <Image src={images.accountName} alt="image" height={70} width={70} />
          <div className={Style.Chat_user_info_box}>
            <h4>{currentUserName}</h4>
            <p className={Style.show}>{currentUserAddress}</p>
          </div>
        </div>
      ) : (
        ""
      )}

      <div className={Style.Chat_box_box}>
        <div className={Style.Chat_box}>
          <div className={Style.Chat_box_left}>
            {friendMsg.map((el, i) => (
              <div>
                {el.sender == chatData.address ? (
                  <div className={Style.Chat_box_left_title}>
                    <Image
                      src={images.accountName}
                      alt="img"
                      width={50}
                      height={50}
                    />
                    <span className={Style.Chat_box_left_name_time}>
                      {chatData.name} {""}
                      <small>Time: {convertTime(el.timestamp)}</small>
                    </span>
                  </div>
                ) : (
                  <div className={Style.Chat_box_left_title}>
                    <Image
                      src={images.accountName}
                      alt="img"
                      width={50}
                      height={50}
                    />
                    <span className={Style.Chat_box_left_name_time}>
                      {userName} {""}
                      <small>Time: {convertTime(el.timestamp)}</small>
                    </span>
                  </div>
                )}
                <p key={i + 1}>
                  {el.msg} {""} {""}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div>
          {currentUserName && currentUserAddress ? (
            <div className={Style.Chat_box_send}>
              <div className={Style.Chat_box_send_img}>
                <Image src={images.smile} alt="smile" width={50} height={50} />
                <input
                  type="text"
                  placeholder="type here..."
                  onChange={(e) => setMessage(e.target.value)}
                />
                <Image src={images.file} alt="file" width={50} height={50} />

                {Loading == true ? (
                  <Loader />
                ) : (
                  <Image
                    src={images.send}
                    alt="send"
                    width={50}
                    height={50}
                    onClick={() =>
                      functionName({ msg: message, address: chatData.address })
                    }
                  />
                )}
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default Chat;
