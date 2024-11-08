import { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Button,
  Flex,
  Text,
  Heading,
  Stack,
  Card,
  Spinner,
  Input,
} from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa6";
import { MdDelete, MdOutlineCancel } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

import SingleBoardPageHeader from "../components/SingleBoardPageHeader";
import {
  handleGetRequest,
  handlePostRequest,
  handlePutRequest,
} from "../utils/helper";
import {
  setLists,
  setLoading,
  setIsAddingList,
  setListName,
  addList,
  deleteList,
  setSingleBoardName,
} from "../redux/slices/singleBoardSlice";
import CardPage from "./CardPage";

const SingleBoardPage = () => {
  const url = import.meta.env.VITE_URL;
  const apiKey = import.meta.env.VITE_KEY;
  const apiToken = import.meta.env.VITE_TOKEN;
  const authParams = `key=${apiKey}&token=${apiToken}`;

  const { id } = useParams();
  const dispatch = useDispatch();
  const { lists, singleBoardName, loading, isAddingList, listName } =
    useSelector((state) => state.singleBoard);

  useEffect(() => {
    dispatch(setLoading(true));

    handleGetRequest(`${url}/boards/${id}/lists?${authParams}`)
      .then((response) => {
        dispatch(setLists(response.data));
        return handleGetRequest(`${url}/boards/${id}?${authParams}`);
      })
      .then((boardResponse) => {
        dispatch(setSingleBoardName(boardResponse.data.name));
      })
      .catch((error) => {
        console.error("Unable to get lists!", error);
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  }, [authParams, dispatch, id, url]);

  const handleCreateList = () => {
    const newListName = listName.trim();
    if (!newListName) return;

    dispatch(setLoading(true));

    handlePostRequest(
      `${url}/boards/${id}/lists?name=${newListName}&${authParams}`
    )
      .then((response) => {
        dispatch(addList(response.data));
      })
      .catch((error) => {
        console.error("Unable to create list!", error);
      })
      .finally(() => {
        dispatch(setListName(""));
        dispatch(setLoading(false));
        dispatch(setIsAddingList(false));
      });
  };

  const handleDeleteList = (listId) => {
    dispatch(setLoading(true));

    handlePutRequest(`${url}/lists/${listId}/closed?value=true&${authParams}`)
      .then(() => {
        dispatch(deleteList(listId));
      })
      .catch((error) => {
        console.error("Unable to delete list!", error);
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };

  return (
    <Box
      bgColor="hsl(202, 100%, 25%)"
      minH="100vh"
      minW="100%"
      overflowX="auto"
    >
      <SingleBoardPageHeader />

      <Flex p="2" w="full">
        <Heading as="h2" size="lg" color="whiteAlpha.800">
          {singleBoardName || "Loading..."}
        </Heading>
      </Flex>

      {loading ? (
        <Flex justify="center" align="center" height="50vh">
          <Spinner size="xl" color="white" />
        </Flex>
      ) : (
        <Stack direction="row" spacing={4} alignItems="flex-start" m="2">
          {lists.map(({ name, id }) => (
            <Card.Root
              key={id}
              MdCancel
              minW="300px"
              h="auto"
              p="2"
              color="whiteAlpha.900"
              bgColor="rgb(16, 18, 4)"
              border="none"
              borderRadius="md"
              textAlign="start"
              transition="transform 0.2s, box-shadow 0.2s"
            >
              <Flex
                justifyContent="space-between"
                align="center"
                lineHeight="1"
                mb="1"
              >
                <Text as="span" p="1">
                  {name}
                </Text>
                <MdDelete
                  cursor="pointer"
                  onClick={() => handleDeleteList(id)}
                />
              </Flex>
              <CardPage listId={id} />
            </Card.Root>
          ))}
          {isAddingList ? (
            <Box
              minW="300px"
              bg="gray.900"
              borderRadius="md"
              p="1"
              color="whiteAlpha.900"
              bgColor="rgb(16, 18, 4)"
            >
              <Input
                placeholder="Enter list name"
                value={listName}
                onChange={(e) => dispatch(setListName(e.target.value))}
                color="whiteAlpha.800"
                size="sm"
                mb="2"
              />
              <Flex justify="flex-start">
                <Button
                  onClick={handleCreateList}
                  colorScheme="blue"
                  bg="rgb(87, 157, 255)"
                  size="xs"
                  mr="2"
                  color="black"
                >
                  Add List
                </Button>
                <Button
                  onClick={() => dispatch(setIsAddingList(false))}
                  size="xs"
                  bg="rgb(16, 18, 4)"
                  color="whiteAlpha.900"
                >
                  <MdOutlineCancel />
                </Button>
              </Flex>
            </Box>
          ) : (
            <Button
              onClick={() => dispatch(setIsAddingList(true))}
              minW="300px"
              p={3}
              color="whiteAlpha.900"
              bg="rgba(255, 255, 255, 0.24)"
              borderRadius="10px"
              transition="transform 0.2s, box-shadow 0.2s"
              _hover={{ bg: "rgba(255, 255, 255, 0.20)" }}
              justifyContent="flex-start"
            >
              <FaPlus />
              Add another list
            </Button>
          )}
        </Stack>
      )}
    </Box>
  );
};

export default SingleBoardPage;
