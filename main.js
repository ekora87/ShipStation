let apiKey = 'ZDI1NzRlMTE1NjEwNDM2ZDhmYWNjYWI4N2M4YzQ3YzI6ZDNjMjA0ZWE5YWJmNDAwYzk3Njk3NzVkODViNDk0NTE=';
let url = 'https://ssapi.shipstation.com/orders?';

let baseDT = {
  memory: '4GB',
  hdd: '160GB',
  os: 'Win 7',
  optical: 'none',
  lcd: 'none',
  kb: 'none',
  wireless: 'none',
  av: 'Leave Me Unprotected'
}

let hddArray = ['160GB', '320GB', '500GB', '1TB'];

let dt160GB = 0;
let dt320GB = 0;
let dt500GB = 0;
let dt1TB = 0;
let dt128GB = 0;
let dt240GB = 0;
let dt480GB = 0;
let lt160GB = 0;
let lt320GB = 0;
let lt500GB = 0;
let lt1TB = 0;
let lt128GB = 0;
let lt240GB = 0;
let lt480GB = 0;

//For date calendar
$(document).ready(function () {
    $('input[class$=tbdate]').datepicker({
      dateFormat: 'yy-mm-dd'
    });
  });

function getOrderByDate(startDate, endDate) {
    let h = new Headers();
    h.append('Accept', 'application/json');
    let auth = 'Basic ' + apiKey;
    h.append('Authorization', auth);
    console.log(auth);
 

    let req = new Request(url + `orderDateStart=${startDate}&orderDateEnd=${endDate}&pageSize=500` ,{
        method: 'GET',
        headers: h,
        credentials: 'same-origin'
    })
    fetch (req)
    .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(response.statusText);
      })
      .then(responseJson => getProducts(responseJson))
      .catch(error => console.log('Something Went Wrong'));
}

function test() {
    
        $('.date-form').submit(event => {
          event.preventDefault();
          //$('.apod-container').empty();
          let startDate = $('#startDate').val();
          let endDate = $('#endDate').val();
          getOrderByDate(startDate, endDate);
        });
      
    // btn = document.querySelector('button');
    // btn.addEventListener('click', getOrderByDate);
}

function getProducts(responseJson) {
    let laptops = 'LTPC';
    let desktops = 'DTPC';
     console.log(responseJson.orders.length);
    // console.log(responseJson.orders[0].items[0].sku);
    

    // for (let i=0; i<responseJson.orders.length; i++) {
    //   let order = responseJson.orders[i];
    //     if (order.items.length > 1) {
    //       for (let y=0; y < order.items.length; y++) {
    //         let SKUs = order.items[y].sku;
    //         //console.log(order);
    //         if ((SKUs.includes(laptops)) || (SKUs.includes(desktops))) {
              
    //           $('.options').append(`<h3>${order.orderNumber}</h3><p>${SKUs}</p>`);
    //           displayOptions(order.items[0].options);
    //         }
    //       }
    //       //console.log(responseJson.orders[i])
    //     } else {
    //       let SKUs = order.items[0].sku;
    //       if ((SKUs.includes(laptops)) || (SKUs.includes(desktops))) {
    //         $('.options').append(`<h3>${order.orderNumber}</h3><p>${SKUs}</p>`);
    //         displayOptions(order.items[0].options);
    //         // for (let x=0; x<order.items[0].options.length; x++) {     
    //         //   $('.options').append(`<p>${order.items[0].options[x].name}: ${order.items[0].options[x].value}</p>`);
    //         // }
    //         }
    //     }
     
    // }

    for (let i=0; i<responseJson.orders.length; i++) {
      let order = responseJson.orders[i];
          console.log(order);
          for (let y=0; y < order.items.length; y++) {
            let SKUs = order.items[y].sku;
            //console.log(order);
            if (SKUs.includes(desktops)) {
              
              //$('.options').append(`<h3>${order.orderNumber}</h3><p>${SKUs}</p>`);
              displayDTOptions(order.items[y].options);
            } else {
              if (SKUs.includes(laptops)) {
              
                //$('.options').append(`<h3>${order.orderNumber}</h3><p>${SKUs}</p>`);
                displayLTOptions(order.items[y].options);
            }
          }
          //console.log(responseJson.orders[i])
    }
    
    
}
addResults();
}

function displayDTOptions(item) {
  //console.log(item.length);
   for (let i=0; i<item.length; i++) {
     let upgradeName = item[i].name;
     let upgradeValue = item[i].value;
     //$('.options').append(`<p>${upgradeName}: ${upgradeValue}</p>`);

     if (item[i])
     if (item[i].value === '160GB') {
       dt160GB++;
       //alert("160GB");
       //console.log(dt160GB);
     }

     if (item[i].value === '320GB') {
      dt320GB++;
    }
    if (item[i].value === '500GB') {
      dt500GB++;
    }
    if (item[i].value === '1TB') {
      dt1TB++;
    }
    if (item[i].value === '128GB SSD') {
      dt128GB++;
    }
    if (item[i].value === '240GB SSD') {
      dt240GB++;
    }
    if (item[i].value === '480GB SSD') {
      dt480GB++;
    }


   }
   //$('.results').append(`<p>DT HDD 160GB: ${dt160GB}`);
}

function displayLTOptions(item) {
  //console.log(item.length);
   for (let i=0; i<item.length; i++) {
     let upgradeName = item[i].name;
     let upgradeValue = item[i].value;
     //$('.options').append(`<p>${upgradeName}: ${upgradeValue}</p>`);

     
     if (item[i].value === '160GB') {
       lt160GB++;
       //alert("160GB");
       //console.log(dt160GB);
     }

     if (item[i].value === '320GB') {
      lt320GB++;
    }
    if (item[i].value === '500GB') {
      lt500GB++;
    }
    if (item[i].value === '1TB') {
      lt1TB++;
    }
    if (item[i].value === '128GB SSD') {
      lt128GB++;
    }
    if (item[i].value === '240GB SSD') {
      lt240GB++;
    }
    if (item[i].value === '480GB SSD') {
      lt480GB++;
    }


   }
   //$('.results').append(`<p>DT HDD 160GB: ${dt160GB}`);
}

function addResults() {
  $('.results').append(`<p>DT HDD 160GB: ${dt160GB}</p><p>DT HDD 320GB: ${dt320GB}</p><p>DT HDD 500GB: ${dt500GB}</p><p>DT HDD 1TB: ${dt1TB}</p><p>DT HDD 128GB SSD: ${dt128GB}</p>
  <p>DT HDD 240GB SSD: ${dt240GB}</p><p>DT HDD 480GB SSD: ${dt480GB}</p>`);

  $('.results').append(`<p>LT HDD 160GB: ${lt160GB}</p><p>LT HDD 320GB: ${lt320GB}</p><p>LT HDD 500GB: ${lt500GB}</p><p>LT HDD 1TB: ${lt1TB}</p><p>LT HDD 128GB SSD: ${lt128GB}</p>
  <p>LT HDD 240GB SSD: ${lt240GB}</p><p>LT HDD 480GB SSD: ${lt480GB}</p>`);
  
}

$(function() {
    test();
    //addResults();
})