import { Box } from "@chakra-ui/react";
import React from "react";

const Header = () => {
  return (
    <Box
      width="100%"
      textStyle="2xl"
      fontWeight="bold"
      textAlign="center"
      boxShadow="md"
      p="2"
      color="whiteAlpha.800"
    >
      Trello
    </Box>
  );
};

export default Header;
