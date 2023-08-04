import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Popconfirm,
  Space,
  Table,
  Typography,
} from "antd";
import { Link, useNavigate } from "react-router-dom";
import styles from "../utils/Global.module.css";
import {
  DeleteOutlined,
  DownloadOutlined,
  EditFilled,
  EditOutlined,
  HeartFilled,
  HeartOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import AddProductTable from "./AddProductTable";
import { SearchCont } from "../utils/styles";

interface Item {
  key: string;
  name: string;
  price: number;
  category: string;
  image: string;
  fav: boolean;
}

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: "number" | "text";
  record: Item;
  index: number;
  children: React.ReactNode;
}

const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />;

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const EditProductTable: React.FC = (props: any) => {
  const originData: Item[] = [];
  for (let i = 0; i < props?.products?.length; i++) {
    originData.push({
      key: props?.products?.[i]?.id,
      name: props?.products?.[i]?.title,
      price: props?.products?.[i]?.price,
      category: props?.products?.[i]?.category,
      image: props?.products?.[i]?.image,
      fav: false,
    });
  }

  const [form] = Form.useForm();
  const [data, setData] = useState(originData);
  const [editingKey, setEditingKey] = useState("");
  const [searchText, setSearchText] = useState("");
  const [copyOfListOfRes, setCopyOfListOfRes] = useState<any>([]);
  const navigate = useNavigate();
  useEffect(() => {
    setData(originData);
    setCopyOfListOfRes(originData);
  }, [props]);

  const isEditing = (record: Item) => record.key === editingKey;

  const edit = (record: Partial<Item> & { key: React.Key }) => {
    navigate(`/updateProduct/${record.key}`);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const deleteProduct = async (key: React.Key) => {
    const row = (await form.validateFields()) as Item;
    props?.onDeleteProduct(
      {
        ...row,
        id: key,
      },
      props?.products
    );
  };

  const searchRes = () => {
    let searchResList = data.filter((res: any) =>
      res?.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setCopyOfListOfRes(searchResList);
  };

  const wishListItem = async (record: Partial<Item>) => {
    try {
      const row = (await form.validateFields()) as Item;
      const newData = [...copyOfListOfRes];
      const index = newData.findIndex((item) => record?.key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          fav: !record?.fav,
        });
        setCopyOfListOfRes(newData);
        setEditingKey("");
      } else {
        newData.push(row);
        setCopyOfListOfRes(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as Item;
      props?.onUpdateProduct(props?.products, {
        ...row,
        id: key,
        image: props?.products?.[key]?.image,
      });
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setData(newData);
        setEditingKey("");
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const columns = [
    {
      title: "image",
      dataIndex: "image",
      width: "15%",
      render: (text: string, record: Item) => (
        <img
          className={styles.imageRowClass}
          src={record?.image}
          alt="Image"
          width={200}
        />
      ),
      editable: false,
    },
    {
      title: "name",
      dataIndex: "name",
      width: "25%",
      render: (text: string, record: Item) => (
        <Link to={"/product/" + record.key}>{text}</Link>
      ),
      editable: true,
    },
    {
      title: "price",
      dataIndex: "price",
      width: "15%",
      editable: true,
    },
    {
      title: "category",
      dataIndex: "category",
      width: "15%",
      editable: true,
    },
    {
      title: "operation",
      width: "15%",
      dataIndex: "operation",
      render: (_: any, record: Item) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.key)}
              style={{ marginRight: 8 }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <span>
            <Typography.Link
              disabled={editingKey !== ""}
              onClick={() => edit(record)}
              style={{ marginRight: 8 }}
            >
              <EditOutlined />
            </Typography.Link>
            <Popconfirm
              title="Sure to Delete?"
              onConfirm={() => deleteProduct(record?.key)}
            >
              <a style={{ marginRight: 8 }}>
                <DeleteOutlined />
              </a>
            </Popconfirm>
            <Typography.Link
              disabled={editingKey !== ""}
              onClick={() => wishListItem(record)}
            >
              {record?.fav ? <HeartFilled /> : <HeartOutlined />}
            </Typography.Link>
          </span>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: Item) => ({
        record,
        inputType: col.dataIndex === "price" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <div>
      <div>
        <SearchCont>
          <Space.Compact size="large">
            <Input
              className={styles.searchInput}
              addonBefore={<SearchOutlined />}
              placeholder="Seacrh Product"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </Space.Compact>
          <Button type="primary" size={"large"} onClick={() => searchRes()}>
            {" "}
            Search
          </Button>
          <Link to="/addproduct" className={styles.linkAddButton}>
            <Button
              type="primary"
              size={"large"}
              style={{ background: "green" }}
            >
              Add Product
            </Button>
          </Link>
        </SearchCont>
      </div>

      <Form form={form} component={false}>
        <Table
          className={styles.tableAntDClass}
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          bordered
          dataSource={copyOfListOfRes}
          columns={mergedColumns}
          rowClassName="editable-row"
          pagination={{
            onChange: cancel,
          }}
        />
      </Form>
    </div>
  );
};

export default EditProductTable;
