import React, {useState} from 'react'

export default function AuthorEditForm(props) {
    
  const [author, setAuthor] = useState(props.author)

  const handleChange = (event) => {
    const attributeToChange = event.target.name
    const newValue = event.target.value

    const updatedAuthor = {...author}
    updatedAuthor[attributeToChange] = newValue
    console.log(updatedAuthor)
    setAuthor(updatedAuthor)
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    props.editAuthor(author);
  }

  return (
    <div>
        <h1>Edit Author</h1>

        <form onSubmit={handleSubmit}>
            <div>
                <label>Name</label>
                <input type="text" name="name" onChange={handleChange} value={author.name}></input>
            </div>

            <div>
                <label>Email Address</label>
                <input type="text" name="emailAddress" onChange={handleChange} value={author.emailAddress}></input>
            </div>

            <div>
                <label>Phone Number</label>
                <input type="text" name="phoneNumber" onChange={handleChange}  value={author.phoneNumber}></input>
            </div>

            <div>
                <input type="submit" value="Update Author"></input>
            </div>
        </form>
    </div>
  )
}
