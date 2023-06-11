import React, { useState, useEffect } from "react"
import * as dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
import { useParams, useNavigate } from "react-router-dom"
import {
  Paper,
  Container,
  Button,
  TextField,
  FormGroup,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from "@mui/material"
import { BackendApi } from "../../client/backend-api"
import classes from "./styles.module.css"
import { NotificationManager } from "react-notifications"

dayjs.extend(utc)

export const CarForm = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [car, setCar] = useState({
    registrationNumber: "",
    make: "",
    model: "",
    category: "",
    color: "",
  })
  const [errors, setErrors] = useState({
    registrationNumber: "",
    make: "",
    model: "",
    category: "",
    color: "",
  })

  const isInvalid =
    car.registrationNumber.trim() === "" ||
    car.make.trim() === "" ||
    car.model.trim() === "" ||
    car.category.trim() === "" ||
    car.color.trim() === ""

  const formSubmit = (event) => {
    event.preventDefault()
    if (!isInvalid) {
      if (id) {
        BackendApi.car
          .patchCarById(id, {
            ...car,
          })
          .then(() => {
            NotificationManager.success("Car updated successfully")
            navigate(-1)
          })
      } else {
        BackendApi.car
          .addCar({
            ...car,
          })
          .then(() => {
            NotificationManager.success("Car Added successfully")

            navigate("/")
          })
      }
    }
  }

  const updateCarField = (event) => {
    const field = event.target
    setCar((car) => ({ ...car, [field.name]: field.value }))
  }

  const validateForm = (event) => {
    const { name, value } = event.target
    if (["registrationNumber", "make", "model", "category", "color"].includes(name)) {
      setCar((prevProd) => ({ ...prevProd, [name]: value.trim() }))
      if (!value.trim().length) {
        setErrors({ ...errors, [name]: `${name} can't be empty` })
      } else {
        setErrors({ ...errors, [name]: "" })
      }
    }
  }

  useEffect(() => {
    if (id) {
      BackendApi.car.getCarById(id).then(({ data, error }) => {
        if (error) {
          navigate("/")
        } else {
          setCar(data)
        }
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  return (
    <>
      <Container component={Paper} className={classes.wrapper}>
        <Typography className={classes.pageHeader} variant="h5">
          {id ? "Update Car" : "Add Car"}
        </Typography>
        <form noValidate autoComplete="off" onSubmit={formSubmit}>
          <FormGroup>
            <FormControl className={classes.mb2}>
              <TextField
                label="Registration Number"
                name="registrationNumber"
                required
                value={car.registrationNumber}
                onChange={updateCarField}
                onBlur={validateForm}
                error={errors.registrationNumber.length > 0}
                helperText={errors.registrationNumber}
              />
            </FormControl>
            <FormControl className={classes.mb2}>
              <TextField
                label="Make"
                name="make"
                required
                value={car.make}
                onChange={updateCarField}
                onBlur={validateForm}
                error={errors.make.length > 0}
                helperText={errors.make}
              />
            </FormControl>
            <FormControl className={classes.mb2}>
              <TextField
                label="Model"
                name="model"
                required
                value={car.model}
                onChange={updateCarField}
                onBlur={validateForm}
                error={errors.model.length > 0}
                helperText={errors.model}
              />
            </FormControl>
            <FormControl className={classes.mb2}>
              <InputLabel id="category-label">Category</InputLabel>
              <Select
                labelId="category-label"
                name="category"
                value={car.category}
                onChange={updateCarField}
                required
              >
                <MenuItem value="Bus">Bus</MenuItem>
                <MenuItem value="Sedan">Sedan</MenuItem>
                <MenuItem value="SUV">SUV</MenuItem>
                <MenuItem value="Hatchback">Hatchback</MenuItem>
              </Select>
            </FormControl>
            <FormControl className={classes.mb2}>
              <TextField
                label="Color"
                name="color"
                required
                value={car.color}
                onChange={updateCarField}
                onBlur={validateForm}
                error={errors.color.length > 0}
                helperText={errors.color}
              />
            </FormControl>
          </FormGroup>
          <div className={classes.btnContainer}>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => {
                navigate(-1)
              }}
            >
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="primary" disabled={isInvalid}>
              {id ? "Update Car" : "Add Car"}
            </Button>
          </div>
        </form>
      </Container>
    </>
  )
}
