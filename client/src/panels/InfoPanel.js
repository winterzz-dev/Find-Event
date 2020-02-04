import React, { useContext } from "react";
import {
  Panel,
  PanelHeader,
  PanelHeaderBack,
  Group,
  Cell
} from "@vkontakte/vkui";

import { NavContext } from "../context/NavContext";

export const InfoPanel = props => {
  const { setActivePanel } = useContext(NavContext);
  return (
    <Panel id="infoPanel">
      <PanelHeader
        left={<PanelHeaderBack onClick={() => setActivePanel("home")} />}
      >
        More
      </PanelHeader>
      <Group>
        <Cell expandable>{props.eventId}</Cell>
      </Group>
    </Panel>
  );
};
