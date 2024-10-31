import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Homepage from "./pages/Homepage";
import NotFoundPage from "./pages/NotFoundPage";
import { Box, Button, Heading } from "@chakra-ui/react";
import SingleBoardPage from "./pages/SingleBoardPage.jsx";

const Home = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      textAlign="center"
      height="100vh"
    >
      <Heading as="h4" size="lg" fontWeight="bold">
        Click button to go to boards
      </Heading>
      <Button mt={4} colorScheme="blue" as={Link} to="/boards">
        Click me
      </Button>
    </Box>
  );
};

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route>
            <Route path="/" element={<Home />} />
            <Route path="/boards" element={<Homepage />} />
            <Route path="/boards/:id" element={<SingleBoardPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
