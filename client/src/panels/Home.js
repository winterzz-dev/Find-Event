import React, { useContext, useCallback, useState, useEffect } from "react";
import PropTypes from "prop-types";
import Panel from "@vkontakte/vkui/dist/components/Panel/Panel";
import PanelHeader from "@vkontakte/vkui/dist/components/PanelHeader/PanelHeader";
import Group from "@vkontakte/vkui/dist/components/Group/Group";
import Cell from "@vkontakte/vkui/dist/components/Cell/Cell";
import Avatar from "@vkontakte/vkui/dist/components/Avatar/Avatar";
// import List from "@vkontakte/vkui/dist/components/List/List";
// import Div from "@vkontakte/vkui/dist/components/Div/Div";
// import Button from "@vkontakte/vkui/dist/components/Button/Button";

import { EventsList } from "../components/EventsList";

import { SettingsContext } from "../context/SettingsContext";
import { useHttp } from "../hooks/http.hook";

const Home = ({ id, fetchedUser }) => {
  const [events, setEvents] = useState([]);
  const { loading, request } = useHttp();
  const { country_id, city_id, user_token } = useContext(SettingsContext);

  const loadEvents = useCallback(async () => {
    try {
      //TODO: set user settings
      const fetched = await request(
        "/api/events/find",
        "POST",
        {
          user_id: 1,
          token:
            "bffe76f52125feae5dbb635759ced7ca28be89a805c520558be249add6563339cd2e75547f66e87f37280",
          city_id: 1,
          categories: "Music,Dance"
        },
        {}
      );
      setEvents(fetched);
    } catch (error) {
      console.error(error);
    }
  }, [country_id, city_id, user_token, request]);

  useEffect(() => {
    loadEvents();
  }, [loadEvents]);

  if (loading) {
    return <div>loading</div>;
  }

  return (
    <>
      {!loading && (
        <Panel id={id}>
          <PanelHeader>Find Event</PanelHeader>
          {fetchedUser && (
            <Group title="Пользователь">
              <Cell
                before={
                  fetchedUser.photo_200 ? (
                    <Avatar src={fetchedUser.photo_200} />
                  ) : null
                }
                description={
                  fetchedUser.city && fetchedUser.city.title
                    ? fetchedUser.city.title
                    : ""
                }
              >
                {`${fetchedUser.first_name} ${fetchedUser.last_name}`}
              </Cell>
            </Group>
          )}
          <EventsList events={events} />
        </Panel>
      )}
    </>
  );
};

Home.propTypes = {
  id: PropTypes.string.isRequired,
  fetchedUser: PropTypes.shape({
    photo_200: PropTypes.string,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    city: PropTypes.shape({
      title: PropTypes.string
    })
  })
};

export default Home;
