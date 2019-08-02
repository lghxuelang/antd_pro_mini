import React, { useState, useEffect } from "react";
import { Card } from "antd";
import {
  DraggableModal,
  DraggableModalProvider
} from "ant-design-draggable-modal";
import "antd/dist/antd.css";
import "ant-design-draggable-modal/dist/index.css";
import Zmage from "react-zmage";

const { Meta } = Card;

const UserInfo = props => {
  const [userId, setUserId] = useState("");
  const [modalVisible, setModalVisible] = useState(true);
  useEffect(() => {
    const userid = props.location.query.userid;
    if (userid) {
      setUserId(userid);
      sessionStorage.setItem("userId", userid);
      console.log(userId);
    }
  }, []);
  const closeModal = () => {
    setModalVisible(false);
  };
  return (
    <>
      <Card
        hoverable
        style={{ width: 240 }}
        cover={
          <Zmage
            alt="example"
            src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
          />
        }
      >
        <Meta title="Europe Street beat" description="www.instagram.com" />
      </Card>
      <DraggableModalProvider>
        <Modalbutton
          title={1}
          visible={modalVisible}
          onOk={closeModal}
          onCancel={closeModal}
        />
      </DraggableModalProvider>
    </>
  );
};
export default UserInfo;

const Modalbutton = props => {
  return <DraggableModal {...props}>模态框</DraggableModal>;
};
