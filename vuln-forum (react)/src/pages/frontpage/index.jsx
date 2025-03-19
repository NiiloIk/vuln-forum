import { useState } from 'react'
import Posts from './Posts'
import CreatePost from './CreatePost'

const Frontpage = () => {
    const [posts, setPosts] = useState([
        {
          id: 1,
          user_id: 101,
          title: "Getting Started with JavaScript",
          content: "JavaScript is a versatile programming language used for web development...",
          likes: 25,
          created_at: "2025-03-06T10:00:00Z",
          modified_at: "2025-03-06T12:00:00Z"
        },
        {
          id: 2,
          user_id: 102,
          title: "Understanding Async/Await",
          content: "Async/Await makes handling asynchronous code much easier in JavaScript...",
          likes: 42,
          created_at: "2025-03-05T15:30:00Z",
          modified_at: "2025-03-06T09:15:00Z"
        },
        {
          id: 3,
          user_id: 103,
          title: "CSS Tricks for Responsive Design",
          content: "Responsive design is crucial for modern web applications...",
          likes: 30,
          created_at: "2025-03-04T18:45:00Z",
          modified_at: "2025-03-05T08:20:00Z"
        }
    ])

    const [comments, setComments] = useState([
      {
          id: 1,
          post_id: 1,
          user_id: 201,
          comment: "Great introduction! JavaScript can be tricky at first, but it's really powerful.",
          created_at: "2025-03-06T11:00:00Z",
          modified_at: "2025-03-06T11:05:00Z"
      },
      {
          id: 2,
          post_id: 1,
          user_id: 202,
          comment: "I love using JavaScript for frontend development!",
          created_at: "2025-03-06T12:30:00Z",
          modified_at: "2025-03-06T12:35:00Z"
      },
      {
          id: 3,
          post_id: 2,
          user_id: 203,
          comment: "Async/Await has made my code so much cleaner. Thanks for the post!",
          created_at: "2025-03-05T16:00:00Z",
          modified_at: "2025-03-05T16:10:00Z"
      },
      {
          id: 4,
          post_id: 2,
          user_id: 204,
          comment: "Could you also explain error handling with try/catch in Async/Await?",
          created_at: "2025-03-05T17:45:00Z",
          modified_at: "2025-03-05T18:00:00Z"
      },
  ])
  

    return (<>
        <h1>Welcome to Fragile Forum</h1>
        <p>please don't post any sensitive data as we have been experiencing data breaches </p>
        <br />
        <div className="card">
          <CreatePost setPosts={ setPosts } />
          <hr />
          <Posts posts={posts} comments={comments}/>
        </div>
    </>)
}

export default Frontpage