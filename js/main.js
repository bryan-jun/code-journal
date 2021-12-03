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
