import React from "react";
import Cell from "@vkontakte/vkui/dist/components/Cell/Cell";
import Avatar from "@vkontakte/vkui/dist/components/Avatar/Avatar";

export const Event = ({ title, date, id, photo }) => {
  return (
    <Cell before={<Avatar src={photo} />} description={date}>
      {title}
    </Cell>
  );
};
