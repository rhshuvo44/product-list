import { Button, Card, Form, Input, Select, message } from "antd";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Product,
  useGetCategoriesQuery,
  useGetProductQuery,
  useUpdateProductMutation,
} from "../redux/api/api";
import Loading from "./ui/Loading";
const { Option } = Select;
const EditProduct = () => {
  const { id } = useParams<{ id: string }>();
  const { data, error, isLoading } = useGetProductQuery(Number(id));
  const { data: categories } = useGetCategoriesQuery();
  const [updateProduct] = useUpdateProductMutation();
  const [form] = Form.useForm();
  useEffect(() => {
    if (data) {
      form.setFieldsValue(data);
    }
  }, [data, form]);

  const onFinish = async (values: Product) => {
    try {
      const updatedProduct = await updateProduct({
        id: Number(id),
        data: values,
      }).unwrap();
      console.log(updatedProduct);
      message.success("Product updated successfully");
    } catch (error) {
      message.error("Failed to update product");
    }
  };

  if (isLoading) return <Loading />;
  if (error) return <div>Error loading product details</div>;

  return (
    <div>
      <h1 className="font-bold text-3xl text-center mb-2">Product Update</h1>
      <Card>
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="title"
            label="Title"
            rules={[
              { required: true, message: "Please enter the product title" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[
              {
                required: true,
                message: "Please enter the product description",
              },
            ]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item
            name="price"
            label="Price"
            rules={[
              { required: true, message: "Please enter the product price" },
            ]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="category"
            label="Category"
            rules={[{ required: true, message: "Please select a category" }]}
          >
            <Select>
              {categories?.map((category, i) => (
                <Option key={i} value={category.name}>
                  {category.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          {/* <Form.Item label="Review"> */}
          <Form.List name="reviews">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <div key={key} style={{ display: "flex", marginBottom: 8 }}>
                    <Form.Item
                      {...restField}
                      name={[name, "reviewerName"]}
                      rules={[
                        { required: true, message: "Missing Reviewer Name" },
                      ]}
                    >
                      <Input placeholder="Reviewer Name" />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, "comment"]}
                      rules={[{ required: true, message: "Missing comment" }]}
                    >
                      <Input placeholder="Comment" />
                    </Form.Item>
                    <Button type="dashed" onClick={() => remove(name)}>
                      -
                    </Button>
                  </div>
                ))}
                <Button type="dashed" onClick={() => add()} block>
                  Add Review
                </Button>
              </>
            )}
          </Form.List>
          {/* </Form.Item> */}
          <Form.Item>
            <div className="mt-2">
              <Button type="primary" htmlType="submit">
                Save
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default EditProduct;
