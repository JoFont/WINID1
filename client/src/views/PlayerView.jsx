import React, { useGlobal } from "reactn";
import { Row, Col } from "antd";
import { Redirect } from "react-router-dom";

const PlayerView = () => {
  const [player] = useGlobal("player");
  const [fire] = useGlobal("fire");

  const handleSignOut = () => {
    fire.auth().signOut();
  };

  if (!player) {
    return <Redirect to="/" />;
  }

  return (
    <div className="h-screen">
      <Row className="bg-winid-1 p-6">
        <Col span={6}>
          <div className="rounded-lg p-6">
            <img src={player && player.photoUrl} alt="" className="rounded-full" />
            <h1 className="text-lg text-center">{player && player.username}</h1>
            <h2 className="text-center">{player && player.displayName}</h2>
            <button onClick={() => handleSignOut()}>Logout</button>
          </div>
        </Col>
        <Col span={18}>col-12</Col>
      </Row>
    </div>
  );
};

export default PlayerView;
