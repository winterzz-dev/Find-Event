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
// import Icon24Back from '@vkontakte/icons/dist/24/back';

import Home from "./panels/Home";
import Persik from "./panels/Persik";

const App = () => {
  const [activeStory, setActiveStory] = useState("home");
  const [fetchedUser, setUser] = useState(null);
  const [popout, setPopout] = useState(<ScreenSpinner size="large" />);

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
      const user = await connect.send("VKWebAppGetUserInfo");
      setUser(user);
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
            text="Поиск"
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
  );
};

export default App;
