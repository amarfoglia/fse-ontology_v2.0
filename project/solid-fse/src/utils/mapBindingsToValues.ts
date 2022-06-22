const mapBindingsToValues = (bindings: unknown[]) => {
  for (const elem of bindings) {
    for (const prop in elem as any) {
      elem[prop] = elem[prop].value
    }
  }
  return bindings
}

export default mapBindingsToValues