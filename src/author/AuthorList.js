import React, {useState, useEffect} from 'react'
import Axios from 'axios'
import Author from './Author';
import AuthorCreateForm from './AuthorCreateForm';
import AuthorEditForm from './AuthorEditForm';

export default function AuthorList() {

    const [authors, setAuthors] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
    const [currentAuthor, setCurrentAuthor] = useState("");

    useEffect(() => {
        loadAuthorsList()
    }, [])
    
    const loadAuthorsList = () => {
        Axios.get("author/index")
        .then((response) => {
          console.log(response)
          // State to store the data
          setAuthors(response.data.authors)
        })
        .catch((err) => {
          console.log("Error Retreiving Authors")
          console.log(err)
        })
    }

    const addAuthor = (author) => {
        Axios.post("author/add", author,
        {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        }
        )
        .then(res => {
            console.log("Author Added Successfully!!!")
            loadAuthorsList();
        })
        .catch(err => {
            console.log("Error Adding Author")
            console.log(err)
        })
    }

    const editView = (id) => {
        Axios.get(`author/edit?id=${id}`,
        {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
        .then(res => {
            console.log(res.data.author)
            let author = res.data.author
            console.log("Loaded Author Information")
            setIsEdit(true)
            setCurrentAuthor(author)
        })
        .catch(err => {
            console.log("Error Loading Author Information")
            console.log(err)
        })
    }

    const editAuthor = (author) => {
        Axios.put("author/update", author,
        {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
        .then(res => {
            console.log("Author Updated Successfully!!!")
            console.log(res);
            loadAuthorsList();
        })
        .catch( err=> {
            console.log("Error Editing Author")
            console.log(err)
        })
    }

    const deleteAuthor = (id) => {
        Axios.delete(`author/delete?id=${id}`,
        {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
        .then(res => {
            console.log("Record Delete Successfully!!!")
            console.log(res)
            loadAuthorsList();
        })
        .catch(err => {
            console.log("Error Deleting Author")
            console.log(err)
        })
    }

    // console.log(authors)

    const allAuthors = authors.map((author, index) => (
        <tr key={index}>
            <Author {...author} editView={editView} deleteAuthor={deleteAuthor}/>
        </tr>
    ))

  return (
    <div>
        <h1>Authors List</h1>
        <div>
            <table>
                <tbody>
                    <tr>
                        <th>Name</th>
                        <th>Email Address</th>
                    </tr>
                    {allAuthors}
                </tbody>
            </table>
        </div>
        {(!isEdit) ?
         <AuthorCreateForm addAuthor={addAuthor}/>
            :
        <AuthorEditForm key={currentAuthor._id} author={currentAuthor} editAuthor={editAuthor}/>
        }
    </div>
  )
}
