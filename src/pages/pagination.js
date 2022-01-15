import Button from "@material-ui/core/Button";
import { useEffect, useRef, useState } from "react";

const Pagination = () => {
  const [currentTableData, setCurrentTableData] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const totalPage = useRef(0);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch(
        `https://reqres.in/api/users?page=${pageNumber}`
      );
      const result = await response.json();
      setCurrentTableData(result.data);
      totalPage.current = result.total_pages;
    };
    fetchUsers();
  }, [pageNumber]);

  const firstPage = () => {
    setPageNumber(1);
  };

  const nextPage = () => {
    setPageNumber(pageNumber + 1);
  };

  const previousPage = () => {
    setPageNumber(pageNumber - 1);
  };

  const lastPage = () => {
    setPageNumber(totalPage.current);
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>FIRST NAME</th>
            <th>LAST NAME</th>
            <th>EMAIL</th>
            <th>IMG</th>
          </tr>
        </thead>
        <tbody>
          {currentTableData.map((item) => {
            return (
              <tr>
                <td>{item.id}</td>
                <td>{item.first_name}</td>
                <td>{item.last_name}</td>
                <td>{item.email}</td>
                <td>{item.avatar}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div>
        <Button
          variant="outlined"
          color="primary"
          disabled={pageNumber === totalPage.current ? true : false}
          onClick={firstPage}
        >
          First
        </Button>
        <Button variant="outlined" color="primary" onClick={nextPage}>
          Next
        </Button>
        <Button variant="outlined" color="primary" onClick={previousPage}>
          Previous
        </Button>
        <Button
          variant="outlined"
          color="primary"
          disabled={pageNumber === 1 ? true : false}
          onClick={lastPage}
        >
          Last
        </Button>
      </div>
    </div>
  );
};

export default Pagination;
