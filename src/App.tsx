import { Route, Routes } from "react-router-dom";
import ProductDetails from "./component/ProductDetails";
import ProductPages from "./pages/ProductPages";
import EditProduct from "./component/EditProduct";
import { Layout } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import { Link } from "react-router-dom";

function App() {
  return (
    <Layout>
      <Header>
        <div style={{ color: "white", fontSize: "20px" }}>
          <Link to="/">Product Management</Link>
        </div>
      </Header>
      <Content style={{ padding: "50px" }}>
        <Routes>
          <Route path="/" element={<ProductPages />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/edit-product/:id" element={<EditProduct />} />
        </Routes>
      </Content>
      <Footer style={{ textAlign: "center" }}>Product Management ©2024</Footer>
    </Layout>
  );
}

export default App;
