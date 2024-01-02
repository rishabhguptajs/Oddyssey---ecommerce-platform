import React from "react";
import { NavLink, Link } from "react-router-dom";
import { FaAngleDown } from "react-icons/fa";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Dropdown,
  DropdownTrigger,
  Avatar,
  DropdownMenu,
  DropdownItem,
  Input,
} from "@nextui-org/react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  const menuItems = ["Categories", "About Us", "Contact Us"];
  return (
    <Navbar
      className="rounded-b-md shadow-sm"
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
      </NavbarContent>
      <NavbarBrand>
        <p className="font-bold text-inherit font_styling"> 
          <Link to="/">
            Oddyssey
          </Link>
        </p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <NavLink to="/products" color="foreground" className="hover:text-[#e13453] font_styling flex items-center px-1 transition-colors">
            Products
          </NavLink>
        </NavbarItem>
        <Dropdown>
          <NavbarItem>
            <DropdownTrigger>
              <Button
                className="hover:text-[#e13453] font_styling flex items-center px-2 transition-colors text-md"
                radius="sm"
                variant="light"
              >
                Categories <FaAngleDown />
              </Button>
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu
            className="w-[340px]"
            itemClasses={{
              base: "gap-4",
            }}
          >
            <DropdownItem
              key="fashion"
            >
              <Link className="block hover:text-[#e13453] transition-colors font_styling" href="#">
            Fashion
          </Link>
            </DropdownItem>
            <DropdownItem
              key="electronics"
            >
              <Link className="block hover:text-[#e13453] transition-colors font_styling" href="#">
            Electronics
          </Link>
            </DropdownItem>
            <DropdownItem
              key="furniture"
            >
               <Link className="block  hover:text-[#e13453] transition-colors font_styling" href="#">
            Furniture
          </Link>
            </DropdownItem>
            <DropdownItem
              key="beauty_health"
            >
              <Link className="block hover:text-[#e13453] transition-colors font_styling" href="#">
            Beauty &amp; Health
          </Link> 
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <NavbarItem>
          <NavLink to="/contact" color="foreground" className="hover:text-[#e13453] font_styling px-1 transition-colors">
            Contact Us
          </NavLink>
        </NavbarItem>
        <NavbarItem>
          <Input
            classNames={{
              base: "max-w-full sm:max-w-[10rem] h-10",
              mainWrapper: "h-full",
              input: "text-small",
              inputWrapper:
                "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
            }}
            placeholder="Search for products..."
            size="sm"
            type="search"
          />
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
                <p className="font-semibold font_styling">Signed in as</p>
                <p className="font-semibold font_styling">rishabhgupta4523@gmail.com</p>
              </DropdownItem>
              <DropdownItem key="settings" className="font_styling"> Settings </DropdownItem>
              <DropdownItem key="settings" className="font_styling"> Cart </DropdownItem>
              <DropdownItem key="settings" className="font_styling"> Orders </DropdownItem>
              <DropdownItem key="settings" className="font_styling"> Help & Feedback </DropdownItem>
              <DropdownItem key="logout" color="danger" onClick={() => {
                setIsLoggedIn(false);
              }} className="font_styling">
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        ) : (
          <>
            <NavbarItem className="hidden lg:flex">
              <NavLink to="/login" color="foreground">
                Login
              </NavLink>
            </NavbarItem>
            <NavbarItem>
              <Button as={NavLink} to="/register" color="danger" variant="flat">
                Sign Up
              </Button>
            </NavbarItem>
          </>
        )}
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => {
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full"
              href="#"
              size="lg"
              color={
                index === 2
                  ? "warning"
                  : index === menuItems.length - 1
                  ? "danger"
                  : "foreground"
              }
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
