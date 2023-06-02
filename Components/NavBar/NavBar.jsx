import React, { useEffect, useState, useContext } from "react";
import Image from "next/image";
import Link from "next/link";

import Style from "./NavBar.module.css";
import { ChatAppContext } from "../../Context/ChatAppContext";
import { Model, Error } from "../index";

import images from "../../assets/index";

const NavBar = () => {
  const menuItems = [
    {
      menu: "ALL USERS",
      link: "/alluser",
    },
    {
      menu: "CHAT",
      link: "/",
    },
    {
      menu: "SETTING",
      link: "/",
    },
    {
      menu: "FAQS",
      link: "/",
    },
    {
      menu: "TERMS OF USE",
      link: "/",
    },
  ];

  const [active, setActive] = useState(2);

  const [open, setOpen] = useState(false);

  const [openModel, setOpenModel] = useState(false);

  const { account, userName, connectWallet, error, createAccount } =
    useContext(ChatAppContext);

  return (
    <div className={Style.NavBar}>
      <div className={Style.NavBar_box}>
        <div className={Style.NavBar_box_left}>
          <Image
            className={Style.NavBar_box_left_img}
            src={images.logo}
            alt="logo"
            width={100}
            height={50}
          />
        </div>
        <div className={Style.NavBar_box_right}>
          {/* Desktop */}
          <div className={Style.NavBar_box_right_menu}>
            {menuItems.map((el, i) => (
              <div
                onClick={() => {
                  setActive(i + 1);
                }}
                key={i + 1}
                className={`${Style.NavBar_box_right_menu_items} ${
                  active == i + 1 ? Style.active_btn : ""
                }`}
              >
                <Link
                  className={Style.NavBar_box_right_menu_items_link}
                  href={el.link}
                >
                  <p className={Style.NavBar_box_right_menu_items_link_text}>
                    {el.menu}
                  </p>
                </Link>
              </div>
            ))}
          </div>

          {/* Mobile */}
          {open && (
            <div className={Style.mobile_menu}>
              {menuItems.map((el, i) => (
                <div
                  onClick={() => {
                    setActive(i + 1);
                  }}
                  key={i + 1}
                  className={`${Style.mobile_menu_items} ${
                    active == i + 1 ? Style.active_btn : ""
                  }`}
                >
                  <a className={Style.mobile_menu_items_link} href={el.link}>
                    {el.menu}
                  </a>
                </div>
              ))}
              <p className={Style.mobile_menu_btn}>
                <Image
                  src={images.close}
                  alt="close"
                  width={50}
                  height={50}
                  onClick={() => {
                    setOpen(false);
                  }}
                />
              </p>
            </div>
          )}

          {/* Connect Wallet */}
          <div className={Style.NavBar_box_right_connect}>
            {account == "" ? (
              <button onClick={() => connectWallet()}>
                {""}
                <span>Connect Wallet</span>
              </button>
            ) : (
              <button
                className={Style.NavBar_button_createAcc}
                onClick={() => setOpenModel(true)}
              >
                {""}
                <Image
                  src={userName ? images.accountName : images.create2}
                  alt="Account image"
                  width={20}
                  height={20}
                />{" "}
                {""}
                <small>{userName || "Create Account"}</small>
              </button>
            )}
          </div>

          <div
            className={Style.NavBar_box_right_open}
            onClick={() => setOpen(true)}
          >
            <Image src={images.open} alt="open" width={30} height={30} />
          </div>
        </div>
      </div>

      {/* model component */}
      {openModel && (
        <div className={Style.modelBox}>
          <Model
            openBox={setOpenModel}
            title="welcome to"
            head="HIVEMIND"
            info="A chat application"
            smallInfo="kindly select your name"
            image={images.hero}
            functionName={createAccount}
            address={account}
          />
        </div>
      )}
      {error == "" ? " " : <Error error={error} />}
    </div>
  );
};

export default NavBar;
