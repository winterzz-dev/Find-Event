import React from "react";
import Cell from "@vkontakte/vkui/dist/components/Cell/Cell";
import Avatar from "@vkontakte/vkui/dist/components/Avatar/Avatar";

export const Event = ({ title, date, id }) => {
  return (
    <Cell before={<Avatar />} description={date}>
      {title}
    </Cell>
  );
};
