import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../../../_actions/user_action";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  // Email state을
  const [Email, setEmail] = useState("");
  const [Name, setName] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };

  const onNameHandler = (event) => {
    setName(event.currentTarget.value);
  };

  const onConfirmPasswordHandler = (event) => {
    setConfirmPassword(event.currentTarget.value);
  };

  const onSubmitHandler = (event) => {
    // 로그인 버튼 누르면 이 함수에서 해야할 일을 하지 않고 페이지가 리프레시 되는 것을 방지하기 위해서
    event.preventDefault();

    if (Password !== ConfirmPassword) {
      return alert("비밀번호와 비밀번호확인은 같아야합니다.");
    }

    let body = {
      email: Email,
      name: Name,
      password: Password,
    };

    // dispatch 이용해서 action취하고 그 다음에 reducer 라이프 사이클 돌게하는 것
    dispatch(registerUser(body)).then((response) => {
      if (response.payload.success) {
        navigate("/");
      } else {
        alert("Failed to sign up");
      }
    });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
      onSubmit={onSubmitHandler}
    >
      <form style={{ display: "flex", flexDirection: "column" }}>
        <label>Email</label>
        <input type="email" value={Email} onChange={onEmailHandler} />

        <label>Name</label>
        <input type="text" value={Name} onChange={onNameHandler} />

        <label>Password</label>
        <input type="password" value={Password} onChange={onPasswordHandler} />

        <label>ConfirmPassword</label>
        <input
          type="password"
          value={ConfirmPassword}
          onChange={onConfirmPasswordHandler}
        />
        <br />
        <button type="submit">SignIn</button>
      </form>
    </div>
  );
}

export default RegisterPage;
