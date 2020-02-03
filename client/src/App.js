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
import Settings from "./panels/Settings";

import { SettingsContext } from "./context/SettingsContext";

const App = () => {
  const [activeStory, setActiveStory] = useState("home");
  const [fetchedUser, setUser] = useState(null);
  const [popout, setPopout] = useState(<ScreenSpinner size="large" />);

  const [userCityId, setUserCityId] = useState(1);
  const [userCityTitle, setUserCityTitle] = useState("Москва");
  const [userCountryId, setUserCountryId] = useState(1);
  const [userId, setUserId] = useState(1);
  const [userToken, setUserToken] = useState(
    "ea900e57253a509f94c13c36a6cdf6f5ecea0ffb356b5c818af7be039c4c4638da53cc28e33e41de97099"
  );
  const [categories, setCategories] = useState(["Music", "Dance", "фестиваль"]);
  // const appSettings = {
  //   app_id: "your_app_id",
  //   scope: "groups"
  // };

  const setCity = async (id, title) => {
    await setUserCityId(id);
    await setUserCityTitle(title);
  };

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
      // const fetchedCategories = localStorage.getItem("categories");
      // if(!fetchedCategories) setCategories(["Music", "Dance", "фестиваль"]);
      // else setCategories(fetchedCategories)
      // const user = await connect.send("VKWebAppGetUserInfo");
      // setUser(user);
      // setCityId(user.city.id);
      // setUserCountryId(user.country.id);
      // setUserId(user.id);
      // const token_tmp = await connect.send("VKWebAppGetAuthToken", {
      //   app_id: app_id,
      //   scope: scope
      // });
      // user_token = await token_tmp.access_token;
      // setUserToken(user_token);
      setPopout(null);
    }
    fetchData();
  }, []);

  const onStoryChange = e => {
    setActiveStory(e.currentTarget.dataset.story);
  };

  return (
    <SettingsContext.Provider value={{ setCity }}>
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
          <Home
            id="home"
            fetchedUser={fetchedUser}
            cityId={userCityId}
            token={userToken}
            countryId={userCountryId}
            userId={userId}
            categories={categories.join(",")}
          />
        </View>
        <View id="persik" activePanel="persik">
          <Settings
            id="persik"
            cityTitle={userCityTitle}
            countryId={userCountryId}
          />
        </View>
      </Epic>
    </SettingsContext.Provider>
  );
};

export default App;
