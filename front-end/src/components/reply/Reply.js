import { useState } from "react";
import { Form, Button, Input, message } from "antd";
import NavbarC from "../Navbar/Navbar";
const Reply = () => {
  const [commentState, setCommentState] = useState({
    comments: [],
  });
  const { comments } = commentState;
  const { TextArea } = Input;
  return (
    <div className="container" style={{ marginTop: "20px" }}>
      <NavbarC />
      <div className="row">
        <div className="col-lg-6 col-md-4 col-sm-3">
          <Form.Item>
            <TextArea
              rows={4}
              value={comments}
              onChange={(e) => {
                setCommentState({
                  ...commentState,
                  comments: e.target.value,
                });
              }}
            />
          </Form.Item>
          <Form.Item>
            <Button
              htmlType="submit"
              type="primary"
              onClick={() => {
                setCommentState({ ...commentState, comments: "" });
                message.info("comment sent successfully");
              }}
            >
              Add Comment
            </Button>
          </Form.Item>
        </div>
      </div>
    </div>
  );
};

export default Reply;
