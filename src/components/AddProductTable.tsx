import React, { Component, useState } from "react";
import { Alert, Button, Form, Input, InputNumber } from "antd";
import styles from "../utils/Global.module.css";
import { CartState } from "../utils/types";
import { RootState } from "../utils/rootReducer";
import { Dispatch } from "redux";
import { Action, addData } from "../utils/actions";
import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const validateMessages = {
  required: "${label} is required!",
};

const AddForm = (props: any) => {
  const navigate = useNavigate();
  const [addSuc, setAddSuc] = useState(false);
  const onFinish = (values: any) => {
    props?.onAddProduct(values, props?.products);
    setAddSuc(!addSuc);
    setTimeout(() => {
      setAddSuc(!addSuc);
      navigate("/");
    }, 2000);
  };
  return (
    <div className={styles.addProductTable}>
      {addSuc && (
        <Alert
          style={{ width: "100%", margin: "auto", marginTop: 10 }}
          message="Product Added Successfully"
          type="success"
        />
      )}
      <Form
        {...layout}
        name="nest-messages"
        onFinish={onFinish}
        style={{ marginTop: 10 }}
        validateMessages={validateMessages}
      >
        <Form.Item
          name={["product", "name"]}
          label="Name"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name={["product", "category"]} label="Category">
          <Input />
        </Form.Item>
        <Form.Item name={["product", "price"]} label="price">
          <Input />
        </Form.Item>
        <Form.Item name={["product", "image"]} label="Image">
          <Input />
        </Form.Item>
        <Form.Item name={["product", "description"]} label="Description">
          <Input.TextArea />
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

class AddProductTable extends Component {
  constructor(props: any) {
    super(props);
  }
  render() {
    return (
      <div>
        <AddForm {...this.props} />
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  return { products: state?.product?.data };
};

const mapDispatchToProps = (dispatch: Dispatch<Action | any>) => {
  return {
    onAddProduct: (items: any, productData: any) =>
      dispatch(addData(items, productData)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AddProductTable);
