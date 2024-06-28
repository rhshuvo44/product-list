import { Button } from "antd";
import { Link, useParams } from "react-router-dom";
import { useGetProductQuery } from "../redux/api/api";
const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { data: product, error, isLoading } = useGetProductQuery(Number(id));

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div>
      <h1>{product.title}</h1>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <img
        src={product.thumbnail}
        alt={product.title}
        style={{ maxWidth: "200px" }}
      />
      <p>Category: {product.category}</p>
      <Link to={`/edit-product/${product.id}`}>
        <Button type="primary">Edit Product</Button>
      </Link>
    </div>
  );
};

export default ProductDetails;
