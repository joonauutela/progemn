import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import YoutubePlayer from '../components/YoutubePlayer'
import Loader from '../components/Loader'
import '../App.css'
import { useQuery } from '@apollo/react-hooks'
import { FETCH_POST_QUERY } from '../queries'

const PostDescription = () => {
    const { id } = useParams()
    const { data, loading } = useQuery(FETCH_POST_QUERY, {
        variables: { id }
    })
    if (loading) {
        return <Loader />
    }
    return (
        <div className="postContainer">
            <h1>{data.getPost.title}</h1>
            <p className="postInfo">Post made by Joona Uutela at 10.9.2020</p>
            <YoutubePlayer className="videoPlayer" />
            <br />
            <hr />
            <h3>User description</h3>
            <p className="postContent">{data.getPost.content}</p>
        </div>
    )
}

export default PostDescription