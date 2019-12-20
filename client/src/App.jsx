import React, { Fragment, useEffect, useGlobal, useState, getGlobal } from "reactn";
import { Switch, Link } from "react-router-dom";
import { findOrCreate as findOrCreatePlayer } from "./services/api/player";
import MainViews from "./views/views.switch";

import * as ROUTES from "./constants/trimmed.routes";

import { requestNotificationPerm } from "./services/notifications";
import { notification, Layout, Icon } from "antd";

const { Sider, Content } = Layout;

function App(props) {
  const [fire] = useGlobal("fire");
  const [userToken, setUserToken] = useGlobal("userToken");
  const [player, setPlayer] = useGlobal("player");
  const [, setMessageToken] = useGlobal("playerMessagingToken");
  const [toggle, setToggle] = useState(true);
  const [, setPlayerCoordinates] = useGlobal("playerCoordinates");

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
        console.log("FIREBASE USER: ", firebaseUser._lat);
        setUserToken(firebaseUser._lat);
        try {
          const playerFetch = await findOrCreatePlayer(firebaseUser._lat, firebaseUser);
          if (playerFetch && player === undefined) setPlayer(playerFetch.data);
        } catch (error) {
          throw error;
        }
      } else {
        // resets the token to null when the user is not signed in
        if (userToken) {
          setUserToken(null);
        }
        setPlayer(null);
      }
    });
  }, []);

  useEffect(() => {
    const success = async pos => {
      await setPlayerCoordinates([pos.coords.longitude, pos.coords.latitude]);
    };

    const error = err => {
      console.warn("ERRO(" + err.code + "): " + err.message);
    };

    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };

    navigator.geolocation.getCurrentPosition(success, error, options);
  }, []);

  const handleSignOut = () => {
    fire.auth().signOut();
  };

  return (
    <Fragment>
      <Layout>
        <Sider trigger={null} collapsible collapsed={toggle} className="winid-gradient-180 h-screen max-h-screen">
          <ul className="flex flex-col justify-start h-full">
            <li className="logo text-center py-3">
              <Link to={ROUTES.HOME} className="flex justify-center items-center">
                <div className="winid-gradient-logo rounded-lg w-2/3 py-2 animated infinite pulse">
                  <img src="/icons/logo.svg" alt="" className="h-8 mx-auto" />
                </div>
              </Link>
            </li>
            <li className="px-3 py-6 flex justify-center items-center">
              <Link to={ROUTES.GAMES}>
                <Icon type="team" className="text-lg text-white" />
              </Link>
            </li>
            <li className="px-3 py-6 flex justify-center items-center">
              <Icon type="environment" className="text-lg text-white" />
            </li>
            <li className="px-3 py-6 flex justify-center items-center">
              <Icon type="message" className="text-lg text-white" />
            </li>
            <li className="px-3 py-6 flex justify-center items-center">
              <Icon
                className="trigger text-lg text-white"
                type={toggle ? "menu-unfold" : "menu-fold"}
                onClick={() => setToggle(!toggle)}
              />
            </li>
            {userToken && (
              <li className="p-3 mt-auto flex justify-center items-center">
                <Link to={ROUTES.PLAYER + "/" + (player && player.username)}>
                  <img src={player && player.photoUrl} alt="" className="w-8 rounded-full" />
                </Link>
              </li>
            )}
            {!userToken && (
              <li className="p-3 mt-auto flex justify-center items-center">
                <Link to={ROUTES.LOGIN}>
                  <Icon type="login" className="text-lg text-white" />
                </Link>
              </li>
            )}
          </ul>

          {/* <Menu mode="inline" defaultSelectedKeys={["1"]} className="bg-winid-1 text-white border-none ">
            <Menu.Item key="1" className="my-0 py-3">
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
          </Menu> */}
        </Sider>
        <Layout>
          {/* <Header>
            <Icon className="trigger" type={toggle ? "menu-unfold" : "menu-fold"} onClick={() => setToggle(!toggle)} />
          </Header> */}
          <Content>
            <Switch>
              <MainViews />
            </Switch>
          </Content>
        </Layout>
      </Layout>
    </Fragment>
  );
}

export default App;
