class Modal {
    #modal; // Declare the private field '#modal' in the enclosing class
    #modalBtn; // Declare the private field '#modalBtn' in the enclosing class

    constructor() {
        this.#modal = document.querySelector('#modal');
        this.#modalBtn = document.querySelector('#modal-btn');
        this.addEventListeners();
    }

    addEventListeners() {
        this.#modalBtn.addEventListener('click', this.openModal.bind(this));
        window.addEventListener('click', this.outsideClick.bind(this));
        document.addEventListener('close-modal', this.closeModal.bind(this));
    }

    openModal() {
        this.#modal.style.display = 'block';
    }

    closeModal() {
        this.#modal.style.display = 'none';
    }

    outsideClick(e) {
        if (e.target === this.#modal) {
            this.closeModal();
        }
    }
}


export default Modal;