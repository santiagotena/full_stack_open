const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcrypt')

const helper = require('./test_helper')

const User = require('../models/user')
const Blog = require('../models/blog')

describe('when there is initially some notes saved', () => {

  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
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

  test('deletes a blog', async () => {
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

  test('updates a blog', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    const updatedBlog = {
      title: 'Updated Title',
      author: blogToUpdate.author,
      url: blogToUpdate.url,
      likes: blogToUpdate.likes + 1,
    }

    const response = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlog)
      .expect(200)

    const blogsAtEnd = await helper.blogsInDb()

    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)

    const updatedBlogInDb = blogsAtEnd.find(blog => blog.id === blogToUpdate.id)
    assert(updatedBlogInDb)
    assert.strictEqual(updatedBlogInDb.title, updatedBlog.title)
    assert.strictEqual(updatedBlogInDb.likes, updatedBlog.likes)
  })
})

describe('when there is initially one user at db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    assert(usernames.includes(newUser.username))
  })

  test('user creation fails if username or password are missing', async () => {
    const usersAtStart = await helper.usersInDb()

    const noUsername = {
      name: 'Name',
      password: 'password',
    }

    const result = await api
      .post('/api/users')
      .send(noUsername)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()

    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    assert(result.body.error.includes('username and password are required'))

    const noPassword = {
      username: 'username',
      name: 'Name',
    }

    const result2 = await api
      .post('/api/users')
      .send(noPassword)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd2 = await helper.usersInDb()

    assert.strictEqual(usersAtEnd2.length, usersAtStart.length)
    assert(result2.body.error.includes('username and password are required'))
  })
})

after(async () => {
  await mongoose.connection.close()
})