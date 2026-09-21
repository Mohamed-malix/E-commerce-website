

function getApis(){
    let api =new XMLHttpRequest();
    api.open('GET', 'https://dummyjson.com/products');
    api.send();

    api.addEventListener('load', () => {
        if(api.status==200 && api){
            let data = JSON.parse(api.response);
            console.log(data.products);
        }
    })
}

getApis();



function displayData(rowData){
    let data='';

    rowData.forEach( item => {
        data +=`
          <div class="card col-xl-3 col-lg-4 col-md-6">
            <img src="" class="card-img-top" alt="..." />
            <div class="card-body">
              <p class="card-text">
                
              </p>
            </div>
            <div class="card-bottom">
            
            </div>
        </div>
        `
    })

    document.querySelector('./content').innerHTML=data;
}