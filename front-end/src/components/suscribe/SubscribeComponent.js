import { Modal, Button, message } from "antd";
import { useState } from "react";
import { Form, Input, Checkbox } from "antd";
import { FaBell } from "react-icons/fa";

const SubscribeComponent = () => {
  const [subscribeModal, setsubscribeModal] = useState({
    subscribeModalV: false,
  });

  const { subscribeModalV } = subscribeModal;

  const setSubscribeModalV = (subscribeModalV) => {
    setsubscribeModal({ subscribeModalV });
  };

  const onFinish = (values) => {
    message.success("subscribed successfully");
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };
  return (
    <div className="container">
      <Button
        type="primary"
        onClick={() => setSubscribeModalV(true)}
        style={{
          marginTop: "5px",
          background: "#bf360c",
          border: "none",
        }}
      >
        <FaBell style={{ marginRight: "10px", color: "#fff" }} />
        Subscribe
      </Button>
      <Modal
        title="Subscribe to get notified"
        centered
        visible={subscribeModalV}
        onOk={() => setSubscribeModalV(false)}
        onCancel={() => setSubscribeModalV(false)}
      >
        <Form
          {...layout}
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            {...tailLayout}
            name="select category"
            valuePropName="checked"
          >
            <h6>Books category</h6>
            <Checkbox>CSE</Checkbox>
            <Checkbox>Fiction</Checkbox>
            <Checkbox>Business</Checkbox>
          </Form.Item>
          <Form.Item
            {...tailLayout}
            name="select category"
            valuePropName="checked"
          >
            <h6>Magazine category</h6>
            <Checkbox>Times</Checkbox>
            <Checkbox>Forbs</Checkbox>
          </Form.Item>
          <Form.Item
            {...tailLayout}
            name="select category"
            valuePropName="unchecked"
          >
            <h6>News category</h6>
            <Checkbox>BBC World</Checkbox>
            <Checkbox>EBC</Checkbox>
            <Checkbox>Fana</Checkbox>
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button
              type="primary"
              htmlType="submit"
              onClick={() => {
                setSubscribeModalV(false);
              }}
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default SubscribeComponent;
