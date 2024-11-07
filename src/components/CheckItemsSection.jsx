import { useState, useEffect } from "react";
import { MdDelete } from "react-icons/md";
import { Box, Input, Spinner, Button, Progress, Text } from "@chakra-ui/react";

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
  const url = import.meta.env.VITE_URL;
  const apiKey = import.meta.env.VITE_KEY;
  const apiToken = import.meta.env.VITE_TOKEN;

  const authParams = `key=${apiKey}&token=${apiToken}`;

  const [checkItems, setCheckItems] = useState([]);
  const [checkItemName, setCheckItemName] = useState("");
  const [loading, setLoading] = useState(true);
  const [isAddingItem, setIsAddingItem] = useState(false);

  useEffect(() => {
    setLoading(true);

    handleGetRequest(
      `${url}/checklists/${checklistId}/checkItems?${authParams}`
    )
      .then((response) => {
        setCheckItems(response.data);
      })
      .catch((error) => {
        console.log("Unable to get checkitems!", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleCreateCheckItem = () => {
    setLoading(true);
    if (checkItemName) {
      handlePostRequest(
        `${url}/checklists/${checklistId}/checkItems?name=${checkItemName}&${authParams}`
      )
        .then((response) => {
          setCheckItems([...checkItems, response.data]);
        })
        .catch((error) => {
          console.log("Unable to create checkitem!", error);
        })
        .finally(() => {
          setLoading(false);
          setCheckItemName("");
        });
    }
  };

  const handleDeleteCheckItem = (checkItemId) => {
    setLoading(true);

    handleDeleteRequest(
      `${url}/checklists/${checklistId}/checkItems/${checkItemId}?${authParams}`
    )
      .then(() => {
        setCheckItems(
          checkItems.filter((checkItem) => checkItem.id !== checkItemId)
        );
      })
      .catch((error) => {
        console.log("Unable to delete checkitem1", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleUpdateChechItem = (checkItemId, checkItemState) => {
    const updatedState =
      checkItemState == "incomplete" ? "complete" : "incomplete";

    handlePutRequest(
      `${url}/cards/${cardId}/checklist/${checklistId}/checkItem/${checkItemId}?state=${updatedState}&${authParams}`
    )
      .then(() => {
        setCheckItems(
          checkItems.map((checkItem) => {
            if (checkItem.id === checkItemId) {
              return {
                ...checkItem,
                state: updatedState,
              };
            } else {
              return checkItem;
            }
          })
        );
      })
      .catch((error) => {
        toast.error("Unable to update checkitem status!", error);
      })
      .finally(() => {});
  };

  let percent = Math.ceil(handleCheckItemsPercent(checkItems));

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
                <ProgressBar></ProgressBar>
              </Progress.Root>
            </Box>
            {checkItems.map((checkItem) => {
              let checkItemState = checkItem.state;
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
                      handleUpdateChechItem(checkItem.id, checkItemState)
                    }
                    checked={checkItemState == "complete"}
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
                onChange={(e) => setCheckItemName(e.target.value)}
                mb={2}
              />
              <Button mr="2" onClick={handleCreateCheckItem}>
                Add
              </Button>
              <Button onClick={() => setIsAddingItem(false)}>Cancel</Button>
            </>
          ) : (
            <Button onClick={() => setIsAddingItem(true)}>Add an Item</Button>
          )}
        </>
      )}
    </Box>
  );
};

export default CheckItemsSection;
