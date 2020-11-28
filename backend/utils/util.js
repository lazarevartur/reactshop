export const errorThrow = (text, code, res) => {
  res.status(code)
  throw new Error(text)
}
