import { Footer } from "antd/es/layout/layout";

const FooterComponent = () => {
  return (
    <Footer style={{ textAlign: "center" }}>
      M360ICT ©{new Date().getFullYear()}
    </Footer>
  );
};

export default FooterComponent;
