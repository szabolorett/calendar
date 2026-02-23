import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";

function Layout() {
  return (
    <>
      <Header />
      <main> {/* This is where the main content will be rendered */}
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default Layout;
