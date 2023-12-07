import {useState} from 'react'
import { instance } from '../../../instance';
import { toast } from 'react-toastify';

  

interface propsInstanceType {
    userFunc: () => void;
}

const Form: React.FC<propsInstanceType> = (props) => {
    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>('')
    const [admin, setAdmin] = useState<boolean>(false)
    function resetFunction () {
        setUsername("");
        setPassword("")
    }
    async function handleSubmit (ev: React.FormEvent<HTMLFormElement>) {
        ev.preventDefault();
        console.log(username, password, admin)
        if(username.length !== 0 && password.length !==0){
            try {
                const response = await instance.post("/api/user/register", {
                    username,
                    password,
                    admin
                })
                console.log(response)
                resetFunction();
                toast.success('User has been created successfully');
                props.userFunc();
            } catch (error: any) {
                console.log(error)
                toast.error(error.response.data)
            }

        }else{
            console.log('done')
            toast.error("Missing Credentials")
        }
    } 
    return (
        <div className=" min-h-[10rem] flex justify-center bg-dBlack p-12 rounded-md">
        <form className="flex flex-col gap-4 justify-center items-center" onSubmit={handleSubmit}>
            <input type="text" name="username" id="username" placeholder="Username" className="p-2 w-[33rem] rounded-sm outline-none font-primary" onChange={e => setUsername(e.target.value)} value={username}/>
            <input type="password" name="password" id="password" placeholder="Password" className="p-2 w-[33rem] rounded-sm outline-none font-primary" onChange={e => setPassword(e.target.value)} value={password}/>
            <label className='font-primary text-primary'>Are you want to upgrade this user to admin <input type='checkbox' className='' onChange={() => admin ? setAdmin(false) : setAdmin(true)}/></label>
            <button type="submit" className="bg-blue w-[10rem] p-2 font-primary text-primary rounded-md">Register</button>
        </form>        
        </div>
    )
}

export default Form;