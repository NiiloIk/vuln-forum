import Post from "../../components/Post"

const Posts = ({ posts, comments }) => {
    const getComment = (post_id) => {
        return comments.find(c => c.post_id === post_id)
    }
    const getCommentAmount = (post_id) => {
        return comments.filter(c => c.post_id === post_id).length
    }

    return (
        <>
            <h2>Latest Posts</h2>
            {posts.map(post =>
                <div key={post.id}>
                    <Post post={post} comment={getComment(post.id)} commentCount={getCommentAmount(post.id)}/>
                </div>
            )}
        </>
    )
}

export default Posts