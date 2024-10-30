import React, { useState, useEffect } from "react";
import Boards from "../components/Boards.jsx";
import axios from "axios";
import { Box, Button, Input } from "@chakra-ui/react";
import BoardsImage from "../assets/images/BoardsPage.jpg";
import Header from "../components/Header.jsx";

const Homepage = () => {
  const url = import.meta.env.VITE_URL;
  const apiKey = import.meta.env.VITE_KEY;
  const apiToken = import.meta.env.VITE_TOKEN;

  const [allBoards, setAllBoards] = useState([]);

  useEffect(() => {
    async function getBoardsData() {
      const data = await axios.get(
        `${url}/members/me/boards?key=${apiKey}&token=${apiToken}`
      );
      setAllBoards(data.data);
    }
    getBoardsData();
  }, []);

  console.log(allBoards);

  return (
    <Box
      bgImage={`url(${BoardsImage})`}
      bgSize="cover"
      bgPosition="center"
      height="100vh"
      width="100%"
      padding="0"
    >
      <Header />
      {/* {allBoards.map((board) => {
        console.log(board);
        <Boards boards={board} />;
      })} */}
    </Box>
  );
};

export default Homepage;
