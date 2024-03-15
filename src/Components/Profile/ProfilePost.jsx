import {
  Avatar,
  Divider,
  Flex,
  GridItem,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  VStack,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import { AiFillHeart } from "react-icons/ai";
import { FaComment } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import React, { useState } from "react";
import Comment from "../Comment/Comment";
import PostFooter from "../FeedPosts/PostFooter";
import useUserProfileStore from "../../store/userProfileStore";
import userAuthStore from "../../store/authStore";
import useShowToast from "../../hooks/useShowToast";
import { deleteObject, ref } from "firebase/storage";
import { firestore, storage } from "../../firebase/firebase";
import { arrayRemove, deleteDoc, doc, updateDoc } from "firebase/firestore";
import usePostStore from "../../store/postStore";
import Caption from "../Comment/Caption";

function ProfilePost({ post }) {
  // Hook to manage modal state
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Retrieve user profile from store
  const userProfile = useUserProfileStore((state) => state.userProfile);

  // Retrieve authenticated user from store
  const authUser = userAuthStore((state) => state.user);

  // Hook to display toast messages
  const showToast = useShowToast();

  // State to manage deletion loading state
  const [isDeleting, setIsDeleting] = useState(false);

  // Retrieve deletePost function from store
  const deletePost = usePostStore((state) => state.deletePost);

  // showPost in number from  profile: Retrieve  deletePost function from store
  const decrementPostsCount = useUserProfileStore((state) => state.deletePost);

  // Function to handle post deletion
  const handleDeletePost = async () => {
    // Confirm deletion with user
    if (!window.confirm("Are you sure you want to delete?")) return;
    if (isDeleting) return;
    setIsDeleting(true);

    try {
      // Reference to the image in storage
      const imageRef = ref(storage, `posts/${post.id}`);

      // Delete the image from storage
      await deleteObject(imageRef);

      // Reference to the user document
      const userRef = doc(firestore, "users", authUser.uid);

      // Delete the post document from firestore
      await deleteDoc(doc(firestore, "posts", post.id));

      // Remove the post from the user's list of posts
      await updateDoc(userRef, {
        posts: arrayRemove(post.id),
      });

      deletePost(post.id);

      decrementPostsCount(post.id);

      // Show success toast message
      showToast("Success", "Post deleted successfully", "success");
    } catch (error) {
      // Show error toast message if deletion fails
      showToast("Error", error.message, "error");
    } finally {
      // Reset deletion loading state
      setIsDeleting(false);
    }
  };

  return (
    <>
      <GridItem
        cursor={"pointer"}
        borderRadius={4}
        overflow={"hidden"}
        border={"1px solid"}
        borderColor={"whiteAlpha.300"}
        position={"relative"}
        aspectRatio={1 / 1}
        onClick={onOpen}
      >
        <Flex
          opacity={0}
          _hover={{ opacity: 1 }}
          position={"absolute"}
          top={0}
          left={0}
          right={0}
          bottom={0}
          bg={"blackAlpha.700"}
          transition={"all 0.3s ease"}
          zIndex={1}
          justifyContent={"center"}
        >
          <Flex alignItems={"center"} justifyContent={"center"} gap={50}>
            <Flex>
              <AiFillHeart size={20} />
              <Text fontWeight={"bold"} ml={2}>
                {post.likes.length}
              </Text>
            </Flex>
            <Flex>
              <FaComment size={20} />
              <Text fontWeight={"bold"} ml={2}>
                {post.comments.length}
              </Text>
            </Flex>
          </Flex>
        </Flex>
        <Image
          src={post.imageURL}
          alt="profile post"
          w={"100%"}
          h={"100%"}
          objectFit={"cover"}
        />
      </GridItem>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered={true}
        size={{ base: "3xl", md: "5xl" }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody bg={"black"} pb={5}>
            <Flex
              gap="4"
              w={{ base: "90%", sm: "70%", md: "full" }}
              mx={"auto"}
              maxH={"90vh"}
              minH={"50vh"}
            >
              <Flex
                borderRadius={4}
                overflow={"hidden"}
                border={"1px solid"}
                borderColor={"whiteAlpha.300"}
                flex={1.5}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <img src={post.imageURL} alt="profile2 post" />
              </Flex>
              <Flex
                flex={1}
                flexDir={"column"}
                px={10}
                display={{ base: "none", md: "flex" }}
              >
                <Flex alignItems={"center"} justifyContent={"space-between"}>
                  <Flex alignItems={"center"} gap={4}>
                    <Avatar
                      src={userProfile.profilepicURL}
                      size={"sm"}
                      name="Kaizoku Ou ni, ore wa naru!"
                    />
                    <Text fontWeight={"bold"} fontSize={12}>
                      {userProfile.username}
                    </Text>
                  </Flex>
                  {authUser?.uid === userProfile.uid && (
                    <Button
                      _hover={{ bg: "whiteAlpha.300", color: "red.500" }}
                      borderRadius={4}
                      p={1}
                      size={"sm"}
                      bg={"transparent"}
                      onClick={handleDeletePost}
                      isLoading={isDeleting}
                    >
                      <MdDelete size={20} cursor="pointer " />
                    </Button>
                  )}
                </Flex>

                <Divider my={4} bg={"gray.500"} />
                <VStack
                  w={"full"}
                  alignItems={"start"}
                  maxH={"350px"}
                  overflowY={"auto"}
                >
                   {/* {CAPTION} */}
                   {post.caption && <Caption post={post}/>}
                   {/* {COMMENTS} */}
                  {post.comments.map((comment , index) => (
                    <Comment key={index} comment={comment} />
                  ))}
                </VStack>
                <Divider my={4} bg={"gray.800"} />
                <PostFooter isProfilePage={true} post={post} />
              </Flex>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ProfilePost;
