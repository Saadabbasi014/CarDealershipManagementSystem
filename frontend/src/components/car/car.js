import Highcharts from "highcharts"
import HighchartsReact from "highcharts-react-official"
import { useEffect, useState } from "react"
import { useParams, useNavigate, Link as RouterLink } from "react-router-dom"
import {
  Button,
  Card,
  CardContent,
  CardActions,
  Typography,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material"
import { NotificationManager } from "react-notifications"
import { BackendApi } from "../../client/backend-api"
import { useUser } from "../../context/user-context"
import { TabPanel } from "../tabs/tab"
import classes from "./styles.module.css"

export const Car = () => {
  const { id } = useParams()
  const { user, isAdmin } = useUser()
  const navigate = useNavigate()
  const [car, setCar] = useState(null)
  const [chartOptions, setChartOptions] = useState(null)
  const [openTab, setOpenTab] = useState(0)

  useEffect(() => {
    if (id) {
      BackendApi.car
        .getCarById(id)
        .then(({ data, error }) => {
          if (error) {
            NotificationManager.error(error)
          } else {
            setCar(data)
          }
        })
        .catch(console.error)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  return (
    car && (
      <div className={classes.wrapper}>
        <Typography variant="h5" align="center" style={{ marginBottom: 20 }}>
          Car Details
        </Typography>
        <Card>
          <CardContent>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell variant="head" component="th" width="200">
                    Registration Number
                  </TableCell>
                  <TableCell>{car.registrationNumber}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head" component="th">
                    Make
                  </TableCell>
                  <TableCell>{car.make}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head" component="th">
                    Model
                  </TableCell>
                  <TableCell>{car.model}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head" component="th">
                    Category
                  </TableCell>
                  <TableCell>{car.category}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head" component="th">
                    Color
                  </TableCell>
                  <TableCell>{car.color}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>

          <CardActions disableSpacing>
            <div className={classes.btnContainer}>
              {isAdmin ? (
                <Button
                  variant="contained"
                  color="secondary"
                  component={RouterLink}
                  to={`/admin/cars/${id}/edit`}
                >
                  Edit Car
                </Button>
              ) : (
                <></>
              )}
              <Button type="submit" variant="text" color="primary" onClick={() => navigate(-1)}>
                Go Back
              </Button>
            </div>
          </CardActions>
        </Card>
      </div>
    )
  )
}
