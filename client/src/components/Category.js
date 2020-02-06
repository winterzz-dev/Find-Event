import React, { useContext } from "react";
import Cell from "@vkontakte/vkui/dist/components/Cell/Cell";

import { SettingsContext } from "../context/SettingsContext";

export const Category = ({ title, id }) => {
  const { deleteCategory } = useContext(SettingsContext);
  return (
    <Cell
      onClick={() => {
        deleteCategory(id);
      }}
    >
      {title}
    </Cell>
  );
};
