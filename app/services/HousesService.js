import { AppState } from "../AppState.js"
import { House } from "../models/House.js"



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



}

export const housesService = new HousesService()