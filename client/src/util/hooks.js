import { useState, useCallback } from 'react'

export const useForm = (callback, initialState = {}) => {
    const [values, setValues] = useState(initialState)

    const onChange = useCallback(
        (event) => {
            setValues({ ...values, [event.target.name]: event.target.value })
        },
        [values],
    )

    const onSubmit = useCallback(
        (event) => {
            event.preventDefault()
            callback()
        },
        [callback],
    )

    return {
        onChange,
        onSubmit,
        values,
    }
}

export const getVideoID = (link) => {
    return link.split('=')[1]
}

export const getDate = (unmodifiedDate) => {
    // Modify the date from 'YYYY-MM-DDTXX:XX:XX.XXXX' to 'DD.MM.YYYY'
    const dateArray = unmodifiedDate.split('T')[0].split('-')
    return `${dateArray[2]}.${dateArray[1]}.${dateArray[0]}`
}

export const filterPosts = (allPosts, category, filter) => {
    const filteredPosts = allPosts.filter(post => post.categories.includes(category) || category === '')
    if (filter === 'likes') {
        filteredPosts.sort((a, b) => {
            return b.likes.length - a.likes.length
        })
    }
    if (filter === 'comments') {
        filteredPosts.sort((a, b) => {
            return b.comments.length - a.comments.length
        })
    }

    return filteredPosts
}