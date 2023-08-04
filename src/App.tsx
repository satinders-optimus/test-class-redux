import "./App.css";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import ProductList from "./components/ProductList";
import { store } from "./utils/store";
import { Provider } from "react-redux";
import ProductDetails from "./components/ProductDetails";
import AddProductTable from "./components/AddProductTable";
import UpdateProduct from "./components/UpdateProduct";

export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <ProductList />,
      },
      {
        path: "/product/:pid",
        element: <ProductDetails />,
      },
      {
        path: "/updateproduct/:pid",
        element: <UpdateProduct />,
      },
      {
        path: "/addproduct/",
        element: <AddProductTable />,
      },
    ],
  },
]);
function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Outlet />
      </div>
    </Provider>
  );
}

export default App;
