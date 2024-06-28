import { Button, Table } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Product, useGetProductsQuery } from "../redux/api/api";
import Loading from "./ui/Loading";

const ProductTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { data, isError, isLoading } = useGetProductsQuery({
    limit: pageSize,
    skip: (currentPage - 1) * pageSize,
  });
  const navigate = useNavigate();

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },

    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Stock",
      dataIndex: "stock",
      key: "stock",
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
    },
    {
      title: "Action",
      key: "action",
      render: (_: number, record: Product) => (
        <Button type="link" onClick={() => navigate(`/product/${record.id}`)}>
          View Details
        </Button>
      ),
    },
  ];

  if (isLoading) return <Loading />;
  if (isError) return <div>Error: {isError}</div>;

  return (
    <div>
      <h1 className="font-bold text-3xl text-center mb-2">Product List</h1>
      <div className="responsive-table-container">
        <Table
          className="table-auto"
          bordered
          columns={columns}
          dataSource={data?.products}
          rowKey="id"
          pagination={{
            current: currentPage,
            pageSize: pageSize,
            total: data?.total,
            onChange: (page, pageSize) => {
              setCurrentPage(page);
              setPageSize(pageSize);
            },
          }}
        />
      </div>
    </div>
  );
};

export default ProductTable;
