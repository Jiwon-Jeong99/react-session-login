import React, { useCallback, useEffect, useState } from "react";
import { getCookie, setCookie } from "./auth/Cookie";
import Success from "./Success";

const LoginPage = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  const onChangeUserName = useCallback((e) => {
    setUserName(e.target.value);
  }, []);
  const onChangePassword = useCallback((e) => {
    setPassword(e.target.value);
  }, []);

  //로그인 버튼
  const onSubmit = useCallback(
    (e) => {
      // event 명시x -> 기본 동작 실행 x
      e.preventDefault();
      console.log(userName, password);

      const user = {
        username: userName,
        password: password,
      };

      //  fetch와 같음 - post로 email, password 보냄
      //  fetch로 json형태로 http 헤더에 담아 user 정보를 json을 문자열 형태 변신해서 주세요.
      fetch("http://127.0.0.1:8000/auth/login", {
        method: "POST",
        mode: "cors",
        credentials: "include",
        headers: {
          // content-type : 해당 형태로
          "Content-Type": "application/json",
        },
        // user 정보를 보내주는데, json을 문자열로 변환한 상태로
        body: JSON.stringify(user),
      })
        .then((res) => res.json())
        .then((data) => {
        //   setUserEmail(data.data.email);
        //   setUserName(data.data.userName);
          setCookie("email", data.data.email);
          setCookie("userName", data.data.user_name);
        })
        // 에러가 나면 403, 로그인 페이지 정보를 지워줌
        .catch((error) => {
          setUserName("");
          setPassword("");
        })
        .catch((error) => {
          console.log(error);
        });
    },
    [userName, password]
  );

  useEffect(() => {
    console.log("렌더링 될때마다 실행");
    let sessionId = getCookie("sessionid");
    if (sessionId) {
      setIsLogin(true);
    }
  },[]);

  return (
    <div id="container">
      {!isLogin ? (
        <div>
          <h1>Login</h1>
          <form onSubmit={onSubmit}>
            <label id="email-label">
              <span>유저 아이디</span>
              <div>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={userName}
                  onChange={onChangeUserName}
                />
              </div>
            </label>
            <label id="password-label">
              <span>비밀번호</span>
              <div>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={onChangePassword}
                />
              </div>
            </label>
            <button type="submit">로그인</button>
          </form>
        </div>
      ) : (
        <Success />
      )}
    </div>
  );
};

export default LoginPage;
