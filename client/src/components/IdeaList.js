import ideasApi from "../../services/ideasApi";

class IdeaList {
    #ideaListEl;
    #ideas;
    #validTags;

    constructor() {
        this.#ideaListEl = document.querySelector('#idea-list');
        this.#ideas = [];

        this.getIdeas();

        this.#validTags = new Set(['business', 'technology', 'education', 'health', 'inventions', 'software']);
    }

    addEventListeners() {
        this.#ideaListEl.addEventListener('click', e => {
            if (e.target.classList.contains('fa-times')) {
                e.stopImmediatePropagation();
                const ideaId = e.target.parentElement.parentElement.dataset.id;

                this.deleteIdea(ideaId);
            }
        });
    }


    async getIdeas() {
        try {
            const res = await ideasApi.getIdeas();
            // using axios
            // this.#ideas = res.data.data;

            // using fetch
            this.#ideas = res.data;

            this.render();
        } catch (err) {
            console.error(err);
        }
    }

    async deleteIdea(ideaId) {
        try {
            await ideasApi.deleteIdea(ideaId);
            this.#ideas = this.#ideas.filter(idea => idea._id !== ideaId);
            this.getIdeas();
        } catch (err) {
            console.error(err);
            alert('You are not authorized to delete this idea');
        }
    }

    addIdeaToList(idea) {
        this.#ideas.push(idea);
        this.render();
    }

    getTagClass(tag) {
        return this.#validTags.has(tag.toLowerCase()) ? tag.toLowerCase() : 'other';
    }

    render() {
        this.#ideaListEl.innerHTML = this.#ideas.map(idea => {

            const deleteBtn = localStorage.getItem('username') === idea.username ?
                `<button class="delete"><i class="fas fa-times"></i></button>` : '';

            return `<div class="card" data-id="${idea._id}">
                ${deleteBtn}
                <h3>${idea.text}</h3>
                <p class="tag tag-${this.getTagClass(idea.tag)}">${idea.tag.toUpperCase()}</p>
                <p>
                    Posted on <span class="date">${idea.date}</span> by
                    <span class="author">${idea.username}</span>
                </p>
            </div>`;
        }).join('');

        this.addEventListeners();
    }
}

export default IdeaList;