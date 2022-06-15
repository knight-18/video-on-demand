import { useState, useEffect } from "react";
import View from "./view";
import {fetchCurrentUser} from '../../utils/authentication'

export default function Home (){
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    useEffect(() => {
      const fetchLoginStatus = async () => {
        let res = await fetchCurrentUser();
        console.log("User Data:", res)
        if (res) {
          setUser(res);
          setIsLoggedIn(true);
        }
      };
      fetchLoginStatus();
    }, [isLoggedIn]);
    return (
        <>
        <View user={user}/>
        </>
    )
}