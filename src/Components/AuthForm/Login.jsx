import React, { useState } from "react";
import { Alert, AlertIcon, Button, Input } from "@chakra-ui/react";
import useLogin from "../../hooks/useLogin";
import useShowToast from "../../hooks/useShowToast";

function Login() {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const showToast = useShowToast();
  const { login, loading, error } = useLogin();
 console.log(error)

  return (
    <>
      <Input
        placeholder="Email"
        fontSize={14}
        size={"sm"}
        type="emal"
        onChange={(e) => {
          setInputs({ ...inputs, email: e.target.value });
        }}
        value={inputs.email}
      />

      <Input
        placeholder="Password"
        type="password"
        fontSize={14}
        size={"sm"}
        onChange={(e) => {
          setInputs({ ...inputs, password: e.target.value });
        }}
        value={inputs.password}
      />

      {/* {error && (
        <Alert status="error" fontSize={13} p={2} borderRadius={4}>
          <AlertIcon fontSize={12} />
          {error.message || "Login failed. Please check your email and password."}
        </Alert>
      )} */}

    


      <Button
        w={"full"}
        colorScheme="blue"
        size={"sm"}
        fontSize={14}
        isLoading={loading}
        onClick={() => login(inputs)}
      >
        Log in
      </Button>
    </>
  );
}

export default Login;
