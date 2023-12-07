import Form from "./Form";
import Table from "./Table";
import { instance } from "../../../instance";
import {useEffect, useState} from 'react'

interface userDataType {
    _id: string;
    username: string;
    __v: number;
    admin: boolean
}

const User: React.FC = () => {
    const [users, setUsers] = useState<userDataType[]>([])
    async function handleUsers () {
        try {
            const response = await instance.get("/api/user/getUser");
            setUsers(response.data.users)

        } catch (error) {
            
        }
    }

    useEffect(() => {
        handleUsers();
    }, [])
    return (
        <div className="bg-black min-h-screen p-3">
            <Form userFunc={handleUsers} />
            <Table userFunc={handleUsers} users={users} />
        </div>
    )
}

export default User;