import React, { useState } from "react";
import {
  PopoverBody,
  PopoverContent,
  PopoverRoot,
  PopoverTrigger,
  PopoverArrow,
} from "../components/ui/popover";
import { Input, Button, Text } from "@chakra-ui/react";
import { Stack } from "@chakra-ui/react";

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
        <Button bg={"gray.700"} variant={"solid"} margin={"auto"}>
          Create new board
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverBody>
          <form onSubmit={handleCreateBoard}>
            <Stack gap="4">
              <label>
                <Text>Board title</Text>
                <Input
                  value={boardName}
                  onChange={(e) => setBoardName(e.target.value)}
                  placeholder="Enter The Name for Board"
                />
              </label>
              <Button size="sm" variant="outline" type="submit">
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
