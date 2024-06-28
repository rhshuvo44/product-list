import { Button, Table } from "antd";
import { useState } from "react";
import { Product, useGetProductQuery } from "../redux/api/api";
import { useHistory } from 'react-router-dom';

const ProductTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { data, error, isLoading } = useGetProductQuery({
    limit: pageSize,
    skip: (currentPage - 1) * pageSize,
  });

    const history = useHistory();

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
          onClick={() => history.push(`/product/${record.id}`)}
        >
          View Details
        </Button>
      ),
    },
  ];

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Table
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
  );
};

export default ProductTable;
