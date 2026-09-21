

function getApis(){
    let api =new XMLHttpRequest();
    api.open('GET', 'https://dummyjson.com/products');
    api.send();

    api.addEventListener('load', () => {
        if(api.status==200 && api){
            let data = JSON.parse(api.response);
            displayData(data.products);
        }
    })
}

getApis();



function displayData(rowData){
    let data='';

    rowData.forEach( item => {
        data +=`
          <div class="card rounded-5 px-2">
            <img src="${item.thumbnail}" class="card-img-top" alt="${item.thumbnail}" />
            <div class="card-body">
              <h4 class='title fs-5'> ${item.title}:</4> 
              <p class="card-text fs-6 mt-2">
                ${item.description}
              </p>
            </div>
            <div class="card-bottom fs-6 mb-3 ms-1">
               <div>Rating: ${item.rating}</div>
               <div class='fs-5 fw-bold'>Price: ${item.price}</div> 
            </div>
        </div>
        `
    })

    document.querySelector('.content').innerHTML=data;
}