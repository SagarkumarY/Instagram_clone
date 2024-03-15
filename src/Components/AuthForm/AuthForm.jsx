import { Box, Button, Flex, Input, Text, VStack } from "@chakra-ui/react";
import React, { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";
import GoogleAuth from "./GoogleAuth";
function AuthForm() {
  const [islogin, setIsLogin] = useState(true);

  return (
    <>
      <Box border={"1px solid gray"} borderRadius={4} padding={5}>
        <VStack spacing={3}>
          <img
            src="/logo.png"
            alt="instagram_logo"
            height={0}
            w="10px"
            cursor={"pointer"}
          />

          {islogin ? <Login /> : <Signup />}

          {/* //// Or text */}

          <Flex
            alignItems={"center"}
            justifyContent={"center"}
            my={2}
            gap={1}
            w={"full"}
          >
            <Box flex={2} h={"1px"} bg={"gray.400"} />
            <Text mx={1} color={"white"}>
              OR
            </Text>
            <Box flex={2} h={"1px"} bg={"gray.400"} />
          </Flex>

          <GoogleAuth prefix={islogin ? "Log in" : "Sign up"}/>
        </VStack>
      </Box>
      <Box border={"1px solid gray"} borderRadius={4} padding={5}>
        <Flex alignItems={"center"} justifyItems={"center"}>
          <Box mx={2} fontSize={14}>
            {islogin ? "Don't have an account" : "Aleady hane an account"}
          </Box>
          <Box
            onClick={() => setIsLogin(!islogin)}
            color={"blue.500"}
            cursor={"pointer"}
          >
            {islogin ? "Sing up" : "Log in"}
          </Box>
        </Flex>
      </Box>
    </>
  );
}

export default AuthForm;
