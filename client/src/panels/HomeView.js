import React, { useState, useCallback, useEffect } from "react";
import { View, Panel, PanelHeader, Group, List, Cell } from "@vkontakte/vkui";

import { InfoPanel } from "../panels/InfoPanel";
import { Home } from "../panels/Home";

import { NavContext } from "../context/NavContext";
import { useHttp } from "../hooks/http.hook";

export const HomeView = props => {
  const [activePanel, setActivePanel] = useState("home");
  const [publicKey, setPublicKey] = useState("");
  const [eventId, setEventId] = useState(null);

  return (
    <NavContext.Provider value={{ setActivePanel, setEventId, setPublicKey }}>
      <View activePanel={activePanel}>
        <Home
          id="home"
          cityId={props.cityId}
          cityTitle={props.cityTitle}
          token={props.token}
          countryId={props.countryId}
          userId={props.userId}
          categories={props.categories}
        />
        <InfoPanel
          id="infoPanel"
          eventId={eventId}
          userId={props.userId}
          publicKey={publicKey}
          token={props.token}
        />
      </View>
    </NavContext.Provider>
  );
};
