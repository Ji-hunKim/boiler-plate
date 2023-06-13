import React, { useEffect } from "react";
import axios from "axios";

function LandingPage() {
  // api 서버로 보내고 (index.js)
  useEffect(() => {
    axios.get("/api/hello").then((response) => console.log(response.date));
  }, []);
  return <div>LandingPage</div>;
}

export default LandingPage;
