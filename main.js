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

let totalDT = 0;
let totalLT = 0;

let dt160GB = 0;
let dt320GB = 0;
let dt500GB = 0;
let dt1TB = 0;
let dt128GB = 0;
let dt240GB = 0;
let dt480GB = 0;


let dt4GB = 0;
let dt8GB = 0;
let dt16GB = 0;

let dtDVD = 0;
let dtDVDRW = 0;
let dtDVDNone = 0;

let dtLCDNone = 0;
let dtLCD17 = 0;
let dtLCD20 = 0;
let dtLCD22 = 0;

let dtW7 = 0;
let dtW10H = 0;
let dtW10P = 0;

let dtKBNone = 0;
let dtKBRefurb = 0;
let dtKBNew = 0;
let dtKBWireless = 0;

let dtWifiNone = 0;
let dtWifi = 0;
let dtBT = 0;
let dtWifiBT = 0;

let dtAVNone = 0;
let dtVipre = 0;
let dtMWB = 0;

let lt160GB = 0;
let lt320GB = 0;
let lt500GB = 0;
let lt1TB = 0;
let lt128GB = 0;
let lt240GB = 0;
let lt256GB = 0
let lt480GB = 0;
let lt512GB = 0;

let lt4GB = 0;
let lt8GB = 0;
let lt16GB = 0;

let ltDVD = 0;
let ltDVDRW = 0;
let ltDVDNone = 0;

let ltW7 = 0;
let ltW10H = 0;
let ltW10P = 0;

let ltWebcamNone = 0;
let ltWebcam = 0;

let ltBatt = 0;
let ltBattNew = 0;
let ltBattExt = 0;

let ltBTNone = 0;
let ltBT = 0;

let ltAVNone = 0;
let ltVipre = 0;
let ltMWB = 0;

let ltDockNone = 0;
let ltEPort = 0;
let ltEPortPlus = 0;
let ltTargus = 0;


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
 

    let req = new Request(url + `orderDateStart=${startDate}&orderDateEnd=${endDate} 23:59:59&pageSize=500` ,{
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
          $('.result-div').empty();
          $('h4').empty();
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
    
    for (let i=0; i<responseJson.orders.length; i++) {
      let order = responseJson.orders[i];
          console.log(order);
          for (let y=0; y < order.items.length; y++) {
            let qty = order.items[y].quantity;
            console.log(qty);
            let SKUs = order.items[y].sku;
            //console.log(order);
            if (SKUs.includes(desktops)) {
                totalDT = totalDT + qty;
              //$('.options').append(`<h3>${order.orderNumber}</h3><p>${SKUs}</p><p>${qty}</p>`);
              displayDTOptions(order.items[y].options, qty);
            } else {
              if (SKUs.includes(laptops)) {
                totalLT = totalLT + qty;
               // $('.options').append(`<h3>${order.orderNumber}</h3><p>${SKUs}</p>`);
                displayLTOptions(order.items[y].options, qty);
            }
          }
          //console.log(responseJson.orders[i])
    }
    
    
}
addResults();
}

function displayDTOptions(item, count) {
  //console.log(item.length);
   for (let i=0; i<item.length; i++) {
     let upgradeName = item[i].name;
     let upgradeValue = item[i].value;
     //$('.options').append(`<p>${upgradeName}: ${upgradeValue}</p>`);

    if (item[i].value === '160GB') {
       dt160GB = dt160GB + count;
    }
    if (item[i].value === '320GB') {
      dt320GB = dt320GB + count;
    }
    if (item[i].value === '500GB') {
      dt500GB = dt500GB + count;
    }
    if (item[i].value === '1TB') {
      dt1TB = dt1TB + count;
    }
    if (item[i].value === '128GB SSD') {
      dt128GB = dt128GB + count;
    }
    if (item[i].value === '240GB SSD') {
      dt240GB = dt240GB +  count;
    }
    if (item[i].value === '480GB SSD') {
      dt480GB = dt480GB + count;
    }
    if (item[i].value === '4GB') {
      dt4GB = dt4GB + count;
    }
    if (item[i].value === '8GB') {
      dt8GB = dt8GB + count;
    }
    if (item[i].value === '16GB') {
      dt16GB = dt16GB + count;
    }
    if ((item[i].value === 'None') && (item[i].name === "Add An Optical Drive")) {
      dtDVDNone = dtDVDNone + count;
    }
    if (item[i].value === 'DVD-ROM') {
      dtDVD = dtDVD + count;
    }
    if (item[i].value === 'DVD/RW') {
      dtDVDRW = dtDVDRW + count;
    }
    if ((item[i].value === 'None') && (item[i].name === "Add A Monitor")) {
      dtLCDNone = dtLCDNone + count;
    }
    if (item[i].value === '17" ($29)') {
      dtLCD17 = dtLCD17 + count;
    }
    if (item[i].value === '20" ($60)') {
      dtLCD20 = dtLCD20 + count;
    }
    if (item[i].value === '22" ($80)') {
      dtLCD22 = dtLCD22 + count;
    }
    if (item[i].value === 'Win 7') {
      dtW7 = dtW7 + count;
    }
    if (item[i].value === 'Win 10 Home (add $25)') {
      dtW10H = dtW10H + count;
    }
    if (item[i].value === 'Win 10 Pro (add $50)') {
      dtW10P = dtW10P + count;
    }
    if (((item[i].value === 'None') && (item[i].name === "Add KB & Mouse")) || ((item[i].value === 'None') && (item[i].name === "Add Keyboard & Mouse"))) {
      dtKBNone = dtKBNone + count;
    }
    if (item[i].value === 'Refurb Dell Mouse & Keyboard ($12)') {
      dtKBRefurb = dtKBRefurb + count;
    }
    if (item[i].value === 'New Dell Mouse & Keyboard ($20)') {
      dtKBNew = dtKBNew + count;
    }
    if (item[i].value === 'Logitech Wireless KB & Mouse ($22)') {
      dtKBWireless = dtKBWireless + count;
    }
    if ((item[i].value === 'None') && (item[i].name === "Add Wireless" || item[i].name === 'Add Wireless?' || item[i].name === "WiFi? Bluetooth?")) {
      dtWifiNone = dtWifiNone + count;
    }
    if (item[i].value === 'WiFi') {
      dtWifi = dtWifi + count;
    }
    if (item[i].value === 'Bluetooth 4.0') {
      dtBT = dtBT + count;
    }
    if (item[i].value === 'WiFi & Bluetooth') {
      dtWifiBT = dtWifiBT + count;
    }
    if (item[i].value === 'Leave Me Unprotected') {
      dtAVNone = dtAVNone + count;
    }
    if (item[i].value === 'Vipre Antivirus 1PC / 1 Year ($19)') {
      dtVipre = dtVipre + count;
    }
    if (item[i].value === 'Malwarebytes for 1 PC Lifetime ($50)') {
      dtMWB = dtMWB + count;
    }
   }
   //$('.results').append(`<p>DT HDD 160GB: ${dt160GB}`);
}

function displayLTOptions(item, count) {
  //console.log(item.length);
   for (let i=0; i<item.length; i++) {
     let upgradeName = item[i].name;
     let upgradeValue = item[i].value;
     //$('.options').append(`<p>${upgradeName}: ${upgradeValue}</p>`);

     
    if (item[i].value === '160GB') {
      lt160GB = lt160GB + count;
    }
    if (item[i].value === '320GB') {
      lt320GB = lt320GB + count;
    }
    if (item[i].value === '500GB') {
      lt500GB = lt500GB + count;
    }
    if (item[i].value === '1TB') {
      lt1TB = lt1TB + count;
    }
    if ((item[i].value === '128GB SSD') || (item[i].value === '128GB')) {
      lt128GB = lt128GB + count;
    }
    if ((item[i].value === '240GB SSD') || (item[i].value === '256GB')){
      lt240GB = lt240GB + count;
    }
    if ((item[i].value === '480GB SSD') || (item[i].value === '512GB')){
      lt480GB = lt480GB + count;
    }
    if (item[i].value === '4GB') {
      lt4GB = lt4GB + count;
    }
    if (item[i].value === '8GB') {
      lt8GB = lt8GB + count;
    }
    if (item[i].value === '16GB') {
      lt16GB = lt16GB + count;
    }
    if ((item[i].value === 'Win 7') || (item[i].value === 'Windows 7')) {
      ltW7 = ltW7 + count;
    }
    if ((item[i].value === 'Win 10 Home (add $25)') || (item[i].value === 'Windows 10 Home')) {
      ltW10H = ltW10H + count;
    }
    if ((item[i].value === 'Win 10 Pro (add $50)') || (item[i].value === 'Windows 10 Pro')){
      ltW10P = ltW10P + count;
    }
    if ((item[i].value === 'None') && (item[i].name === "Add An Optical Drive")) {
      ltDVDNone = ltDVDNone + count;
    }
    if (item[i].value === 'DVD-ROM') {
      ltDVD = ltDVD + count;
    }
    if (item[i].value === 'DVD/RW') {
      ltDVDRW = ltDVDRW + count;
    }
    if (item[i].value === 'Standard Battery') {
      ltBatt = ltBatt + count;
    }
    if (item[i].value === 'New Standard') {
      ltBattNew = ltBattNew + count;
    }
    if (item[i].value === 'New Extended') {
      ltBattExt = ltBattExt + count;
    }
    if (item[i].value === 'No Camera') {
      ltWebcamNone = ltWebcamNone + count;
    }
    if (item[i].value === 'Built-In Webcam') {
      ltWebcam = ltWebcam + count;
    }
    if ((item[i].value === 'None') && (item[i].name === "Add Bluetooth")) {
      ltBTNone = ltBTNone + count;
    }
    if (item[i].value === 'Bluetooth 4.0') {
      ltBT = ltBT + count;
    }
    if (item[i].value === 'Leave Me Unprotected') {
      ltAVNone = ltAVNone + count;
    }
    if (item[i].value === 'Vipre Antivirus 1PC / 1 Year ($19)') {
      ltVipre = ltVipre + count;
    }
    if (item[i].value === 'Malwarebytes for 1 PC Lifetime ($50)') {
      ltMWB = ltMWB + count;
    }
    if (item[i].value === 'No Dock') {
      ltDockNone = ltDockNone + count;
    }
    if (item[i].value === 'E-Port w/USB 3.0') {
      ltEPort = ltEPort + count;
    }
    if (item[i].value === 'E-Port Plus w/USB 3.0') {
      ltEPortPlus = ltEPortPlus + count;
    }
    if (item[i].value === 'Targus 3.0 Dock With Video') {
      ltTargus = ltTargus + count;
    }

    

    
   }
   //$('.results').append(`<p>DT HDD 160GB: ${dt160GB}`);
}

function addResults() {
  //$('.results').empty();
  $('.totalDT').append(`Total Desktop Sold: ${totalDT}`);
  $('.dtRAMResults').append(`<p>DT 4GB RAM: ${dt4GB}</p><p>DT 8GB RAM: ${dt8GB}</p><p>DT 16GB RAM: ${dt16GB}</p>`)
  $('.dtHDDResults').append(`<p>DT 160GB: ${dt160GB}</p><p>DT 320GB: ${dt320GB}</p><p>DT 500GB: ${dt500GB}</p><p>DT 1TB: ${dt1TB}</p><p>DT 128GB SSD: ${dt128GB}</p>
  <p>DT 240GB SSD: ${dt240GB}</p><p>DT 480GB SSD: ${dt480GB}</p>`);
  $('.dtDVD').append(`<p>DT DVD None: ${dtDVDNone}</p><p>DT DVD: ${dtDVD}</p><p>DT DVD/RW: ${dtDVDRW}</p>`);
  $('.dtLCD').append(`<p>DT LCD None: ${dtLCDNone}</p><p>DT 17" LCD: ${dtLCD17}</p><p>DT 20" LCD: ${dtLCD20}</p><p>DT 22" LCD: ${dtLCD22}</p>`);
  $('.dtOS').append(`<p>DT Win 7: ${dtW7}</p><p>DT Win 10 Home: ${dtW10H}</p><p>DT Win 10 Pro: ${dtW10P}</p>`);
  $('.dtKB').append(`<p>No KB: ${dtKBNone}</p><p>Refurb KB: ${dtKBRefurb}</p><p>New Dell KB: ${dtKBNew}</p><p>Wireless KB: ${dtKBWireless}</p>`);
  $('.dtWifi').append(`<p>No Wifi: ${dtWifiNone}</p><p>Wifi: ${dtWifi}</p><p>Bluetooth: ${dtBT}</p><p>Wifi + BT: ${dtWifiBT}</p>`);
  $('.dtAV').append(`<p>No AV: ${dtAVNone}</p><p>Vipre AV: ${dtVipre}</p><p>Malware: ${dtMWB}</p>`);


  $('.totalLT').append(`Total Laptop Sold: ${totalLT}`);
  $('.ltRAMResults').append(`<p>LT 4GB RAM: ${lt4GB}</p><p>LT 8GB RAM: ${lt8GB}</p><p>LT 16GB RAM: ${lt16GB}</p>`)
  $('.ltHDDResults').append(`<p>LT 160GB: ${lt160GB}</p><p>LT 320GB: ${lt320GB}</p><p>LT 500GB: ${lt500GB}</p><p>LT 1TB: ${lt1TB}</p><p>LT 128GB SSD: ${lt128GB}</p>
  <p>LT 240GB SSD: ${lt240GB}</p><p>LT 480GB SSD: ${lt480GB}</p>`);
  $('.ltOS').append(`<p>LT Win 7: ${ltW7}</p><p>LT Win 10 Home: ${ltW10H}</p><p>LT Win 10 Pro: ${ltW10P}</p>`);
  $('.ltBatt').append(`<p>Standard Battery: ${ltBatt}</p><p>New Battery: ${ltBattNew}</p><p>New Extended: ${ltBattExt}</p>`);
  $('.ltDVD').append(`<p>LT DVD None: ${ltDVDNone}</p><p>LT DVD: ${ltDVD}</p><p>LT DVD/RW: ${ltDVDRW}</p>`);
  $('.ltWebcam').append(`<p>LT Webcam None: ${ltWebcamNone}</p><p>LT Webcam: ${ltWebcam}</p>`);
  $('.ltBT').append(`<p>No Bluetooth: ${ltBTNone}</p><p>LT Bluetooth: ${ltBT}</p>`);
  $('.ltAV').append(`<p>No AV: ${ltAVNone}</p><p>Vipre AV: ${ltVipre}</p><p>Malware: ${ltMWB}</p>`);
  $('.ltDock').append(`<p>No Dock: ${ltDockNone}</p><p>E-Port: ${ltEPort}</p><p>E-Port Plus: ${ltEPortPlus}</p><p>Targus Dock: ${ltTargus}</p>`);


}

$(function() {
    test();
    //addResults();
})