import axios from "axios";
import React from "react";
import { useSearchParams } from "react-router-dom";
import { fetchFromServer } from "../utils/APICalls";
const Feedback = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  let [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function updateTurno() {
      const res = await fetchFromServer("/crear-turno-mp", "POST", {
        ref_id: searchParams.get("preference_id"),
        paymentId: searchParams.get("payment_id"),
        status: searchParams.get("status"),
      });

      console.log(res?.data);
    }

    updateTurno().then(() => setLoading(false));
  }, [searchParams]);

  return <div>Feedback</div>;
};

export default Feedback;
