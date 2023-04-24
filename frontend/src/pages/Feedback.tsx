import React from "react";
import { useParams } from "react-router-dom";

const Feedback = () => {
  let params = useParams();
  console.log(params);

  return <div>Feedback</div>;
};

export default Feedback;
