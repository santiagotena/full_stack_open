const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: "Test",
		author: "Max",
		url: "http://abc",
		likes: 4
  },
  {
    title: "Test2",
		author: "Mustermann",
		url: "http://cba",
		likes: 2
  }
]

const nonExistingId = async () => {
  const blog = new Blog(
		{
			title: "abc",
			author: "abc",
			url: "http://aaa",
			likes: 0
		}
	)
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb
}