import { Box } from "@chakra-ui/react";
import React from "react";

const Header = () => {
  return (
    <Box
      width="100%"
      textStyle="xl"
      fontWeight="bold"
      textAlign="center"
      boxShadow="md"
      p={"2"}
    >
      Trello
    </Box>
  );
};

export default Header;
