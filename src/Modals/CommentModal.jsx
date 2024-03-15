import {
  Button,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import Comment from "../Components/Comment/Comment";
import usePostComment from "../hooks/usePostComment";
import useShowToast from "../hooks/useShowToast";
import { useRef, useEffect } from "react";
const CommentsModal = ({ isOpen, onClose, post }) => {
  const { handlePostComment, isCommenting } = usePostComment();
  const showToast = useShowToast();
  const commentRef = useRef(null);
  const CommentContainerRef = useRef(null);

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    const comment = commentRef.current.value;
    if (comment.trim() === "") {
      showToast("Error:", "Comment cannot be empty", "error");
      return;
    }
    await handlePostComment(post.id, comment);
    commentRef.current.value = "";
  };

  useEffect(() => {
    const scrollToBottom = () => {
      CommentContainerRef.current.scrollTop =
        CommentContainerRef.current.scrollHeight;
    };
    if (isOpen) {
      setTimeout(() => {
        scrollToBottom();
      }, 100);
    }
  }, [isOpen, post.comments.length]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} motionPreset="slideInLeft">
      <ModalOverlay />
      <ModalContent bg={"black"} border={"1px solid gray"} maxW={"400px"}>
        <ModalHeader>Comments</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Flex
            mb={4}
            gap={4}
            flexDir={"column"}
            maxH={"250px"}
            overflowY={"auto"}
            ref={CommentContainerRef}
          >
            {post.comments.map((comment, index) => (
              <Comment key={index} comment={comment} />
            ))}
          </Flex>
          <form style={{ marginTop: "2rem" }} onSubmit={handleSubmitComment}>
            <Input placeholder="Comment" size={"sm"} ref={commentRef} />
            <Flex w={"full"} justifyContent={"flex-end"}>
              <Button
                type="submit"
                ml={"auto"}
                size={"sm"}
                my={4}
                isLoading={isCommenting}
              >
                Post
              </Button>
            </Flex>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CommentsModal;
