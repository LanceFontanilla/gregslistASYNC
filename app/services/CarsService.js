import { AppState } from "../AppState.js"
import { Car } from "../models/Car.js"
import { api } from "./AxiosService.js"

// @ts-ignore
// NOTE we used this to show how to make a new axios instance, but this does not work with Auth
// NOTE for POST, PUT, DELETE we used the 'api' from the AxiosService to allow us to use Auth
const _sandboxApi = axios.create({
    baseURL: "https://sandbox.codeworksacademy.com",
    timeout: 8000
})

class CarsService {


    async getCars() {
        const response = await _sandboxApi.get('api/cars')
        // NOTE: when using axios.... your response will always be wrapped in 'data'

        const mappedCars = response.data.map(dataObj => new Car(dataObj)) // NOTE passing the data objects from the API through our car constructor
        console.log(response.data, 'this is the car data')
        AppState.cars = mappedCars
    }

    async createCar(formData) {
        // NOTE POST requests are used to send data to an API...the API can store that data in a database
        // NOTE [almost] any time we do a POST request, we will be supplying some kind of body
        // NOTE the 'body' is what we are trying to send to the API
        // NOTE second argument is where we supply the request body
        const res = await api.post('api/cars', formData) //REVIEW using the api from axios service here to send the bearer token w/ this request
        console.log(res.data, '[CREATING CAR]')

        const newCar = new Car(res.data) // take the new car from the API POST and turn it into our model

        // NOTE after inserting into API, we want our local appstate to be up to date so we will push the new car here
        AppState.cars.push(newCar)
        AppState.emit('cars')
    }

    setActive(carId) {
        let car = AppState.cars.find(car => car.id == carId)
        AppState.activeCar = car
        console.log(AppState.activeCar);
    }

    async editCar(formData, carId) {
        // 
        const res = await api.put(`api/cars/${carId}`, formData)
        console.log(res.data, '[EDITING CAR]')

        const updatedCar = new Car(res.data)
        let originalCarIndex = AppState.cars.findIndex(car => car.id == carId)

        // NOTE splice will remove any # of index from an array, based off of the starting index... the last optional argument is what we want to replace the removed indexes with
        // NOTE grab the index of the 'old' version of the car
        // NOTE remove that ONE index
        // NOTE replace that index with the updated car from the API,
        // NOTE ******the last argument, will always replace the beginning or given index
        AppState.cars.splice(originalCarIndex, 1, updatedCar)
        AppState.emit('cars') // after replacing the car in the AppState, emit to trigger the draw
    }

    async deleteCar(carId) {
        const res = await api.delete(`api/cars/${carId}`)
        console.log(res.data, '[DELETING CAR]');

        const filteredArray = AppState.cars.filter(car => car.id != carId)
        AppState.cars = filteredArray
    }



}

export const carsService = new CarsService()