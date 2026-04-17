import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout() {
  return (
    <div className="app-shell">
      <Navbar />
      <main className="flex-1 py-6 md:py-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
