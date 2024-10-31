import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Card, Text, SimpleGrid, Spinner } from "@chakra-ui/react";
import Header from "../components/Header.jsx";
import { Link } from "react-router-dom";
import CreateBoardPopover from "../components/CreateBoardPopover";

const Homepage = () => {
  const url = import.meta.env.VITE_URL;
  const apiKey = import.meta.env.VITE_KEY;
  const apiToken = import.meta.env.VITE_TOKEN;

  const [allBoards, setAllBoards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getBoardsData() {
      setLoading(true);
      setError(null);
      try {
        const { data } = await axios.get(
          `${url}/members/me/boards?key=${apiKey}&token=${apiToken}`
        );
        setAllBoards(data);
      } catch (err) {
        setError("Failed to load boards.");
      } finally {
        setLoading(false);
      }
    }
    getBoardsData();
  }, [url, apiKey, apiToken]);

  async function handleCreateBoard(name) {
    if (name) {
      try {
        await axios.post(
          `${url}/boards/?name=${name}&key=${apiKey}&token=${apiToken}`
        );
        setAllBoards((prevBoards) => [...prevBoards, { name }]);
      } catch (err) {
        console.error("Error creating board:", err);
      }
    }
  }

  return (
    <Box bgColor={"blue.100"} minHeight="100vh" width="100%" padding="0">
      <Header />
      <Text p={"8"} width="100%" fontSize="xl" fontWeight="bold">
        Boards
      </Text>
      {loading ? (
        <Spinner />
      ) : error ? (
        <Text color="red.500">{error}</Text>
      ) : (
        <SimpleGrid minChildWidth="300px" gap="20px">
          <Card.Root
            mb={2}
            w="80%"
            h="100px"
            ml={"10%"}
            mr={"10%"}
            bgColor={"gray.700"}
            color={"white"}
          >
            <CreateBoardPopover onCreate={handleCreateBoard} />
          </Card.Root>
          {allBoards.map((curr) => (
            <Link key={curr.id} to={`/boards/${curr.id}`}>
              <Card.Root
                mb={2}
                w="80%"
                h="100px"
                ml={"10%"}
                mr={"10%"}
                p={4}
                bgColor={"gray.700"}
                color={"white"}
              >
                {curr.name}
              </Card.Root>
            </Link>
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
};

export default Homepage;
