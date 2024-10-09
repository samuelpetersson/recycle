var recycle = (function () {

  var parent, cursor

  function prop(target, key, val) {
    if (val && typeof val == 'object') {

      for (let sub in val) {
        target[key][sub] = val[sub]
      }

      if (target.props) {
        for (let sub in target.props[key]) {
          if (!(sub in val)) {
            target[key][sub] = ''
          }
        }
      }

    }
    else if (!val && target.hasAttribute(key)) {
      target.removeAttribute(key)
    }
    else if (key in target) {
      target[key] = val == null ? '' : val
    }
    else {
      target.setAttribute(key, val)
    }
  }

  function open(target) {
    parent = target
    cursor = parent.firstChild
  }

  function find(from, name, key) {
    while (from) {
      if (name == from.nodeName && key == from.key) {
        return from
      }
      from = from.nextSibling
    }
    return null
  }

  function node(name, props, children) {
    const root = find(cursor, name.toUpperCase(), props ? props.key : null) || document.createElement(name)

    for (let key in root.props) {
      if (!props || !(key in props)) {
        prop(root, key, null)
      }
    }

    for (let key in props) {
      prop(root, key, props[key])
    }

    root.props = props

    if (root != cursor) {
      cursor = parent.insertBefore(root, cursor)
    }

    if (children == null) {
      cursor = cursor.nextSibling
    }
    else {
      open(root)
      if (typeof children == 'function') {
        children()
        done()
      }
      else if (typeof children != 'boolean') {
        text(children)
        done()
      }
    }

    return root
  }

  function text(value) {
    if (!cursor || cursor.nodeType != 3 || cursor.nodeValue !== value) {
      cursor = parent.insertBefore(document.createTextNode(value), cursor)
    }
    cursor = cursor.nextSibling
  }

  function done() {
    while (cursor) {
      var next = cursor.nextSibling
      parent.removeChild(cursor)
      cursor = next
    }
    cursor = parent.nextSibling
    parent = parent.parentNode
  }


  return { open, node, text, done }

})()

if (typeof module !== 'undefined') {
  module.exports = recycle
}