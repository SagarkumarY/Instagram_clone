import { Avatar, Flex, Box, Button, SkeletonCircle } from "@chakra-ui/react";
import React from "react";
import useGetUserProfileById from "../../hooks/useGetUserProfileById";
import { Link } from "react-router-dom";
import useFollowUser from "../../hooks/useFollowUser";
import { timeAgo } from "../../utils/timeAgo";

function PostHeader({ post }) {
  const { isUpdating, isFollowing, handleFollowUser } = useFollowUser(
    post.createdBy
  );
  const { userProfile } = useGetUserProfileById(post.createdBy);
  return (
    <Flex
      justifyContent={"space-between"}
      alignItems={"center"}
      w={"full"}
      my={2}
    >
      <Flex alignItems={"center"} gap={2}>
        {userProfile ? (
          <Link to={`/${userProfile.username}`}>
            <Avatar
              src={userProfile.profilepicURL}
              alt="user profile pic"
              size={"sm"}
            />
          </Link>
        ) : (
          <SkeletonCircle size="10" />
        )}
        <Flex fontSize={12} fontWeight={"bold"} gap={2}>
          {userProfile ? (
            <Link to={`/${userProfile.username}`}>{userProfile.username}</Link>
          ) : (
            <SkeletonCircle w={"100px"} h={"10px"} />
          )}
          <Box color={"gray.500"}>{timeAgo(post.createdAt)}</Box>
        </Flex>
      </Flex>
      <Box cursor={"pointer"}>
        <Button
          fontSize={12}
          fontWeight={"bold"}
          color={"blue.500"}
          fontFamily={"bold"}
          _hover={{ color: "white" }}
          transition={"0.2s ease-in-out"}
          bg={"transparent"}
          size={"xs"}
          onClick={handleFollowUser}
          isLoading={isUpdating}
        >
          {isFollowing ? "Unfollow" : "Follow"}
        </Button>
      </Box>
    </Flex>
  );
}

export default PostHeader;
