import React, { useState, useEffect } from 'react';
import { Card } from 'antd';

const { Meta } = Card;

const UserInfo = props => {
  const [userId, setUserId] = useState('');
  useEffect(() => {
    const userid = props.location.query.userid;
    if (userid) {
      setUserId(userid);
      sessionStorage.setItem('userId', userid);
      console.log(userId);
    }
  }, []);
  return (
    <Card
      hoverable
      style={{ width: 240 }}
      cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
    >
      <Meta title="Europe Street beat" description="www.instagram.com" />
    </Card>
  );
};
export default UserInfo;
