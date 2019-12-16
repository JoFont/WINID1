import React, { useEffect, useGlobal } from "reactn";
import { Row, Col } from "antd";

const PlayerView = () => {
  const [player] = useGlobal("player");
  return (
    <div className="h-screen">
      <Row className="bg-winid-4 p-6">
        <Col span={6}>
          <div className="rounded-lg p-6">
            <img
              src="https://scontent.fopo1-1.fna.fbcdn.net/v/t1.0-9/67678905_10219244313676107_8295373348154638336_o.jpg?_nc_cat=101&_nc_ohc=Op-Hz3dufa0AQmXSwxXMf5VXiduP7aeU76u_Tv2SCege4I6PNq8h3PBRA&_nc_ht=scontent.fopo1-1.fna&oh=0879b0225c35eea652da68ac40d8337f&oe=5E6C89DB"
              alt=""
              className="rounded-full"
            />
            <h1 className="text-lg text-center uppercase text-white font-winid1">@{player && player.username}</h1>
            <h2 className="text-2xl text-center uppercase text-white font-winid1">{player && player.displayName}</h2>
          </div>
        </Col>
        <Col span={18}>col-12</Col>
      </Row>
    </div>
  );
};

export default PlayerView;
