import React, { useEffect, useContext, useState } from "react";
import Screen from "../Screen/Screen";
import "./_PointExchangeScreen.scss";
import axios from "axios";
import AppContext from "../../contexts/AppContexts";

const ENTRY_POINT = process.env.REACT_APP_API_ENTRYPOINT;

const PointExchangeScreen = () => {
  const { state } = useContext(AppContext);
  const [point, setPoint] = useState<number>(0);

  useEffect(() => {
    axios.get(ENTRY_POINT + `/point?user_id=${state.user.id}`).then((res) => {
      setPoint(res.data.point);
    });
  }, [state.user.id]);

  return (
    <Screen>
      <div className="point_exchange_screen">
        <h1>現在の所持ポイント</h1>
        <h2>{point} pt</h2>
      </div>
    </Screen>
  );
};

export default PointExchangeScreen;
