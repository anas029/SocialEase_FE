import React, {useState} from 'react'

export default function AuthorCreateForm(props) {

    const [newAuthor, setNewAuthor] = useState({})


  const handleChange = (event) => {
    const attributeToChange = event.target.name
    const newValue = event.target.value

    const author = {...newAuthor}
    author[attributeToChange] = newValue
    console.log(author)
    setNewAuthor(author)
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    props.addAuthor(newAuthor);
  }

  return (
    <div>
        <h1>Create Author</h1>

        <form onSubmit={handleSubmit}>
            <div>
                <label>Name</label>
                <input type="text" name="name" onChange={handleChange}></input>
            </div>

            <div>
                <label>Email Address</label>
                <input type="text" name="emailAddress" onChange={handleChange}></input>
            </div>

            <div>
                <label>Phone Number</label>
                <input type="text" name="phoneNumber" onChange={handleChange}></input>
            </div>

            <div>
                <input type="submit" value="Add Author"></input>
            </div>
        </form>
    </div>
  )
}
