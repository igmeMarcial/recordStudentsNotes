

const w = window;
const d = document;

let date= new Date();
const monthD = ["January","February","March","April","May","June","July","August","September","October","November","December"];
let [month, day, year]   = [date.getMonth(), date.getDate(), date.getFullYear()];
let[hour, minutes, seconds] = [date.getHours(), date.getMinutes(), date.getSeconds()];
let dateToday = `${monthD[month]} ${day} ${year} a las ${hour}:${minutes}`


const formStudent = d.getElementById("formStudent");
const listNot = d.getElementById("notList");
const rowListContainer = d.getElementById("rowListContainer");
const templateList = d.getElementById("templateListStudents").content;
const tableStudents = d.getElementById("tableStudents");
const informationAll = d.getElementById("informationAll");

let studentsArr = [];

window.onload= function(){
   handleList();

};

function handleList(){
    const listButton = d.querySelector(".listStudentButton");
    const registerContent = d.querySelector(".infoContainer");
    const btnRegister = d.getElementById("btnRegister");
    const infoContainerMain = d.getElementById("infoContainerMain");
   
    const templateModal = d.getElementById("templateModal").content;
    const  sexoStudent = d.getElementById("sexoStudent");
    
   
    
    listButton.addEventListener("click",(e)=>{
        // console.log(e);
        if(studentsArr.length === 0){
            formStudent.style.display = "none";
            listNot.style.display="block"
        }else{
            formStudent.style.display = "none";
            tableStudents.style.display="block"
            informationAll.style.display="block"
        }
        


    })
    btnRegister.addEventListener("click",(e)=>{
        formStudent.style.display = "block";
        listNot.style.display="none"
        tableStudents.style.display="none"
        informationAll.style.display="none"
    })

    formStudent.addEventListener("submit",(e)=>{
        e.preventDefault();
        const data = new FormData(formStudent);
       const [firstname,lastname,dateOfBirth,nota1,nota2,nota3,nota4] = [...data.values()];
       if(sexoStudent.options[sexoStudent.selectedIndex].text === "Seleciona el sexo..." ){
        sexoStudent.focus();
        w.scrollTo({
            behavior:"smooth",
                top:0
        })
        return;
       }
       const sexStudent = sexoStudent.options[sexoStudent.selectedIndex].text;

       if(!firstname.trim() || !lastname.trim() || !nota1.trim()||!nota2.trim()||!nota3.trim()||!nota4.trim()){
          alert("Tines que ingresar tus datos a todos los campos")  
        return;
       }
       if(nota1 >20 ||nota2 >20 ||nota3 >20 ||nota4 >20 ){
        alert("Las notas son del 0 a 20")  
        return;
       }

       

        paitStudents(firstname,lastname,dateOfBirth,nota1,nota2,nota3,nota4,sexStudent,templateModal,registerContent)
        formStudent.reset();
    })
    



}
function paitStudents(name,lastName,dateOfBirth,note1,note2,note3,note4,sex,templateModal,rcont){
    
    console.log(templateModal);
     let classStudentData = classStudent();
        let calculeInfo = new classStudentData();
        calculeInfo.setName = name;
        calculeInfo.setlastName =lastName;
        calculeInfo.setDate = dateOfBirth;
        calculeInfo.setSex = sex;

        calculeInfo.setNotes = Number(note1);
        calculeInfo.setNotes = Number(note2);
        calculeInfo.setNotes = Number(note3);
        calculeInfo.setNotes = Number(note4);

    const cloneTemModal = templateModal.cloneNode(true);
    cloneTemModal.querySelector("h4 strong").textContent = calculeInfo.getName ;
    cloneTemModal.querySelector(".profile-card__txt strong").textContent = dateToday;

   if(d.getElementById("modal-example")){
    d.getElementById("modal-example").remove();
   }
   const dialogModal = cloneTemModal.querySelector("dialog");
   rcont.insertAdjacentElement("beforeend",dialogModal);
   const modal = d.getElementById("modal-example");
   modal.setAttribute("open","true");
   studentsArr.push(calculeInfo);

   handleModal();
   handleListAll();
   resultsCompleted()


}

function handleModal(){
    const closeBtn = d.getElementById("closeIconModal")
    const modal = d.getElementById("modal-example");
    const btnViewList = d.getElementById("btnViewList");
    if(closeBtn){
        closeBtn.addEventListener("click",(e)=>{
            modal.setAttribute("open","false");
        })
    }
    if(btnViewList){
        btnViewList.addEventListener("click",(e)=>{
            formStudent.style.display = "none";
            tableStudents.style.display="block"
            listNot.style.display = "none";
            modal.setAttribute("open","false");
            informationAll.style.display="block"

        })
    }
    

}


function handleListAll(){
    const fragmet = d.createDocumentFragment();
    rowListContainer.textContent = "";
    console.log(studentsArr);
    studentsArr.forEach((item,index)=>{
        let cloneTemList = templateList.cloneNode(true);
        cloneTemList.querySelector(".numberLista").textContent = index+1;
        cloneTemList.querySelector(".nameT").textContent = item.name;
        cloneTemList.querySelector(".lastNameT").textContent = item.lastName;
        cloneTemList.querySelector(".sexT").textContent = item.sex;
        cloneTemList.querySelector(".ageT").textContent = item.age();
        cloneTemList.querySelector(".promedioT").textContent = item.promedio();
        cloneTemList.querySelector(".stateT").textContent = item.stateOfStudent();
        // console.log(item.age());
    
        fragmet.appendChild(cloneTemList);
    })
    rowListContainer.appendChild(fragmet);
}
function resultsCompleted(){
    const resultAllStudent = d.querySelector(".resultAllStudent");
    const resultAllAprobados = d.querySelector(".resultAllAprobados");
    const resultAllDesAprobados = d.querySelector(".resultAllDesAprobados");
    const resultPromedyTotal = d.querySelector(".resultPromedyTotal");

    resultAllStudent.textContent = studentsArr.length;
    resultAllAprobados.textContent = studentsArr.filter((item)=>item.stateOfStudent() === "Aprobado").length;
    resultAllDesAprobados.textContent = studentsArr.filter((item)=>item.stateOfStudent() === "Desaprobado").length;
    resultPromedyTotal.textContent = studentsArr.reduce((acumulador,current)=>{
       let ac = current.notesAll.reduce((a,c)=>a+c,0) 
       let result = ac / 4;
       return acumulador + result;
    },0)/ studentsArr.length;
}
function classStudent(){

    class Student{
        constructor(name,lastName,dateOfBirth,sex,notesAll=[]){
            this.name = name;
            this.lastName= lastName;
            this.dateOfBirth = dateOfBirth;
            this.notesAll = notesAll;
            this.sex = sex;

        }
        get getName(){
            return this.name;
        }
        set setName(name){
            this.name = name;
        }
        get getlastName(){
            return this.lastName;
        }
        set setlastName(lastName){
            this.lastName = lastName;
        }
        get getDate(){
            return this.dateOfBirth;
        }
        set setDate(date){
            this.dateOfBirth = date;
        }
        get getSex(){
            return this.sex;
        }
        set setSex(sex){
            this.sex = sex;
        }
        set setNotes(nota){
            return this.notesAll.push(nota);
        }
        get getNotes(){
            return this.notes;
        }

        age(){
            let dateStudent = new Date(this.dateOfBirth);
            let date = new Date();
            return date.getFullYear()- dateStudent.getFullYear()
        }
        promedio(){
            let allPromedio = this.notesAll.reduce((current,pos)=>current+pos,0);
            return allPromedio / 4;
        }
        stateOfStudent(){
            if(this.promedio() <= 10){
                return "Desaprobado"
            }else{
                return "Aprobado"
            }
        }
       
    }

    return Student;

}



