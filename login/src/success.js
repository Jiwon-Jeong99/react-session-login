import React from "react";

const Success = ({ userName, email }) => {
  return (
    <>
      <div>{userName}success 로그인에 성공하셨습니다!!</div>
      <div>{email}</div>
    </>
  );
};

export default Success;
