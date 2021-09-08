// selecting html elements
const modalWindow = document.querySelector(
  ".modal-container"
) as HTMLDivElement;
const modalOverlay = document.querySelector(".modal-overlay") as HTMLDivElement;
const modalCloseButton = document.querySelector(
  ".close-modal-button"
) as HTMLElement;
const modalOpenButton = document.querySelector(
  ".open-modal-button"
) as HTMLElement;

// function to toggle modal window
const toggleModal = (): void => {
  modalWindow.classList.toggle("hidden");
  modalOverlay.classList.toggle("hidden");
};

// event listeners
modalOpenButton.addEventListener("click", toggleModal);
modalCloseButton.addEventListener("click", toggleModal);
modalOverlay.addEventListener("click", toggleModal);
