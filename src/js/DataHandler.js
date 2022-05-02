import ListsHandler from './ListsHandler.js';

export default class DataHandler {
  constructor() {
    this.ListsHandler = new ListsHandler();
    this.form = document.getElementById('main-form');
    this.form.onsubmit = (event) => {
      event.preventDefault();
      this.addItem();
    };

    this.formInput = document.querySelector('input');
    this.listHandler.saveData = () => {
      this.saveData();
    };

    this.completedButton = document.getElementById('completed-button');
    this.completedButton.onclick = () => {
      this.clearCompleted();
    };
  }

  init() {
    if (localStorage.getItem('list-data')) {
      const storedData = JSON.parse(localStorage.getItem('list-data'));
      storedData.forEach((item) => {
        this.listHandler.addItem(item.description, item.completed);
      });
    }
  }

  addItem() {
    const inputValue = this.formInput.value;
    this.ListsHandler.addItem(inputValue);
    this.form.reset();
    this.form.focus();
    this.saveData();
  }

  saveData() {
    localStorage.setItem('list-data', JSON.stringify(this.ListsHandler.items));
  }

  clearCompleted() {
    this.listHandler.clearCompleted();
    this.saveData();
  }
}
