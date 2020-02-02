import React, { useState, useEffect } from "react";
import connect from "@vkontakte/vk-connect";
import View from "@vkontakte/vkui/dist/components/View/View";
import ScreenSpinner from "@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner";
import "@vkontakte/vkui/dist/vkui.css";

import Tabbar from "@vkontakte/vkui/dist/components/Tabbar/Tabbar";
import TabbarItem from "@vkontakte/vkui/dist/components/TabbarItem/TabbarItem";
import Epic from "@vkontakte/vkui/dist/components/Epic/Epic";

import Icon28Search from "@vkontakte/icons/dist/28/search";
import Icon28Newsfeed from "@vkontakte/icons/dist/28/newsfeed";

import Home from "./panels/Home";
import Persik from "./panels/Persik";

import { SettingsContext } from "./context/SettingsContext";

import { useHttp } from "./hooks/http.hook";

const App = () => {
  const [activeStory, setActiveStory] = useState("home");
  const [fetchedUser, setUser] = useState(null);
  const [popout, setPopout] = useState(<ScreenSpinner size="large" />);
  const { loading, request } = useHttp();

  let city_id, country_id, user_id, user_token;
  const app_id = "your_app_id";
  const scope = "your_scopes";

  useEffect(() => {
    connect.subscribe(({ detail: { type, data } }) => {
      switch (type) {
        case "VKWebAppUpdateConfig":
          const schemeAttribute = document.createAttribute("scheme");
          schemeAttribute.value = data.scheme ? data.scheme : "client_light";
          document.body.attributes.setNamedItem(schemeAttribute);
          break;
        default:
          break;
      }
    });

    async function fetchData() {
      // const user = await connect.send("VKWebAppGetUserInfo");
      // setUser(user);
      // city_id = user.city.id;
      // country_id = user.country.id;
      // user_id = user.id;
      // const token_tmp = await connect.send("VKWebAppGetAuthToken", {
      //   app_id: app_id,
      //   scope: scope
      // });
      // user_token = await token_tmp.access_token;
      console.log(city_id, country_id, user_id, user_token);
      setPopout(null);
    }
    fetchData();
  }, []);

  const go = e => {
    setActiveStory(e.currentTarget.dataset.to);
  };

  const onStoryChange = e => {
    setActiveStory(e.currentTarget.dataset.story);
  };

  return (
    <SettingsContext.Provider
      value={{
        city_id: 1,
        country_id: 1,
        user_id: 1,
        user_token:
          "c6c09b62c35d4a04c4a2289d0d2e6cdc3e0e6e3ced8b55e02b27bc96c92642628620808c0140c7f9cfff0",
        set_city_id: id => {
          this.city_id = id;
        }
      }}
    >
      <Epic
        activeStory={activeStory}
        tabbar={
          <Tabbar>
            <TabbarItem
              onClick={onStoryChange}
              selected={activeStory === "home"}
              data-story="home"
              text="События"
            >
              <Icon28Newsfeed />
            </TabbarItem>
            <TabbarItem
              onClick={onStoryChange}
              selected={activeStory === "persik"}
              data-story="persik"
              text="Настройки"
            >
              <Icon28Search />
            </TabbarItem>
          </Tabbar>
        }
      >
        <View id="home" activePanel="home">
          <Home id="home" fetchedUser={fetchedUser} go={go} />
        </View>
        <View id="persik" activePanel="persik">
          <Persik id="persik" go={go} />
        </View>
      </Epic>
    </SettingsContext.Provider>
  );
};

export default App;
