import React, { useState } from "react";
import { View } from "@vkontakte/vkui";

import { InfoPanel } from "../panels/InfoPanel";
import { Home } from "../panels/Home";

import { NavContext } from "../context/NavContext";

export const HomeView = props => {
  const [activePanel, setActivePanel] = useState("home");
  const [eventId, setEventId] = useState(null);
  return (
    <NavContext.Provider value={{ setActivePanel, setEventId }}>
      <View activePanel={activePanel}>
        <Home
          id="home"
          fetchedUser={props.fetchedUser}
          cityId={props.cityId}
          cityTitle={props.cityTitle}
          token={props.token}
          countryId={props.countryId}
          userId={props.userId}
          categories={props.categories}
        />
        <InfoPanel id="infoPanel" eventId={eventId} />
      </View>
    </NavContext.Provider>
  );
};
