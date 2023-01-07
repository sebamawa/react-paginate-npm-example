import ReactPaginate from "react-paginate";
import { useState, useEffect } from "react";
import './PaginatedItems.css';

// const items = [...Array(33).keys()];

function Items({ currentItems }) {
  return (
    <>
        <h2>Customers List</h2>

        <table className='table table-dark table-striped'>
            <thead>
                <tr>
                    <th scope='col'>Fullname</th>
                    <th scope='col'>Image</th>
                    <th scope='col'>Phone</th>
                </tr>
            </thead>
            <tbody>
                {currentItems.map((d)=> 
                    <tr key={d.cust_id} onClick={() => alert(`Se presiono sobre el cliente: ${d.cust_fullname}`)}>
                        <td>{d.cust_fullname}</td>
                        <td><img src={d.cust_image} alt={"img"} width="60px" height="60px"/></td>
                        <td>{d.cust_phone}</td>
                    </tr>
                )}
            </tbody>
        </table>
    </>
  );
}

function PaginatedItems({ itemsPerPage }) {
  // We start with an empty list of items.
  // const [currentItems, setCurrentItems] = useState(null);
  // const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  //*** */
  const [currentCustomers, setCurrentCustomers] = useState([]); // from API
  const [totalPages, setTotalPages] = useState(0); // from API


  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

//   useEffect(() => {
//     // Fetch items from another resources.
//     const endOffset = itemOffset + itemsPerPage;
//     console.log(`Loading items from ${itemOffset} to ${endOffset}`);
//     setCurrentItems(items.slice(itemOffset, endOffset));
//     setPageCount(Math.ceil(items.length / itemsPerPage));
//   }, [itemOffset, itemsPerPage]);

  //*** */  
  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    // const pageNumber = 
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    // setCurrentItems(items.slice(itemOffset, endOffset));
    // setPageCount(Math.ceil(items.length / itemsPerPage));
    // setCurrentCustomers(currentCustomers.slice(itemOffset, endOffset));

    try {
      const fetchCustomers = async () => {
        const response = await fetch(`http://192.168.1.5:8080/KBGymTemplateJavaMySQL/CustomersAPI/List?cust_active=true&page_number=${currentPage}&page_size=${itemsPerPage}`);
        const json = await response.json();
        console.log(json);
        setCurrentCustomers(json.SDTCustomers);
        setTotalPages(json.TotalPages);
      }
      fetchCustomers();
    } catch (error) {
      console.log(error);
    }
  }, [currentPage, itemOffset, itemsPerPage]);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    // const newOffset = event.selected * itemsPerPage % items.length;
    const newOffset = event.selected * itemsPerPage % currentCustomers.length;
    console.log(`User requested page number ${event.selected}, which is offset ${newOffset}`);
    setItemOffset(newOffset);
    setCurrentPage(event.selected+1);
  };

  return (
    <>
      {/* <Items currentItems={currentItems} /> */}
      <Items currentItems={currentCustomers} /> 
      <ReactPaginate
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        // pageCount={pageCount}
        pageCount={totalPages}
        previousLabel="< previous"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        renderOnZeroPageCount={null}
      />
    </>
  );
}

export default PaginatedItems;