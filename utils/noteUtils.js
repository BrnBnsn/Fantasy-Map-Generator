"use strict";

function updateNotesBox(note) {
    document.getElementById("notesId").innerHTML = note.id;
    document.getElementById("notesHeader").innerHTML = note.name;
    document.getElementById("notesBody").innerHTML = note.legend;
}

function updateLegendById(id) {
    const note = notes.find(note => note.id === id);
    if (!note) return;

    const isTinyEditorActive = window.tinymce?.activeEditor;
    note.legend = isTinyEditorActive ? tinymce.activeEditor.getContent() : note.legend;
    updateNotesBox(note);
}

function addMarkersWithinRadiusById(id, markers) {
    let note = notes.find(note => note.id === id);

    if (!note) {
        note = {id, name: id, legend: ""};
        notes.push(note)
    }

    const isTinyEditorActive = window.tinymce?.activeEditor;
    const currentHtml = isTinyEditorActive ? tinymce.activeEditor.getContent() : note.legend;

    // create a div element for currentHtml
    const div = document.createElement("div");
    div.innerHTML = currentHtml;

    // if div does not have an element with the id "markersWithinRadius", then create one
    if (!div.querySelector("#markersWithinRadius")) {
        const newElement = document.createElement("div");
        newElement.id = "markersWithinRadius";
        // add 1rem margin to the top of the element
        newElement.style.marginTop = "1rem";
        div.appendChild(newElement);
    }

    // get the element in div with the id "markersWithinRadius"
    const markersWithinRadius = div.querySelector("#markersWithinRadius");

    // clear the element
    markersWithinRadius.innerHTML = "";

    // add bolded text to the new element
    const text = document.createElement("b");
    text.innerHTML = "Markers within radius: ";
    markersWithinRadius.appendChild(text);

    // if there are any markers, then append their property "icon" to the element, separate by commas and spaces
    if (markers.length > 0) {
        const text = document.createElement("span");
        // map each marker property "icon" to an array of strings, then join them with commas and spaces
        text.innerHTML = markers.map(m => m.icon).join(", ");
        markersWithinRadius.appendChild(text);
    } else markersWithinRadius.remove();

    if (isTinyEditorActive) tinymce.activeEditor.setContent(div.innerHTML);
    else note.legend = div.innerHTML;

    note.legend = isTinyEditorActive ? tinymce.activeEditor.getContent() : note.legend;
}