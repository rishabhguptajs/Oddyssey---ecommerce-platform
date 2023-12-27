import React from "react";
import { NavLink } from "react-router-dom";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Dropdown,
  DropdownTrigger,
  Avatar,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  const menuItems = [
    { name: "Categories", path: "/categories" },
    { name: "About Us", path: "/about" },
    { name: "Contact Us", path: "/contact" },
  ];
  return (
    <Navbar className="rounded-b-md" onMenuOpenChange={setIsMenuOpen}>
      <NavbarMenuToggle
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        className="sm:hidden"
      />
      <NavbarBrand>
        <p className="font-bold text-inherit"> Oddyssey </p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link href="/categories" color="foreground">
            Categories
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="/about" color="foreground">
            About Us
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="/contact" color="foreground">
            Contact Us
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent as="div" justify="end">
        {isLoggedIn ? (
          <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="danger"
              name="Rishabh Gupta"
              size="sm"
              src="https://media.licdn.com/dms/image/D4D03AQHHdjsiL4nI4g/profile-displayphoto-shrink_400_400/0/1671482248825?e=1709164800&v=beta&t=sUxcWe6etuKp3MzKvfp7IyWBDiVBKn8hmNhVNimSRmA"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">rishabhgupta4523@gmail.com</p>
            </DropdownItem>
            <DropdownItem key="settings"> Settings </DropdownItem>
            <DropdownItem key="settings"> Cart </DropdownItem>
            <DropdownItem key="settings"> Orders </DropdownItem>
            <DropdownItem key="settings"> Help & Feedback </DropdownItem>
            <DropdownItem key="logout" color="danger">
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown> ): (
            <>
              <NavbarItem className="hidden lg:flex">
            <Link href="/login" color="foreground">
              Login
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Button as={Link} href="/signup" color="danger" variant="flat">
              Sign Up
            </Button>
          </NavbarItem>
            </>
        )}
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => {
          <NavbarMenuItem key={`${item} - ${index}`}>
            <Link
              color={
                index === 2
                  ? "primary"
                  : index === menuItems.length - 1
                  ? "danger"
                  : "foreground"
              }
              className="w-full"
              href="#"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>;
        })}
      </NavbarMenu>
    </Navbar>
  );
};

export default Header;
