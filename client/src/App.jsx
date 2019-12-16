import React, { useEffect, useGlobal, useState } from "reactn";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { findOrCreate as findOrCreatePlayer } from "./services/api/player";
import MainViews from "./views/views.switch";
import Navbar from "./components/Navbar";
import GameCard from "./components/GameCard";
import TestMap from "./components/Maps/TestMap";

import { requestNotificationPerm } from "./services/notifications";
import { notification, Layout, Menu, Icon } from "antd";
import WrappedLoginForm from "./components/LogIn";
import WrappedRegisterForm from "./components/Register";
import BottomBar from "./components/BottomBar";
import playerView from "./views/playerView";

const { Header, Sider, Content } = Layout;

function App() {
  const [fire] = useGlobal("fire");
  const [userToken, setUserToken] = useGlobal("userToken");
  const [player, setPlayer] = useGlobal("player");
  const [, setMessageToken] = useGlobal("playerMessagingToken");
  const [toggle, setToggle] = useState(true);

  // Use effect for Firebase Magic
  useEffect(() => {
    // Initialization for cloud messaging
    //TODO: This can be done in any component, it's here for demonstration purposes
    requestNotificationPerm(fire).then(retrievedToken => {
      setMessageToken(retrievedToken);
      console.log(retrievedToken);
    });

    // Recieve message when user is in the website
    fire.messaging().onMessage(payload => {
      console.log("Message received. ", payload);
      notification.open({
        message: payload.data.title,
        description: payload.data.message,
        onClick: () => {
          console.log("Notification Clicked!");
        }
      });
    });

    // Authentication Event Listener
    fire.auth().onAuthStateChanged(async firebaseUser => {
      if (firebaseUser) {
        setUserToken(firebaseUser._lat);
        try {
          const playerFetch = await findOrCreatePlayer(firebaseUser._lat, firebaseUser);
          if (playerFetch && player === null) setPlayer(playerFetch.data);
        } catch (error) {
          throw error;
        }
      } else {
        // resets the token to null when the user is not signed in
        if (userToken) setUserToken(null);
      }
    });
  }, []);

  const handleSignOut = () => {
    fire.auth().signOut();
  };

  return (
    <Router>
      <Layout>
        <Sider trigger={null} collapsible collapsed={toggle} className="bg-winid-1">
          <div className="logo text-center py-3">
            <Icon type="slack" className="text-4xl text-white" />
          </div>
          <Menu mode="inline" defaultSelectedKeys={["1"]} className="bg-winid-1 text-white border-none ">
            <Menu.Item key="1">
              <Icon type="user" />
              <span>nav 1</span>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="video-camera" />
              <span>nav 2</span>
            </Menu.Item>
            <Menu.Item key="3">
              <Icon type="upload" />
              <span>nav 3</span>
            </Menu.Item>
            {player && (
              <Menu.Item key="4" onClick={handleSignOut}>
                <Icon type="logout" />
                <span>Sign Out</span>
              </Menu.Item>
            )}
          </Menu>
        </Sider>
        <Layout>
          {/* <Header>
            <Icon className="trigger" type={toggle ? "menu-unfold" : "menu-fold"} onClick={() => setToggle(!toggle)} />
          </Header> */}
          <Content>
            {/* <Navbar></Navbar> */}
            <TestMap></TestMap>
            {/* <BottomBar></BottomBar> */}

            <Switch>
              {/* <Route path="/" exact component={homeView}></Route> */}
              <Route path="/login" component={WrappedLoginForm}></Route>
              <Route path="/register" component={WrappedRegisterForm}></Route>
              <Route path="/player/:username" component={playerView}></Route>
              {/* <Route path="/team/:id" component={playerView}></Route>
          <Route path="/game/:id" component={gameView}></Route>
          <Route path="/league/:id" component={leagueView}></Route>
          <Route path="/request/:id" component={requestView}></Route> */}
            </Switch>
            {/* <WrappedRegisterForm></WrappedRegisterForm> */}
            <MainViews />
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
}

export default App;
