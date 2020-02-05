import React, { useContext, useState, useCallback, useEffect } from "react";
import NodeRSA from "node-rsa";
import {
  Panel,
  PanelHeader,
  PanelHeaderBack,
  Group,
  Cell,
  List,
  Avatar,
  InfoRow
} from "@vkontakte/vkui";

import { NavContext } from "../context/NavContext";
import { useHttp } from "../hooks/http.hook";

export const InfoPanel = props => {
  const { setActivePanel } = useContext(NavContext);
  const [info, setInfo] = useState([]);
  const { loading, request } = useHttp();

  const loadInfo = useCallback(async () => {
    try {
      const key = await new NodeRSA();
      key.importKey(props.publicKey);
      const encrypted_key = await key.encrypt(props.token, "base64");
      const fetched = await request(
        "api/info/get",
        "POST",
        {
          event_id: props.eventId,
          user_id: props.userId,
          token: encrypted_key
        },
        {}
      );
      setInfo(fetched[0]);
    } catch (error) {
      console.error(error);
    }
  }, [props.eventId, props.userId]);

  useEffect(() => {
    loadInfo();
  }, [loadInfo]);

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
    <Panel id="infoPanel">
      <PanelHeader
        left={<PanelHeaderBack onClick={() => setActivePanel("home")} />}
      >
        Подробнее
      </PanelHeader>

      <Group title="Основное">
        <Cell
          before={info.photo_200 ? <Avatar src={info.photo_200} /> : null}
          description={info.activity}
        >
          {info.name}
        </Cell>
      </Group>

      <Group title="Подробнее">
        <List>
          <Cell multiline>
            <InfoRow title="Описание">{info.description}</InfoRow>
          </Cell>
          <Cell>
            <InfoRow title="Количество участников">
              {info.members_count}
            </InfoRow>
          </Cell>
          {/* <Cell>
            <InfoRow title="Дата начала">
              {new Date(info.start_date).toLocaleString()}
            </InfoRow>
          </Cell> */}
        </List>
      </Group>
    </Panel>
  );
};
