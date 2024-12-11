const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const sum = blogs.reduce((accumulator, item) => {
    return accumulator + (item.likes || 0)
  }, 0)

  return sum
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return {}
  }

  let title = ''
  let author = ''
  let likes = 0
  let highestLikes = -1

  blogs.forEach(item => {
    if (item.likes !== undefined && item.likes > highestLikes) {
      title = item.title
      author = item.author
      likes = item.likes
      highestLikes = item.likes
    }
  })

  return (
    {
      'title': title,
      'author': author,
      'likes': likes,
    }
  )
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}