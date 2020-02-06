import React from "react";

import Group from "@vkontakte/vkui/dist/components/Group/Group";
import Cell from "@vkontakte/vkui/dist/components/Cell/Cell";
import List from "@vkontakte/vkui/dist/components/List/List";

import { Category } from "../components/Category";

export const CategoriesList = ({ categories }) => {
  if (!categories.length) {
    return (
      <Group title="Интересы">
        <List>
          <Cell>Интересов пока нет</Cell>
        </List>
      </Group>
    );
  }

  return (
    <Group title="Интересы">
      <List>
        {categories.map(category => {
          return (
            <Category
              title={category.title}
              key={category.id}
              id={category.id}
            />
          );
        })}
      </List>
    </Group>
  );
};
