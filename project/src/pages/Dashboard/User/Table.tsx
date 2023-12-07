
import TableCard from "./TableCard";

interface UserFuncType {
    userFunc: () => void;
    users: userDataType[];
}
interface userDataType {
    _id: string;
    username: string;
    __v: number;
    admin: boolean;
}
const Table : React.FC<UserFuncType> = ({users, userFunc}) => {
    const sortedData = [...users].sort((a, b) => (b.admin ? 1: -1) - (a.admin? 1: -1))
    
    return (
        <div className="mt-3 flex flex-col gap-4">
            {sortedData.map(item => (
                <TableCard key={item._id} data={item} userFunc={userFunc}/>
            ))}
        </div>
    )
}

export default Table;