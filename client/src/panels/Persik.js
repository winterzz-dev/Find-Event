import React, { useContext, useState } from "react";
// import PropTypes from "prop-types";
// import { platform, IOS } from "@vkontakte/vkui";
import Panel from "@vkontakte/vkui/dist/components/Panel/Panel";
import PanelHeader from "@vkontakte/vkui/dist/components/PanelHeader/PanelHeader";
// import HeaderButton from "@vkontakte/vkui/dist/components/HeaderButton/HeaderButton";
// import Icon28ChevronBack from "@vkontakte/icons/dist/28/chevron_back";
// import Icon24Back from "@vkontakte/icons/dist/24/back";
import { FormLayout, FormLayoutGroup, Input } from "@vkontakte/vkui";

import { SettingsContext } from "../context/SettingsContext";
import { useHttp } from "../hooks/http.hook";

const Persik = props => {
  const [city, setCity] = useState("");
  const { city_id, country_id, set_city_id } = useContext(SettingsContext);

  const { request } = useHttp();

  const pressHandler = async event => {
    if (event.key === "Enter") {
      event.preventDefault();
      try {
        // console.log({
        //   title: city,
        //   countryId: country_id
        // });
        const data = await request("/api/city/get", "POST", {
          title: city,
          countryId: 1
        });
        console.log(data);
        set_city_id(data.id);
        city = data.title;
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
            defaultValue={city_id}
            onChange={e => setCity(e.target.value)}
            onKeyPress={pressHandler}
          />
        </FormLayoutGroup>
      </FormLayout>
    </Panel>
  );
};

// Persik.propTypes = {

// };

export default Persik;
