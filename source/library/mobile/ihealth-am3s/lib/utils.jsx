
h.tryParse = (m) => {
  try {
    return JSON.parse(m);
  } catch(err) {
    console.warn(`Error parsing ${m}`)
    console.warn(err)
    return m
  }
}
