import React, { useState, useGlobal } from "reactn"
import { Link } from "react-router-dom"
import { Card, Icon, Avatar } from "antd"
import * as ROUTES from "../constants/trimmed.routes"
const { Meta } = Card

const GameCard = () => {
  // const [top, setTop] = useState(10);
  // const [player] = useGlobal('player');

  return (
    <Card
      style={{ width: 300 }}
      cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
      actions={[
        <Icon type="setting" key="setting" />,
        <Icon type="edit" key="edit" />,
        <Icon type="ellipsis" key="ellipsis" />,
        <Icon type="thunderbolt" theme="twoTone" />
      ]}
    >
      <Card.Meta
        className="mb-0 text-lg"
        avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
        title={[<h1 className="my-0 text-bold text-blue-300 text-4xl leading-none">21:30</h1>]}
        description="This is the description"
      />
    </Card>
  )
}

export default GameCard
