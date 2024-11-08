import { Link } from "react-router-dom";
import { FaExclamationTriangle } from "react-icons/fa";
import { Box, Button, Heading, Text } from "@chakra-ui/react";

const NotFoundPage = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="90vh"
      textAlign="center"
    >
      <FaExclamationTriangle size="48px" />
      <Heading as="h1" size="2xl" fontWeight="bold" mt={4}>
        404 Not Found
      </Heading>
      <Text fontSize="lg" mt={2}>
        This page does not exist
      </Text>
      <Button as={Link} to="/" colorScheme="blue" mt={4}>
        Go Back
      </Button>
    </Box>
  );
};

export default NotFoundPage;
