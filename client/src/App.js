import React, { useState, useEffect } from "react";
import connect from "@vkontakte/vk-connect";

import { View, ScreenSpinner, Tabbar, TabbarItem, Epic } from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";

import Icon28Search from "@vkontakte/icons/dist/28/search";
import Icon28Newsfeed from "@vkontakte/icons/dist/28/newsfeed";

import { HomeView } from "./panels/HomeView";
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
    "6d4398fae365c0394b7e04c3a1690cd0a2929d6ec05ad1dfc08c6d707549c957b0e75e22112812cd68232"
  );
  const [categories, setCategories] = useState([
    {
      id: 1,
      title: "Music"
    },
    {
      id: 2,
      title: "Dance"
    },
    {
      id: 3,
      title: "фестиваль"
    }
  ]);
  const [categoriesCounter, setCategoriesCounter] = useState(4);

  const deleteCategory = item => {
    setCategories(categories.filter(iter => item != iter.id));
  };

  const addCategory = item => {
    setCategories(
      categories.concat({
        id: categoriesCounter,
        title: item
      })
    );
    setCategoriesCounter(categoriesCounter + 1);
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
    <SettingsContext.Provider value={{ setCity, addCategory, deleteCategory }}>
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
        <HomeView
          id="home"
          cityId={userCityId}
          cityTitle={userCityTitle}
          token={userToken}
          countryId={userCountryId}
          userId={userId}
          categories={categories.map(item => item.title).join(",")}
        />
        <View id="settings" activePanel="settings">
          <Settings
            id="settings"
            cityTitle={userCityTitle}
            countryId={userCountryId}
            categories={categories}
          />
        </View>
      </Epic>
    </SettingsContext.Provider>
  );
};

export default App;
