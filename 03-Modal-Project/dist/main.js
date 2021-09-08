"use strict";
// selecting html elements
var modalWindow = document.querySelector(".modal-container");
var modalOverlay = document.querySelector(".modal-overlay");
var modalCloseButton = document.querySelector(".close-modal-button");
var modalOpenButton = document.querySelector(".open-modal-button");
// function to toggle modal window
var toggleModal = function () {
    modalWindow.classList.toggle("hidden");
    modalOverlay.classList.toggle("hidden");
};
// event listeners
modalOpenButton.addEventListener("click", toggleModal);
modalCloseButton.addEventListener("click", toggleModal);
modalOverlay.addEventListener("click", toggleModal);
