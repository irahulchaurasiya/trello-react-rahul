/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { MdDelete, MdOutlineCancel } from "react-icons/md";
import {
  Card,
  Flex,
  Text,
  Box,
  Input,
  Button,
  Spinner,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";

import {
  handleGetRequest,
  handlePostRequest,
  handleDeleteRequest,
} from "../utils/helper";
import CardPopover from "../components/CardPopover";
import {
  setCards,
  addCard,
  setIsAddingCard,
  setCardName,
  deleteCard,
  setLoading,
} from "../redux/slices/CardSlice";

const CardPage = ({ listId }) => {
  const url = import.meta.env.VITE_URL;
  const apiKey = import.meta.env.VITE_KEY;
  const apiToken = import.meta.env.VITE_TOKEN;
  const authParams = `key=${apiKey}&token=${apiToken}`;

  const dispatch = useDispatch();
  const cards = useSelector((state) => state.cards.listCards[listId] || []);
  const loading = useSelector((state) => state.cards.loading[listId]);
  const isAddingCard = useSelector((state) => state.cards.isAddingCard[listId]);
  const cardName = useSelector((state) => state.cards.cardName[listId] || "");

  useEffect(() => {
    if (!listId) return;
    dispatch(setLoading({ listId: listId, loading: true }));
    handleGetRequest(`${url}/lists/${listId}/cards?${authParams}`)
      .then((response) => {
        dispatch(
          setCards({
            listId: listId,
            cards: response.data,
          })
        );
      })
      .catch((error) => {
        console.error("Unable to get cards!", error);
      })
      .finally(() => {
        dispatch(setLoading({ listId: listId, loading: false }));
      });
  }, [listId, dispatch]);

  const handleCreateCard = () => {
    if (!cardName.trim()) return;
    if (cardName) {
      handlePostRequest(
        `${url}/cards?idList=${listId}&name=${cardName}&${authParams}`
      )
        .then((response) => {
          dispatch(addCard({ listId: listId, card: response.data }));
        })
        .catch((error) => {
          console.error("Unable to get cards!", error);
        })
        .finally(() => {
          dispatch(setCardName({ listId: listId, cardName: "" }));
        });
    }
  };

  const handleDeleteCard = (id) => {
    dispatch(setLoading({ listId: listId, loading: true }));

    handleDeleteRequest(`${url}/cards/${id}?${authParams}`)
      .then(() => {
        dispatch(
          deleteCard({
            listId: listId,
            cardId: id,
          })
        );
      })
      .catch((error) => {
        console.error("Unable to delete card!", error);
      })
      .finally(() => {
        dispatch(setLoading({ listId: listId, loading: false }));
      });
  };

  return (
    <>
      {loading ? (
        <Flex justify="center" align="center" height="50vh">
          <Spinner size="xl" color="white" />
        </Flex>
      ) : (
        <>
          {cards.map(({ name, id }) => (
            <CardPopover key={id} cardId={id} cardName={name}>
              <Card.Root
                minW="250px"
                h="auto"
                p="2"
                mb="2"
                color="whiteAlpha.900"
                bgColor="gray.800"
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
                    onClick={() => handleDeleteCard(id)}
                  />
                </Flex>
              </Card.Root>
            </CardPopover>
          ))}
          {isAddingCard ? (
            <Box
              minW="250px"
              bg="gray.900"
              borderRadius="md"
              p="1"
              color="whiteAlpha.900"
              bgColor="rgb(16, 18, 4)"
            >
              <Input
                placeholder="Enter card name"
                value={cardName}
                bgColor="gray.800"
                border="none"
                onChange={(e) =>
                  dispatch(setCardName({ listId, cardName: e.target.value }))
                }
                color="whiteAlpha.800"
                size="sm"
                mb="2"
              />
              <Flex justify="flex-start">
                <Button
                  onClick={handleCreateCard}
                  colorScheme="blue"
                  bg="rgb(87, 157, 255)"
                  size="xs"
                  mr="2"
                  color="black"
                >
                  Add Card
                </Button>
                <Button
                  color="whiteAlpha.900"
                  onClick={() =>
                    dispatch(setIsAddingCard({ listId, isAdding: false }))
                  }
                  size="xs"
                  bg="rgb(16, 18, 4)"
                >
                  <MdOutlineCancel />
                </Button>
              </Flex>
            </Box>
          ) : (
            <Button
              onClick={() =>
                dispatch(setIsAddingCard({ listId, isAdding: true }))
              }
              color="whiteAlpha.900"
              borderRadius="md"
              bg="rgb(16, 18, 4)"
              transition="transform 0.2s, box-shadow 0.2s"
              _hover={{ bg: "rgb(34, 39, 43)" }}
              justifyContent="flex-start"
              gap="2"
              p="2"
            >
              <FaPlus />
              Add a card
            </Button>
          )}
        </>
      )}
    </>
  );
};

export default CardPage;
