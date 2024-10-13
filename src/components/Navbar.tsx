import { Flex, Link as ChakraLink, Img } from "@chakra-ui/react";
import { Link as ReactRouterLink, useNavigate } from "react-router-dom";

import logo from "../assets/circle.png";
import { doSignOut } from "../firebase/auth";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await doSignOut();
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <Flex
      maxW="1280px"
      direction="row"
      alignItems="center"
      justify="center"
      gap={10}
      py={5}
    >
      <ChakraLink
        as={ReactRouterLink}
        to="/"
        _hover={{ textDecoration: "underline" }}
      >
        Characters
      </ChakraLink>
      <Img src={logo} alt="logo" h="75px" cursor="pointer" />
      <ChakraLink
        as="button"
        onClick={handleLogout}
        _hover={{ textDecoration: "underline" }}
      >
        Logout
      </ChakraLink>
    </Flex>
  );
}
