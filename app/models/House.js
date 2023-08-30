import { AppState } from "../AppState.js"



export class House {
  constructor(data) {
    this.id = data.id
    this.bedrooms = data.bedrooms
    this.bathrooms = data.bathrooms
    this.createdAt = data.createdAt
    this.creatorId = data.creator.id
    this.creatorName = data.creator.name
    this.creatorPicture = data.creator.picture
    this.description = data.description
    this.imgUrl = data.imgUrl || 'No Picture Available'
    this.levels = data.levels
    this.price = data.price
    this.year = data.year

  }

  get CardTemplate() {
    return `
<div class="col-md-10 elevation-5 rounded my-2">
            <div class="row">
              <div class="col-md-4 p-0">
                <img class="img-fluid"
                  src=${this.imgUrl}
                  alt="House Pic Not Available">
              </div>
              <div class="col-md-8">
                <h1 class="text-center">$${this.price} |  ${this.bedrooms} Beds | ${this.bathrooms} Baths </h1>
                <div class="d-flex justify-content-around">
                  <h2> ${this.levels} Levels | Built ${this.year}</h2>
                </div>
                <p>${this.description}</p>
                <div class="d-flex align-items-center">
                  <img class="creator-img"
                    src=${this.creatorPicture}
                    alt="${this.creatorName}">
                  <span>${this.creatorName}</span>
                </div>
                <div class="my-3 d-flex justify-content-between">
                ${this.ComputeEditButton}
                ${this.ComputeDeleteButton}
                </div>
              </div>
            </div>
          </div>
        `
  }

  static CreateHouseForm() {
    return ` 

        <form class="row p-2" onsubmit="app.HousesController.createHouse()">

          <div class="form-floating mb-3 col-4">
            <input required type="number" class="form-control" id="bedrooms" name="bedrooms" placeholder="# of Beds">
            <label for="bedrooms">Number of Beds</label>
          </div>

          <div class="form-floating mb-3 col-4">
            <input required type="number" class="form-control" id="bathrooms" name="bathrooms" placeholder="# of Baths ">
            <label for="bathrooms">Number of Baths</label>
          </div>

          <div class="form-floating mb-3 col-4">
            <input required type="number" minLength="4" maxLength="4" class="form-control" id="houseYear" name="year"
              placeholder="Year Built">
            <label for="houseYear">Year Built</label>
          </div>

          <div class="form-floating mb-3 col-6">
            <input required type="number" class="form-control" max="10000000" id="housePrice" name="price"
              placeholder="House Price">
            <label for="housePrice">House Price</label>
          </div>

          <div class="form-floating mb-3 col-6">
            <input required type="number" class="form-control" id="levels" name="levels" placeholder="# of Levels">
            <label for="levels">Number of Levels</label>
          </div>

          <div class="form-floating mb-3 col-12">
            <input required type="text" class="form-control" id="houseimgUrl" name="imgUrl" placeholder="House imgUrl">
            <label for="houseimgUrl">House Image Url</label>
          </div>

          <div class="form-floating">
            <textarea required maxLength="500" class="form-control" placeholder="Please describe your house"
              name="description" id="houseDescription" style="height: 100px"></textarea>
            <label for="houseDescription">House Description</label>
          </div>
  
          <div class="text-end">
            <button type="submit" class="btn btn-info">Create Listing</button>
          </div>
        </form>
      </div>
  </div>   
    `
  }

  get EditHouseForm() {
    return ` 

        <form class="row p-2" onsubmit="app.HousesController.editHouse('${this.id}')">

          <div class="form-floating mb-3 col-4">
            <input required type="number" class="form-control" id="bedrooms" name="bedrooms" placeholder="# of Beds" value="${this.bedrooms}">
            <label for="bedrooms">Number of Beds</label>
          </div>

          <div class="form-floating mb-3 col-4">
            <input required type="number" class="form-control" id="bathrooms" name="bathrooms" placeholder="# of Baths" value="${this.bathrooms}"> 
            <label for="bathrooms">Number of Baths</label>
          </div>

          <div class="form-floating mb-3 col-4">
            <input required type="number" minLength="4" maxLength="4" class="form-control" id="houseYear" name="year"
              placeholder="Year Built" value ="${this.year}">
            <label for="houseYear">Year Built</label>
          </div>

          <div class="form-floating mb-3 col-6">
            <input required type="number" class="form-control" max="10000000" id="housePrice" name="price"
              placeholder="House Price" value = "${this.price}">
            <label for="housePrice">House Price</label>
          </div>

          <div class="form-floating mb-3 col-6">
            <input required type="number" class="form-control" id="levels" name="levels" placeholder="# of Levels" value ="${this.levels}">
            <label for="levels">Number of Levels</label>
          </div>

          <div class="form-floating mb-3 col-12">
            <input required type="text" class="form-control" id="houseimgUrl" name="imgUrl" placeholder="House imgUrl" value="${this.imgUrl}">
            <label for="houseimgUrl">House Image Url</label>
          </div>

          <div class="form-floating">
            <textarea required maxLength="500" class="form-control" placeholder="Please describe your house"
              name="description" id="houseDescription" style="height: 100px">${this.description}</textarea>
            <label for="houseDescription">House Description</label>
          </div>
  
          <div class="text-end">
            <button type="submit" class="btn btn-info">Edit Listing</button>
          </div>
        </form>
      </div>
  </div>   
    `
  }

  get ComputeEditButton() {
    if (AppState.account == null || AppState.account.id != this.creatorId) return ''

    return `<button class="btn btn-primary" onclick="app.HousesController.setActive('${this.id}')">Edit House ✏️</button>`
  }

  get ComputeDeleteButton() {
    if (AppState.account == null || AppState.account.id != this.creatorId) return ''
    return `<button class="btn btn-danger" onclick="app.HousesController.deleteHouse('${this.id}')" >Delete House 🚨</button>`

  }


}


