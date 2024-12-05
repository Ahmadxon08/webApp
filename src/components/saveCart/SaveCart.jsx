import React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";

import { useDrawerStore } from "../../store/useStore";

const SaveCart = () => {
  const { isDrawerOpen, closeDrawer } = useDrawerStore();

  const drawerContent = (
    <Box
      sx={{
        width: {
          xs: "250px",
          sm: "400px",
          md: "500px",
        },
        padding: 2,
      }}
      role="presentation"
      onClick={closeDrawer}
      onKeyDown={closeDrawer}
      inert={isDrawerOpen ? null : "true"}
    ></Box>
  );

  return (
    <SwipeableDrawer
      anchor="right"
      open={isDrawerOpen}
      onClose={closeDrawer}
      onOpen={() => {}}
      disableEnforceFocus
      disableRestoreFocus
      sx={{ zIndex: 133300 }}
    >
      {drawerContent}
    </SwipeableDrawer>
  );
};

export default SaveCart;
