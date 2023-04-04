import React from 'react'

export default function Author(props) {
  return (
    <>
        <td>{props.name}</td>
        <td>{props.emailAddress}</td>
        <td><button onClick={() => {props.editView(props._id)}}>Edit</button></td>
        <td><button onClick={() => {props.deleteAuthor(props._id)}}>Delete</button></td>
    </>
  )
}
