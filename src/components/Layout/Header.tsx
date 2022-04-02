import Link from "next/link";
import {
  Box,
  Button,
  Text,
  Menu,
  Icon,
  MenuButton,
  MenuList,
  MenuItem,
  Image,
  Container,
} from "@chakra-ui/react";
import { FaSignOutAlt, FaCog, FaBookmark } from "react-icons/fa";

import UserService, { useAuth } from "services/User";
import { useRouter } from "next/router";
import appConfig from "config/app";

const NonAuthedMenu = () => (
  <Box as="nav">
    <Link href="/auth/log-in" passHref>
      <Button variant="ghost" size="sm" as="a">
        Login
      </Button>
    </Link>
    <Link href="/auth/sign-up" passHref>
      <Button variant="solid" size="sm" as="a" ml="4">
        Sign Up
      </Button>
    </Link>
  </Box>
);

const AuthedMenu = () => {
  const router = useRouter();
  const { user, setUser } = useAuth();

  const handleLogOut = () => {
    setUser(null);
    UserService.logOut();

    router.push("/");
  };

  return (
    <Box>
      <Link href="/jobs" passHref>
        <Button variant="ghost" as="a">
          Latest jobs
        </Button>
      </Link>
      <Menu>
        <MenuButton
          as={Button}
          leftIcon={
            user?.avatarURL && (
              <Image boxSize="7" borderRadius="full" src={user.avatarURL} />
            )
          }
          variant="ghost"
          ml="1"
        >
          <Text>{user?.username}</Text>
        </MenuButton>
        <MenuList>
          <Link href="/jobs/favourites" passHref>
            <MenuItem as="a" icon={<Icon as={FaBookmark} mt="1.5" />}>
              Saved jobs
            </MenuItem>
          </Link>
          <Link href="/settings" passHref>
            <MenuItem as="a" icon={<Icon as={FaCog} mt="1.5" />}>
              Settings
            </MenuItem>
          </Link>
          <MenuItem
            onClick={handleLogOut}
            icon={<Icon as={FaSignOutAlt} mt="2" />}
          >
            Logout
          </MenuItem>
        </MenuList>
      </Menu>
    </Box>
  );
};

const Header = () => {
  const { user } = useAuth();

  return (
    <Box as="header" height="14" backgroundColor="white" px="4">
      <Container
        maxWidth="container.xl"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        height="full"
      >
        <Link href="/" passHref>
          <Text as="a" fontWeight="bold" fontSize="2xl">
            {appConfig.title}
          </Text>
        </Link>
        {user ? <AuthedMenu /> : <NonAuthedMenu />}
      </Container>
    </Box>
  );
};

export default Header;
