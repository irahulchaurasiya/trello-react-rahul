import { Button, Flex, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";

const SingleBoardPageHeader = () => {
  const navigate = useNavigate();

  return (
    <Flex
      textStyle="2xl"
      fontWeight="bold"
      w="full"
      justifyContent="space-between"
      boxShadow="md"
      p="2"
    >
      <Button
        textStyle="xl"
        color="whiteAlpha.800"
        onClick={() => navigate(-1)}
        variant="plain"
      >
        <IoMdArrowRoundBack />
      </Button>
      <Text color="whiteAlpha.800"> Trello</Text>
      <Text color="whiteAlpha.800">RC</Text>
    </Flex>
  );
};

export default SingleBoardPageHeader;
