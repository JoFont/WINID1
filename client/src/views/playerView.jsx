import React, { useEffect, useGlobal } from "reactn"
import { Row, Col } from "antd"

const playerView = () => {
  // const [player] = useGlobal("player")
  return (
    <div className="h-screen">
      <Row>
        <Col span={6}>
          <h1 className="text-lg">@Alntjan</h1>
        </Col>
        <Col span={18}>col-12</Col>
      </Row>
    </div>
  )
}

export default playerView
