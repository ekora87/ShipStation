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
            if ((SKUs.includes(laptops)) || (SKUs.includes(desktops))) {
              
              $('.options').append(`<h3>${order.orderNumber}</h3><p>${SKUs}</p>`);
              displayOptions(order.items[0].options);
            }
          }
          //console.log(responseJson.orders[i])
    }
    
}

function displayOptions(item) {
  //console.log(item.length);
   for (let i=0; i<item.length; i++) {
     let upgradeName = item[i].name;
     let upgradeValue = item[i].value;
     $('.options').append(`<p>${upgradeName}: ${upgradeValue}</p>`);

     if (item[i].value === '4GB') {
       dt160GB++;
       alert("160GB");
       console.log(dt160GB);
     }
   }
   $('.results').append(`<p>DT HDD 160GB: ${dt160GB}`);
}



$(function() {
    test();
})