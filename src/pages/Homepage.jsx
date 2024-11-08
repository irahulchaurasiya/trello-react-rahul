import React, { useEffect } from "react";
import { Box, Card, Text, SimpleGrid, Spinner } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import CreateBoardPopover from "../components/CreateBoardPopover";
import { handleGetRequest, handlePostRequest } from "../utils/helper.js";
import Header from "../components/Header.jsx";
import {
  setBoards,
  addBoards,
  setLoading,
} from "../redux/slices/boardsSlice.js";

const Homepage = () => {
  const url = import.meta.env.VITE_URL;
  const apiKey = import.meta.env.VITE_KEY;
  const apiToken = import.meta.env.VITE_TOKEN;
  const authParams = `key=${apiKey}&token=${apiToken}`;

  const dispatch = useDispatch();
  const { boards, loading } = useSelector((state) => state.boards);

  useEffect(() => {
    dispatch(setLoading(true));

    handleGetRequest(`${url}/members/me/boards?${authParams}`)
      .then((response) => {
        dispatch(setBoards(response.data));
      })
      .catch((error) => {
        console.error("Unable to get boards!", error);
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  }, []);

  const handleCreateBoard = (name) => {
    if (name) {
      dispatch(setLoading(true));
      handlePostRequest(`${url}/boards/?name=${name}&${authParams}`)
        .then((response) => {
          dispatch(addBoards(response.data));
        })
        .catch((error) => {
          console.log("Unable to create board!", error);
        })
        .finally(() => {
          dispatch(setLoading(false));
        });
    }
  };

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
          {boards.map((curr) => (
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
