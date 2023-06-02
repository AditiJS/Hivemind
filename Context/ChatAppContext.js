import React, {useState, useEffect} from "react"
import {useRouter} from "next/router"

import {
  CheckIfWalletConnected,
  connectWallet,
  connectingWithContract,
} from "../Utils/apiFeature";

export const ChatAppContext = React.createContext();

export const ChatAppProvider = ({children}) =>{
  // useState
  const [account, setAccount] = useState("");
  const [userName, setUserName] = useState("");
  const [friendLists, setFriendLists] = useState([]);
  const [friendMsg, setFriendMsg] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userLists, setUserLists] = useState([]);
  const [error, setError] = useState("");

  // chat user Data
  const [currentUserName, setCurrentUserName] = useState("");
  const [currentUserAddress, setCurrentUserAddress] = useState("");

  const router = useRouter();

  // fetch data at page load
  // const fetchData = async() =>{
  //     try {
  //         // get contract
  //         const contract = await connectingWithContract();

  //         // get account
  //         const connectAccount = await connectWallet();
  //         setAccount(connectAccount);

  //         // get username
  //         const userName = await contract.getUsername(connectAccount);
  //         setUserName(userName);

  //         // get friend list
  //         const friendList = await contract.getMyFriendList();
  //         setFriendLists(friendList);

  //         // get all app user
  //         const userList = await contract.getAllAppUser();
  //         setUserLists(userList);

  //     } catch (error) {
  //         setError("Please install and connect your wallet");
  //         console.log(error)
  //     }
  // };


//======== chatgpt code=======
  const fetchData = async () => {
    try {
      // get contract
      const contract = await connectingWithContract();

      // get account
      const connectAccount = await connectWallet();
      setAccount(connectAccount);

      // get username
      const userName = await contract.getUsername(connectAccount);
      setUserName(userName);
      console.log(userName);

      // get friend list
      const friendList = await contract.getMyFriendList();
      setFriendLists(friendList);

      // get all app user
      const userList = await contract.getAllAppUser();
      setUserLists(userList);
    } catch (error) {
      // setError("Please install and connect your wallet");
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const readMessage = async (friendAddress) => {
    try {
      const contract = await connectingWithContract();
      const read = await contract.readMessage(friendAddress);
      setFriendMsg(read);
    } catch (error) {
      setError("currently you have no messages");
    }
  };

  // const createAccount = async({name, accountAddress})=>{
  //     try {
  //         // if(name || accountAddress) return setError("Name and accountAddress can't be empty");

  //         const contract  = await connectingWithContract();

  //         // added accountAddress
  //         const getCreatedUser = await contract.createAccount(name);
  //         setLoading(true);
  //         await getCreatedUser.wait();
  //         setLoading(false);
  //         window.location.reload();

  //     } catch (error) {
  //         setError("Error While creating account, reload browser")
  //         console.log(error)
  //     }
  // };

  // ====== chatgpt code ======
  const createAccount = async ({ name }) => {
    try {
      if (!name) return setError("Name can't be empty");

      const contract = await connectingWithContract();

      // create account
      setLoading(true);
      const tx = await contract.createAccount(name);
      await tx.wait();
      setLoading(false);

      // get account address
      const account = await connectWallet();
      setAccount(account);

      // set current user name and address
      setCurrentUserName(name);
      setCurrentUserAddress(account);

      window.location.reload();
    } catch (error) {
      setError("Error while creating account, reload browser");
      console.log(error);
    }
  };

  const addFriends = async ({ name, accountAddress }) => {
    try {
      // if(accountAddress || name) return setError("Please Provide name and address")

      const contract = await connectingWithContract();
      const addMyFriend = await contract.addFriend(accountAddress, name);
      setLoading(true);
      await addMyFriend.wait();
      setLoading(false);

      router.push("/");

      window.location.reload();
    } catch (error) {
      setError("something went wrong while adding a friend");
    }
  };

  const sendMessage = async ({ msg, address }) => {
    try {
      // if (msg || address) return setError("please provide msg");
      const contract = await connectingWithContract();
      const addMessage = await contract.sendMessage(address, msg);
      setLoading(true);
      await addMessage.wait();
      setLoading(false);

      window.location.reload();
    } catch (error) {
      setError("reload, try again");
    }
  };

  // const readUser = async(userAddress) =>{
  //     const contract = await connectingWithContract();
  //     const username = await contract.getUsername(userAddress);
  //     setCurrentUserAddress(userAddress);
  //     setUserName(username);
  // }

  // ====== chatgpt code ======
  const readUser = async (userAddress) => {
    try {
      const contract = await connectingWithContract();

      // get username
      const username = await contract.getUsername(userAddress);
      setCurrentUserName(username);

      // set current user address
      setCurrentUserAddress(userAddress);
    } catch (error) {
      setError("Error while fetching user data");
      console.log(error);
    }
  };

  return (
    <ChatAppContext.Provider
      value={{
        readMessage,
        createAccount,
        addFriends,
        sendMessage,
        readUser,
        connectWallet,
        CheckIfWalletConnected,
        account,
        userName,
        friendLists,
        loading,
        userLists,
        error,
        friendMsg,
        currentUserName,
        currentUserAddress,
      }}
    >
      {children}
    </ChatAppContext.Provider>
  );
}
