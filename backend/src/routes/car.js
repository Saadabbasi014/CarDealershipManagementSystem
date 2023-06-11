const router = require("express")()
const { CarModel } = require("../models/car")

router.get("/", async (req, res, next) => {
  try {
    const cars = await CarModel.find({})
    return res.status(200).json({ data: cars, success: true })
  } catch (err) {
    next(err)
  }
})

router.get("/:id", async (req, res, next) => {
  try {
    const car = await CarModel.findById(req.params.id)
    if (car == null) {
      return res.status(404).json({ error: "Car not found" })
    }
    return res.status(200).json({ data: car, success: true })
  } catch (err) {
    next(err)
  }
})

router.post("/", async (req, res, next) => {
  try {
    const newCar = await CarModel.create(req.body)
    return res.status(200).json({ data: newCar, success: true })
  } catch (err) {
    next(err)
  }
})

router.patch("/:id", async (req, res, next) => {
  try {
    const car = await CarModel.findById(req.params.id)
    if (car == null) {
      return res.status(404).json({ error: "Car not found" })
    }
    const { _id, ...rest } = req.body
    const updatedBook = await car.update(rest)
    return res.status(200).json({ data: updatedBook, success: true })
  } catch (err) {
    next(err)
  }
})

router.delete("/:id", async (req, res, next) => {
  try {
    const car = await CarModel.findById(req.params.id)
    if (car == null) {
      return res.status(404).json({ error: "Car not found" })
    }
    await car.delete()
    return res.status(200).json({ success: true })
  } catch (err) {
    next(err)
  }
})

module.exports = { router }
