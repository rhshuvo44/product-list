import { Route, Routes } from "react-router-dom";
import ProductDetails from "./component/ProductDetails";
import ProductPages from "./pages/ProductPages";

function App() {
  return (
    <div className="p-20 w-full h-full">
      <Routes>
        <Route path="/" element={<ProductPages />} />
        <Route path="/product/:id" element={<ProductDetails />} />
      </Routes>
    </div>
  );
}

export default App;
