import _sanitize from "sanitize-html";

let config = {
  allowedTags: [
    "strong", "em", "blockquote", "a", "h1", "h2", "h3",
    "figure", "figcaption", "iframe", "p", "img", "br"
  ],
  allowedAttributes: {
    "p": ["data-*"],
    "h1": ["data-*"],
    "h2": ["data-*"],
    "h3": ["data-*"],
    "blockquote": ["data-*"],
    "a": ["href", "target"],
    "figure": ["contenteditable", "data-*"],
    "iframe": ["src", "width", "height"],
    "img": ["src", "width", "height"]
  },
  allowSchemes: [
    "data", "http", "https", "mailto"
  ],
  transformTags: {
    "b": "strong",
    "i": "em"
  }
};

function prepare(text) {
  let div = document.createElement("div")
    , blocks = ["H1", "H2", "H3", "BLOCKQUOTE", "P", "FIGURE"];

  div.innerHTML = text;

  for (let child of div.childNodes) {
    if (child.dataset && child.dataset.active) {
      delete child.dataset.active;
    }

    if (blocks.indexOf(child.nodeName) > -1) {
      let children0 = [].slice.apply(child.childNodes);

      if (children0.some((child0) => {
        return blocks.indexOf(child0.nodeName) > -1;
      })) {

        children0.forEach((child0) => {
          if (blocks.indexOf(child0.nodeName) > -1) {
            div.insertBefore(child0, child);
          } else {
            let p = document.createElement("p");

            p.innerHTML = child0.innerHTML || child0.textContent;
            child0.remove();
            div.insertBefore(p, child);
          }
        });
      }
    }

    if (child.innerHTML !== "<br>" &&
        child.textContent.length === 0 &&
        child.nodeName !== "FIGURE") child.remove();
  }

  return div.innerHTML;
}

export function sanitize(input) {
  return _sanitize(prepare(input), config);
}

export function plaintext(input) {
  return _sanitize(input, {allowedTags: []});
}
