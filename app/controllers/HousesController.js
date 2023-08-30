import { Pop } from "../utils/Pop.js"
import { housesService } from "../services/HousesService.js"
import { AppState } from "../AppState.js"
import { setHTML } from "../utils/Writer.js"
import { getFormData } from "../utils/FormHandler.js"
import { House } from "../models/House.js"

function _drawHouses() {
    console.log('drawing houses')
    let template = ''
    AppState.houses.forEach(house => template += house.CardTemplate)
    setHTML('houses', template)
}

function _drawEditForm() {
    console.log('editing house form')

    bootstrap.Collapse.getOrCreateInstance('#houseFormCollapse').show()
    let active = AppState.activeHouse
    setHTML('houseFormCollapse', active.EditHouseForm)
}


export class HousesController {
    constructor() {
        console.log('this is the Houses Controller')
        this.getHouses()
        AppState.on('houses', _drawHouses)
        AppState.on('account', _drawHouses)
        AppState.on('activeHouse', _drawEditForm)
    }



    async getHouses() {
        try {
            await housesService.getHouses()
        } catch (error) {
            Pop.error(error.message)
        }
    }

    async createHouse() {
        try {
            window.event.preventDefault()
            const form = window.event.target
            const formData = getFormData(form)
            await housesService.createHouse(formData)
            console.log('create')
            form.reset()
            bootstrap.Collapse.getOrCreateInstance('#houseFormCollapse').hide()

        } catch (error) {
            Pop.error(error.message)
        }
    }

    drawCreateForm() {
        console.log('drawing the house form')
        setHTML('houseFormCollapse', House.CreateHouseForm())
    }

    setActive(houseId) {
        console.log('edit house', houseId)
        housesService.setActive(houseId)
    }

    async editHouse(houseId) {
        try {
            window.event.preventDefault()
            const form = window.event.target
            const formData = getFormData(form)
            housesService.editHouse(formData, houseId)
            console.log('editing house')

            form.reset()
            bootstrap.Collapse.getOrCreateInstance('#houseFormCollapse').hide()
        } catch (error) {
            Pop.error(error.message)
        }
    }

    async deleteHouse(houseId) {
        try {
            console.log('delete', houseId)
            if (await Pop.confirm('Are you sure you want to remove this house???')) {
                housesService.deleteHouse(houseId)
            }
        } catch (error) {
            Pop.error(error.message)
        }
    }


}