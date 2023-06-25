import React,{useState,useEffect} from 'react'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import './App.css'


const Table = ({ setSwitch, createUserSwitch, handleEdit }) => {
    const [users, setUsers] = useState([]);

    const getUsers = async () => {
        try {
            const data = await fetch(`/getUsers`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const res = await data.json();
            // console.log(res);
            setUsers(res);

        } catch (error) {
            console.log(error)
        }
    }

    const deleteUser = async (id) => {
        try {
            const data = await fetch(`/deleteUser/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const res = await data.json();
            console.log(res, "deletedUser")

        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
                 getUsers();
    },[users])
    return (
        <div className="table">
            <section className="table__header">
                <h1>User's Details</h1>
                <div className="add_user">
                    <button className="add_user-btn" title="Add User" onClick={() => setSwitch(!createUserSwitch)}></button>
                </div>
            </section>
            <section className="table__body">
                <table>
                    <thead>
                        <tr>
                            <th> Name </th>
                            <th> Email </th>
                            <th> Mobile No.</th>
                            <th> Options</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        users.map((user,i)=>{
                              return(
                                <tr key={i}>
                                <td> <img src="https://w7.pngwing.com/pngs/717/24/png-transparent-computer-icons-user-profile-user-account-avatar-heroes-silhouette-black-thumbnail.png" alt="" />{user.name}</td>
                                <td> {user.email}</td>
                                <td> {user.number} </td>
                                <td>
                                    <ModeEditOutlineIcon className='hov' onClick={() => handleEdit(user._id)} />
                                    <DeleteOutlineIcon className='hov-del' onClick={()=> deleteUser(user._id)}/>
                                </td>
                            </tr>
                              )
                        })
                    }

                    </tbody>
                </table>
            </section>
        </div>
    )
}

export default Table
