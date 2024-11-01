import { Stack, Text } from "@chakra-ui/react";
import {
  PopoverBody,
  PopoverContent,
  PopoverRoot,
  PopoverTrigger,
  PopoverCloseTrigger,
} from "../components/ui/popover";
import CheckListSection from "../components/CheckListSection";

const CardPopover = ({ children, cardId, cardName }) => {
  return (
    <PopoverRoot>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent>
        <PopoverBody color="whiteAlpha.900" bgColor="gray.800">
          <Stack spacing={4}>
            <Text fontSize="lg" fontWeight="bold">
              {cardName}
            </Text>
            <CheckListSection cardId={cardId} />
          </Stack>
        </PopoverBody>
        <PopoverCloseTrigger color="whiteAlpha.900"></PopoverCloseTrigger>
      </PopoverContent>
    </PopoverRoot>
  );
};

export default CardPopover;