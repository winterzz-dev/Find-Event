import React from "react";
import PropTypes from "prop-types";
import Panel from "@vkontakte/vkui/dist/components/Panel/Panel";
import PanelHeader from "@vkontakte/vkui/dist/components/PanelHeader/PanelHeader";
// import Button from "@vkontakte/vkui/dist/components/Button/Button";
import Group from "@vkontakte/vkui/dist/components/Group/Group";
import Cell from "@vkontakte/vkui/dist/components/Cell/Cell";
// import Div from "@vkontakte/vkui/dist/components/Div/Div";
import Avatar from "@vkontakte/vkui/dist/components/Avatar/Avatar";
import List from "@vkontakte/vkui/dist/components/List/List";

const Home = ({ id, go, fetchedUser }) => (
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

    <Group title="События">
      {/* <Div>
        <Button size="xl" level="2" onClick={go} data-to="persik">
          Show me the Persik, please
        </Button>
      </Div> */}
      <List>
        <Cell before={<Avatar />} description="Дата события">
          Событие 1
        </Cell>
        <Cell before={<Avatar />} description="Дата события">
          Событие 2
        </Cell>
        <Cell before={<Avatar />} description="Дата события">
          Событие 3
        </Cell>
        <Cell before={<Avatar />} description="Дата события">
          Событие 4
        </Cell>
        <Cell before={<Avatar />} description="Дата события">
          Событие 5
        </Cell>
        <Cell before={<Avatar />} description="Дата события">
          Событие 6
        </Cell>
        <Cell before={<Avatar />} description="Дата события">
          Событие 7
        </Cell>
        <Cell before={<Avatar />} description="Дата события">
          Событие 8
        </Cell>
        <Cell before={<Avatar />} description="Дата события">
          Событие 9
        </Cell>
        <Cell before={<Avatar />} description="Дата события">
          Событие 10
        </Cell>
        <Cell before={<Avatar />} description="Дата события">
          Событие 11
        </Cell>
        <Cell before={<Avatar />} description="Дата события">
          Событие 12
        </Cell>
        <Cell before={<Avatar />} description="Дата события">
          Событие 13
        </Cell>
      </List>
    </Group>
  </Panel>
);

Home.propTypes = {
  id: PropTypes.string.isRequired,
  go: PropTypes.func.isRequired,
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
