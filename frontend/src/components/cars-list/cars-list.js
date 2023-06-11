import { useState, useEffect } from "react"
import { Link as RouterLink } from "react-router-dom"
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Modal,
  Card,
  CardContent,
  CardActions,
  Typography,
  TablePagination,
} from "@mui/material"
import { BackendApi } from "../../client/backend-api"
import { useUser } from "../../context/user-context"
import classes from "./styles.module.css"

export const CarsList = () => {
  const [cars, setCars] = useState([])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [activeCarId, setActiveCarId] = useState("")
  const [openModal, setOpenModal] = useState(false)
  const { isAdmin, user } = useUser()

  const fetchCars = async () => {
    const { cars, data } = await BackendApi.car.getAllCars()
    console.log(cars)
    console.log(data)
    setCars(data)
  }

  const deleteCar = () => {
    if (activeCarId && cars.length) {
      BackendApi.car.deleteCar(activeCarId).then(({ success }) => {
        fetchCars().catch(console.error)
        setOpenModal(false)
        setActiveCarId("")
      })
    }
  }

  useEffect(() => {
    fetchCars().catch(console.error)
  }, [user])

  return (
    <>
      <div className={`${classes.pageHeader} ${classes.mb2}`}>
        <Typography variant="h5">Car List</Typography>

        {isAdmin && (
          <Button variant="contained" color="primary" component={RouterLink} to="/admin/cars/add">
            Add Car
          </Button>
        )}
      </div>
      {cars.length > 0 ? (
        <>
          <div className={classes.tableContainer}>
            <TableContainer component={Paper}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell>Registration Number</TableCell>
                    <TableCell>Make</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell>Model</TableCell>
                    <TableCell>Color</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(rowsPerPage > 0
                    ? cars.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    : cars
                  ).map((car) => (
                    <TableRow key={car.id}>
                      <TableCell component="th" scope="row">
                        {car.registrationNumber}
                      </TableCell>
                      <TableCell>{car.make}</TableCell>
                      <TableCell>{car.category}</TableCell>
                      <TableCell>{car.model}</TableCell>
                      <TableCell>{car.color}</TableCell>
                      <TableCell>
                        <div className={classes.actionsContainer}>
                          <Button
                            variant="contained"
                            component={RouterLink}
                            size="small"
                            to={`/cars/${car._id}`}
                          >
                            View
                          </Button>
                          {isAdmin && (
                            <>
                              <Button
                                variant="contained"
                                color="primary"
                                component={RouterLink}
                                size="small"
                                to={`/admin/cars/${car._id}/edit`}
                              >
                                Edit
                              </Button>
                              <Button
                                variant="contained"
                                color="secondary"
                                size="small"
                                onClick={(e) => {
                                  setActiveCarId(car._id)
                                  setOpenModal(true)
                                }}
                              >
                                Delete
                              </Button>
                            </>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              onRowsPerPageChange={(e) => {
                setRowsPerPage(parseInt(e.target.value, 10))
                setPage(0)
              }}
              component="div"
              count={cars.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={(e, newPage) => setPage(newPage)}
            />
            <Modal open={openModal} onClose={(e) => setOpenModal(false)}>
              <Card className={classes.conf_modal}>
                <CardContent>
                  <h2>Are you sure?</h2>
                </CardContent>
                <CardActions className={classes.conf_modal_actions}>
                  <Button variant="contained" onClick={() => setOpenModal(false)}>
                    Cancel
                  </Button>
                  <Button variant="contained" color="secondary" onClick={deleteCar}>
                    Delete
                  </Button>
                </CardActions>
              </Card>
            </Modal>
          </div>
        </>
      ) : (
        <Typography variant="h5">No car found!</Typography>
      )}
    </>
  )
}
