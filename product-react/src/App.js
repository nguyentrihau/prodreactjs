import {
  Navigate,
  Route,
  Routes,
  unstable_HistoryRouter as HistoryRouter,
} from "react-router-dom";
import HomeTemplate from "./templates/HomeTemplate";
import { createBrowserHistory } from "history";
import Home from "./page/Home/Home";
import Login from "./page/Login/Login";
import Detail from "./page/Detail/Detail";
import { getToken } from "./util/config";
import Add from "./page/Add/Add";
import Edit from "./page/Edit/Edit";
export const history = createBrowserHistory();
function App() {
  const token = getToken();
  return (
    <HistoryRouter history={history}>
      <Routes>
        <Route path="" element={<HomeTemplate />}>
          <Route index element={<Home />} />
          <Route
            path="login"
            element={token ? <Navigate to={"/"} /> : <Login />}
          />
          <Route path="detail" element={<Detail />} />
          <Route path="add" element={<Add />} />
          <Route path="edit" element={<Edit />} />
        </Route>
      </Routes>
    </HistoryRouter>
  );
}

export default App;
