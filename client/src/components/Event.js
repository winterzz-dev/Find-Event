import React, { useContext } from "react";
import Cell from "@vkontakte/vkui/dist/components/Cell/Cell";
import Avatar from "@vkontakte/vkui/dist/components/Avatar/Avatar";

import { NavContext } from "../context/NavContext";

export const Event = ({ title, date, id, photo }) => {
  const { setActivePanel, setEventId } = useContext(NavContext);
  return (
    <Cell
      before={<Avatar src={photo} />}
      description={date}
      onClick={() => {
        setEventId(id);
        setActivePanel("infoPanel");
      }}
    >
      {title}
    </Cell>
  );
};
