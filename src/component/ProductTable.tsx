import { Button, Table } from "antd";
import { useState } from "react";
import { Product, useGetProductsQuery } from "../redux/api/api";

// import { useHistory } from "react-router-dom";

const ProductTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { data, isError, isLoading } = useGetProductsQuery({
    limit: pageSize,
    skip: (currentPage - 1) * pageSize,
  });

  
  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
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
      title: "Action",
      key: "action",
      render: (_: any, record: Product) => (
        <Button
          type="link"
          // onClick={() => navigate(`/product/${record.id}`)}
        >
          View Details
        </Button>
      ),
    },
  ];

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {isError}</div>;

  return (
    <div>
      <h1 className="font-bold text-3xl text-center mb-2">Product List</h1>
      <div className="w-full mx-auto h-screen">
        <Table
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
