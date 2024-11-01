import React, { useState, useEffect } from "react";
import { Box, Card, Text, SimpleGrid, Spinner } from "@chakra-ui/react";
import Header from "../components/Header.jsx";
import { Link } from "react-router-dom";
import CreateBoardPopover from "../components/CreateBoardPopover";
import { handleGetRequest, handlePostRequest } from "../utils/helper.js";

const Homepage = () => {
  const url = import.meta.env.VITE_URL;
  const apiKey = import.meta.env.VITE_KEY;
  const apiToken = import.meta.env.VITE_TOKEN;

  const [allBoards, setAllBoards] = useState([]);
  const [loading, setLoading] = useState(true);

  const authParams = `key=${apiKey}&token=${apiToken}`;

  useEffect(() => {
    setLoading(true);

    handleGetRequest(`${url}/members/me/boards?${authParams}`)
      .then((response) => {
        setAllBoards(response.data);
      })
      .catch((error) => {
        console.error("Unable to get boards!", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  async function handleCreateBoard(name) {
    if (name) {
      try {
        await handlePostRequest(`${url}/boards/?name=${name}&${authParams}`);
        setAllBoards((prevBoards) => [...prevBoards, { name }]);
      } catch (err) {
        console.error("Error creating board:", err);
      }
    }
  }

  return (
    <Box bgColor="rgb(29, 33, 37)" minHeight="100vh" width="100%" padding="0">
      <Header />
      <Text
        p="8"
        color="whiteAlpha.900"
        width="100%"
        fontSize="xl"
        fontWeight="bold"
      >
        Boards
      </Text>
      {loading ? (
        <Spinner />
      ) : (
        <SimpleGrid minChildWidth="300px" gap="20px">
          <Card.Root
            mb="2"
            w="80%"
            h="100px"
            ml="10%"
            mr="10%"
            border="none"
            bgColor="rgba(161, 189, 217, 0.08)"
            color="whiteAlpha.900"
          >
            <CreateBoardPopover onCreate={handleCreateBoard} />
          </Card.Root>
          {allBoards.map((curr) => (
            <Link key={curr.id} to={`/boards/${curr.id}`}>
              <Card.Root
                mb="2"
                w="80%"
                h="100px"
                ml="10%"
                mr="10%"
                p="4"
                fontWeight="bold"
                border="none"
                bgColor="rgb(0, 121, 191)"
                color="whiteAlpha.900"
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
