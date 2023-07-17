import { Box } from "@mui/material";
import GlobalLoading from "../common/GlobalLoading";
import Topbar from "../common/Topbar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <>
      <GlobalLoading />

      <Box display="flex" minHeight="100vh">
        <Topbar />

        <Box component="main" flexGrow={1} overflow="hidden" minHeight="100vh">
          <Outlet />
        </Box>
      </Box>
    </>
  );
};

export default MainLayout;
