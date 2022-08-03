import React, { useEffect, useState } from "react";
import { getCookie } from "./auth/Cookie";


const Success = () => {
    const [email, setEmail] = useState("");
    const [userName, setUserName] = useState("");
  
    useEffect(() => {
        setEmail(getCookie("email"));
        setUserName(getCookie("userName"));
      }, [userName])
    return (
    <>
      <div>{userName}success 로그인에 성공하셨습니다!!</div>
      <div>{email}</div>
    </>
  );
};

export default Success;