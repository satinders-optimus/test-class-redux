import { Component } from "react";
import {
  Action,
  addData,
  deleteData,
  fetchProducts,
  updateData,
} from "../utils/actions";
import { connect } from "react-redux";
import { ListItem } from "../utils/types";
import { Dispatch } from "redux";
import { RootState } from "../utils/rootReducer";
import EditProductTable from "./EditProductTable";
import { Alert, Button } from "antd";
import AddProductTable from "./AddProductTable";
import withRouter from "../utils/withRouter";

class ProductList extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      addItemStatus: false,
    };
    this.handleClickButton = this.handleClickButton.bind(this);
  }

  componentDidMount() {
    console.log(this.props.products, "dud mount");
    if (this.props?.products?.length === 0) {
      this.props.onFetchData();
    }
  }

  handleInputChange(event: any) {
    event.preventDefault();
    console.log(event.target.value);
  }
  handleClickButton() {
    this.setState({ count: 2 });
  }
  componentDidUpdate(
    prevProps: Readonly<any>,
    prevState: Readonly<any>,
    snapshot?: any
  ): void {
    console.log(this.props.products, "this.props.products");
  }
  render() {
    {
    }
    return (
      <div>
        {this.props?.products?.length !== 0 ? (
          <EditProductTable {...this.props} />
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  return { products: state?.product?.data };
};

const mapDispatchToProps = (dispatch: Dispatch<Action | any>) => {
  return {
    onFetchData: () => dispatch(fetchProducts()),
    onAddProduct: (items: any, productData: any) =>
      dispatch(addData(items, productData)),
    onUpdateProduct: (productData: any, updatedItem: any) =>
      dispatch(updateData(productData, updatedItem)),
    onDeleteProduct: (deletedItem: any, productData: any) =>
      dispatch(deleteData(deletedItem, productData)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ProductList));
