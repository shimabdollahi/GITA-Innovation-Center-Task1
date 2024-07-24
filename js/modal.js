// Get the modals
var deleteRecModal=document.getElementById("deleteRecordModal");
var addRecModal=document.getElementById("addRecordModal");
var showRecModal=document.getElementById("showRecordModal");
var editRecModal=document.getElementById("editRecordModal");
var chartRecModal=document.getElementById("chartRecordModal");
var mapRecModal=document.getElementById("mapRecordModal");
//____________________________________________________________
var addRecordBtn=document.getElementById("add-record");
//______________________________DISPLAY MODALS_______________________________
// When the user clicks the button, open the modal 
addRecordBtn.onclick=function(){
  addRecModal.style.display="block";
} 

function displayDelModal(record){
  SELECTED_RECORD=record;
  deleteRecModal.style.display = "block";
}
function displayChartModal(record){
  let xValues;
  let yValues1;
  let yValues2;
  let yValues3;
  if(record.chart!=null){
    xValues=record.chart[0];
    yValues1=record.chart[1];
    yValues2=record.chart[2];
    yValues3=record.chart[3];
  }else{
    xValues=[];
    yValues1=[];
    yValues2=[];
    yValues3=[];
  }
  new Chart(canvasID, {
    type: "line",
    data: {
      labels: xValues,
      datasets: [{ 
        data: yValues1,
        borderColor: chartColor1,
        fill: false
      }, { 
        data:yValues2 ,
        borderColor: chartColor2,
        fill: false
      }, { 
        data:yValues3 ,
        borderColor: chartColor3,
        fill: false
      }]
    },
    options: {
      legend: {display: false}
    }
  });
  SELECTED_RECORD=record;
  chartRecModal.style.display = "block";
}
function displayMapModal(record){
  SELECTED_RECORD=record;
  recordMap();
  mapRecModal.style.display = "block";
}
function displayEditModal(record){
  SELECTED_RECORD=record;
  document.getElementById("first_name_edit_input").value=SELECTED_RECORD.first_name;
  document.getElementById("last_name_edit_input").value=SELECTED_RECORD.last_name;
  document.getElementById("national_id_edit_input").value=SELECTED_RECORD.national_id;
  
  editRecModal.style.display = "block";
}
function displayShowModal(record){
  SELECTED_RECORD=record;
  displayRec();
  showRecModal.style.display = "block";
}
//__________________________________CLOSE MODAL________________________________
// close the modal
function closeRecModal(modalId){
  document.getElementById(modalId).style.display = "none";
  SELECTED_RECORD=null;
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == deleteRecModal) {
    deleteRecModal.style.display = "none";
    SELECTED_RECORD=null;
    return;
  }
  if (event.target == addRecModal) {
    addRecModal.style.display = "none";
    return;
  }
  if (event.target == showRecModal) {
    showRecModal.style.display = "none";
    SELECTED_RECORD=null;
    return;
  }
  if (event.target == editRecModal) {
    editRecModal.style.display = "none";
    SELECTED_RECORD=null;
    return;
  }
  if (event.target == mapRecModal) {
    mapRecModal.style.display = "none";
    SELECTED_RECORD=null;
    return;
  }
  if (event.target == chartRecModal) {
    chartRecModal.style.display = "none";
    SELECTED_RECORD=null;
    return;
  }
}
//_______________________________________________________________________
function getElementValue(id){
  return (document.getElementById(id)).value;
}