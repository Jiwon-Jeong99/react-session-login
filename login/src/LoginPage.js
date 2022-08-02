import React, { useCallback, useState } from "react";
import { Navigate } from "react-router-dom";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onChangeusername = useCallback((e) => {
    setUsername(e.target.value);
  }, []);
  const onChangePassword = useCallback((e) => {
    setPassword(e.target.value);
    // 지금 입력한 값이랑 passwordcheck이랑 다르면? mismatcherror
  }, []);

  //로그인 버튼
  const onSubmit = useCallback(
    (e) => {
      // event 명시x -> 기본 동작 실행 x
      e.preventDefault();
      console.log(username, password);

      const user = {
        username: username,
        password: password,
      };

      //   fetch와 같음 - post로 email, password 보냄
      fetch("http://127.0.0.1:8000/auth/login", {
        method: "POST",
        mode: 'cors',
        credentials: 'include',
        headers: {
          // content-type : 해당 형태로
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      })
        .then((res) => res.json())
        .then((data) => {
            localStorage.setItem("real_name", data.data.last_name);
            window.location.replace("http://localhost:3000/success");
          }).catch( (error) => {
            setUsername('');
            setPassword('');
          }
        );
        
    },
    [username, password]
  );

  if (localStorage.getItem) {
    <Navigate to="/success" />;
  }

  return (
    <div id="container">
      <h1>Login</h1>
      <form onSubmit={onSubmit}>
        <label id="email-label">
          <span>이메일 주소</span>
          <div>
            <input
              type="text"
              id="email"
              name="email"
              value={username}
              onChange={onChangeusername}
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
  );
};

export default LoginPage;
