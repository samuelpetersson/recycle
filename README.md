# Recycle

Create and recycle DOM nodes using a cursor context.

### Concept

```javascript
//Set cursor at element.
recycle.open(element)

//Create or recycle node and move cursor to it.
recycle.node(type, props, true)

//Create or recycle text.
recycle.text("Title")

//Close node and move cursor to parent node.
recycle.done()
```

### Examples

```javascript
const { open, node, text, done } = recycle

//Set cursor at document body.
open(document.body)

//Create or recycle header node and move cursor to it.
node("header", { style: { display: "flex" } }, true)

//Create or recycle h1 node and set text.
node("h1", { style: { fontSize: '2em' } }, "Title")

//Close header.
done()

//Close body.
done()
```

```javascript
const { open, node, text, done } = recycle

//Set cursor at document body.
open(document.body)

//Create or recycle list items using callback before closing the list.
node("ul", null, () => {
  node("li", null, "Item 1")
  node("li", null, "Item 2")
  node("li", null, "Item 3")
})
```