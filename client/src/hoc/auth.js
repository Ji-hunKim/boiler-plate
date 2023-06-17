import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { auth } from "../_actions/user_action";
import { useNavigate } from "react-router-dom";

// specificComponent = Page
// option
// null : 아무나 출입 가능한 페이지
// true : 로그인한 유저만 출입 가능한 페이지
// false : 로그인한 유저는 출입 불가능한 페이지
export default function (SpecificComponent, option, adminRoute = null) {
  function AuthenticationCheck(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // 백엔드에 request 날려서 사람의 state 가져옴
    useEffect(() => {
      // 페이지 이동할때마다 dispatch작동해서 backend에 request를 주는 것
      dispatch(auth()).then((response) => {
        console.log(response);

        // 로그인 하지 않은 상태
        if(!response.payload.isAuth){
          //true인경우 
          if(option){
            navigate("/login");
          }
        }else{
          //로그인 한 상태
          // 어드민 페이지인데 && isAdmin이  아닌경우
          if(adminRoute && !response.payload.isAdmin){
            navigate("/");
          }else{
            // false일 때
            if(!option){
              navigate("/");
            }
          }
        }
      });
    }, []);

    return <SpecificComponent />;
  }

  return AuthenticationCheck;
}
