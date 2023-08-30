export const HousesView = `
<div class="container-fluid">
    <!-- SECTION collapse form -->
    <section class="row ">
        <div class="col-12">

            <button onclick="app.HousesController.drawCreateForm()" class="btn btn-primary" type="button"
                data-bs-toggle="collapse" data-bs-target="#houseFormCollapse" aria-expanded="false"
                aria-controls="collapseExample">
                List House <span class="mdi mdi-home"></span>
            </button>

            <!-- SECTION collapse starts here -->
            <div class="collapse" id="houseFormCollapse">

            </div>
            <!-- SECTION houses row -->
            <section class="row justify-content-center" id="houses">
                <!-- STUB House template -->

            </section> 
            
            `