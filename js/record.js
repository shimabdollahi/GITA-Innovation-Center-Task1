var ALL_RECORDS;
var SELECTED_RECORD;
// localStorage.clear();

window.onload=function(){
    load_records();
    show_records(ALL_RECORDS);
   // initCharts();
}
// ______________________________STRUCTURE____________________________________
class Record{
    constructor(first_name, last_name, national_id, chart=null, location=null){
        this.first_name=first_name;
        this.last_name=last_name;
        this.national_id=national_id;
        //the chart property is a list of lists of integers.
        // first list of list is for xValues and other lists are for yValues.
        this.chart=chart; 
        this.location=location;
    }
}  
// _________________________________LOAD______________________________________
//initialize records array (loading records from storage)
function load_records(){
    if(localStorage.records){
        ALL_RECORDS=JSON.parse(localStorage.getItem("records"));        
    }else{
        //there is no record!
        updateLocalStorage("records",[]);
    }
    SELECTED_RECORD=null;
    return;
}


function show_record(record,i){
    const recTableBody=document.getElementById("records-table-body");
    const tableRow=document.createElement("tr");
    const rowData=[String(i),record.first_name,record.last_name,record.national_id];

    rowData.forEach(data => {
        let td=document.createElement("td");
        td.appendChild(document.createTextNode(data));
        tableRow.appendChild(td);
    });
    tableRow.appendChild(createIconsTd(record));
    recTableBody.appendChild(tableRow);
}
function show_records(records){ //"records-table-body"
    const recTableBody=document.getElementById("records-table-body");
    recTableBody.innerHTML="";
    let i=1;
    records.forEach(record => {
        show_record(record,i);
        i++;
    });
    return;
}
function createIconsTd(record){
    let td=document.createElement("td");

    let eyeI=document.createElement("i");
    eyeI.className="fa-regular fa-eye";
    eyeI.addEventListener("click", function(){ displayShowModal(record);});
    td.appendChild(eyeI);

    let penI=document.createElement("i");
    penI.className="fa-regular fa-pen-to-square";
    penI.addEventListener("click", function(){ displayEditModal(record);});
    td.appendChild(penI);

    let mapI=document.createElement("i");
    mapI.className="fa-solid fa-map-location-dot";
    mapI.addEventListener("click", function(){ displayMapModal(record);});
    td.appendChild(mapI);

    let chartI=document.createElement("i");
    chartI.className="fa-solid fa-chart-line";
    chartI.addEventListener("click", function(){ displayChartModal(record); });
    td.appendChild(chartI);

    let trashI=document.createElement("i");
    trashI.className="fa-solid fa-trash-can";
    trashI.addEventListener("click", function(){ displayDelModal(record); });
    td.appendChild(trashI);

    return td;
}

// __________________________________ADD______________________________________
//add new record:
function addRecConfirm(){
    let firstName=(document.getElementById("first_name_input")).value;
    let lastName=(document.getElementById("last_name_input")).value;
    let NationalID=(document.getElementById("national_id_input")).value;
    //national id shoud check to be 10 digits and unique
    let record= new Record(firstName,lastName,NationalID);

    save_record(record);
    show_records(ALL_RECORDS);
    closeRecModal("addRecordModal");
    return;
}
// __________________________________SAVE_____________________________________
function updateLocalStorage(key,updatedData){
    localStorage.setItem(key, JSON.stringify(updatedData));
}
//save a new record:
function save_record(record){
    ALL_RECORDS.push(record);
    ALL_RECORDS=insert_sort(ALL_RECORDS);
    updateLocalStorage("records",ALL_RECORDS);
    return;
}
function insert_sort(arr){
    //insert last item in a pre sorted array *******************************************
    return arr;
}
// __________________________________DELETE___________________________________
//delete a record:
function delRecConfirm(){
    delete_record(SELECTED_RECORD);
    closeRecModal("deleteRecordModal");
    show_records(ALL_RECORDS);
}
function delete_record(record){
    let i=0;
    ALL_RECORDS.forEach(rec => {
        if(rec.national_id == record.national_id){
            ALL_RECORDS.splice(i,1); ///delete record at index i, from ALL_RECORDS 
            return;
        }
        i++;
    });
    updateLocalStorage("records",ALL_RECORDS);
}
//___________________________________SEARCH___________________________________

function filter_records(firstName="",lastName="",nationalId=""){
    let result=[];
    if(nationalId != ""){
        result= ALL_RECORDS.filter(rec => {
            return (rec.national_id == nationalId) ;
        });
        return result;
    }
    else{
        if(lastName != ""){
            if(firstName != ""){ //search by first name and last name
                result= ALL_RECORDS.filter(rec => {
                    return (rec.first_name == firstName && rec.last_name == lastName) ;
                });
                return result;
            }
            else{//search by last name
                result= ALL_RECORDS.filter(rec => {
                    return  rec.last_name == lastName ;
                });
                return result;
            }
        }
        else{
            if(firstName != ""){//search by first name
                result= ALL_RECORDS.filter(rec => {
                    return rec.first_name == firstName ;
                });
                return result;
            }
            else{ 
                return ALL_RECORDS;
            }
        }
    }

}
function submitSearchRec(){
    let firstName=getElementValue("first-name-search");
    let lastName=getElementValue("last-name-search");
    let nationalID=getElementValue("national-id-search");
    let result=filter_records(firstName,lastName,nationalID);
    show_records(result);
} //national id shoud check to be 10 digits and unique
//____________________________________EDIT____________________________________
function editRecConfirm(){
    let fName=getElementValue("first_name_edit_input");
    let lName=getElementValue("last_name_edit_input");
    let natioID=getElementValue("national_id_edit_input");
    // let record= new Record(firstName,lastName,NationalID);
    if(fName == SELECTED_RECORD.first_name && lName==SELECTED_RECORD.last_name && natioID==SELECTED_RECORD.national_id){
        //nothing has changed!
        return;
    }
    else{
        let updatedRecord=new Record(fName,lName,natioID, SELECTED_RECORD.chart , SELECTED_RECORD.location);
        replace_record(updatedRecord);
    }
}
function replace_record(newRecord){
        delete_record(SELECTED_RECORD);
        save_record(newRecord);
        show_records(ALL_RECORDS);
        SELECTED_RECORD=null;
}
//____________________________________SHOW____________________________________
function displayRec(){
    let nameSpan=document.getElementById("display-name-span");
    let familySpan=document.getElementById("display-family-span");
    let naIdSpan=document.getElementById("display-national-id-span");
    // let nameSpan=document.getElementById("display-address-span");
    // let nameSpan=document.getElementById("display-last-login-span");
    nameSpan.innerText= SELECTED_RECORD.first_name;
    familySpan.innerText= SELECTED_RECORD.last_name;
    naIdSpan.innerText= SELECTED_RECORD.national_id;
}
//__________________________SET SOME FAKE CHART DATAS_________________________
// function initCharts(){
//     (ALL_RECORDS[3]).chart=[
//       [100,200,300,400,500,600,700,800,900,1000],
//       [500,600,700,900,1100,1300,1330,2210,7830,2478],
//       [1600,1700,1700,1900,2000,2700,4000,5000,6000,7000],
//       [300,700,2000,5000,6000,4000,2000,1000,200,100]
//   ];
//     ALL_RECORDS[4].chart=[
//     [100,200,300,400,500,600,700,800,900,1000],
//     [200,1140,1060,1060,717,1110,1330,2210,830,2478],
//     [900,1700,1700,1000,2000,2700,4000,5000,6000,7000],
//     [300,700,2000,5000,600,4000,2000,1000,2000,1300]
//   ];
//   ALL_RECORDS[5].chart=[
//     [100,200,300,400,500,600,700,800,900,1000],
//     [200,1140,1600,1060,717,1100,1330,2200,830,2480],
//     [1000,1700,700,1000,2000,700,4000,500,6000,700],
//     [300,700,200,500,600,400,200,100,200,1300]
//   ];
//   updateLocalStorage("records",ALL_RECORDS);
//   }