import { instance } from "../../../instance";
import { toast } from "react-toastify";
interface TablePropType {
  data: dataType;
  userFunc: () => void;
}

interface dataType {
  _id: string;
  username: string;
  __v: number;
  admin: boolean;
}
const TableCard: React.FC<TablePropType> = (props) => {
  async function handleDelete() {
    try {
      const response = await instance.post("/api/user/deleteUser", {
        id: props.data._id,
      });
      props.userFunc();
      toast.success(response.data);
    } catch (error) {}
  }
  return (
    <div className="w-full bg-dBlack p-4 flex justify-between rounded-md">
      <div className="font-primary text-primary">
        {props.data.username}{" "}
        {props.data.admin ? (
          <span className="italic text-sm text-gray-400"> - Admin</span>
        ) : (
          ""
        )}
      </div>
      {/* <button className="px-4 font-primary border-red-700 border-2 text-red-700 hover:bg-red-700 hover:text-primary transition-all rounded-md" onClick={handleDelete}>delete</button> */}
    </div>
  );
};

export default TableCard;
