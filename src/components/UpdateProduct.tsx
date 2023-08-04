import { Component, ReactNode } from "react";
import { RootState } from "../utils/rootReducer";
import { Dispatch } from "redux";
import {
  Action,
  fetchProductDetails,
  fetchProducts,
  updateData,
} from "../utils/actions";
import { connect } from "react-redux";
import { Alert, Button, Card, Form, Input } from "antd";
import withRouter from "../utils/withRouter";
import styles from "../utils/Global.module.css";
import UpdateCardShimmer from "./UpdateCardShimmer";

const { Meta } = Card;

class UpdateProduct extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      addItemStatus: false,
    };
  }

  componentDidMount() {
    const { params } = this.props;
    this.props.onFetchProductDetails(params?.pid);
  }

  render() {
    const { image, title, description, price, id, category } =
      this.props.productDetails;
    const layout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 },
    };
    const onFinish = (values: any) => {
      this.props?.onUpdateProduct(this.props?.products, {
        ...{ ...values?.product },
        id: id,
        image: image,
        category: category,
      });
      this.setState({ addItemStatus: !this.state.addItemStatus });
      setTimeout(() => {
        this.setState({ addItemStatus: !this.state.addItemStatus });
        this.props.navigate("/");
      }, 2000);
    };
    return (
      <div>
        {this.props.productDetails.length != 0 &&
        !Array.isArray(this.props.productDetails) ? (
          <div>
            {this.state.addItemStatus && (
              <Alert
                style={{ width: "40%", margin: "auto", marginTop: 10 }}
                message="Product Updated Successfully"
                type="success"
              />
            )}
            <Card
              hoverable
              style={{ width: "40%", margin: "auto", marginTop: 20 }}
              cover={
                <img alt="example" src={image} style={{ width: "200px" }} />
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
                  <Form.Item
                    name={["product", "name"]}
                    label="Name"
                    initialValue={title}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name={["product", "price"]}
                    label="price"
                    initialValue={price}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    name={["product", "description"]}
                    label="Description"
                    initialValue={description}
                  >
                    <Input.TextArea />
                  </Form.Item>
                  <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                    <Button type="primary" htmlType="submit">
                      Submit
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </Card>
          </div>
        ) : (
          <UpdateCardShimmer />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    productDetails: state?.product?.fetchedProductDetails,
    products: state?.product?.data,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<Action | any>) => {
  return {
    onFetchProductDetails: (data: any) => dispatch(fetchProductDetails(data)),
    onUpdateProduct: (productData: any, updatedItem: any) =>
      dispatch(updateData(productData, updatedItem)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(UpdateProduct));
