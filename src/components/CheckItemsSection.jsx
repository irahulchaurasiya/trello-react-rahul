/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { MdDelete } from "react-icons/md";
import { Box, Input, Spinner, Button, Progress, Text } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import {
  setLoading,
  setCheckItems,
  addCheckItem,
  deleteCheckItem,
  updateCheckItemState,
  setCheckItemName,
  setIsAddingItem,
} from "../redux/slices/checkItemsSlice";
import {
  handleDeleteRequest,
  handleGetRequest,
  handlePostRequest,
  handlePutRequest,
  handleCheckItemsPercent,
} from "../utils/helper";
import { Checkbox } from "../components/ui/checkbox";
import { ProgressBar } from "../components/ui/progress";

const CheckItemsSection = ({ cardId, checklistId }) => {
  const dispatch = useDispatch();
  const url = import.meta.env.VITE_URL;
  const apiKey = import.meta.env.VITE_KEY;
  const apiToken = import.meta.env.VITE_TOKEN;

  const authParams = `key=${apiKey}&token=${apiToken}`;

  const { checkItemsByChecklist, loading, checkItemName, isAddingItem } =
    useSelector((state) => state.checkItems);

  const checkItems = checkItemsByChecklist[checklistId] || [];

  useEffect(() => {
    dispatch(setLoading(true));
    handleGetRequest(
      `${url}/checklists/${checklistId}/checkItems?${authParams}`
    )
      .then((response) => {
        dispatch(setCheckItems({ checklistId, checkItems: response.data }));
      })
      .catch((error) => {
        console.error("Unable to get checkitems!", error);
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  }, [dispatch, authParams, checklistId, url]);

  const handleCreateCheckItem = () => {
    if (checkItemName) {
      dispatch(setLoading(true));
      handlePostRequest(
        `${url}/checklists/${checklistId}/checkItems?name=${checkItemName}&${authParams}`
      )
        .then((response) => {
          dispatch(addCheckItem({ checklistId, checkItem: response.data }));
          dispatch(setCheckItemName(""));
        })
        .catch((error) => {
          console.error("Unable to create checkitem!", error);
        })
        .finally(() => {
          dispatch(setLoading(false));
        });
    }
  };

  const handleDeleteCheckItem = (checkItemId) => {
    dispatch(setLoading(true));
    handleDeleteRequest(
      `${url}/checklists/${checklistId}/checkItems/${checkItemId}?${authParams}`
    )
      .then(() => {
        dispatch(deleteCheckItem({ checklistId, checkItemId }));
      })
      .catch((error) => {
        console.error("Unable to delete checkitem!", error);
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };

  const handleUpdateCheckItem = (checkItemId, checkItemState) => {
    const updatedState =
      checkItemState === "incomplete" ? "complete" : "incomplete";

    handlePutRequest(
      `${url}/cards/${cardId}/checklist/${checklistId}/checkItem/${checkItemId}?state=${updatedState}&${authParams}`
    )
      .then(() => {
        dispatch(
          updateCheckItemState({
            checklistId,
            checkItemId,
            state: updatedState,
          })
        );
      })
      .catch((error) => {
        console.error("Unable to update checkitem status!", error);
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };

  const percent = Math.ceil(handleCheckItemsPercent(checkItems));

  return (
    <Box>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <Box mt="2" display="flex" flexDirection="column">
            <Box>
              <Text>{percent}%</Text>
              <Progress.Root value={percent} mb="2">
                <ProgressBar />
              </Progress.Root>
            </Box>
            {checkItems.map((checkItem) => {
              const checkItemState = checkItem.state;
              return (
                <Box
                  mb="2"
                  key={checkItem.id}
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Checkbox
                    onClick={() =>
                      handleUpdateCheckItem(checkItem.id, checkItemState)
                    }
                    checked={checkItemState === "complete"}
                  >
                    <Text
                      textDecoration={
                        checkItemState === "complete" ? "line-through" : "none"
                      }
                    >
                      {checkItem.name}
                    </Text>
                  </Checkbox>
                  <MdDelete
                    onClick={() => handleDeleteCheckItem(checkItem.id)}
                  />
                </Box>
              );
            })}
          </Box>

          {isAddingItem ? (
            <>
              <Input
                placeholder="Add new check item"
                value={checkItemName}
                onChange={(e) => dispatch(setCheckItemName(e.target.value))}
                mb={2}
              />
              <Button mr="2" onClick={handleCreateCheckItem}>
                Add
              </Button>
              <Button onClick={() => dispatch(setIsAddingItem(false))}>
                Cancel
              </Button>
            </>
          ) : (
            <Button onClick={() => dispatch(setIsAddingItem(true))}>
              Add an Item
            </Button>
          )}
        </>
      )}
    </Box>
  );
};

export default CheckItemsSection;
