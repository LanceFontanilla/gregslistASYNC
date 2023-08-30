import { AppState } from "../AppState.js"
import { House } from "../models/House.js"
import { api } from "./AxiosService.js"



// @ts-ignore
const _sandboxApi = axios.create({
    baseURL: "https://sandbox.codeworksacademy.com",
    timeout: 8000
})


class HousesService {


    async getHouses() {
        const response = await _sandboxApi.get('api/houses')

        const mappedHouses = response.data.map(dataObj => new House(dataObj))

        console.log(response.data, 'this is the house data')
        AppState.houses = mappedHouses
    }

    async createHouse(formData) {

        const res = await api.post('api/houses', formData)
        console.log(res.data, '[CREATING HOUSE]')

        const newHouse = new House(res.data)

        AppState.houses.push(newHouse)
        AppState.emit('houses')
    }

    setActive(houseId) {
        let house = AppState.houses.find(house => house.id == houseId)
        AppState.activeHouse = house
        console.log(AppState.activeHouse);
    }


    async editHouse(formData, houseId) {
        const res = await api.put(`api/houses/${houseId}`, formData)
        console.log('[EDITING HOUSE]', res.data)

        const updateHouse = new House(res.data)
        let originalHouseIndex = AppState.houses.findIndex(house => house.id == houseId)

        AppState.houses.splice(originalHouseIndex, 1, updateHouse)
        AppState.emit('houses')
    }

    async deleteHouse(houseId) {
        const res = await api.delete(`api/houses/${houseId}`)
        console.log(res.data, '[DELETING HOUSE]');

        const filteredArray = AppState.houses.filter(house => house.id != houseId)
        AppState.houses = filteredArray
    }

}

export const housesService = new HousesService()