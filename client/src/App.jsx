import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import RootLayout from "./layout/RootLayout";
import ProtectedLayout from "./layout/ProtectedLayout";
import Dashboard from "./routes/Dashboard";
import Register from "./routes/Register";
import Login from "./routes/Login";
import Products from "./routes/Products";
import Customers from "./routes/Customers";
import CustomerPage from "./routes/CustomerPage";
import CreateCustomerForm from "./components/CreateCustomerForm";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route element={<ProtectedLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="customers" element={<Customers />} />
          <Route path="customer/:id" element={<CustomerPage />} />
          <Route path="create-customer" element={<CreateCustomerForm />} />
        </Route>
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};

export default App;
