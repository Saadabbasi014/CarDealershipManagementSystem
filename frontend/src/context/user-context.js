import { useState, useEffect, createContext, useContext } from "react"
import { NotificationManager } from "react-notifications"
import { BackendApi } from "../client/backend-api"

const UserContext = createContext({
  user: null,
  loginUser: () => {},
  signUpUser: () => {},
})

const useUser = () => useContext(UserContext)

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    setIsAdmin(user && user.role === "admin")
  }, [user])

  useEffect(() => {
    BackendApi.user
      .getProfile()
      .then(({ user, error }) => {
        if (error) {
          console.error(error)
        } else {
          setUser(user)
        }
      })
      .catch(console.error)
  }, [])

  const loginUser = async (email, password) => {
    const { user, error } = await BackendApi.user.login(email, password)
    if (error) {
      NotificationManager.error(error)
    } else {
      NotificationManager.success("Logged in successfully")
      setUser(user)
    }
  }

  const signUpUser = async (email, password, role) => {
    const { user, error } = await BackendApi.user.signup(email, password, role)
    if (error) {
      NotificationManager.error(error)
    } else {
      NotificationManager.success("Sign Up successfully")
      setUser(user)
    }
  }

  const logoutUser = async () => {
    setUser(null)
    await BackendApi.user.logout()
  }

  return (
    <UserContext.Provider value={{ user, loginUser, signUpUser, logoutUser, isAdmin }}>
      {children}
    </UserContext.Provider>
  )
}

export { useUser, UserProvider }
