import { useState, useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import { instance } from "../../../instance";
import { toast } from "react-toastify";

const EditPage: React.FC = () => {
  const { id } = useParams();
  const [productName, setProductName] = useState<string>("");
  const [purchasingPrice, setPurchasingPrice] = useState<string>("");
  const [sellingPrice, setSellingPrice] = useState<string>("");
  const [salesCharges, setSalesChange] = useState<string>("");
  const [qty, setQty] = useState<string>("");
  const [redirect, setRedirect] = useState<boolean>(false);
  useEffect(() => {
    (async function () {
      try {
        const { data } = await instance.get("/api/entry/show-by-id/" + id);
        console.log(data);
        setProductName(data.productName);
        setPurchasingPrice(data.purchasingPrice);
        setSellingPrice(data.sellingPrice);
        setSalesChange(data.salesCharges);
        setQty(data.quantity);
      } catch (error: any) {
        toast.error(error.response.data);
      }
    })();
  }, []);
  async function handleSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    try {
      const { data } = await instance.post("/api/entry/edit", {
        productName,
        sellingPrice,
        purchasingPrice,
        salesCharges,
        qty,
        id,
      });
      console.log(data);
      toast.success("Entry Successfully Edited");
      setRedirect(true);
    } catch (error: any) {
      toast.error(error.response.data);
    }
  }

  if (redirect) {
    return <Navigate to={"/dashboard/show-entry"} />;
  }

  return (
    <div className="min-h-screen bg-black px-7 py-2">
      <form
        action=""
        className="flex flex-col bg-dBlack justify-center items-center p-8 rounded-md"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col w-full my-2">
          <label className="text-white font-primary" htmlFor="product-name">
            Enter Product name
          </label>
          <input
            className="outline-none rounded-md p-2"
            type="string"
            step={"any"}
            name=""
            id="product-name"
            placeholder="eg: Transistors"
            value={productName}
            onChange={(ev) => setProductName(ev.target.value)}
          />
        </div>
        <div className="flex flex-col w-full my-2">
          <label className="text-white font-primary" htmlFor="purchasing-price">
            Enter Purchasing Price of a Product
          </label>
          <input
            className="outline-none rounded-md p-2"
            type="number"
            step={"any"}
            name=""
            id="purchasing-price"
            placeholder="$33"
            value={purchasingPrice}
            onChange={(ev) => setPurchasingPrice(ev.target.value)}
          />
        </div>
        <div className="flex flex-col w-full my-2">
          <label className="text-white font-primary" htmlFor="selling-price">
            Enter Selling Price
          </label>
          <input
            className="outline-none rounded-md p-2"
            type="number"
            step={"any"}
            name=""
            id="selling-price"
            placeholder="$333"
            value={sellingPrice}
            onChange={(ev) => setSellingPrice(ev.target.value)}
          />
        </div>
        <div className="flex flex-col w-full my-2">
          <label className="text-white font-primary" htmlFor="sales-charges">
            Enter Sales Charges per Product
          </label>
          <input
            className="outline-none rounded-md p-2"
            type="number"
            step={"any"}
            name=""
            id=""
            placeholder="$33"
            value={salesCharges}
            onChange={(ev) => setSalesChange(ev.target.value)}
          />
        </div>
        <div className="flex flex-col w-full my-2">
          <label className="text-white font-primary" htmlFor="qty">
            Enter Quantity
          </label>
          <input
            className="outline-none rounded-md p-2"
            type="number"
            name=""
            id="qty"
            placeholder="4"
            value={qty}
            onChange={(ev) => setQty(ev.target.value)}
          />
        </div>
        <button
          type="submit"
          className="py-2 px-6 bg-blue font-primary text-white rounded-md my-5"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default EditPage;
