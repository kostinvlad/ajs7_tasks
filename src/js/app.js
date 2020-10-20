import Task from './Task';
import { filterByText } from './filter';

const newItemForm = document.querySelector('.add-form');
const newItemTitle = newItemForm.querySelector('.add-form-input');
const allTasksList = document.querySelector('.all-tasks-list');
const pinTasksList = document.querySelector('.pinned-tasks-list');
const emptyTasks = document.querySelector('.empty-tasks');
const emptyValue = document.querySelector('.empty-value');
const tasksNotFound = document.querySelector('.tasks-not-found');

const data = [];
const taskTag = 'li';

function buildTasksList(info, list, tag) {
  list.innerHTML = '';
  info.forEach((task, index) => {
    const el = document.createElement(tag);
    el.classList.add('task-item');
    el.innerHTML = ` <label class="radio-group">
                    <span class="radio-text">${task.value}</span>
                    <a href="#" class="radio-link"></a>
                </label>`;

    list.appendChild(el);
    const link = el.querySelector('.radio-link');

    link.addEventListener('click', (event) => {
      event.preventDefault();

      if (el.classList.contains('pinned')) {
        el.classList.remove('pinned');
        list.appendChild(el);
        data.push(task);
      } else {
        el.classList.add('pinned');
        pinTasksList.appendChild(el);
        data.splice(index, 1);
      }

      if (pinTasksList.children.length === 0) {
        emptyTasks.classList.remove('hidden');
      } else {
        emptyTasks.classList.add('hidden');
      }
    });
  });
}

newItemForm.addEventListener('submit', (e) => {
  e.preventDefault();
  if (newItemTitle.value !== '') {
    const task = new Task(newItemTitle.value);
    data.push(task);
    emptyValue.classList.add('hidden');
    newItemForm.reset();
  } else {
    emptyValue.classList.remove('hidden');
  }
  const filtered = filterByText(data, newItemTitle.value);
  buildTasksList(filtered, allTasksList, taskTag);
  tasksNotFound.classList.add('hidden');
});

newItemTitle.addEventListener('input', () => {
  emptyValue.classList.add('hidden');
  const filtered = filterByText(data, newItemTitle.value);
  buildTasksList(filtered, allTasksList, taskTag);

  if (allTasksList.children.length === 0) {
    tasksNotFound.classList.remove('hidden');
  } else {
    tasksNotFound.classList.add('hidden');
  }
});
