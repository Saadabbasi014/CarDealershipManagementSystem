import { useState, forwardRef } from "react"
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
} from "@mui/material"

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

export const SignUpDialog = ({ open, handleClose, handleSubmit }) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("")

  const onSubmit = (event) => {
    event.preventDefault()
    handleSubmit(email, password, role)
  }

  const handleEnterKeyDown = (event) => {
    if (event.key === "Enter") {
      onSubmit(event)
    }
  }

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      onKeyDown={handleEnterKeyDown}
    >
      <DialogTitle>SignUp</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="email"
          label="Email"
          type="text"
          fullWidth
          variant="standard"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          margin="dense"
          id="password"
          label="Password"
          type="password"
          fullWidth
          variant="standard"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          margin="dense"
          id="role"
          label="Role"
          type="text"
          fullWidth
          variant="standard"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button variant="text" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="contained" type="submit" onClick={onSubmit}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  )
}