import React, { useContext, useState } from "react";

import Panel from "@vkontakte/vkui/dist/components/Panel/Panel";
import PanelHeader from "@vkontakte/vkui/dist/components/PanelHeader/PanelHeader";
import { FormLayout, FormLayoutGroup, Input } from "@vkontakte/vkui";

import { SettingsContext } from "../context/SettingsContext";
import { useHttp } from "../hooks/http.hook";

const Settings = props => {
  const [cityReq, setCityReq] = useState("");
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
      } catch (error) {}
    }
  };

  return (
    <Panel id={props.id}>
      <PanelHeader>Настройки</PanelHeader>
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
    </Panel>
  );
};

export default Settings;
