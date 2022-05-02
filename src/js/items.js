/* global checkbox */
import kebabSvg from '../image/kebab.svg';
import delSvg from '../image/delete.svg';

export default class Item {
  constructor(description, index, completed = false) {
    this.description = description;
    this.index = index;
    this.completed = completed;
    this.isNew = true;
    this.isEditing = false;

    this.htmlElement = document.createElement('li');
    this.descriptionSpan = document.createElement('span');
    this.descriptionInput = document.createElement('textarea');
    this.descriptionInput.rows = 1;
    this.checkbox = document.createElement('input');
    this.checkbox.checked = this.completed;
    this.deleteButton = document.createElement('button');
    this.htmlElement.classList.add('insert');
    this.descriptionInput.oninput = () => {
      this.updateDescription();
      this.updateInputHeight();
    };

    this.deleteButton.onclick = () => {
      this.deleteElement();
    };

    this.createHtml();
  }

  setIndex(index) {
    this.index = index;
  }

  /* Overwritten by arrow function in ListsHandler */
  deleteElement = () => { }

  updateDescription() {
    this.description = this.descriptionInput.value;
    this.descriptionSpan.innerText = this.description;
  }

  updateInputHeight() {
    this.descriptionInput.style.height = `${this.descriptionInput.scrollHeight.toString()}px`;
  }

  createHtml() {
    this.checkbox.classList.add('checkbox');
    this.checkbox.type = 'checkbox';
    this.checkbox.onchange = (event) => {
      this.completed = event.target.checked;
    };
    this.htmlElement.append(checkbox);

    this.descriptionSpan.innerText = this.description;
    this.descriptionSpan.classList.add('description');
    this.descriptionInput.type = 'text';
    this.descriptionInput.value = this.description;
    this.descriptionInput.classList.add('description-input');
    this.htmlElement.append(this.descriptionSpan);
    this.htmlElement.append(this.descriptionInput);

    const move = document.createElement('button');
    move.type = 'button';
    move.classList.add('list-btn');
    move.classList.add('move');
    move.classList.add('insert-button');
    const kebabImg = new Image();
    kebabImg.src = kebabSvg;
    kebabImg.alt = ':';
    move.append(kebabImg);
    this.htmlElement.append(move);

    this.deleteButton.type = 'button';
    this.deleteButton.classList.add('list-btn');
    this.deleteButton.classList.add('del');
    this.deleteButton.classList.add('insert');
    const delImg = new Image();
    delImg.src = delSvg;
    delImg.alt = 'delete';
    this.deleteButton.append(delImg);
    this.htmlElement.append(this.deleteButton);
  }

  getHtml() {
    if (!this.isNew) {
      this.htmlElement.classList.remove('insert');
    }
    this.isNew = false;
    return this.htmlElement;
  }

  makeEditable(editable) {
    if (editable) {
      if (!this.isEditing) {
        const spanHeight = this.descriptionSpan.clientHeight;
        this.descriptionInput.style.height = `${spanHeight}px`;
        this.isEditing = true;
      }
      this.htmlElement.classList.add('editing');
      this.descriptionInput.focus();
    } else {
      this.htmlElement.classList.remove('editing');
      this.isEditing = false;
    }
  }

  delete() {
    this.htmlElement.classList.add('delete');
    this.htmlElement.style.zIndex = 0;
  }

  setCompleted(completedValue) {
    this.completed = completedValue;
  }
}
