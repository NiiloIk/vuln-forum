import { useState } from 'react'
import { Button } from 'react-bootstrap'

const CreatePost = ({ setPosts }) => {
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")

    const formStyle = {
      paddingBottom:20, 
      display:"flex", 
      flexDirection:"column"
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!title.trim() || ! content.trim()) {
            console.log("Title and content required.")
            return
        }
        const newPost = {
            id: Date.now(),
            user_id: Math.floor(Math.random()* 1000),
            title,
            content,
            likes: 0,
            created_at: new Date().toISOString(),
            modified_at: new Date().toISOString(),
        }
        setPosts((posts) => [newPost, ...posts])
        setTitle("")
        setContent("")
    }
  return (
  <>
        <h2>Create a new post</h2>
        <form onSubmit={handleSubmit} style={formStyle}>
            <div class="mb-2">
                <input type="text" class="form-control" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div class="mb-2">
                <textarea 
                    placeholder="Content"
                    style={{ maxHeight: 256 }} 
                    class="form-control" 
                    value={content} 
                    onChange={(e) => setContent(e.target.value)} 
                    rows="4">
                </textarea>
            </div>
            <Button type="submit" value="Submit">Submit</Button>
        </form>
  </>
  )
}
export default CreatePost