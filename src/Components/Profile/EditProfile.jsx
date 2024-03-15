import {
  Avatar,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import userAuthStore from "../../store/authStore";
import usePreviewingImg from "../../hooks/usePreviewingImg";
import useEditProfile from "../../hooks/useEditProfile";
import useShowToast from "../../hooks/useShowToast";

function EditProfile({ isOpen, onClose }) {
  const [input, setInput] = useState({
    fullname: "",
    username: "",
    bio: "",
  });

  const authUser = userAuthStore((state) => state.user);
  const showToast = useShowToast()
  const fileRef = useRef(null);
  const { selectedFile, handleImageChange, setSeletedFile } =
    usePreviewingImg();

  const { editProfile, isUpdating } = useEditProfile();

  const handleEditProfile = async () => {
    try {
      await editProfile(input, selectedFile);
      setSeletedFile(null);
      onClose();
    } catch (error) {
          showToast("Error", error.message, "error");
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          bg={"black"}
          boxShadow={"xl"}
          border={"1px solid gray"}
          mx={3}
        >
          <ModalHeader />
          <ModalCloseButton />
          <ModalBody>
            {/* Container Flex */}
            <Flex bg={"black"}>
              <Stack
                spacing={4}
                w={"full"}
                maxW={"md"}
                bg={"black"}
                p={6}
                my={0}
              >
                <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
                  Edit Profile
                </Heading>
                <FormControl>
                  <Stack direction={["column", "row"]} spacing={6}>
                    <Center>
                      <Avatar
                        size="xl"
                        src={selectedFile || authUser.profilePicURL}
                        border={"2px solid white "}
                      />
                    </Center>
                    <Center w="full">
                      <Button w="full" onClick={() => fileRef.current.click()}>
                        Edit Profile Picture
                      </Button>
                    </Center>
                    <Input
                      type="file"
                      hidden
                      ref={fileRef}
                      onChange={handleImageChange}
                    />
                  </Stack>
                </FormControl>

                <FormControl>
                  <FormLabel fontSize={"sm"}>Full Name</FormLabel>
                  <Input
                    placeholder={"Full Name"}
                    size={"sm"}
                    type={"text"}
                    onChange={(e) =>
                      setInput({ ...input, fullname: e.target.value })
                    }
                    value={input.fullname || authUser.fullname}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel fontSize={"sm"}>Username</FormLabel>
                  <Input
                    placeholder={"Username"}
                    size={"sm"}
                    type={"text"}
                    onChange={(e) =>
                      setInput({ ...input, username: e.target.value })
                    }
                    value={input.username || authUser.username}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel fontSize={"sm"}>Bio</FormLabel>
                  <Input
                    placeholder={"Bio"}
                    size={"sm"}
                    type={"text"}
                    onChange={(e) =>
                      setInput({ ...input, bio: e.target.value })
                    }
                    value={input.bio || authUser.bio}
                  />
                </FormControl>

                <Stack spacing={6} direction={["column", "row"]}>
                  <Button
                    bg={"red.400"}
                    color={"white"}
                    w="full"
                    size="sm"
                    _hover={{ bg: "red.500" }}
                    onClick={onClose}
                  >
                    Cancel
                  </Button>
                  <Button
                    bg={"blue.400"}
                    color={"white"}
                    size="sm"
                    w="full"
                    _hover={{ bg: "blue.500" }}
                    onClick={handleEditProfile}
                    isLoading={isUpdating}
                  >
                    Submit
                  </Button>
                </Stack>
              </Stack>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default EditProfile;

// COPY AND PASTE IT AS THE STARTED EDIT PROFILE MODAL
// import {
// 	Avatar,
// 	Button,
// 	Center,
// 	Flex,
// 	FormControl,
// 	FormLabel,
// 	Heading,
// 	Input,
// 	Modal,
// 	ModalBody,
// 	ModalCloseButton,
// 	ModalContent,
// 	ModalHeader,
// 	ModalOverlay,
// 	Stack,
// } from "@chakra-ui/react";

// const EditProfile = ({ isOpen, onClose }) => {
// 	return (
// 		<>
// 			<Modal isOpen={isOpen} onClose={onClose}>
// 				<ModalOverlay />
// 				<ModalContent bg={"black"} boxShadow={"xl"} border={"1px solid gray"} mx={3}>
// 					<ModalHeader />
// 					<ModalCloseButton />
// 					<ModalBody>
// 						{/* Container Flex */}
// 						<Flex bg={"black"}>
// 							<Stack spacing={4} w={"full"} maxW={"md"} bg={"black"} p={6} my={0}>
// 								<Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
// 									Edit Profile
// 								</Heading>
// 								<FormControl>
// 									<Stack direction={["column", "row"]} spacing={6}>
// 										<Center>
// 											<Avatar size='xl' src={""} border={"2px solid white "} />
// 										</Center>
// 										<Center w='full'>
// 											<Button w='full'>Edit Profile Picture</Button>
// 										</Center>
// 									</Stack>
// 								</FormControl>

// 								<FormControl>
// 									<FormLabel fontSize={"sm"}>Full Name</FormLabel>
// 									<Input placeholder={"Full Name"} size={"sm"} type={"text"} />
// 								</FormControl>

// 								<FormControl>
// 									<FormLabel fontSize={"sm"}>Username</FormLabel>
// 									<Input placeholder={"Username"} size={"sm"} type={"text"} />
// 								</FormControl>

// 								<FormControl>
// 									<FormLabel fontSize={"sm"}>Bio</FormLabel>
// 									<Input placeholder={"Bio"} size={"sm"} type={"text"} />
// 								</FormControl>

// 								<Stack spacing={6} direction={["column", "row"]}>
// 									<Button
// 										bg={"red.400"}
// 										color={"white"}
// 										w='full'
// 										size='sm'
// 										_hover={{ bg: "red.500" }}
// 									>
// 										Cancel
// 									</Button>
// 									<Button
// 										bg={"blue.400"}
// 										color={"white"}
// 										size='sm'
// 										w='full'
// 										_hover={{ bg: "blue.500" }}
// 									>
// 										Submit
// 									</Button>
// 								</Stack>
// 							</Stack>
// 						</Flex>
// 					</ModalBody>
// 				</ModalContent>
// 			</Modal>
// 		</>
// 	);
// };

// export default EditProfile;
