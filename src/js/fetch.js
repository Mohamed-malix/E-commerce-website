

 function getApis(){
    
    document.querySelector('.noProduct').classList.add('d-none');
    document.querySelector('.loading').classList.remove('d-none');
    document.querySelector('.containerDiv').style.height='100vh';

     fetch('https://dummyjson.com/products')
        .then( response => {
            
            if(response.ok){
                document.querySelector('.loading').classList.add('d-none');
                document.querySelector('.containerDiv').style.height='100%';

                return response.json();
            }
            else{
                throw new Error('Network error');
            }
        })
        .then( data => displayData(data.products))
        .catch(error => console.error('there was a problem with the fetch operation:', error));

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
                ${item.description.split(' ').splice(0,15).join(' ')} ...
              </p>
            </div>
            <div class="card-bottom fs-6 mb-3 ms-1">
               <div>Rating: ${item.rating} <i class="fa-solid fa-star star"></i></div>
               <div class='fs-5 fw-bold'>Price: ${item.price}</div> 
            </div>
        </div>
        `
    })

    document.querySelector('.content').innerHTML=data;
}