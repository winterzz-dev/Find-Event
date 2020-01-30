import React from "react";

import Group from "@vkontakte/vkui/dist/components/Group/Group";
import Cell from "@vkontakte/vkui/dist/components/Cell/Cell";
import List from "@vkontakte/vkui/dist/components/List/List";

import { Event } from "../components/Event";

export const EventsList = ({ events }) => {
  if (!events.length) {
    return (
      <Group title="События">
        <List>
          <Cell>Событий в городе не найдено</Cell>
        </List>
      </Group>
    );
  }

  return (
    <Group title="События">
      <List>
        {events.map((event, index) => {
          return <Event title={event.name} date="01.01.2020" key={event.id} />;
        })}
      </List>
    </Group>
  );
};
