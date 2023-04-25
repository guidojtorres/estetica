import axios from "axios";
import React from "react";
import { useSearchParams } from "react-router-dom";
const Feedback = () => {
  let [searchParams, setSearchParams] = useSearchParams();

  React.useEffect(() => {
    const getReference = async () => {
      const res = await axios({
        method: "GET",
        url: `https://api.mercadopago.com/checkout/preferences/${searchParams.get(
          "preference_id"
        )}`,
        headers: {
          Accept: "*/*",
          Authorization:
            "Bearer TEST-7169695604884447-042415-6d7143274bedca51c37cbd5d97b33720-1359790312",
        },
      });

      console.log(res);
    };

    getReference();
  }, [searchParams]);
  //@ts-ignore
  for (const value of searchParams.values()) {
    console.log(value);
  }
  return <div>Feedback</div>;
};

export default Feedback;
