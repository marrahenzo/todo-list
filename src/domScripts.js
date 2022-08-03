export function addChild(element, child) {
  element.appendChild(child);
}

export function addChildren(element, ...children) {
  element.append(...children);
}
