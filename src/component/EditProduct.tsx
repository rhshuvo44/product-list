import { useEffect } from "react";
import {
  useGetCategoriesQuery,
  useGetProductQuery,
  useUpdateProductMutation,
} from "../redux/api/api";
import { Form, Input, Button, Select, Card, message } from "antd";
import { useParams } from "react-router-dom";
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

  const onFinish = async (values: any) => {
    try {
      const updatedProduct = await updateProduct({
        id: parseInt(id),
        data: values,
      }).unwrap();
      console.log(updatedProduct);
      message.success("Product updated successfully");
    } catch (error) {
      message.error("Failed to update product");
    }
  };

  if (isLoading) return <div>Loading...</div>;
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
              {categories?.map((category) => (
                <Option key={category} value={category}>
                  {category}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.List name="reviews">
            {(fields, { add, remove }) => (
              <>
                {fields.map((field) => (
                  <div
                    key={field.key}
                    style={{ display: "flex", marginBottom: 8 }}
                  >
                    <Form.Item
                      {...field}
                      name={[field.name, "userId"]}
                      fieldKey={[field.fieldKey, "userId"]}
                      rules={[{ required: true, message: "Missing user ID" }]}
                    >
                      <Input placeholder="User ID" />
                    </Form.Item>
                    <Form.Item
                      {...field}
                      name={[field.name, "comment"]}
                      fieldKey={[field.fieldKey, "comment"]}
                      rules={[{ required: true, message: "Missing comment" }]}
                    >
                      <Input placeholder="Comment" />
                    </Form.Item>
                    <Button type="dashed" onClick={() => remove(field.name)}>
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
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default EditProduct;
