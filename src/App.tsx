import { Layout } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import { Route, Routes } from "react-router-dom";
import EditProduct from "./component/EditProduct";
import ProductDetails from "./component/ProductDetails";
import FooterComponent from "./component/layout/FooterComponent";
import Navbar from "./component/layout/Navbar";
import ProductPages from "./pages/ProductPages";

function App() {
  return (
    <Layout>
      <Header
        style={{
          height: "80px",
          padding: "0px",
          lineHeight: "40px",
        }}
      >
        <Navbar />
      </Header>
      <Content style={{ padding: "50px" }}>
        <Routes>
          <Route path="/" element={<ProductPages />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/edit-product/:id" element={<EditProduct />} />
        </Routes>
      </Content>
      <FooterComponent />
    </Layout>
  );
}

export default App;
