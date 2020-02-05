import React, { useCallback, useState, useEffect, useContext } from "react";
import NodeRSA from "node-rsa";
import PropTypes from "prop-types";
import { List, Group, Cell, Panel, PanelHeader, Footer } from "@vkontakte/vkui";

import { EventsList } from "../components/EventsList";
import { useHttp } from "../hooks/http.hook";

import { NavContext } from "../context/NavContext";

export const Home = props => {
  const [events, setEvents] = useState([]);
  const { loading, request } = useHttp();
  const { setPublicKey } = useContext(NavContext);

  let public_key;

  const loadEvents = useCallback(async () => {
    try {
      public_key = await request(
        "/api/keys/get",
        "POST",
        {
          user_id: props.userId
        },
        {}
      );
      await setPublicKey(public_key.public_key);
      const key = await new NodeRSA();
      key.importKey(public_key.public_key);
      const encrypted_key = await key.encrypt(props.token, "base64");
      const fetched = await request(
        "/api/events/find",
        "POST",
        {
          user_id: props.userId,
          token: encrypted_key,
          city_id: props.cityId,
          categories: props.categories
        },
        {}
      );
      setEvents(fetched);
    } catch (error) {
      console.error(error);
    }
  }, [props.userId, props.token, props.cityId, props.categories]);

  useEffect(() => {
    loadEvents();
  }, [loadEvents]);

  if (loading) {
    return (
      <>
        <Panel id={props.id}>
          <PanelHeader>События</PanelHeader>
          <Group title={props.cityTitle}>
            <List>
              <Cell>Загрузка</Cell>
            </List>
          </Group>
        </Panel>
      </>
    );
  }

  return (
    <>
      {!loading && (
        <Panel id={props.id}>
          <PanelHeader>События</PanelHeader>
          <EventsList events={events} cityTitle={props.cityTitle} />
          <Footer>{events.length} событий</Footer>
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

// export default Home;
