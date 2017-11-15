var inputname = document.querySelector('.new-note input');
var inputbody = document.querySelector('.new-note textarea');
var notebox = document.querySelector('.note-box');
var addbtn = document.querySelector('.add');


addbtn.addEventListener('click', addnote);

/* display previously saved stored notes on startup */

initialize();

function initialize() {
  var getstorageItems = browser.storage.local.get(null);
  getstorageItems.then((results) => {
    var noteKeys = Object.keys(results);
    for (let noteKey of noteKeys) {
      var curValue = results[noteKey];
      displaynote(noteKey,curValue);
    }
  }, onError);
}

/* add a note to the display and storage */

function addnote() {
  var notename = inputname.value;
  var notebody = inputbody.value;
  var gettingItem = browser.storage.local.get(notename);
  gettingItem.then((result) => {
    var objTest = Object.keys(result);
    if(objTest.length < 1 && notename !== '' && notebody !== '') {
      inputname.value = '';
      inputbody.value = '';
      storenote(notename,notebody);
    }
  }, onError);
}

/*store note */

function storenote(name, body) {
  var storingnote = browser.storage.local.set({ [name] : body });
  storingnote.then(() => {
    displaynote(name,body);
  }, onError);
}

/* display */

function displaynote(name, body) {

  /* create note display box area */
  var note = document.createElement('div');
  var shownote = document.createElement('div');
  var notetitle = document.createElement('h1');
  var notearea = document.createElement('p');
  var divider = document.createElement('hr');


  note.setAttribute('class','note');
  notetitle.textContent = name;
  notearea.textContent = body;
  

  shownote.appendChild(notetitle);
  shownote.appendChild(notearea);
  shownote.appendChild(divider);
  

  note.appendChild(shownote);

  /* create edit box */
  var editnote = document.createElement('div');
  var notenameedit = document.createElement('input');
  var notebodyedit = document.createElement('textarea');
  

  


  editnote.appendChild(notenameedit);
  notenameedit.value = name;
  editnote.appendChild(notebodyedit);
  notebodyedit.textContent = body;
  

  
 

  note.appendChild(editnote);

  notebox.appendChild(note);
  editnote.style.display = 'none';

 
}
