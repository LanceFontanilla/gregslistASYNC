


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
    <div class="col-md-10 elevation-5 rounded-top my-2" style="border: 2px solid">
      <div class="row">
        <div class="col-4 p-0">
          <img class="img-fluid rounded-start" src=${this.imgUrl} alt="House N>
        </div>
        <div class="col-8">
          <div class="d-flex justify-content-around pt-3">
            <h1 class="text-center">$${this.price} </h1>
            <span>${this.bedrooms} Beds </span>
            <span>|</span>
            <span>${this.bathrooms} Bath</span>
            <span>|</span>
            <span>${this.levels} Levels</span>
            <span>|</span>
            <span>Built: ${this.year}</span>
            <span>${this.createdAt}</span>
          </div>
          <p class="">${this.description}</p>
        </div>
        <span class="text-center">${this.creatorPicture}</span>
        <span class="text-center">${this.creatorName}</span>

        <div class="text-end py-2">
          <button class="btn btn-danger" onclick="app.HousesController.deleteHouse('${this.id}')">Remove Listing <i
              class="mdi mdi-delete"></i> </button>
        </div>
      </div>
    </div>
    </div>
        `
    }
}


