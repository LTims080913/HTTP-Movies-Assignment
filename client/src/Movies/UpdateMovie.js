import React, {useState, useEffect} from 'react'
import {useParams, useHistory} from 'react-router-dom'
import axios from 'axios'

const initialState = {
    title: '',
    director: '',
    metascore: '',
    stars: ''
}

export const UpdateMovie = (props) => {
    const params = useParams();
    const {push} = useHistory();
    const [updatedMovie, setUpdatedMovie] = useState(initialState)

    const handleChange = e => {
        e.persist();
        setUpdatedMovie({
            ...updatedMovie,
            [e.target.name]:e.target.value
        })

    }

    useEffect(() => {
        axios
        .get(`http://localhost:5000/api/movies/${params.id}`)
        .then(res => {
            console.log(res)
            setUpdatedMovie(res.data)
        })
        .catch(error => {
            console.log(error)
        })
    }, [params.id])

    const handleSubmit = e => {
        e.preventDefault();
        axios
        .put(`http://localhost:5000/api/movies/${params.id}`, updatedMovie)
        .then(res => {
            console.log(res.data)
            props.getMovieList()
            push('/')
            
        })
        .catch(error => {
            console.log(error)
        })
    }

    

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Title: 
            </label>
            <input
                name='title'
                placeholder='Name of Movie'
                type='text'
                value={updatedMovie.title}
                onChange={handleChange}
                />
            <label>
                Director: 
            </label>
            <input
                name='director'
                placeholder='Who made it?'
                type='text'
                value={updatedMovie.director}
                onChange={handleChange}
                />
            <label>
                Metascore: 
            </label>
            <input
                name='metascore'
                placeholder='What do you rate it?'
                type='text'
                value={updatedMovie.metascore}
                onChange={handleChange}
                />
            <label>
                Stars: 
            </label>
            <input
                name='stars'
                placeholder='Who is in the movie?'
                type='text'
                value={updatedMovie.stars}
                onChange={handleChange}
                />
            <button type="submit">UPDATE</button>
        </form>
    )
}
