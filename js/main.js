/* global data */
/* exported data */

function renderEntries(entry) {
  var newRow = document.createElement('div');
  newRow.setAttribute('class', 'row entry-row');
  newRow.setAttribute('id', entry.nextEntryId);

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

  var edit = document.createElement('i');
  edit.setAttribute('class', 'fas fa-edit');
  edit.setAttribute('id', 'edit-icon');
  edit.setAttribute('entryId', entry.nextEntryId);

  newField2.appendChild(edit);

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
  } else if (data.view === 'form-view') {
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

var photoUrl = document.getElementById('photo');
var photo = document.querySelector('.image');
var journalForm = document.getElementById('journal');

photoUrl.addEventListener('input', function (event) {
  photo.setAttribute('src', journalForm.elements.photo.value);

}, false);

journalForm.addEventListener('submit', function (event) {
  event.preventDefault();

  if (formTitle.textContent === 'New Entry') {
    var entry = {

      title: journalForm.elements.title.value,
      photoP: journalForm.elements.photo.value,
      notesP: journalForm.elements.notes.value

    };

    entry.nextEntryId = data.nextEntryId;
    data.nextEntryId += 1;
    data.entries.unshift(entry);

    var newRow = renderEntries(entry);
    newEntryRow.prepend(newRow);

  } else {

    data.entries[data.nextEntryId - editingId - 1].title = journalForm.elements.title.value;
    data.entries[data.nextEntryId - editingId - 1].photoP = journalForm.elements.photo.value;
    data.entries[data.nextEntryId - editingId - 1].notesP = journalForm.elements.notes.value;

    var updated = renderEntries(data.entries[data.nextEntryId - editingId - 1]);
    var old = document.getElementById(editingId);

    newEntryRow.replaceChild(updated, old);
  }

  journalForm.reset();
  entryTab.className = 'container';
  formTab.className = 'container hidden';
  data.view = 'entries';
}, false);

newEntryRow.addEventListener('click', editFunction, false);

var formTitle = document.querySelector('.form-title');

var editingId = 0;

function editFunction(event) {
  if (event.target && event.target.matches('#edit-icon')) {
    entryTab.className = 'container hidden';
    formTab.className = 'container';

    data.editing = data.entries[data.nextEntryId - event.target.getAttribute('entryId') - 1];
    editingId = data.editing.nextEntryId;

    journalForm.elements.title.value = data.editing.title;
    journalForm.elements.notes.value = data.editing.notesP;
    journalForm.elements.photo.value = data.editing.photoP;
    photo.setAttribute('src', data.editing.photoP);

    formTitle.textContent = 'Edit Entry';

  }
}
