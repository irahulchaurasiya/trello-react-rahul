/* eslint-disable react/prop-types */
import  { useState } from "react";
import { Stack } from "@chakra-ui/react";
import { Input, Button, Text } from "@chakra-ui/react";

import {
  PopoverBody,
  PopoverContent,
  PopoverRoot,
  PopoverTrigger,
  PopoverArrow,
} from "../components/ui/popover";

const CreateBoardPopover = ({ onCreate }) => {
  const [boardName, setBoardName] = useState("");

  const handleCreateBoard = () => {
    if (boardName.trim()) {
      onCreate(boardName);
      setBoardName("");
    }
  };

  return (
    <PopoverRoot>
      <PopoverTrigger asChild>
        <Button
          bgColor="transparent"
          variant="solid"
          color="whiteAlpha.900"
          margin="auto"
        >
          Create new board
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverBody bgColor="gray.700" color="whiteAlpha.900">
          <form onSubmit={handleCreateBoard}>
            <Stack gap="4">
              <label>
                <Text>Board title</Text>
                <Input
                  borderColor="red"
                  color="whiteAlpha.900"
                  value={boardName}
                  onChange={(e) => setBoardName(e.target.value)}
                  placeholder="Enter The Name for Board"
                />
              </label>
              <Button
                borderColor="gray.500"
                color="whiteAlpha.900"
                size="sm"
                variant="outline"
                type="submit"
                _hover={{ bgColor: "gray.600" }}
              >
                Submit
              </Button>
            </Stack>
          </form>
        </PopoverBody>
      </PopoverContent>
    </PopoverRoot>
  );
};

export default CreateBoardPopover;
