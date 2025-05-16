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

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route element={<ProtectedLayout />}>
          <Route index element={<Dashboard />} />
        </Route>
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};

export default App;
