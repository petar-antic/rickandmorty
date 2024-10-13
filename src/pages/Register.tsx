import { useForm } from "react-hook-form";
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Flex,
  Img,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { Link as ReactRouterLink, useNavigate } from "react-router-dom";
import logo from "../assets/circle.png";
import { doCreateUserWithEmailAndPassword } from "../firebase/auth";
import { useState } from "react";
import { AuthData } from "../types";

const Register = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<AuthData>();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (data: AuthData) => {
    try {
      setError("");
      await doCreateUserWithEmailAndPassword(data.email, data.password);
      navigate("/");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError("Failed to create an account");
    }
  };

  return (
    <Flex
      minH="100vh"
      direction="column"
      align="center"
      justify="center"
      bg="black"
      color="white"
    >
      <Img src={logo} alt="logo" h="300px" mb={6} />
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ display: "flex", flexDirection: "column", width: "320px" }}
      >
        {error && <p style={{ color: "red" }}>{error}</p>}

        <FormControl isInvalid={!!errors.email} mb={4}>
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input
            id="email"
            placeholder="Enter your email"
            {...register("email", {
              required: "This is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Invalid email address",
              },
              minLength: { value: 4, message: "Minimum length should be 4" },
            })}
          />
          <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.password}>
          <FormLabel htmlFor="password">Password</FormLabel>
          <Input
            id="password"
            placeholder="Enter your password"
            type="password"
            {...register("password", {
              required: "This is required",
              minLength: { value: 8, message: "Minimum length should be 8" },
            })}
          />
          <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
        </FormControl>

        <ChakraLink
          as={ReactRouterLink}
          to="/"
          mt={2}
          alignSelf="flex-start"
          _hover={{ textDecoration: "underline" }}
        >
          Already have an account?
        </ChakraLink>

        <Button
          mt={8}
          colorScheme="red"
          isLoading={isSubmitting}
          type="submit"
          width="full"
        >
          Sign up
        </Button>
      </form>
    </Flex>
  );
};

export default Register;
