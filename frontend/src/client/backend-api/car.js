const CarApi = {
  getAllCars: async () => {
    const res = await fetch("/v1/car", { method: "GET" })
    return res.json()
  },
  getCarById: async (id) => {
    const res = await fetch(`/v1/car/${id}`, { method: "GET" })
    return res.json()
  },
  addCar: async (data) => {
    const res = await fetch("/v1/car", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    })
    return res.json()
  },
  patchCarById: async (id, data) => {
    const res = await fetch(`/v1/car/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    })
    return res.json()
  },
  deleteCar: async (id) => {
    const res = await fetch(`/v1/car/${id}`, { method: "DELETE" })
    return res.json()
  },
}

module.exports = { CarApi }
