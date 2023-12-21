import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";

const NavbarComp = () => {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const isFavoritesPage = router.pathname === "/favourites"; // Check if on the Favorites page

  return (
    <>
      <Navbar
        bg="light"
        expand="lg"
        variant="light"
        className="shadow-sm"
        style={{ position: "fixed", width: "100%", top: 0, zIndex: 1000 }}
      >
        <Container>
          <Navbar.Brand className="fw-bold">AlphaBi Assignment</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {user ? (
                <>
                  {!isFavoritesPage && (
                    <Link href="/favourites" passHref>
                      <Nav.Link className="text-dark fw-bold">Favorites</Nav.Link>
                    </Link>
                  )}
                  {isFavoritesPage && (
                    <Link href="/" passHref>
                      <Nav.Link className="text-dark fw-bold">Dashboard</Nav.Link>
                    </Link>
                  )}
                  <Nav.Link onClick={handleLogout} className="text-dark fw-bold">
                    Logout
                  </Nav.Link>
                </>
              ) : (
                <>
                  <Link href="/signup" passHref>
                    <Nav.Link className="text-dark fw-bold">Signup</Nav.Link>
                  </Link>
                  <Link href="/login" passHref>
                    <Nav.Link className="text-dark fw-bold">Login</Nav.Link>
                  </Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div style={{ paddingTop: "70px" }}>
      </div>
    </>
  );
};

export default NavbarComp;
