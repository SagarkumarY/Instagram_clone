import {
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import {
  CommentLogo,
  NotificationsLogo,
  UnlikeLogo,
} from "../../Assets/Contants";
import usePostComment from "../../hooks/usePostComment";
import userAuthStore from "../../store/authStore";
import useLikePost from "../../hooks/useLikePost";
import CommentsModal from "../../Modals/CommentModal";
import useShowToast from "../../hooks/useShowToast";

function PostFooter({ post, username, isProfilePage, creatorProfile }) {
  const { isCommenting, handlePostComment } = usePostComment();
  const [comment, setComment] = useState("");
  const showToast = useShowToast();
  const authUser = userAuthStore((state) => state.user);
  const commentRef = useRef(null);
  const { likes, isLiked, handleLikePost } = useLikePost(post);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSubmitComment = async () => {
    if (comment.trim() === "") {
      showToast("Error:", "Comment cannot be empty", "error");
      return;
    }
    await handlePostComment(post.id, comment); // Passing comment as an argument
    setComment(""); // Resetting the comment state after posting
  };

  return (
    <Box mb={10} marginTop={"auto"}>
      <Flex alignItems={"center"} gap={4} pt={0} mb={2} mt={4}>
        <Box onClick={handleLikePost} fontSize={18} cursor={"pointer"}>
          {!isLiked ? <NotificationsLogo /> : <UnlikeLogo />}
        </Box>

        <Box
          cursor={"pointer"}
          fontSize={18}
          onClick={() => commentRef.current.focus()}
        >
          <CommentLogo />
        </Box>
      </Flex>
      <Text fontwight={600} fontSize={"sm"}>
        {likes} Like
      </Text>

      {isProfilePage && (
        <Text fontSize="12" color={"gray"}>
          Posted {timeAgo(post.createdAt)}
        </Text>
      )}

      {!isProfilePage && (
        <>
          <Text fontSize="sm" fontwight={700}>
            {creatorProfile?.username}{" "}
            <Text as="span" fontwight={400}>
              {post?.caption}
            </Text>
          </Text>
          {post.comments.length > 0 && (
            <Text
              fontSize="sm"
              color={"gray"}
              cursor={"pointer"}
              onClick={onOpen}
            >
              View all {post.comments.length} comments
            </Text>
          )}
          {/* {COMMENT MODAL ONLY IN HOME PAGE} */}
          {isOpen ? <CommentsModal isOpen={isOpen} onClose={onClose} post={post} /> : null}
        </>
      )}

      {authUser && (
        <Flex
          alignItems={"center"}
          gap={2}
          justifyContent={"space-between"}
          w={"full"}
        >
          <InputGroup>
            <Input
              variant={"flushed"}
              placeholder={"Add  a comments..."}
              fontSize={14}
              onChange={(e) => setComment(e.target.value)}
              value={comment}
              ref={commentRef}
            />
            <InputRightElement>
              <Button
                fontSize={14}
                color={"blue.500"}
                fontWeight={600}
                cursor={"pointer"}
                _hover={{ color: "white" }}
                bg={"transparent"}
                onClick={handleSubmitComment}
                isLoading={isCommenting}
              >
                Post
              </Button>
            </InputRightElement>
          </InputGroup>
        </Flex>
      )}
    </Box>
  );
}

export default PostFooter;

// Function to calculate the time elapsed since a given timestamp
const timeAgo = (timestamp) => {
  // Get the current timestamp
  const now = Date.now();

  // Calculate the time difference in seconds
  const secondsAgo = Math.floor((now - timestamp) / 1000);

  // If the time difference is less than a minute, display seconds ago
  if (secondsAgo < 60) {
    return `${secondsAgo}s ago`;
  }
  // If the time difference is less than an hour, display minutes ago
  else if (secondsAgo < 3600) {
    const minutesAgo = Math.floor(secondsAgo / 60);
    return `${minutesAgo}m ago`;
  }
  // If the time difference is less than a day, display hours ago
  else if (secondsAgo < 86400) {
    const hoursAgo = Math.floor(secondsAgo / 3600);
    return `${hoursAgo}h ago`;
  }
  // If the time difference is less than a week, display days ago
  else if (secondsAgo < 604800) {
    const daysAgo = Math.floor(secondsAgo / 86400);
    return `${daysAgo}d ago`;
  }
  // If the time difference is a week or more, display weeks ago
  else {
    const weeksAgo = Math.floor(secondsAgo / 604800); // 7 days in seconds
    return `${weeksAgo}w ago`;
  }
};
