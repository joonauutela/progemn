import React, { useState, useContext } from 'react'
import { Button, Form } from 'semantic-ui-react'
import { useMutation } from '@apollo/react-hooks'
import { withRouter } from 'react-router-dom'
import { CREATE_POST_MUTATION, FETCH_POSTS_QUERY } from '../../queries'
import { NotificationContext } from '../../context/notification'
import { useForm } from '../../util/hooks'
import Tag from '../Tag/Tag'

import './CreatePostForm.css'

const CreatePostForm = (props) => {
    const [errors, setErrors] = useState({})
    const [categories, setCategories] = useState([])
    const [category, setCategory] = useState('')

    const notificationContext = useContext(NotificationContext)

    const { onChange, onSubmit, values } = useForm(createPostCallback, {
        title: '',
        link: '',
        content: ''
    })

    const [createPost] = useMutation(CREATE_POST_MUTATION, {
        variables: {
            title: values.title,
            link: values.link,
            content: values.content,
            categories
        },
        refetchQueries: [{ query: FETCH_POSTS_QUERY }],
        onError(err) {
            const graphqlErrors = err.graphQLErrors[0].extensions.exception.errors
            if (graphqlErrors) {
                setErrors(graphqlErrors)
            } else {
                setErrors({})
            }
        },
        update() {
            values.title = ''
            values.link = ''
            values.content = ''
            setCategories([])
            notificationContext.addNotification({ message: 'Post created succesfully', type: 'success' })
            props.history.push('/posts')
        }
    })

    const addCategory = () => {
        if (!(categories.length >= 3 || categories.includes(category))) {
            setCategories([...categories, category.toLowerCase()])
            setCategory('')
        }
    }

    const removeCategory = (category) => {
        const newCategories = categories.filter(c => c !== category)
        setCategories(newCategories)
    }

    function createPostCallback() {
        createPost()
    }

    return (
        <div className="create-post-container">
            {Object.keys(errors).length > 0 &&
                <div className="ui error message">
                    <ul>
                        {Object.values(errors).map(value => (
                            <li key={value}>{value}</li>
                        ))}
                    </ul>
                </div>
            }
            <Form onSubmit={onSubmit}>
                <h1>Create post</h1>
                <Form.Input
                    label="Title"
                    placeholder="Title.."
                    name="title"
                    type="title"
                    value={values.title}
                    error={errors.title ? true : false}
                    onChange={onChange}
                />
                <Form.Input
                    label="Youtube link"
                    placeholder="Video link here.."
                    name="link"
                    type="link"
                    value={values.link}
                    error={errors.link ? true : false}
                    onChange={onChange}
                />
                <Form.TextArea
                    label="Content"
                    placeholder="Content.."
                    name="content"
                    type="content"
                    value={values.content}
                    error={errors.content ? true : false}
                    onChange={onChange}
                    rows="15"
                />
                <Form.Input
                    label="Categories (max 3 per post)"
                    placeholder="Add category"
                    name="categories"
                    type="category"
                    value={category}
                    error={errors.categories ? true : false}
                    onChange={event => setCategory(event.target.value)}
                />
                <div className="container">
                    <Button
                        name="categories"
                        type="button"
                        value={category}
                        onClick={() => addCategory()}
                    >
                        Add category
                    </Button>
                    <p className="selected-tags-label">Selected tags:</p>
                    {categories.map(category => (
                        <Tag
                            category={category}
                            removeCategory={removeCategory}
                            key={category}
                        />
                    )
                    )}
                </div>
                <Button type="submit" primary className="submit-post">
                    Create post
                </Button>
            </Form>
        </div>
    )
}

export default withRouter(CreatePostForm)
