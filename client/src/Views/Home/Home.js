import React, { useState } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { FETCH_POSTS_QUERY } from '../../queries'
import { Grid } from 'semantic-ui-react'

import Post from '../../components/Post/Post'
import Loader from '../../components/Loader'
import SelectCategory from '../../components/Selects/SelectCategory'
import SelectFilter from '../../components/Selects/SelectFilter'

import './Home.css'

const Home = () => {
    const [category, setCategory] = useState('all')
    const [filter, setFilter] = useState('mostRecent')

    const { loading, data } = useQuery(FETCH_POSTS_QUERY)
    if (loading) {
        return <Loader />
    }
    return (
        <div className='posts-container'>
            <h1 className='posts-header'>Posts</h1>
            <div className='select-wrapper'>
                <SelectCategory category={category} setCategory={setCategory} />
                <SelectFilter filter={filter} setFilter={setFilter} />
            </div>
            <Grid divided='vertically'>
                <Grid.Row columns={2}>
                    <Grid.Column>
                        {data.getPosts.map((post, index) => {
                            if (!(index % 2)) {
                                return <Post
                                    key={post.id}
                                    title={post.title}
                                    link={post.link}
                                    likes={post.likes}
                                    content={post.content}
                                    createdAt={post.createdAt}
                                    id={post.id}
                                />
                            }
                            return null
                        })}
                    </Grid.Column>
                    <Grid.Column>
                        {data.getPosts.map((post, index) => {
                            if (index % 2) {
                                return <Post
                                    key={post.id}
                                    title={post.title}
                                    link={post.link}
                                    likes={post.likes}
                                    content={post.content}
                                    createdAt={post.createdAt}
                                    id={post.id}
                                />
                            }
                            return null
                        })}
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </div >
    )
}

export default Home