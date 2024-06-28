import { Button, Card, Image } from "antd";
import { Link, useParams } from "react-router-dom";
import { useGetProductQuery } from "../redux/api/api";
const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { data: product, isError, isLoading } = useGetProductQuery(Number(id));

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {isError}</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <Card>
      <div className="flex justify-between items-center gap-2 space-x-4 flex-col md:flex-row">
        <div className="">
          <Image width={400} src={product.thumbnail} alt={product.title} />
        </div>
        <div className="p-5 space-y-4">
          <h1 className="font-bold text-3xl">{product.title}</h1>
          <p>
            Sku: <span className="font-bold">{product.sku}</span>
          </p>
          <p className="font-bold text-orange-400 text-2xl">${product.price}</p>
          <p>
            Category: <span className="font-bold">{product.category}</span>
          </p>
          <p>
            Brand: <span className="font-bold">{product.brand}</span>
          </p>
          <p>
            Stock: <span className="font-bold">{product.stock}</span>
          </p>
          <p className="">{product.description}</p>
          <p>
            tags:
            {product.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 mx-1 py-1 bg-green-500 text-white rounded-md text-sm"
              >
                {tag}
              </span>
            ))}{" "}
          </p>
          <div className="mt-2">
            <Link to={`/edit-product/${product.id}`}>
              <Button type="primary">Edit Product</Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="mt-5">
        <h2 className="font-bold">Reviews</h2>
        {product.reviews.map((review) => (
          <div key={review.rating} className="p-5 border-b border-gray-200">
            <p className="font-bold">{review.comment}</p>
            <p>{review.reviewerName}</p>
            <p>
              Rating:{" "}
              <span className="flex items-center gap-1">
                {Array.from({ length: review.rating }, (_, i) => (
                  <span
                    key={i}
                    className="h-5 w-5 rounded-full bg-yellow-400"
                  ></span>
                ))}
              </span>
            </p>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default ProductDetails;
