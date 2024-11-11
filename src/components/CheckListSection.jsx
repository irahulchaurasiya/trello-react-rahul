/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { Box, Input, Button, Stack, Text, Spinner } from "@chakra-ui/react";
import { FiCheckSquare } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";

import {
  handlePostRequest,
  handleGetRequest,
  handleDeleteRequest,
} from "../utils/helper";
import CheckItemsSection from "./CheckItemsSection";
import {
  setLoading,
  setChecklists,
  addCheckList,
  deleteCheckList,
  setCheckListName,
} from "../redux/slices/checklistSlice";

const CheckListSection = ({ cardId }) => {
  const url = import.meta.env.VITE_URL;
  const apiKey = import.meta.env.VITE_KEY;
  const apiToken = import.meta.env.VITE_TOKEN;
  const authParams = `key=${apiKey}&token=${apiToken}`;

  const dispatch = useDispatch();
  const { checklistName, loading } = useSelector((state) => state.checklists);

  const checklists =
    useSelector((state) => state.checklists.checklistsByCard[cardId]) || [];

  useEffect(() => {
    dispatch(setLoading(true));
    handleGetRequest(`${url}/cards/${cardId}/checklists?${authParams}`)
      .then((response) => {
        dispatch(setChecklists({ cardId, checklists: response.data }));
      })
      .catch((error) => {
        console.error("Unable to get checklists!", error);
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  }, [dispatch, authParams, cardId, url]);

  const handleCreateChecklist = () => {
    const newChecklistName = checklistName.trim();
    dispatch(setLoading(true));

    handlePostRequest(
      `${url}/cards/${cardId}/checklists?&name=${newChecklistName}&${authParams}`
    )
      .then((response) => {
        dispatch(addCheckList({ cardId, checklist: response.data }));
      })
      .catch((error) => {
        console.error("Unable to create checklist!", error);
      })
      .finally(() => {
        dispatch(setCheckListName(""));
        dispatch(setLoading(false));
      });
  };

  const handleDeleteChecklist = (checklistId) => {
    dispatch(setLoading(true));

    handleDeleteRequest(`${url}/checklists/${checklistId}?${authParams}`)
      .then(() => {
        dispatch(deleteCheckList({ cardId, checklistId }));
      })
      .catch((error) => {
        console.error("Unable to delete checklist!", error);
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };

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
          onChange={(e) => dispatch(setCheckListName(e.target.value))}
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
                  <Text fontWeight="bold" ml="2">
                    {checklist.name}
                  </Text>
                </Box>
                <Button
                  cursor="pointer"
                  bgColor="gray.700"
                  borderRadius="10"
                  size="xs"
                  onClick={() => handleDeleteChecklist(checklist.id)}
                >
                  Delete
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
