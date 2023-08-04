import { Component, ReactNode } from "react";
import { RootState } from "../utils/rootReducer";
import { Dispatch } from "redux";
import { Action, fetchProductDetails, fetchProducts } from "../utils/actions";
import { connect } from "react-redux";
import { Button, Card, Form, Input } from "antd";
import withRouter from "../utils/withRouter";

const { Meta } = Card;

class ProductDetails extends Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  componentDidMount() {
    const { params } = this.props;
    this.props.onFetchProductDetails(params?.pid);
  }

  render() {
    const { image, title, description, price } = this.props.productDetails;
    const layout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 },
    };
    const onFinish = (values: any) => {};
    return (
      <Card
        hoverable
        style={{ width: 300, margin: "auto" }}
        cover={<img alt="example" src={image} />}
      >
        <Meta title={title} description={description} />
        <p>Rs. {price}</p>
      </Card>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  return { productDetails: state?.product?.fetchedProductDetails };
};

const mapDispatchToProps = (dispatch: Dispatch<Action | any>) => {
  return {
    onFetchProductDetails: (data: any) => dispatch(fetchProductDetails(data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ProductDetails));
