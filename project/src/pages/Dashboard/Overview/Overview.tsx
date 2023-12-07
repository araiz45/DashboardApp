import {useContext} from 'react'
import { UserContext, UserContextProps } from "../../../context/context";
const Overview: React.FC = () => {
    const {username} = useContext(
        UserContext
      ) as UserContextProps
    
    return (
        <div className="min-h-screen bg-black font-primary flex justify-center items-center flex-col gap-6">
            <h1 className="text-5xl font-bold text-blue">Welcome {username} 👋</h1>
            <p className="text-xl text-primary">Add a new entry</p>
        </div>
    )
}

export default Overview;