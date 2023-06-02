import React, { useEffect, useState, useContext } from "react";
import Style from "./Filter.module.css";
import images from "../../assets/index";
import { ChatAppContext } from "../../Context/ChatAppContext";
import { Model } from "../index";
import Image from "next/image";

const Filter = () => {
  const { account, addFriends } = useContext(ChatAppContext);

  const [addFriend, setAddFriend] = useState(false);

  return (
    <div className={Style.Filter}>
      <div className={Style.Filter_box}>
        <div className={Style.Filter_box_left}>
          <div className={Style.Filter_box_left_search}>
            <Image src={images.search} alt="Search" width={20} height={20} />
            <input type="text" placeholder="search.." />
          </div>
        </div>
        <div className={Style.Filter_box_right}>
          <button>
            <Image src={images.clear} alt="clear" width={20} height={20} />
            CLEAR CHAT
          </button>

          <button onClick={() => setAddFriend(true)}>
            <Image src={images.user} alt="user" width={20} height={20} />
            Add Friend
          </button>
        </div>
      </div>

      {/* model */}
      {addFriend && (
        <div className={Style.Filter_model}>
          <Model
            openBox={setAddFriend}
            title="WELCOME TO"
            head="HIVEMIND"
            info="Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro cum ducimus recusandae, eaque laboriosam cupiditate, saepe incidunt id dolorem magnam, corrupti molestiae! Quos, beatae earum iusto vero architecto asperiores maiores?"
            smallInfo="Kindly select friend name and address"
            image={images.hero}
            functionName={addFriends}
          ></Model>
        </div>
      )}
    </div>
  );
};

export default Filter;
