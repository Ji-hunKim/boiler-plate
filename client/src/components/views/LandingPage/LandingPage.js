import React, { useEffect } from "react";
import axios from "axios";

function LandingPage() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  // Email state을
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };

  const onSubmitHandler = (event) => {
    // 로그인 버튼 누르면 이 함수에서 해야할 일을 하지 않고 페이지가 리프레시 되는 것을 방지하기 위해서
    event.preventDefault();

    let body = {
      email: Email,
      password: Password,
    };

    // dispatch 이용해서 action취하고 그 다음에 reducer 라이프 사이클 돌게하는 것
    dispatch(loginUser(body)).then((response) => {
      if (response.payload.loginSuccess) {
        navigate("/");
      } else {
        alert("Error");
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
        <label>Password</label>
        <input type="password" value={Password} onChange={onPasswordHandler} />
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );

export default LandingPage;
