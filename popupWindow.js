/*
  *Scripts para la ventana emergente de tu Extensión.
*/
var imageIcon = document.getElementById('imageIcon')
var text = document.getElementById('title')
var optionHiragana=document.getElementById('hiragana')
var optionKatakana=document.getElementById('katakana')

var switchE = document.getElementById('switch')
var icon=document.getElementById("icoSwitch")
// En tu archivo popup.js
var estado=false
var opción=0



// Recuperar Datos.
chrome.storage.local.get(['estado']).then((result) => {
  if(result.estado != undefined){
    estado=result.estado
  }
  cambiar()
});
chrome.storage.local.get(['opción']).then((result) => {
  if(result.opción != undefined){
    opción=result.opción
  }
  actualizar()
});

switchE.addEventListener("click",cambiarEstado);

function cambiarEstado(){
  if(estado==true){
    estado=false
  }else{
    estado=true
  }
  cambiar()
  chrome.storage.local.set({estado: estado}).then(() => {
      console.log("Value is set");
    });
}

optionHiragana.addEventListener('click',cambiarOpción)
optionKatakana.addEventListener('click',cambiarOpción)

function cambiarOpción(){
  if(opción==0){
    opción=1
  }else if(opción==1){
    opción=0
  }
  actualizar()
  chrome.storage.local.set({opción: opción}).then(() => {
      console.log("Value is set | "+opción);
    });
}

function cambiar(){
    if (estado==false) {
      switchE.classList.remove("switch");
      icon.classList.remove("icoSwitch")
    }else{
      switchE.classList.add("switch");
      icon.classList.add("icoSwitch")
    }
    
}

function actualizar(){
  if (opción==0) {
    optionHiragana.checked = true
  }else if(opción==1){
    optionKatakana.checked = true
  }
}


