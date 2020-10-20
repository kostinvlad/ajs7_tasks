export function filterBy(tasks, filterCallback) {
  return tasks.filter(filterCallback);
}

export function containsText(data, search) {
  const clean = search.trim().toLowerCase();
  return data.toLowerCase().includes(clean);
}

export function filterByText(tasks, text) {
  return filterBy(tasks, (o) => containsText(o.value, text));
}
