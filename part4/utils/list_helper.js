const _ = require('lodash')

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

const mostBlogs = (blogs) => {
  const groupedByAuthor = _.groupBy(blogs, 'author')
  const authorBlogCounts = _.map(groupedByAuthor, (authorBlogs, author) => ({
    author,
    blogs: authorBlogs.length,
  }))
  const topAuthor = _.maxBy(authorBlogCounts, 'blogs')

  return topAuthor || {}
}

const mostLikes = (blogs) => {
  const groupedByAuthor = _.groupBy(blogs, 'author')
  const authorLikeCounts = _.map(groupedByAuthor, (authorBlogs, author) => ({
    author,
    likes: _.sumBy(authorBlogs, 'likes'),
  }))
  const topAuthor = _.maxBy(authorLikeCounts, 'likes')

  return topAuthor || {}
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}