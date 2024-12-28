const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

test('there are two blogs', async() => {
  const response = await api.get('/api/blogs')
  assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

test('blogs should have a unique identifier property named "id"', async () => {
  const response = await api.get('/api/blogs')
  response.body.forEach((item) => {
    assert.ok('id' in item)
  })
})

test('a blog entry can be added', async() => {
  const newBlog = {
    title: 'test title',
    author: 'John Doe',
    url: 'url.com',
    likes: 5,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)

  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

  const titles = blogsAtEnd.map(n => n.title)
  assert(titles.includes('test title'))
})

test('the likes property defaults to zero when missing from the request', async() => {
  const newBlog = {
    title: 'no likes',
    author: 'John Doe',
    url: 'url.com',
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)

  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd[blogsAtEnd.length - 1].likes, 0)
})

test('blog without title or url are not added', async () => {
  const noTitleBlog = {
    author: 'John Doe',
    url: 'url.com',
    likes: 5,
  }

  await api
    .post('/api/blogs')
    .send(noTitleBlog)
    .expect(400)

  const noUrlBlog = {
    title: 'test title',
    author: 'John Doe',
    likes: 5,
  }

  await api
    .post('/api/blogs')
    .send(noUrlBlog)
    .expect(400)

  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
})

test.only('deletes a blog', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

  const blogsAtEnd = await helper.blogsInDb()

  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)

  const titles = blogsAtEnd.map(r => r.title)
  assert(!titles.includes(blogToDelete.title))
})

after(async () => {
  await mongoose.connection.close()
})