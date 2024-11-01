import { Box, Input, Button, Stack, Text, Spinner } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import {
  handlePostRequest,
  handleGetRequest,
  handleDeleteRequest,
} from "../utils/helper";
import { MdDelete } from "react-icons/md";
import CheckItemsSection from "./CheckItemsSection";
import { FiCheckSquare } from "react-icons/fi";

const CheckListSection = ({ cardId }) => {
  const url = import.meta.env.VITE_URL;
  const apiKey = import.meta.env.VITE_KEY;
  const apiToken = import.meta.env.VITE_TOKEN;

  const authParams = `key=${apiKey}&token=${apiToken}`;

  const [checklists, setChecklists] = useState([]);
  const [checklistName, setChecklistName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    function getChecklists() {
      handleGetRequest(`${url}/cards/${cardId}/checklists?${authParams}`)
        .then((response) => {
          setChecklists(response.data);
        })
        .catch((error) => {
          console.error("Unable to get checklists!", error);
        })
        .finally(() => {
          setLoading(false);
        });
    }

    getChecklists();
  }, []);

  function handleCreateChecklist() {
    const newChecklistName = checklistName.trim();

    setLoading(true);

    handlePostRequest(
      `${url}/checklists?idCard=${cardId}&name=${newChecklistName}&${authParams}`
    )
      .then((response) => {
        setChecklists([...checklists, response.data]);
      })
      .catch((error) => {
        console.error("Unable to create checklist!", error);
      })
      .finally(() => {
        setChecklistName("");
        setLoading(false);
      });
  }

  function handleDeleteChecklist(checklistId) {
    setLoading(true);

    handleDeleteRequest(`${url}/checklists/${checklistId}?${authParams}`)
      .then(() => {
        setChecklists(
          checklists.filter((checklist) => checklist.id !== checklistId)
        );
      })
      .catch((error) => {
        console.error("Unable to delete checklist!", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <Box p="4" bg="gray.800" color="white" borderRadius="md" w="full">
      <Text fontSize="lg" mb="4">
        Checklists
      </Text>

      {loading && <Spinner color="blue.500" size="sm" mb="4" />}
      <Stack direction="row" mb="2" align="center">
        <Input
          placeholder="Add new checklist"
          value={checklistName}
          onChange={(e) => setChecklistName(e.target.value)}
          bg="gray.700"
          color="white"
          border="none"
        />
        <Button
          onClick={handleCreateChecklist}
          colorScheme="blue"
          disabled={!checklistName.trim()}
        >
          Add
        </Button>
      </Stack>

      {checklists.length === 0 && !loading ? (
        <Text color="gray.400">No checklists available.</Text>
      ) : (
        <Stack>
          {checklists.map((checklist) => (
            <Box key={checklist.id}>
              <Box
                p="2"
                bg="gray.800"
                borderRadius="md"
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <Box display="flex" alignItems="center">
                  <FiCheckSquare />
                  <Text fontWeight="bold" ml="2">{checklist.name}</Text>
                </Box>
                <Button
                  cursor="pointer"
                  bgColor="gray.700"
                  borderRadius="10"
                  size="xs"
                  onClick={() => handleDeleteChecklist(checklist.id)}
                >Delete
                </Button>
              </Box>
              <CheckItemsSection cardId={cardId} checklistId={checklist.id} />
            </Box>
          ))}
        </Stack>
      )}
    </Box>
  );
};

export default CheckListSection;
