import { Link } from "react-router-dom";

const Index: React.FC = () => {
    return (
        <div className="min-h-screen bg-black flex flex-col justify-center items-center gap-8">
            <h1 className="text-4xl font-bold text-white font-primary">Welcome to Dashboard Application</h1>
            <Link to={"/login"} className="py-2 px-8 bg-blue font-primary text-primary rounded-md">Login</Link>
        </div>
    )
}

export default Index;