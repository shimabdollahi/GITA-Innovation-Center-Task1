function toggleSearchRecordsAccordion(accordionBodyId) {
    let x = document.getElementById(accordionBodyId);
    if(!(x.classList.toggle('visible'))){ //if is visible,make it invisible
        x.classList.remove('visible');
        show_records(ALL_RECORDS);
    }
  }