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

import { SettingsContext } from "../context/SettingsContext";
import { useHttp } from "../hooks/http.hook";

const Settings = props => {
  const [cityReq, setCityReq] = useState("");
  const [snackbar, setSnackbar] = useState(null);
  const { setCity } = useContext(SettingsContext);

  const { request } = useHttp();

  const pressHandler = async event => {
    if (event.key === "Enter") {
      event.preventDefault();
      try {
        const data = await request("/api/city/get", "POST", {
          title: cityReq,
          countryId: props.countryId
        });
        setCity(data.id, data.title);
        doneMessage();
      } catch (error) {
        errorMessage();
      }
    }
  };

  const errorMessage = () => {
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
        Произошла ошибка
      </Snackbar>
    );
  };

  const doneMessage = () => {
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
        Город изменен
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
              onKeyPress={pressHandler}
            />
          </FormLayoutGroup>
        </FormLayout>
      </Group>

      <Group title="Интересные катеории"></Group>
      {snackbar}
    </Panel>
  );
};

export default Settings;
