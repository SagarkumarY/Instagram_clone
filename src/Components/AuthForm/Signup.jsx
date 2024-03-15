// import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
// import { Button, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
// import React, { useState } from "react";

// function Signup() {
//   const [inputs, setInputs] = useState({
//     email: "",
//     username: "",
//     fullname: "",
//     password: "",
//   });
//   const [showPassword, setShowPassword] = useState(false);
//   return (
//     <>
//       <Input
//         placeholder="Email"
//         size={"sm"}
//         fontSize={14}
//         type="email"
//         onChange={(e) => {
//           setInputs({ ...inputs, email: e.target.value });
//         }}
//         value={inputs.email}
//       />

//       <Input
//         placeholder="Username"
//         type="text"
//         size={"sm"}
//         fontSize={14}
//         onChange={(e) => {
//           setInputs({ ...inputs, username: e.target.value });
//         }}
//         value={inputs.username}
//       />
//       <Input
//         placeholder="Fullname"
//         type="text"
//         size={"sm"}
//         fontSize={14}
//         onChange={(e) => {
//           setInputs({ ...inputs, fullname: e.target.value });
//         }}
//         value={inputs.fullname}
//       />
//       <InputGroup>
//         <Input
//           placeholder="Password"
//           type={showPassword ? "text" : "password"}
//           fontSize={14}
//           value={inputs.password}
//           size={"sm"}
//           onClick={(e) => setInputs({ ...inputs, password: e.target.value })}
//         />
//         <InputRightElement h={"full"}>
//           <Button
//             variant={"ghost"}
//             size={"sm"}
//             onClick={() => setShowPassword(!showPassword)}
//           >
//             {showPassword ? <ViewIcon /> : <ViewOffIcon />}
//           </Button>
//         </InputRightElement>
//       </InputGroup>

//       <Button w={"full"} colorScheme="blue" size={"sm"} fontSize={14}>
//         Sign Up
//       </Button>
//     </>
//   );
// }

// export default Signup;

import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Alert,
  AlertIcon,
  Button,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import React, { useState } from "react";
import userSignUpWithEmailAndPassword from "../../hooks/userSignUpWithEmailAndPassword";

function Signup() {
  const [inputs, setInputs] = useState({
    email: "",
    username: "",
    fullname: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const { loading, error, signup } = userSignUpWithEmailAndPassword();
  return (
    <>
      <Input
        placeholder="Email"
        size={"sm"}
        fontSize={14}
        type="email"
        onChange={(e) => {
          setInputs({ ...inputs, email: e.target.value });
        }}
        value={inputs.email}
      />

      <Input
        placeholder="Username"
        type="text"
        size={"sm"}
        fontSize={14}
        onChange={(e) => {
          setInputs({ ...inputs, username: e.target.value });
        }}
        value={inputs.username}
      />
      <Input
        placeholder="Fullname"
        type="text"
        size={"sm"}
        fontSize={14}
        onChange={(e) => {
          setInputs({ ...inputs, fullname: e.target.value });
        }}
        value={inputs.fullname}
      />
      <InputGroup>
        <Input
          placeholder="Password"
          type={showPassword ? "text" : "password"}
          fontSize={14}
          value={inputs.password}
          size={"sm"}
          onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
        />
        <InputRightElement h={"full"}>
          <Button
            variant={"ghost"}
            size={"sm"}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <ViewIcon /> : <ViewOffIcon />}
          </Button>
        </InputRightElement>
      </InputGroup>

      {error && (
        <Alert status="error" fontSize={13} p={2} borderRadius={4}>
          <AlertIcon fontSize={12} />
          {error.message}
        </Alert>
      )}

      <Button
        w={"full"}
        colorScheme="blue"
        size={"sm"}
        fontSize={14}
        isLoading={loading}
        onClick={() => signup(inputs)}
      >
        Sign Up
      </Button>
    </>
  );
}

export default Signup;
