/* eslint-disable react/prop-types */
import { Stack } from "@chakra-ui/react";
import { Input, Button, Text } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";

import {
  PopoverBody,
  PopoverContent,
  PopoverRoot,
  PopoverTrigger,
  PopoverArrow,
} from "../components/ui/popover";
import { setBoardName } from "../redux/slices/boardsSlice";

const CreateBoardPopover = ({ onCreate }) => {
  const dispatch = useDispatch();

  const { boardName } = useSelector((state) => state.boards);

  const handleCreateBoard = () => {
    if (boardName.trim()) {
      onCreate(boardName);
      dispatch(setBoardName(""));
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
                  onChange={(e) => dispatch(setBoardName(e.target.value))}
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
