import { Avatar, Flex, Text, Button } from "@chakra-ui/react";
import useLogOut from "../../hooks/useLogOut";
import userAuthStore from "../../store/authStore";
import { Link } from "react-router-dom";

function Suggestedheader() {
  const { handleLogout, isLoggingOut } = useLogOut();
  const authUser = userAuthStore((state) => state.user);

  if (!authUser) return null;

  return (
    <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"}>
      <Flex alignItems={"center"} gap={2}>
        <Link to={`${authUser.username}`}>
          <Avatar size={"lg"} src={authUser.profilepicURL} />
        </Link>
        <Link to={`${authUser.username}`}>
          <Text fontSize={12} fontWeight={"bold"}>
            {authUser.username}
          </Text>
        </Link>
      </Flex>
      <Button
        size={"xs"}
        bg={"transparent"}
        _hover={{ background: "transparent" }}
        fontSize={14}
        fontWeight={"medium"}
        color={"blue.500"}
        cursor={"pointer"}
        onClick={handleLogout}
        isLoading={isLoggingOut}
      >
        Log out
      </Button>
    </Flex>
  );
}

export default Suggestedheader;
