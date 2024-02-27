// import '@fortawesome/fontawesome-free/css/all.min.css';
import Modal from './components/Modal';
import IdeaForm from './components/IdeaForm';
import IdeaList from './components/IdeaList';
import "./css/style.css";

new Modal();
const ideaForm = new IdeaForm();
const ideaList = new IdeaList();

ideaForm.render();
// ideaList.render();