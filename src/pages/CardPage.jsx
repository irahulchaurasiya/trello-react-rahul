import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { MdDelete, MdOutlineCancel } from "react-icons/md";
import { Card, Flex, Text, Box, Input, Button } from "@chakra-ui/react";

import {
  handleGetRequest,
  handlePostRequest,
  handleDeleteRequest,
} from "../utils/helper";
import CardPopover from "../components/CardPopover";

const CardPage = ({ listId }) => {
  const url = import.meta.env.VITE_URL;
  const apiKey = import.meta.env.VITE_KEY;
  const apiToken = import.meta.env.VITE_TOKEN;

  const [allCards, setAllCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [cardName, setCardName] = useState("");

  const authParams = `key=${apiKey}&token=${apiToken}`;

  useEffect(() => {
    if (!listId) return;
    setLoading(true);
    handleGetRequest(`${url}/lists/${listId}/cards?${authParams}`)
      .then((response) => {
        setAllCards(response.data);
      })
      .catch((error) => {
        console.error("Unable to get cards!", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleCreateCard = () => {
    if (!cardName.trim()) return;
    setIsAddingCard(true);

    setLoading(true);
    if (cardName) {
      handlePostRequest(
        `${url}/cards?idList=${listId}&name=${cardName}&${authParams}`
      )
        .then((response) => {
          setAllCards([...allCards, response.data]);
        })
        .catch((error) => {
          console.error("Unable to get cards!", error);
        })
        .finally(() => {
          setCardName("");
          setLoading(false);
        });
    }
  };

  const handleDeleteCard = (id) => {
    setLoading(true);

    handleDeleteRequest(`${url}/cards/${id}?${authParams}`)
      .then(() => {
        setAllCards(allCards.filter((card) => card.id !== id));
      })
      .catch((error) => {
        console.error("Unable to delete card!", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      {allCards.map(({ name, id }) => (
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
              <MdDelete cursor="pointer" onClick={() => handleDeleteCard(id)} />
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
            onChange={(e) => setCardName(e.target.value)}
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
              onClick={() => setIsAddingCard(false)}
              size="xs"
              bg="rgb(16, 18, 4)"
            >
              <MdOutlineCancel />
            </Button>
          </Flex>
        </Box>
      ) : (
        <Button
          onClick={() => setIsAddingCard(true)}
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
  );
};

export default CardPage;
