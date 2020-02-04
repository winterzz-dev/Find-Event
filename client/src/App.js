import React, { useState, useEffect } from "react";
import connect from "@vkontakte/vk-connect";

import { View, ScreenSpinner, Tabbar, TabbarItem, Epic } from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";

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
    "0445945d406065f1b39b789a3e46b1f7444903a6140b0b92e6c1aada1ef8522f59e5058e7a6b916bb3da7"
  );
  const [categories, setCategories] = useState(["Music", "Dance", "фестиваль"]);

  const deleteCategory = item => {
    setCategories(categories.filter(iter => item != iter));
  };

  const addCategory = item => {
    setCategories(categories.push(item));
  };

  // const appSettings = {
  //   app_id: "your_app_id",
  //   scope: "groups"
  // };

  const setCity = (id, title) => {
    setUserCityId(id);
    setUserCityTitle(title);
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
      // setPopout(null);
    }
    fetchData();
  }, [userCityId, userToken]);

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
              selected={activeStory === "settings"}
              data-story="settings"
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
            cityTitle={userCityTitle}
            token={userToken}
            countryId={userCountryId}
            userId={userId}
            categories={categories.join(",")}
          />
        </View>
        <View id="settings" activePanel="settings">
          <Settings
            id="settings"
            cityTitle={userCityTitle}
            countryId={userCountryId}
          />
        </View>
      </Epic>
    </SettingsContext.Provider>
  );
};

export default App;
