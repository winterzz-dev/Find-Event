import React, { useContext, useState } from "react";

import {
  FormLayout,
  FormLayoutGroup,
  Input,
  Snackbar,
  Avatar,
  PanelHeader,
  Panel,
  Group
} from "@vkontakte/vkui";

import Icon16Done from "@vkontakte/icons/dist/16/done";
import Icon16Clear from "@vkontakte/icons/dist/16/clear";

import { CategoriesList } from "../components/CategoriesList";

import { SettingsContext } from "../context/SettingsContext";
import { useHttp } from "../hooks/http.hook";

const Settings = props => {
  const [cityReq, setCityReq] = useState("");
  const [currentCategory, setCurrentCategory] = useState("");
  const [snackbar, setSnackbar] = useState(null);
  const { setCity, addCategory } = useContext(SettingsContext);

  const { request } = useHttp();

  const cityUpdateHandler = async event => {
    if (event.key === "Enter") {
      event.preventDefault();
      try {
        const data = await request("/api/city/get", "POST", {
          title: cityReq,
          countryId: props.countryId
        });
        setCity(data.id, data.title);
        doneMessage("Город изменен!");
      } catch (error) {
        errorMessage("Произошла ошибка");
      }
    }
  };

  const addCategoryHandler = async event => {
    if (event.key === "Enter") {
      event.preventDefault();
      try {
        await addCategory(currentCategory);
        doneMessage("Интерес добавлен");
      } catch (error) {
        errorMessage("Произошла ошибка");
      }
    }
  };

  const errorMessage = title => {
    if (snackbar) return;
    setSnackbar(
      <Snackbar
        layout="vertical"
        onClose={() => setSnackbar(null)}
        before={
          <Avatar size={24} style={{ backgroundColor: "var(--destructive)" }}>
            <Icon16Clear fill="#fff" width={14} height={14} />
          </Avatar>
        }
      >
        {title}
      </Snackbar>
    );
  };

  const doneMessage = title => {
    if (snackbar) return;
    setSnackbar(
      <Snackbar
        layout="vertical"
        onClose={() => setSnackbar(null)}
        before={
          <Avatar size={24} style={{ backgroundColor: "var(--accent)" }}>
            <Icon16Done fill="#fff" width={14} height={14} />
          </Avatar>
        }
      >
        {title}
      </Snackbar>
    );
  };

  return (
    <Panel id={props.id}>
      <PanelHeader>Настройки</PanelHeader>
      <Group>
        <FormLayout>
          <FormLayoutGroup top="Город">
            <Input
              type="text"
              defaultValue={props.cityTitle}
              onChange={e => setCityReq(e.target.value)}
              onKeyPress={cityUpdateHandler}
            />
          </FormLayoutGroup>
        </FormLayout>
      </Group>

      <Group>
        <FormLayout>
          <FormLayoutGroup top="Добавить интерес">
            <Input
              type="text"
              onChange={e => setCurrentCategory(e.target.value)}
              onKeyPress={addCategoryHandler}
            />
          </FormLayoutGroup>
        </FormLayout>
      </Group>

      <CategoriesList categories={props.categories} />
      {snackbar}
    </Panel>
  );
};

export default Settings;
