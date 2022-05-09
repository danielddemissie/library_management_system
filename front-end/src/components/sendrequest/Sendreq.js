import { Modal, Button, message, DatePicker } from "antd";
import { useState } from "react";
import { Form, Input } from "antd";

const Sendreq = () => {
  const [requestModal, setRequestModal] = useState({
    requestModalV: false,
  });

  const { requestModalV } = requestModal;

  const setRequestModalV = (requestModalV) => {
    setRequestModal({ requestModalV });
  };

  const onFinish = () => {
    message.success("your request is successfull");
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
      <div className="container">
        <Button
          type="primary"
          onClick={() => setRequestModalV(true)}
          style={{
            marginTop: "5px",
            background: "#00b8d4",
            border: "none",
          }}
        >
          send Request
        </Button>
        <Modal
          title="send request"
          centered
          visible={requestModalV}
          onOk={() => setRequestModalV(false)}
          onCancel={() => setRequestModalV(false)}
        >
          <Form
            {...layout}
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Return Date"
              rules={[{ required: true, message: "Please select date" }]}
            >
              <DatePicker />
            </Form.Item>
            <Form.Item {...tailLayout}>
              <Button
                type="primary"
                htmlType="submit"
                onClick={() => {
                  setRequestModalV(false);
                }}
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default Sendreq;
