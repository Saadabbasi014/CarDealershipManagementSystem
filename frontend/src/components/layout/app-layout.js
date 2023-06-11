import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
} from "@mui/material"
import { useUser } from "../../context/user-context"
import { Route, Routes, Navigate, Link } from "react-router-dom"
import { LoginDialog } from "../login/login-dialog"
import { SignUpDialog } from "../sign-up/sign-up-dialog"
import { WithLoginProtector } from "../access-control/login-protector"
import { WithAdminProtector } from "../access-control/admin-protector"
import { CarForm } from "../car-form/car-form"
import { CarsList } from "../cars-list/cars-list"
import { Car } from "../car/car"

export const AppLayout = () => {
  const [openLoginDialog, setOpenLoginDialog] = useState(false)
  const [openSignUpDialog, setOpenSignUpDialog] = useState(false)
  const [anchorElUser, setAnchorElUser] = useState(null)
  const { user, loginUser, signUpUser, logoutUser, isAdmin } = useUser()
  const navigate = useNavigate()

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const handleLoginSubmit = (email, password) => {
    loginUser(email, password)
    setOpenLoginDialog(false)
  }

  const handleLoginClose = () => {
    setOpenLoginDialog(false)
  }

  const handleSignUpSubmit = (email, password, role) => {
    signUpUser(email, password, role)
    setOpenSignUpDialog(false)
    setOpenLoginDialog(true)
  }

  const handleSignUpClose = () => {
    setOpenSignUpDialog(false)
  }

  const handleLogout = () => {
    logoutUser()
    handleCloseUserMenu()
  }

  useEffect(() => {
    if (!user) {
      navigate("/")
    } else if (isAdmin) {
      navigate("/admin/cars")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, isAdmin])

  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Link to="/" style={{ textDecoration: "none", flexGrow: 1 }}>
              <Typography
                variant="h6"
                noWrap
                sx={{
                  mr: 2,
                  display: "flex",
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "white",
                }}
              >
                MS Car Dealership Management System
              </Typography>
            </Link>
            <Box
              sx={{
                flexGrow: 0,
              }}
            >
              {user ? (
                <>
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar> {user.email.charAt(0).toUpperCase()} </Avatar>
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: "45px" }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    <MenuItem onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">Dashboard</Typography>
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>
                      <Typography textAlign="center">Logout</Typography>
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                <Button
                  onClick={() => {
                    setOpenLoginDialog(true)
                  }}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  Login
                </Button>
              )}
              {user ? (
                <></>
              ) : (
                <Button
                  onClick={() => {
                    setOpenSignUpDialog(true)
                  }}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  SignUp
                </Button>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Routes>
        <Route path="/cars" exact element={<CarsList />} />
        <Route
          path="/cars/:id"
          element={
            <WithLoginProtector>
              <Car />
            </WithLoginProtector>
          }
        />
        <Route path="/admin/cars/add" element={<CarForm />} exact />
        <Route path="/admin/cars/:id/edit" element={<CarForm />} />
        <Route path="*" element={<Navigate to="/cars" replace />} />
      </Routes>
      <LoginDialog
        open={openLoginDialog}
        handleSubmit={handleLoginSubmit}
        handleClose={handleLoginClose}
      />
      <SignUpDialog
        open={openSignUpDialog}
        handleSubmit={handleSignUpSubmit}
        handleClose={handleSignUpClose}
      />
    </>
  )
}
