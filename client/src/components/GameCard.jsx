import React, { useState, useGlobal } from 'reactn';
import { Link } from 'react-router-dom';
import { Card, Icon, Avatar } from 'antd';
import * as ROUTES from '../constants/trimmed.routes';
const { Meta } = Card;

const GameCard = () => {
  // const [top, setTop] = useState(10);
  // const [player] = useGlobal('player');

  return (
    <Card
      style={{ width: 300 }}
      cover={
        <img
          alt="example"
          src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
        />
      }
      actions={[
        <Icon type="setting" key="setting" />,
        <Icon type="edit" key="edit" />,
        <Icon type="ellipsis" key="ellipsis" />
      ]}
    >
      <Meta
        avatar={
          <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
        }
        title="Game Title"
        description="This is the description"
      />
    </Card>
  );
};

export default GameCard;
