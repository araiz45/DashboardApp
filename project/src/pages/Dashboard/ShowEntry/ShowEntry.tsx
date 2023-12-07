import { instance } from "../../../instance";
import EntryCard from "./EntryCard";
import { useEffect, useState } from "react";

interface EntryType {
  productName: string;
  salesmanName: String;
  purchasingPrice: number;
  sellingPrice: number;
  salesCharges: number;
  quantity: Number;
  totalSalesCharges: number;
  totalPurchasingPrice: number;
  totalSellingPrice: number;
  totalProfit: number;
  createdAt: Date;
  _id: string;
}

const ShowEntry: React.FC = () => {
  const [entry, setEntry] = useState<EntryType[] | null>(null);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  async function handleRequest() {
    // console.log(page, totalPages);
    try {
      if (page > 0) {
        const response = await instance.get(`/api/entry/show?page=${page}`);
        console.log(response);
        setTotalPages(response.data.totalPages);
        setEntry(response.data.data);
        setCurrentPage(response.data.currentPage);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    handleRequest();
  }, []);
  return (
    <div className="w-full min-h-screen bg-black flex flex-col">
      {entry &&
        entry.map((e) => (
          <EntryCard key={e._id} data={e} reqFunc={handleRequest} />
        ))}
      <div className="flex gap-2 mx-auto my-9">
        <button
          className="py-2 px-4 bg-blue font-primary text-primary rounded-md"
          onClick={() => {
            console.log(page);
            page > 1 ? setPage(page - 1) : setPage(1);
            handleRequest();
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 inline"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
            />
          </svg>{" "}
          Previous
        </button>
        <button
          className="py-2 px-4 bg-blue font-primary text-primary rounded-md"
          onClick={() => {
            console.log(page, totalPages);
            page < totalPages ? setPage(page + 1) : setPage(totalPages);
            handleRequest();
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 inline"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 15l6-6m0 0l-6-6m6 6H9a6 6 0 000 12h3"
            />
          </svg>{" "}
          Next
        </button>
      </div>
      <div className="fixed bottom-9 right-9 bg-blue text-white px-4 font-primary rounded-md py-2 text-xs">
        <span>
          Page: {currentPage} | Number of Pages: {totalPages}{" "}
        </span>
      </div>
    </div>
  );
};

export default ShowEntry;
