import { Component, ReactNode } from "react";
import { Button, Card, Form, Input } from "antd";
import styles from "../utils/Global.module.css";

const { Meta } = Card;

class UpdateCardShimmer extends Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  componentDidMount() {}

  render() {
    const layout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 },
    };
    const onFinish = (values: any) => {};
    return (
      <div>
        <Card
          hoverable
          style={{ width: "40%", margin: "auto", marginTop: 20 }}
          cover={
            <img
              alt="example"
              src={
                "https://upload.wikimedia.org/wikipedia/commons/a/a7/Blank_image.jpg?20180514195324"
              }
              style={{ width: "200px" }}
            />
          }
          className={styles.cardClass}
        >
          <div className={"ant-card-body"}>
            <Form
              {...layout}
              name="nest-messages"
              onFinish={onFinish}
              style={{ marginTop: 10, width: "100%" }}
            >
              <Form.Item name={["product", "name"]} label="Name">
                <Input />
              </Form.Item>
              <Form.Item name={["product", "price"]} label="price">
                <Input />
              </Form.Item>
              <Form.Item name={["product", "description"]} label="Description">
                <Input.TextArea disabled />
              </Form.Item>
              <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                <Button type="primary" htmlType="submit" disabled>
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Card>
      </div>
    );
  }
}

export default UpdateCardShimmer;
