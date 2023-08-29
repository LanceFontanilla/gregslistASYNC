

import { AppState } from "../AppState.js"
import { Car } from "../models/Car.js"
import { carsService } from "../services/CarsService.js"
import { getFormData } from "../utils/FormHandler.js"
import { Pop } from "../utils/Pop.js"
import { setHTML } from "../utils/Writer.js"

function _drawCars() {
    console.log('drawing cars')
    let template = ''
    AppState.cars.forEach(car => template += car.CardTemplate)
    setHTML('cars', template)
}

function _drawEditForm() {
    console.log('editing car form')

    // @ts-ignore
    bootstrap.Collapse.getOrCreateInstance('#carFormCollapse').show()
    let active = AppState.activeCar
    setHTML('carFormCollapse', active.EditCarForm)
}

export class CarsController {
    constructor() {
        console.log('hello from the cars controller')
        this.getCars()
        AppState.on('cars', _drawCars)
        AppState.on('account', _drawCars)
        AppState.on('activeCar', _drawEditForm)
    }

    // REVIEW READ/GET
    async getCars() {
        try {
            await carsService.getCars()
        } catch (error) {
            Pop.error(error.message)
        }
    }

    // REVIEW CREATE/POST
    async createCar() {
        try {
            window.event.preventDefault()
            const form = window.event.target // targets the onsubmit
            const formData = getFormData(form) // creates the object from the form
            await carsService.createCar(formData)
            console.log('create')

            // @ts-ignore
            form.reset() //clear the form after submit
            // @ts-ignore
            bootstrap.Collapse.getOrCreateInstance('#carFormCollapse').hide()

        } catch (error) {
            Pop.error(error.message)
        }
    }

    drawCreateForm() {
        // console.log('drawing the car form')
        setHTML('carFormCollapse', Car.CreateCarForm())
    }

    setActive(carId) {
        console.log('edit car', carId)
        carsService.setActive(carId)
    }

    // UPDATE/PUT
    async editCar(carId) {
        try {
            window.event.preventDefault()
            const form = window.event.target
            const formData = getFormData(form)
            carsService.editCar(formData, carId)
            console.log('editing car')

            // @ts-ignore
            form.reset()
            bootstrap.Collapse.getOrCreateInstance('#carFormCollapse').hide()
        } catch (error) {
            Pop.error(error.message)
        }
    }

    // DELETE
    async deleteCar(carId) {
        try {
            console.log('delete', carId)
            if (await Pop.confirm('Are you sure you want to remove this car???')) {
                carsService.deleteCar(carId)
            }

        } catch (error) {
            Pop.error(error.message)
        }
    }

}