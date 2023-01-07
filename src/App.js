// import logo from './logo.svg';
import './App.css';
// import { useState, useEffect } from 'react';

import PaginatedItems from './components/PaginatedItems';

function App() {

  // const [customers, setCustomers] = useState([]);
  // const [currentPage, setCurrentPage] = useState(1);

  // useEffect(() => {

  //   try {
  //     const fetchCustomers = async () => {
  //       const response = await fetch(`http://192.168.1.5:8080/KBGymTemplateJavaMySQL/CustomersAPI/List?cust_active=true&page_number=${currentPage}&page_size=3`);
  //       const json = await response.json();
  //       console.log(json);
  //       setCustomers(json.SDTCustomers);
  //     }
  //     fetchCustomers();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, [currentPage]);

  return (
    <div className="App">
      <header className="App-header">
        <PaginatedItems 
          itemsPerPage={4} 
        />
      </header>
    </div>
  );
}

export default App;
