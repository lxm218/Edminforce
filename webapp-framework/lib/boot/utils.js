
h.stringToCodeHL = function(code) {

  let blue = "#0877c5"
  let brown = "#654000"

  // Prep
  code = code.replace(/</g, '&lt;')
  code = code.replace(/>/g, '&gt;')

  // All Props
  code = code.replace(/\s(\w*)="/g, `<span style="color: ${blue};"> $1</span>="`)
  code = code.replace(/\s(\w*)={/g, `<span style="color: ${blue};"> $1</span>={`)
  code = code.replace(/\.refs\./g, `.<span style="color: ${blue};">refs</span>.`)
  code = code.replace(/\.state\./g, `.<span style="color: ${blue};">state</span>.`)
  code = code.replace(/\.props\./g, `.<span style="color: ${blue};">props</span>.`)

  // Specific
  code = code.replace(/var /g, `<span style="color: ${brown};">var</span> `)
  code = code.replace(/let /g, `<span style="color: ${brown};">let</span> `)
  code = code.replace(/const /g, `<span style="color: ${brown};">const</span> `)
  code = code.replace(/return /g, `<span style="color: ${brown};">return</span> `)
  code = code.replace(/this\./g, `<span style="color: ${brown};">this.</span>`)
  code = code.replace(/React.createClass/g, `<span style="color: ${brown};">React.createClass</span>`)

  // Basics
  code = code.replace(/  /g, '&nbsp;')
  code = code.replace(/@br/g, '<br />')

  return code
}
