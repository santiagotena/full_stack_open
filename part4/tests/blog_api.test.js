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

test.only('a blog entry can be added', async() => {
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

  const notesAtEnd = await helper.notesInDb()
  assert.strictEqual(notesAtEnd.length, helper.initialBlogs.length + 1)

  const titles = notesAtEnd.map(n => n.title)
  assert(titles.includes('test title'))
})

after(async () => {
  await mongoose.connection.close()
})