import { useState } from 'react'
import { Button } from 'react-bootstrap'

const Post = ({ post, comment }) => {
    const [newComment, setNewComment] = useState("")
    const formStyle = {
        paddingBottom:20, 
        display:"flex"
    }
    const handleSubmit = (e) => {
        e.preventDefault()
    }

    return (
        <>
        <div className="card" key={post.id}>
            <h3>{post.title} by u:{post.user_id}</h3>
            <p>{post.content}</p>
            <div style={{display: "flex", justifyContent: "space-around"}}>

                <p>likes: {post.likes}</p>
                <p>{new Date(Date.parse(post.created_at)).toDateString()}</p>
            </div>

            <div className="card">
                <p><b>Comments</b></p>
                {comment ? (
                        <>
                        <div style={{display: "flex", justifyContent: "space-between"}}>
                            <p>User: {comment.user_id}</p>
                            <p>{comment.comment}</p>
                        </div>
                        </>
                ) : (
                    <p>Be the first one to comment</p>
                )}
                <form onSubmit={handleSubmit} style={formStyle}>
                    <div style={{ "width":"100%", paddingRight:10 }}>
                        <input type="text" class="form-control" value={newComment} onChange={(e) => setNewComment(e.target.value)} rows="4">{}</input>
                    </div>
                    <Button type="submit" value="Submit">Comment</Button>
                </form>
            </div>
           
        </div>
        </>
    )
}

export default Post