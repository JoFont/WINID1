import React from "reactn";
import { Modal, Button } from "antd";

class CreateModal extends React.Component {
  state = {
    modalVisible: false
  };

  setModalVisible(modalVisible) {
    this.setState({ modalVisible });
  }
 

  render() {
    return (
      <div>
        <Button type="primary" onClick={() => this.setModalVisible(true)}>
          Create Game
        </Button>
        <Modal
          title="20px to Top"
          style={{ top: 0, width: 100 + "%" }}
          visible={this.state.modalVisible}
          onOk={() => this.setModalVisible(false)}
          onCancel={() => this.setModalVisible(false)}
          width={"100%"}
        ></Modal>
      </div>
    );
  }
}

export default CreateModal;
