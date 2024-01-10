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
  DropdownMenu,
  DropdownItem,
  Input,
  Avatar,
} from "@nextui-org/react";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [auth, setAuth] = useAuth();

  const menuItems = ["Categories", "About Us", "Contact Us"];

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successful!");
  };

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
          <Link to="/">Oddyssey</Link>
        </p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <NavLink
            to="/products"
            color="foreground"
            className="hover:text-[#e13453] font_styling flex items-center px-1 transition-colors"
          >
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
                aria-label="Categories"
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
            <DropdownItem key="fashion" aria-label="Fashion">
              <Link
                className="block hover:text-[#e13453] transition-colors font_styling"
                href="#"
              >
                Fashion
              </Link>
            </DropdownItem>
            <DropdownItem key="electronics" aria-label="Electronics">
              <Link
                className="block hover:text-[#e13453] transition-colors font_styling"
                href="#"
              >
                Electronics
              </Link>
            </DropdownItem>
            <DropdownItem key="furniture" aria-label="Furniture">
              <Link
                className="block  hover:text-[#e13453] transition-colors font_styling"
                href="#"
              >
                Furniture
              </Link>
            </DropdownItem>
            <DropdownItem key="beauty_health" aria-label="Beauty &amp; Health">
              <Link
                className="block hover:text-[#e13453] transition-colors font_styling"
                href="#"
              >
                Beauty &amp; Health
              </Link>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <NavbarItem>
          <NavLink
            to="/contact"
            color="foreground"
            className="hover:text-[#e13453] font_styling px-1 transition-colors"
          >
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
        {!auth.user ? (
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
        ) : (
          <>
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Avatar
                  isBordered
                  as="button"
                  className="transition-transform"
                  color="danger"
                  name={auth.user.name}
                  size="md"
                  src=""
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownItem key="profile" className="h-14 gap-2">
                  <p className="font-semibold">Signed in as</p>
                  <p className="font-semibold">rishabhgupta4523@gmail.com</p>
                </DropdownItem>
                <DropdownItem key="dashboard">
                  <NavLink to={`/dashboard/${auth.user.role === 1 ? 'admin' : ''}`}>Dashboard</NavLink>
                </DropdownItem>
                <DropdownItem key="cart">
                  <NavLink to="/cart">Cart</NavLink>
                </DropdownItem>
                <DropdownItem key="settings">
                  <NavLink to="/settings">Settings</NavLink>
                </DropdownItem>
                <DropdownItem key="help_and_feedback">
                  <NavLink to="/help_and_feedback">Help &amp; Feedback</NavLink>
                </DropdownItem>
                <DropdownItem
                  key="logout"
                  color="danger"
                  onClick={handleLogout}
                >
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
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
