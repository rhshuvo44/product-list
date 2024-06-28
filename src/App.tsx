import { Route, Routes } from "react-router-dom";
import ProductDetails from "./component/ProductDetails";
import ProductPages from "./pages/ProductPages";

function App() {
  return (
    <Routes>
      <Route path="/" element={<ProductPages />} />
      <Route path="/:id" element={<ProductDetails />} />
    </Routes>
  );
}

export default App;
