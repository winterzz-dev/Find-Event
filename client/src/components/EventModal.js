import React, { useState } from "react";
import { ModalPage } from "@vkontakte/vkui/dist/components/ModalPage/ModalPage";
import { ModalPageHeader } from "@vkontakte/vkui/dist/components/ModalPageHeader/ModalPageHeader";
import Icon24Cancel from "@vkontakte/icons/dist/24/cancel";
import Icon24Done from "@vkontakte/icons/dist/24/done";
import {
  ModalRoot,
  IS_PLATFORM_ANDROID,
  IS_PLATFORM_IOS,
  FormLayout,
  Input,
  PanelHeaderClose
} from "@vkontakte/vkui";
// import {} from "@vkontakte/vkui/dist/components/"

export const EventModal = ({ activeModal }) => {
  const [modal, setModal] = useState(activeModal);
  return (
    <ModalRoot activeModal={modal}>
      <ModalPage
        id="eventModal"
        header={
          <ModalPageHeader
          // left={
          //   IS_PLATFORM_ANDROID && (
          //     <PanelHeaderClose onClick={setModal(null)}>
          //       <Icon24Cancel />
          //     </PanelHeaderClose>
          //   )
          // }
          // right={
          //   <PanelHeaderClose onClick={setModal(null)}>
          //     {IS_PLATFORM_IOS ? "Готово" : <Icon24Done />}
          //   </PanelHeaderClose>
          // }
          >
            Информация
          </ModalPageHeader>
        }
      >
        <FormLayout>
          <Input type="email" top="E-mail" name="email" />
        </FormLayout>
      </ModalPage>
    </ModalRoot>
  );
};
