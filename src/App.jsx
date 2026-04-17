import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import TimelinePage from "./pages/TimelinePage";
import StatsPage from "./pages/StatsPage";
import FriendDetailsPage from "./pages/FriendDetailsPage";
import NotFoundPage from "./pages/NotFoundPage";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/timeline" element={<TimelinePage />} />
        <Route path="/stats" element={<StatsPage />} />
        <Route path="/friend/:friendId" element={<FriendDetailsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
