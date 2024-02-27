import IdeasApi from "../../services/ideasApi";
import IdeaList from "./IdeaList";

class IdeaForm {
    #formModal;
    #form;
    #ideaList;

    constructor() {
        this.#formModal = document.querySelector('#form-modal');
        this.#ideaList = new IdeaList();
    }

    addEventListeners() {
        this.#form.addEventListener('submit', this.handleSubmit.bind(this));
    }

    async handleSubmit(e) {
        e.preventDefault();

        // Validate the form
        if (!this.#form.elements.text.value || !this.#form.elements.tag.value || !this.#form.elements.username.value) {
            alert('Please fill in all fields');
            return;
        }

        // Save user to local storage
        localStorage.setItem('username', this.#form.elements.username.value);

        // Create an idea object
        const idea = {
            text: this.#form.elements.text.value,
            tag: this.#form.elements.tag.value,
            username: this.#form.elements.username.value
        };

        // Add the idea to the server
        const newIdea = await IdeasApi.createIdea(idea);

        // Add the idea to the list
        this.#ideaList.addIdeaToList(newIdea.data.data);


        // Clear the form
        this.#form.reset();
        this.render();

        // Close the modal
        document.dispatchEvent(new Event('close-modal'));   // you can also use CustomEvent instead of Event
    }



    render() {
        this.#formModal.innerHTML = `
        <form id="idea-form">
            <div class="form-control">
                <label for="idea-text">Enter a Username</label>
                <input type="text" name="username" id="username" 
                value="${localStorage.getItem('username') ? localStorage.getItem('username') : ''}"/>
                </div>
                <div class="form-control">
                    <label for="idea-text">What's Your Idea?</label>
                    <textarea name="text" id="idea-text"></textarea>
                </div>
                <div class="form-control">
                    <label for="tag">Tag</label>
                    <input type="text" name="tag" id="tag" />
                </div>
                <button class="btn" type="submit" id="submit">Submit</button>
            </form>
            `;
        this.#form = document.querySelector('#idea-form');
        this.addEventListeners();
    }
}

export default IdeaForm;