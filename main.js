const selectOptions = document.querySelector('#service-select');

const displayServiceTitle = document.querySelector('.serviceTtile');
const theadTitles = document.querySelector(".theadTitle");
const displayPart = document.querySelector('.part');
const displayPrice = document.querySelector('.price');


selectOptions.addEventListener("change", selectFromDropDown);
let finalRes = [];

function selectFromDropDown(){
  //  **** Clearing  all rows before adding new rows
  document.querySelectorAll(".test1").forEach(test => test.innerHTML = "");

  // Selected Value
  let dropDownVal = selectOptions.value;
  
  // Fetching value from JSON
  const a = fetch('./service.json')
                    .then(res => res.json())
                    .then(data => data.services)
                    .then(result => result.filter(data1 => data1.name === dropDownVal))

  // Feeding fetch result to array and clering out old value                             
  const pickSelectedServices = a.then(pickService => {
      
        if(finalRes.length > 0){
            finalRes.length = 0;
            finalRes.push(pickService);   
        } else {
          finalRes.push(pickService);  
        }
       return finalRes;

    })
   
    const printServices = pickSelectedServices.then(printService => {
  
       Object.entries(printService[0][0]).forEach((entry) => {
       
        // **** Skiping first value from foreach and building <TH> dynamically (Name property) 
           if(entry[0] === "name"){
              // *** To clear Heading DIV  ***
            document.querySelector(".theadTitle").innerHTML = "";
              //  
             const g = document.createElement('th');
      
             const h = entry[1];
             const i = document.createTextNode(h);
             theadTitles.appendChild(g);
             g.appendChild(i);
             return;
           }
     
       
         const serviceCols = document.querySelector(".serviceCol");
        
        // **** 1.  CREATING <TR> TAG AND MULTIPLE <TD> TAGS
          for(let i = 0; i < entry.length; i++) {
            
            var e = document.createElement('tr');
              

        //**** I know I need to build 2 colums that is why j lenght is 2 
            for(let j = 0; j < 2; j++){
          
              var d = document.createElement('td');

              var f = document.createTextNode(entry[j]); 
              d.appendChild(f);
              
              e.appendChild(d); 
            }
          }
        // **** ROW Gets Added to "serviceCol" DOM *****
        serviceCols.appendChild(e).classList.add("test1"); 
       });
    })    
}



