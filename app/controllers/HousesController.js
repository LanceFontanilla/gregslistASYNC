import { Pop } from "../utils/Pop.js"
import { housesService } from "../services/HousesService.js"
import { AppState } from "../AppState.js"
import { setHTML } from "../utils/Writer.js"

function _drawHouses() {
    console.log('drawing houses')
    let template = ''
    AppState.houses.forEach(house => template += house.CardTemplate)
    setHTML('houses', template)
}


export class HousesController {
    constructor() {
        console.log('this is the Houses Controller')
        this.getHouses()
        AppState.on('houses', _drawHouses)
    }



    async getHouses() {
        try {
            await housesService.getHouses()
        } catch (error) {
            Pop.error(error.message)
        }
    }
}