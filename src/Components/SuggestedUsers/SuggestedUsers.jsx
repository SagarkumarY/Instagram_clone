import { Box, Flex, Link, Text, VStack } from "@chakra-ui/react";
import Suggestedheader from "./Suggestedheader";
import SuggestedUser from "./SuggestedUser";
import useGetSuggestedUsers from "../../hooks/useGetSuggestedUsers";

function SuggestedUsers() {
  const { isLoading, suggestedUsers } = useGetSuggestedUsers();

  if (isLoading) return null;
  return (
    <VStack py={8} px={6} gap={4}>
      <Suggestedheader />

      {suggestedUsers.length !== 0 &&
        (
          <Flex
            alignItems={"center"}
            justifyContent={"space-between"}
            w={"full"}
          >
            <Text fontSize={14} fontWeight={"bold"} color={"gray.500"}>
              Suggested for you
            </Text>
            <Text
              fontFamily={12}
              fontWeight={"blod"}
              _hover={{ color: "gray.400" }}
              cursor={"pointer"}
            >
              See All
            </Text>
          </Flex>
        )}

      {suggestedUsers.map((user) => (
        <SuggestedUser user={user} key={user.id} />
      ))}

      <Box fontSize={12} mt={5} color={"gray.500"} alignSelf={"start"}>
        @ 2025 Bulid by{" "}
        <Link
          href="https://github.com"
          target="_blank"
          color={"blur.500"}
          fontSize={14}
        >
          As a programmer
        </Link>
      </Box>
    </VStack>
  );
}

export default SuggestedUsers;
