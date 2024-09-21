/*
  *Script para insertar en la web que quieras o especifiques.
*/

var elementsWithText=[];
var estadoDeLetrasNihongo=0
var opciónDeLetrasNihongo=0

// Recuperar Datos.
chrome.storage.local.get(['estado']).then((result) => {
  if(result.estado != undefined){
    estadoDeLetrasNihongo=result.estado
  }else{
    chrome.storage.local.set({estado: estadoDeLetrasNihongo})
  }
  
});
chrome.storage.local.get(['opción']).then((result) => {
  if(result.opción != undefined){
    opciónDeLetrasNihongo=result.opción
  }else{
    chrome.storage.local.set({opción: opciónDeLetrasNihongo})
  }
  
});


// Mapa de reemplazo de rōmaji a hiragana (incluyendo mayúsculas)
const rōmajiToHiraganaMap = {

  // Consonantes + Vocales (k)
  'ka': 'か',
  'ki': 'き',
  'ku': 'く',
  'ke': 'け',
  'ko': 'こ',

  // Consonantes + Vocales (s)
  'sa': 'さ',
  'shi': 'し',
  'su': 'す',
  'se': 'せ',
  'so': 'そ',

  // Consonantes + Vocales (t)
  'ta': 'た',
  'chi': 'ち',
  'tsu': 'つ',
  'te': 'て',
  'to': 'と',

  // Consonantes + Vocales (n)
  'na': 'な',
  'ni': 'に',
  'nu': 'ぬ',
  'ne': 'ね',
  'no': 'の',

  // Consonantes + Vocales (h)
  'ha': 'は',
  'hi': 'ひ',
  'fu': 'ふ',
  'he': 'へ',
  'ho': 'ほ',

  // Consonantes + Vocales (m)
  'ma': 'ま',
  'mi': 'み',
  'mu': 'む',
  'me': 'め',
  'mo': 'も',

  // Consonantes + Vocales (y)
  'ya': 'や',
  'yu': 'ゆ',
  'yo': 'よ',

  // Consonantes + Vocales (r)
  'ra': 'ら',
  'ri': 'り',
  'ru': 'る',
  're': 'れ',
  'ro': 'ろ',

  // Consonantes + Vocales (w)
  'wa': 'わ',
  'wo': 'を',

  // Consonantes + Vocales (n)
  'n': 'ん',
/////////////////////////////////////////////////
  // Consonantes + Vocales (g)
  'ga': 'が',
  'gi': 'ぎ',
  'gu': 'ぐ',
  'ge': 'げ',
  'go': 'ご',

  // Consonantes + Vocales (z)
  'za': 'ざ',
  'zi': 'じ',
  'zu': 'ず',
  'ze': 'ぜ',
  'zo': 'ぞ',

  // Consonantes + Vocales (d)
  'da': 'だ',
  'di': 'ぢ',
  'du': 'づ',
  'de': 'で',
  'do': 'ど',

  // Consonantes + Vocales (b)
  'ba': 'ば',
  'bi': 'び',
  'bu': 'ぶ',
  'be': 'べ',
  'bo': 'ぼ',

  // Consonantes + Vocales (p)
  'pa': 'ぱ',
  'pi': 'ぴ',
  'pu': 'ぷ',
  'pe': 'ぺ',
  'po': 'ぽ',
////////////////////////////////
  // Combinaciones (k)
  'kya': 'きゃ',
  'kyu': 'きゅ',
  'kyo': 'きょ',

  // Combinaciones (s)
  'sha': 'しゃ',
  'shu': 'しゅ',
  'sho': 'しょ',

  // Combinaciones (t)
  'cha': 'ちゃ',
  'chu': 'ちゅ',
  'cho': 'ちょ',

  // Combinaciones (h)
  'hya': 'ひゃ',
  'hyu': 'ひゅ',
  'hyo': 'ひょ',

  // Combinaciones (m)
  'mya': 'みゃ',
  'myu': 'みゅ',
  'myo': 'みょ',

  // Combinaciones (r)
  'rya': 'りゃ',
  'ryu': 'りゅ',
  'ryo': 'りょ',

////////////////////////////////
  // Combinaciones (g)
  'gya': 'ぎゃ',
  'gyu': 'ぎゅ',
  'gyo': 'ぎょ',

  // Combinaciones (j)
  'ja': 'じゃ',
  'ju': 'じゅ',
  'jo': 'じょ',

  // Combinaciones (b)
  'bya': 'びゃ',
  'byu': 'びゅ',
  'byo': 'びょ',

  // Combinaciones (p)
  'pya': 'ぴゃ',
  'pyu': 'ぴゅ',
  'pyo': 'ぴょ',
///////////////////////////////

  // Combinaciones (w)
  'wya': 'ゐゃ',
  'wyu': 'ゐゅ',
  'wyo': 'ゐょ',

  // Vocales
  'a': 'あ',
  'i': 'い',
  'u': 'う',
  'e': 'え',
  'o': 'お',
};
const rōmajiToKatakanaMap = {

  // Consonantes + Vocales (k)
  'ka': 'カ',
  'ki': 'キ',
  'ku': 'ク',
  'ke': 'ケ',
  'ko': 'コ',

  // Consonantes + Vocales (s)
  'sa': 'サ',
  'shi': 'シ',
  'su': 'ス',
  'se': 'セ',
  'so': 'ソ',

  // Consonantes + Vocales (t)
  'ta': 'タ',
  'chi': 'チ',
  'tsu': 'ツ',
  'te': 'テ',
  'to': 'ト',

  // Consonantes + Vocales (n)
  'na': 'ナ',
  'ni': 'ニ',
  'nu': 'ヌ',
  'ne': 'ネ',
  'no': 'ノ',

  // Consonantes + Vocales (h)
  'ha': 'ハ',
  'hi': 'ヒ',
  'fu': 'フ',
  'he': 'ヘ',
  'ho': 'ホ',

  // Consonantes + Vocales (m)
  'ma': 'マ',
  'mi': 'ミ',
  'mu': 'ム',
  'me': 'メ',
  'mo': 'モ',

  // Consonantes + Vocales (y)
  'ya': 'ヤ',
  'yu': 'ユ',
  'yo': 'ヨ',

  // Consonantes + Vocales (r)
  'ra': 'ラ',
  'ri': 'リ',
  'ru': 'ル',
  're': 'レ',
  'ro': 'ロ',

  // Consonantes + Vocales (w)
  'wa': 'ワ',
  'wo': 'ヲ',

  // Consonantes + Vocales (n)
  'n': 'ン',

  /////////////////////////////////////////////////
  // Consonantes + Vocales (g)
  'ga': 'ガ',
  'gi': 'ギ',
  'gu': 'グ',
  'ge': 'ゲ',
  'go': 'ゴ',

  // Consonantes + Vocales (z)
  'za': 'ザ',
  'zi': 'ジ',
  'zu': 'ズ',
  'ze': 'ゼ',
  'zo': 'ゾ',

  // Consonantes + Vocales (d)
  'da': 'ダ',
  'di': 'ヂ',
  'du': 'ヅ',
  'de': 'デ',
  'do': 'ド',

  // Consonantes + Vocales (b)
  'ba': 'バ',
  'bi': 'ビ',
  'bu': 'ブ',
  'be': 'ベ',
  'bo': 'ボ',

  // Consonantes + Vocales (p)
  'pa': 'パ',
  'pi': 'ピ',
  'pu': 'プ',
  'pe': 'ペ',
  'po': 'ポ',

  ////////////////////////////////
  // Combinaciones (k)
  'kya': 'キャ',
  'kyu': 'キュ',
  'kyo': 'キョ',

  // Combinaciones (s)
  'sha': 'シャ',
  'shu': 'シュ',
  'sho': 'ショ',

  // Combinaciones (t)
  'cha': 'チャ',
  'chu': 'チュ',
  'cho': 'チョ',

  // Combinaciones (h)
  'hya': 'ヒャ',
  'hyu': 'ヒュ',
  'hyo': 'ヒョ',

  // Combinaciones (m)
  'mya': 'ミャ',
  'myu': 'ミュ',
  'myo': 'ミョ',

  // Combinaciones (r)
  'ryo': 'リョ',
  'rya': 'リャ',
  'ryu': 'リュ',

  ////////////////////////////////
  // Combinaciones (g)
  'gya': 'ギャ',
  'gyu': 'ギュ',
  'gyo': 'ギョ',

  // Combinaciones (j)
  'ja': 'ジャ',
  'ju': 'ジュ',
  'jo': 'ジョ',

  // Combinaciones (b)
  'bya': 'ビャ',
  'byu': 'ビュ',
  'byo': 'ビョ',

  // Combinaciones (p)
  'pya': 'ピャ',
  'pyu': 'ピュ',
  'pyo': 'ピョ',

  ///////////////////////////////
  // Combinaciones (w)
  'wya': 'ヰャ',
  'wyu': 'ヰュ',
  'wyo': 'ヰョ',

  // Vocales
  'a': 'ア',
  'i': 'イ',
  'u': 'ウ',
  'e': 'エ',
  'o': 'オ',
};


// Función recursiva para encontrar todos los elementos que contienen texto.
function findTextContainingElements(rootElement) {
  const elementsWithText = [];

  function searchElement(element) {
    // Si el elemento es un nodo de texto
    if (element.nodeType === Node.TEXT_NODE && element.textContent.trim()) {
      elementsWithText.push(element.parentNode); // Añade el elemento contenedor al array.
    } else if (element.nodeType === Node.ELEMENT_NODE) {
      element.childNodes.forEach(child => searchElement(child)); // Recorrer nodos hijos.
    }
  }

  searchElement(rootElement);
  return elementsWithText;
}

// Función para reemplazar un texto específico dentro de los elementos
function replaceTextInElements(elements, letrasMap) {
  elements.forEach(element => {
    element.childNodes.forEach(child => {
      if (child.nodeType === Node.TEXT_NODE) {


        let textContent = child.textContent.toLowerCase();

        // Reemplazar cada rōmaji por su equivalente en letraNihongo
        for (const [rōmaji, letraNihongo] of Object.entries(letrasMap)) {
          const regex = new RegExp(rōmaji, 'g'); // Crear expresión regular para el rōmaji
          textContent = textContent.replace(regex, letraNihongo);
        }

        // Asignar el texto modificado de vuelta al nodo
        child.textContent = textContent;


      }
    });
  });
}

var rutaActual = location.href
setInterval(()=>{
  if(rutaActual != location.href){
    resetTimer()
    rutaActual = location.href
  }
},3000)

var timerForInit

resetTimer()

function resetTimer(){
  if(timerForInit){
    clearTimeout(timerForInit)
  }
  timerForInit=setTimeout(initTextChanger,3000)
}

var web=document.addEventListener('scroll',()=>{
  resetTimer()
})

function initTextChanger(){
  console.log('cambiando Texto')
  chrome.storage.local.get(['estado']).then((result) => {
    if(result.estado != undefined){
      estadoDeLetrasNihongo=result.estado
    }})
  if(estadoDeLetrasNihongo){
    // Usar las funciones para buscar y reemplazar.
    elementsWithText = findTextContainingElements(document.body)
    // Reemplazar el texto con el texto en hiragana o katakana.
    if(opciónDeLetrasNihongo==0){
      replaceTextInElements(elementsWithText,rōmajiToHiraganaMap)
    }else if(opciónDeLetrasNihongo==1){
      replaceTextInElements(elementsWithText,rōmajiToKatakanaMap)

    }
  }

}