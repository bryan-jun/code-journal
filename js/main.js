/* global data */
/* exported data */
var photoUrl = document.getElementById('photo');
var photo = document.querySelector('.image');
var journalForm = document.getElementById('journal');

photoUrl.addEventListener('input', function (event) {
  photo.setAttribute('src', journalForm.elements.photo.value);

}, false);

journalForm.addEventListener('submit', function (event) {
  var entry = {
    title: journalForm.elements.title.value,
    photoP: journalForm.elements.photo.value,
    notesP: journalForm.elements.notes.value

  };

  entry.nextEntryId = data.nextEntryId;
  data.nextEntryId += 1;
  data.entries.unshift(entry);
  photo.setAttribute('src', 'images/placeholder-image-square.jpg');

  journalForm.getElementById('journal').reset();
}, false);

function renderEntries(entry) {
  var newRow = document.createElement('div');
  newRow.setAttribute('class', 'row entry-row');

  var newColumn = document.createElement('div');
  newColumn.setAttribute('class', 'column-half');

  newRow.appendChild(newColumn);

  var newField = document.createElement('div');
  newField.setAttribute('class', 'field-row');

  newColumn.appendChild(newField);

  var newImage = document.createElement('img');
  newImage.setAttribute('src', entry.photoP);
  newImage.setAttribute('class', 'image');

  newField.appendChild(newImage);

  var newColumn2 = document.createElement('div');
  newColumn2.setAttribute('class', 'column-half');

  newRow.appendChild(newColumn2);

  var newField2 = document.createElement('div');
  newField2.setAttribute('class', 'field-row');

  newColumn2.appendChild(newField2);

  var entryName = document.createElement('div');
  newField2.setAttribute('class', 'entry-name');
  entryName.textContent = entry.title;

  newField2.appendChild(entryName);

  var newField3 = document.createElement('div');
  newField3.setAttribute('class', 'field-row');

  newColumn2.appendChild(newField3);

  var noteDesc = document.createElement('div');
  noteDesc.setAttribute('class', 'note-desc');
  noteDesc.textContent = entry.notesP;

  newField3.appendChild(noteDesc);

  return newRow;

}

var newEntryRow = document.querySelector('ul');

addEventListener('DOMContentLoaded', addEntries, false);

function addEntries(event) {
  for (let i = 0; i < data.entries.length; i++) {
    var result = renderEntries(data.entries[i]);
    newEntryRow.appendChild(result);
  }

  if (data.view === 'entries') {
    entryTab.className = 'container';
    formTab.className = 'container hidden';
  } else {
    entryTab.className = 'container hidden';
    formTab.className = 'container';
  }

}

var navBar = document.querySelector('.header');
var entryTab = document.getElementById('entry-view');
var formTab = document.getElementById('form-view');

navBar.addEventListener('click', navFx, false);

function navFx(event) {
  if (event.target && event.target.matches('#entries-nav')) {
    entryTab.className = 'container';
    formTab.className = 'container hidden';

  }
  data.view = 'entries';
}

var newButton = document.getElementById('new-button');

newButton.addEventListener('click', newForm, false);

function newForm(event) {
  entryTab.className = 'container hidden';
  formTab.className = 'container';
  data.view = 'form-view';
}

var saveButton = document.querySelector('save-button');

saveButton.addEventListener('click', navFx, false);
