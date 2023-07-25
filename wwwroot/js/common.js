var siteUrl = document.getElementById('siteUrl').value;
var siteUrlClear = document.getElementById('siteUrlClear').value;
var textOk = document.getElementById('textOk').value;
var bodySite = document.querySelector('#bodySite'); // bodySite

// ✅ CustomAlert  => Custom JS Alert
// https://stackoverflow.com/questions/68598678/javascript-html-custom-alert-box
function alert(title, content, image) {
    var alertContent = `
    <div id="dialogoverlay">
    </div>
    <div id="dialogbox" class="slit-in-vertical">
         <div>
              <div id="dialogboxhead">${title}
              </div>
              <div id="dialogboxbody">
                <div class="${image}"></div>
                    ${content}
              </div>
              <div id="dialogboxfoot">
                <button class="pure-material-button-contained active" onclick="modalOk()">
                    OK
                </button>
              </div>
         </div>
    </div>`;

    var dialogBox = document.createElement("div");
    dialogBox.innerHTML = alertContent;
    document.body.appendChild(dialogBox); // actually append it 
    modalOk = function () {
        dialogBox.remove();
    }

    let dialogoverlay = document.getElementById('dialogoverlay');
    let dialogbox = document.getElementById('dialogbox');
    let winH = window.innerHeight;
    dialogoverlay.style.height = winH + "px";
    dialogbox.style.top = "150px";
    dialogoverlay.style.display = "block";
    dialogbox.style.display = "block";
    document.getElementById('dialogboxhead').style.display = 'block';
}

// https://codepen.io/nishanc/pen/NWWPdZE
function CustomAlert() {
    this.alert = function (message, title) {
        document.body.innerHTML += `
            <div id="dialogoverlay">
            </div>
            <div id="dialogbox" class="slit-in-vertical">
                <div>
                    <div id="dialogboxhead"></div>
                    <div id="dialogboxbody"></div>
                    <div id="dialogboxfoot"></div>
                </div>
            </div>`;
        let dialogoverlay = document.getElementById('dialogoverlay');
        let dialogbox = document.getElementById('dialogbox');
        let winH = window.innerHeight;
        dialogoverlay.style.height = winH + "px";
        dialogbox.style.top = "150px";
        dialogoverlay.style.display = "block";
        dialogbox.style.display = "block";
        document.getElementById('dialogboxhead').style.display = 'block';
        if (typeof title === 'undefined')
            document.getElementById('dialogboxhead').style.display = 'none';
        else
            document.getElementById('dialogboxhead').innerHTML = '<i class="fa fa-exclamation-circle" aria-hidden="true"></i> ' + title;
        document.getElementById('dialogboxbody').innerHTML = message;
        document.getElementById('dialogboxfoot').innerHTML = '<button class="pure-material-button-contained active" onclick="customAlert.ok()">OK</button>';
    }
    this.ok = function () {
        document.getElementById('dialogbox').remove();
        document.getElementById('dialogoverlay').remove();
    }
}

let customAlert = new CustomAlert();
// ✅ CustomAlert  => Custom JS Alert


window.addEventListener("load", function () {
    if (window.location.href.indexOf("Log") > -1) {
        if (document.querySelector('#tableLogs') !== null)
            document.querySelector('#tableLogs').remove();
        LoadLog();
    }
    if (window.location.href.indexOf("Companies") > -1) {
        if (document.querySelector('#tableCompanies') !== null)
            document.querySelector('#tableCompanies').remove();
        LoadCompanies();
    }
});

// ✅ START Log =>  обработка данных Log
LoadLog = async function () {
    if (document.querySelector('#bodyTableLogs') !== null)
        document.querySelector('#bodyTableLogs').remove();

    bodySite.innerHTML += `
        <table class="table" id="tableLogs">
          <tbody id="bodyTableLogs">
            <tr>
                <th>N</th>
                <th>Сообщения</th>
                <th><div class="create-popup log" onclick="createPopupLog()"></div></th>
            </tr>
          </tbody>
        </table>`;

    var url = siteUrl + 'Root/GetLogs';
    let response = await fetch(url, {
        method: 'POST'
    });
    if (response.ok) {
        let logs = await response.json();
        var bodyTableLogs = document.querySelector('#bodyTableLogs');
        logs.forEach((element, index) => {
            bodyTableLogs.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td class="logMessage">${element.message}</td>
                <td>
                    <div class="edit-popup log" onclick="editPopupLog(this)" data-id="${element.id}"></div>
                    <div class="delete-popup log" onclick="deletePopupLog(this)" data-id="${element.id}"></div>
                </td>
            </tr>`;
        });
    } else
        console.log("Ошибка HTTP: " + response.status);
}
// Показ всплывающего окна при клике Создание Log
function createPopupLog() {
    bodySite.innerHTML += `
<div class="popup__bg" id="popupWindows">
    <div class="popup">
        <span class="close-popup" onclick="deletePopUp()"></span>
        <div>
          <label>
            <input type="text" id="logMessage">
            <div class="label__text">
                Сообщение
            </div>
          </label>
         </div>
         <div class="btnSave" onclick="saveLog()">сохранить</div>
    </div>
</div>  `;
    this.deletePopUp = function () {
        document.getElementById('popupWindows').remove();
    }

    this.saveLog = function () {
        let logmessage = document.getElementById('logMessage').value;
        if (logmessage.lenght < 3) {
            alert('Длинна Сообщения меньше 3 символов.', siteUrl);
            return false;
        }
        let formData = new FormData();
        formData.append('Message', logmessage);
        CreateLog(formData);
    }
}
CreateLog = async function (formData) {
    var url = siteUrl + 'Root/CreateLog';
    let response = await fetch(url, {
        method: 'POST',
        body: formData
    });
    if (response.ok) {
        let result = await response.text();
        if (result == textOk) {
            document.getElementById('popupWindows').remove();
            LoadLog();
        }
        else
            customAlert.alert('Указаны не все данные.', siteUrl);
    } else
        console.log("Ошибка HTTP: " + response.status);
}

// Показ всплывающего окна при клике Редактирование Log
function editPopupLog(event) {
    const el = event;
    let id = el.getAttribute('data-id');
    bodySite.innerHTML += `
<div class="popup__bg" id="popupWindows">
    <div class="popup">
        <span class="close-popup" onclick="deletePopUp()"></span>
        <div>
          <label>
            <input type="text" id="logMessage">
            <div class="label__text">
                Сообщение
            </div>
          </label>
         </div>
         <div class="btnSave" onclick="editLog()">редактировать</div>
    </div>
</div>  `;

    let tr = el.closest('tr');
    let logMessage = tr.querySelector('.logMessage');
    let logMessageIinput = document.getElementById('logMessage');
    logMessageIinput.value = logMessage.innerHTML;
    this.deletePopUp = function () {
        document.getElementById('popupWindows').remove();
    }

    this.editLog = function () {
        if (logMessageIinput.value === null || logMessageIinput.value == "") {
            alert(siteUrl, 'Вы не указали Сообщение.', 'no');
            return false;
        }
        else if (logMessageIinput.value.lenght < 3) {
            alert(siteUrl, 'Длинна Сообщения меньше 3 символов.', 'no');
            return false;
        }
        else {
            let formData = new FormData();
            formData.append('id', id);
            formData.append('message', logMessageIinput.value);
            EditLog(formData);
        }
    }
}
EditLog = async function (formData) {
    var url = siteUrl + 'Root/EditLog';
    let response = await fetch(url, {
        method: 'POST',
        body: formData
    });
    if (response.ok) {
        let result = await response.text();
        if (result == textOk)
            LoadLog();
        else
            customAlert.alert('Данные указаны не полностью.', siteUrl);
    }
    else
        console.log("Ошибка HTTP: " + response.status);
    document.getElementById('popupWindows').remove();
}

// Показ всплывающего окна при клике Удалении Log
function deletePopupLog(event) {
    const el = event;
    let id = el.getAttribute('data-id');
    bodySite.innerHTML += `
<div class="popup__bg" id="popupWindows">
    <div class="popup">
        <span class="close-popup" onclick="deletePopUp()"></span>
        <div>
          <label>
             <input type="text" id="logMessage">
            <div class="label__text">
                Сообщение
            </div>
          </label>
         </div>
         <div class="btnSave" onclick="deleteLog()">удалить</div>
    </div>
</div>  `;

    let tr = el.closest('tr');
    let logMessage = tr.querySelector('.logMessage');
    let logMessageIinput = document.getElementById('logMessage');
    logMessageIinput.value = logMessage.innerHTML;
    // заблокировать input
    logMessageIinput.setAttribute('disabled', 'disabled');
    this.deletePopUp = function () {
        document.getElementById('popupWindows').remove();
    }

    this.deleteLog = function () {
        let formData = new FormData();
        formData.append('id', id);
        DeleteLog(formData);
    }
}
DeleteLog = async function (formData) {
    var url = siteUrl + 'Root/DeleteLog';
    let response = await fetch(url, {
        method: 'POST',
        body: formData
    });
    if (response.ok) {
        let result = await response.text();
        if (result == textOk) {
            document.getElementById('popupWindows').remove();
            LoadLog();
        }
        else
            customAlert.alert('Указаны не все данные.', siteUrl);
    } else
        console.log("Ошибка HTTP: " + response.status);
}
/* END Log обработка данных Log ✅ */


// ✅ START Company =>  обработка данных Company
LoadCompanies = async function () {
    if (document.querySelector('.container-grid') !== null)
        document.querySelector('.container-grid').remove();
    if (document.querySelector('.div-company-details') !== null)
        document.querySelector('.div-company-details').remove();

    var url = siteUrl + 'Root/GetCompanies';
    let response = await fetch(url, {
        method: 'POST'
    });
    // если запрос прошел нормально
    if (response.ok === true) {
        let companies = await response.json();
        if (document.querySelector('.title-companies') === null)
            bodySite.innerHTML += `<h4 class="title-companies">Companies</h4>`;
        //var companiesAll = companies.map(company => Object.values(company));
        //console.log(companiesAll);

        var result = [];
        for (var i in companies)
            result.push([i, companies[i]]);
        if (result.length == 0)
            bodySite.innerHTML += `<div class="create-popup-div" onclick="createPopupCompany()"></div>`;
        else {
            if (document.querySelector('.create-popup-div') !== null)
                document.querySelector('.create-popup-div').remove();
            bodySite.innerHTML += `
        <div class="container-grid">
                <div class="item">Company Name</div>
                <div class="item">City</div>
                <div class="item">State</div>
                <div class="item">Phone</div>
                <div class="item"><div class="create-popup" onclick="createPopupCompany()"></div></div>`;
            let gridContainerCompanies = document.querySelector('.container-grid');
            try {
                for (var j in companies) {
                    gridContainerCompanies.innerHTML += `
                    <div class="item companyName" data-adreess="${companies[j].address}" onclick="getCompanyDetails(${companies[j].id})" title="details data Company">${companies[j].companyName}</div>
                    <div class="item companyCity">${companies[j].city}</div>
                    <div class="item companyState">${companies[j].state}</div>
                    <div class="item companyPhone">${companies[j].phone}</div>
                    <div class="item">
                        <div class="edit-popup company" onclick="editPopupCompany(this)" data-id="${companies[j].id}"></div>
                        <div class="delete-popup company" onclick="deletePopupCompany(this)" data-id="${companies[j].id}"></div>
                    </div>`;
                }
            }
            catch (err) {
                console.log('Ошибка ' + e.name + ":" + e.message + "\n" + e.stack);
            }           
            bodySite.innerHTML += `</div>`;
        }
    }
    else
        console.log("Ошибка HTTP: " + response.status);
}
// Показ всплывающего окна при клике Создание Company
function createPopupCompany() {
    bodySite.innerHTML += `
<div class="popup__bg" id="popupWindows">
    <div class="popup">
        <span class="close-popup" onclick="deletePopUp()"></span>
        <div>
          <label>
            <input type="text" id="companyName" placeholder="Company Name">
          </label>
          <label>
            <input type="text" id="companyCity" placeholder="City">
          </label>
          <label>
            <input type="text" id="companyAddress" placeholder="Address">
          </label>
          <label>
            <input type="text" id="companyState" placeholder="State">
          </label>
          <label>
            <input type="text" id="companyPhone" placeholder="Phone">
          </label>
       </div>
       <div class="btnSave" onclick="saveCompany()">сохранить</div>
    </div>
</div>  `;
    this.deletePopUp = function () {
        document.getElementById('popupWindows').remove();
    }

    this.saveCompany = function () {
        let companyName = document.getElementById('companyName').value;
        let companyCity = document.getElementById('companyCity').value;
        let companyAddress = document.getElementById('companyAddress').value;
        let companyState = document.getElementById('companyState').value;
        let companyPhone = document.getElementById('companyPhone').value;
        let formData = new FormData();
        formData.append('CompanyName', companyName);
        formData.append('City', companyCity);
        formData.append('Address', companyAddress);
        formData.append('State', companyState);
        formData.append('Phone', companyPhone);
        CreateCompany(formData);
    }
}
CreateCompany = async function (formData) {
    var url = siteUrl + 'Root/CreateCompany';
    let response = await fetch(url, {
        method: 'POST',
        body: formData
    });
    if (response.ok) {
        let result = await response.text();
        if (result == textOk) {
            document.getElementById('popupWindows').remove();
            LoadCompanies();
        }
        else
            customAlert.alert('Указаны не все данные.', siteUrl);
    } else
        console.log("Ошибка HTTP: " + response.status);
}

// Показ всплывающего окна при клике Редактирование Company
function editPopupCompany(event) {
    const el = event;
    let id = el.getAttribute('data-id');
    bodySite.innerHTML += `
<div class="popup__bg" id="popupWindows">
    <div class="popup">
        <span class="close-popup" onclick="deletePopUp()"></span>
         <div>
          <label>
            <input type="text" id="companyName" placeholder="Company Name">
          </label>
          <label>
            <input type="text" id="companyCity" placeholder="City">
          </label>
          <label>
            <input type="text" id="companyAddress" placeholder="Address">
          </label>
          <label>
            <input type="text" id="companyState" placeholder="State">
          </label>
          <label>
            <input type="text" id="companyPhone" placeholder="Phone">
          </label>
         </div>
        <div class="btnSave" onclick="editCompany()">редактировать</div>
    </div>
</div>  `;

    let closestDivItem = el.closest('.item');
    let itemPhone = closestDivItem.previousElementSibling;
    let itemState = itemPhone.previousElementSibling;
    let itemCity = itemState.previousElementSibling;
    let itemCompanyName = itemCity.previousElementSibling;
  
    let companyNameInput = document.getElementById('companyName');
    let companyCityInput = document.getElementById('companyCity');
    let companyAddressInput = document.getElementById('companyAddress');
    let companyStateInput = document.getElementById('companyState');
    let companyPhoneInput = document.getElementById('companyPhone');
    companyNameInput.value = itemCompanyName.innerHTML;
    companyCityInput.value = itemCity.innerHTML;
    companyAddressInput.value = itemCompanyName.getAttribute('data-adreess');
    companyStateInput.value = itemState.innerHTML;
    companyPhoneInput.value = itemPhone.innerHTML;
    this.deletePopUp = function () {
        document.getElementById('popupWindows').remove();
    }

    this.editCompany = function () {
        let formData = new FormData();
        formData.append('id', id);
        formData.append('CompanyName', companyNameInput.value);
        formData.append('City', companyCityInput.value);
        formData.append('Address', companyAddressInput.value);
        formData.append('State', companyStateInput.value);
        formData.append('Phone', companyPhoneInput.value);
        EditCompany(formData);
    }
}
EditCompany = async function (formData) {
    var url = siteUrl + 'Root/EditCompany';
    let response = await fetch(url, {
        method: 'POST',
        body: formData
    });
    if (response.ok) {
        let result = await response.text();
        if (result == textOk)
            LoadCompanies();
        else
            customAlert.alert('Данные указаны не полностью.', siteUrl);
    }
    else
        console.log("Ошибка HTTP: " + response.status);
    document.getElementById('popupWindows').remove();
}

// Показ всплывающего окна при клике Удалении Company
function deletePopupCompany(event) {
    const el = event;
    let id = el.getAttribute('data-id');
    bodySite.innerHTML += `
<div class="popup__bg" id="popupWindows">
    <div class="popup">
        <span class="close-popup" onclick="deletePopUp()"></span>
        <div>
          <label>
             <input type="text" id="companyName">
            <div class="label__text">
                Company Name
            </div>
          </label>
         </div>
         <div class="btnSave" onclick="deleteCompany()">удалить</div>
    </div>
</div>  `;;
    let closestDivItem = el.closest('.item');
    let itemPhone = closestDivItem.previousElementSibling;
    let itemState = itemPhone.previousElementSibling;
    let itemCity = itemState.previousElementSibling;
    let itemCompanyName = itemCity.previousElementSibling;

    let companyNameIinput = document.getElementById('companyName');
    companyNameIinput.value = itemCompanyName.innerHTML;
    // заблокировать input
    companyNameIinput.setAttribute('disabled', 'disabled');
    this.deletePopUp = function () {
        document.getElementById('popupWindows').remove();
    }

    this.deleteCompany = function () {
        let formData = new FormData();
        formData.append('id', id);
        DeleteCompany(formData);
    }
}
DeleteCompany = async function (formData) {
    var url = siteUrl + 'Root/DeleteCompany';
    let response = await fetch(url, {
        method: 'POST',
        body: formData
    });
    if (response.ok) {
        let result = await response.text();
        if (result == textOk) {
            document.getElementById('popupWindows').remove();
            LoadCompanies();
        }
        else
            customAlert.alert('Указаны не все данные.', siteUrl);
    } else
        console.log("Ошибка HTTP: " + response.status);
}
/* END Company =>  обработка данных Company ✅ */

// ✅ START CompanyDetails =>  обработка данных CompanyDetails
//getCompanyDetails = async function (id) {
//    let formData = new FormData();
//    formData.append('id', id);
//    var url = siteUrl + 'Root/GetCompanyDetails';
//    let response = await fetch(url, {
//        method: 'POST',
//        body: formData
//    });
//    if (response.ok) {
//        let result = await response.json();
//        if (document.querySelector('.container') !== null)
//            document.querySelector('.container').remove();
//        if (document.querySelector('.div-company-details') !== null)
//            document.querySelector('.div-company-details').remove();
//        var company = result.company;
//        bodySite.innerHTML += `
//        <div class="div-company-details"><span class="title-companies-details">Companies details</span> ${company.companyName}</div>
//        <div class="container">
//            <div class="container-grid-details">
//                <div class="item">Info</div>
//                <div class="item info"></div>
//                <div class="item">ID:</div>
//                <div class="item">${company.id}</div>
//                <div class="item">Name:</div>
//                <div class="item">${company.companyName}</div>
//                <div class="item">Address:</div>
//                <div class="item">${company.address}</div>
//                <div class="item">City:</div>
//                <div class="item">${company.city}</div>
//                <div class="item">State:</div>
//                <div class="item">${company.state}</div>
//           </div>
//            <div class="container-grid-details">
//                <div class="item">Hisrory</div>
//                <div class="item refresh"></div>
//                <div class="item">ID:</div>
//                <div class="item">${company.id}</div>
//                <div class="item">Name:</div>
//                <div class="item">${company.companyName}</div>
//                <div class="item">Address:</div>
//                <div class="item">${company.address}</div>
//                <div class="item">City:</div>
//                <div class="item">${company.city}</div>
//                <div class="item">State:</div>
//                <div class="item">${company.state}</div>
//           </div>
//            <div class="container-grid-details">
//                <div class="item">Notes</div>
//                <div class="item notes"></div>
//                <div class="item">ID:</div>
//                <div class="item">${company.id}</div>
//                <div class="item">Name:</div>
//                <div class="item">${company.companyName}</div>
//                <div class="item">Address:</div>
//                <div class="item">${company.address}</div>
//                <div class="item">City:</div>
//                <div class="item">${company.city}</div>
//                <div class="item">State:</div>
//                <div class="item">${company.state}</div>
//           </div>
//        </div> `;
//        let containerDetails = document.querySelector('.container');
//        containerDetails.innerHTML += `
//            <div class="container-grid-details employees">
//                <div class="item">Employees</div>
//                <div class="item employees-ico"></div>
//                <div class="item">FirstName</div>
//                <div class="item">LastName</div>`;
//        try {
//            var employees = company.employees;
//            let containerGridDetailsEmployees = document.querySelector('.container-grid-details.employees');
//            for (var j in employees) {
//                let lasrFirstName =  employees[j].lastName + " " + employees[j].firstName;
//                containerGridDetailsEmployees.innerHTML += `
//                    <div class="item" onclick="getEmployee(${employees[j].id})" title="details data ${lasrFirstName}">${employees[j].firstName}</div>
//                    <div class="item" onclick="getEmployee(${employees[j].id})" title="details data ${lasrFirstName}">${employees[j].lastName}</div>`;
//            }
//        }
//        catch (err) {
//            console.log('Ошибка ' + e.name + ":" + e.message + "\n" + e.stack);
//        }
//        containerDetails.innerHTML += `</div>`;
//    } else
//        console.log("Ошибка HTTP: " + response.status);
//}
//getEmployee = async function (id) {
//    if (document.querySelector('.container') !== null) {
//        let formData = new FormData();
//        formData.append('id', id);
//        var url = siteUrl + 'Root/GetEmployee';
//        let response = await fetch(url, {
//            method: 'POST',
//            body: formData
//        });
//        if (response.ok) {
//            let result = await response.json();
//            if (document.querySelector('.container-grid-details.employee') !== null)
//                document.querySelector('.container-grid-details.employee').remove();

//            let containerDetails = document.querySelector('.container');
//            containerDetails.innerHTML += `
//            <div class="container-grid-details employee">
//                <div class="item"> </div>
//                <div class="item employee-ico"></div>
//                <div class="item">First Name</div>
//                <div class="item">${result.firstName}</div>
//                <div class="item">Last Name</div>
//                <div class="item">${result.lastName}</div>
//                <div class="item">Title</div>
//                <div class="item">${result.titleEmployeeString}.</div>
//                <div class="item">Birth Date</div>
//                <div class="item">${result.birthDateString}</div>
//                <div class="item">Position</div>
//                <div class="item">${result.positionEmployeeString}</div>
//            </div>`;
//        }
//    }
//}

/* END CompanyDetails =>  обработка данных CompanyDetails ✅ */



// ✅ START CompanyDetails =>  обработка данных CompanyDetails
getCompanyDetails = async function (id) {
    let formData = new FormData();
    formData.append('id', id);
    var url = siteUrl + 'Root/GetCompanyDetails';
    let response = await fetch(url, {
        method: 'POST',
        body: formData
    });
    if (response.ok) {
        let result = await response.json();
        if (document.querySelector('.container') !== null)
            document.querySelector('.container').remove();
        if (document.querySelector('.div-company-details') !== null)
            document.querySelector('.div-company-details').remove();
        var company = result.company;
        bodySite.innerHTML += `
        <div class="div-company-details"><span class="title-companies-details">Companies details</span> ${company.companyName}</div>
        <div class="container">
            <div class="container-grid-details">
                <div class="title-parent">Info</div>
                <div class="ico3 galka"></div>
                <div class="item-left info">ID:</div>
                <div class="item-right info">${company.id}</div>
                <div class="item-left info">Name:</div>
                <div class="item-right info">${company.companyName}</div>
                <div class="item-left info">Address:</div>
                <div class="item-right info">${company.address}</div>
                <div class="item-left info">City:</div>
                <div class="item-right info">${company.city}</div>
                <div class="item-left info">State:</div>
                <div class="item-right info">${company.state}</div>
                <div class="hr-end"></div>
           </div>
           <div class="container-grid-details">
                <div class="title-parent">Hisrory</div>
                <div class="ico3 refresh"></div>
                <div class="title-left">Order Date</div>
                <div class="title-right">Store City</div>
                <div class="item-left hisrory">11/22/2056</div>
                <div class="item-right hisrory">MSK</div>
                <div class="item-left hisrory">11/22/2056</div>
                <div class="item-right hisrory">MSK</div>
                <div class="item-left hisrory">11/22/2056</div>
                <div class="item-right hisrory">MSK</div>
                <div class="item-left hisrory">11/22/2056</div>
                <div class="item-right hisrory">MSK</div>
                <div class="item-left hisrory">11/22/2056</div>
                <div class="item-right hisrory">MSK</div>
                <div class="item-left hisrory">11/22/2056</div>
                <div class="item-right hisrory">MSK</div>           
                <div class="hr-end"></div>
           </div> 
           <div class="container-grid-details">
                <div class="title-parent">Notes</div>
                <div class="ico1 add"></div>
                <div class="ico2 delete"></div>
                <div class="ico3 refresh"></div>
                <div class="title-left notes">Invoice Number</div>
                <div class="title-right notes">Employee</div>
                <div class="item-left notes">35703</div>
                <div class="item-right notes">Макар Макаров</div>
                <div class="item-left notes">35703</div>
                <div class="item-right notes">Макар Макаров</div>
                <div class="item-left notes">35703</div>
                <div class="item-right notes">Макар Макаров</div>
                <div class="item-left notes">35703</div>
                <div class="item-right notes">Макар Макаров</div>
                <div class="item-left notes">35703</div>
                <div class="item-right notes">Макар Макаров</div>
                <div class="hr-end"></div>
           </div>
        </div> `;
        let containerDetails = document.querySelector('.container');
        containerDetails.innerHTML += `
            <div class="container-grid-details employees">
                <div class="title-parent">Employees</div>
                <div class="ico1 add"></div>
                <div class="ico2 delete"></div>
                <div class="ico3 refresh"></div>
                <div class="title-left-employees">First Name</div>
                <div class="title-right-employees">Last Name</div>`;
        try {
            var employees = company.employees;
            let containerGridDetailsEmployees = document.querySelector('.container-grid-details.employees');
            for (var j in employees) {
                let lasrFirstName = employees[j].lastName + " " + employees[j].firstName;
                containerGridDetailsEmployees.innerHTML += `
                    <div class="item-left-employees" onclick="getEmployee(${employees[j].id})" title="details data ${lasrFirstName}">${employees[j].firstName}</div>
                    <div class="item-right-employees" onclick="getEmployee(${employees[j].id})" title="details data ${lasrFirstName}">${employees[j].lastName}</div>`;
            }
        }
        catch (err) {
            console.log('Ошибка ' + e.name + ":" + e.message + "\n" + e.stack);
        }
        containerDetails.innerHTML += `</div>`;
    } else
        console.log("Ошибка HTTP: " + response.status);
}
getEmployee = async function (id) {
    if (document.querySelector('.container') !== null) {
        let formData = new FormData();
        formData.append('id', id);
        var url = siteUrl + 'Root/GetEmployee';
        let response = await fetch(url, {
            method: 'POST',
            body: formData
        });
        if (response.ok) {
            let result = await response.json();
            if (document.querySelector('.container-grid-details.employee') !== null)
                document.querySelector('.container-grid-details.employee').remove();

            let containerDetails = document.querySelector('.container');
            containerDetails.innerHTML += `
            <div class="container-grid-details employee">            
                <div class="title-parent">Employee</div>
                <div class="ico2 edit"></div>
                <div class="ico3 delete"></div>
                <div class="item-left-employee">First Name</div>
                <div class="item-right-employee">${result.firstName}</div>
                <div class="item-left-employee">Last Name</div>
                <div class="item-right-employee">${result.lastName}</div>
                <div class="item-left-employee">Title</div>
                <div class="item-right-employee">${result.titleEmployeeString}.</div>
                <div class="item-left-employee">Birth Date</div>
                <div class="item-right-employee">${result.birthDateString}</div>
                <div class="item-left-employee">Position</div>
                <div class="item-right-employee">${result.positionEmployeeString}</div>                
                <div class="hr-end"></div>
            </div>`;
        }
    }
}

/* END CompanyDetails =>  обработка данных CompanyDetails ✅ */

