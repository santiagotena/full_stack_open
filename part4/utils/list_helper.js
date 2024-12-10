const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const sum = blogs.reduce((accumulator, item) => {
    return accumulator + (item.likes || 0)
  }, 0)

  return sum
}

module.exports = {
  dummy,
  totalLikes
}