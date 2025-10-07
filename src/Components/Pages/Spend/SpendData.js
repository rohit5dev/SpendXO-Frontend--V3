import React, {
  useRef,
  useState,
  useCallback,
  useMemo,
  useEffect,
} from "react";
import { Form, Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
// ag grid
import Dropdown from "react-bootstrap/Dropdown";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "./css/SpendData.css";
import axios from "axios";
import apiUrls from "../../../Config/apiUrls";
import { formatCompactNumber } from "../../../Config/formatCompactNumber";
import { months, requestHeader } from "../../Helper/Constants/constant";
import Loading from "../../Helper/Loading";
//ICONS
import { CiFilter } from "react-icons/ci";
import { RiLoader2Fill } from "react-icons/ri";
import { MdOutlineRestartAlt } from "react-icons/md";
import { CiExport } from "react-icons/ci";
import { toast } from "react-toastify";
import toastMessages from "../../Helper/Constants/toastMessages";

const SpendData = () => {
  const [loading, setLoading] = useState(false);
  const [rowHeight, setRowHeight] = useState(24);
  const [rowFont, setRowFont] = useState(11);
  //spend data
  const [spendKpi, setSpendKpi] = useState();
  const [spendKpiMain, setSpendKpiMain] = useState();
  const [spendData, setSpendData] = useState([]);
  const [spendMain, setSpendMain] = useState([]);
  const pageSize = 1000;
  const [lastId, setLastId] = useState(0);
  const [mainId, setMainId] = useState(0);
  const [isAllSelected, setIsAllSelected] = useState(false);

  // filters state
  const [filters, setFilters] = useState([]);
  const [filtersL1, setFiltersL1] = useState([]);
  const [filtersL2, setFiltersL2] = useState([]);
  const [filtersL3, setFiltersL3] = useState([]);
  const [filtersL4, setFiltersL4] = useState([]);
  const [filtersVendor, setFiltersVendor] = useState([]);
  const [filterscompany, setFiltersCompany] = useState([]);
  const [filterscountries, setFiltersCountries] = useState([]);
  const [filtersYears, setFiltersYears] = useState([]);
  const [filtersMonths, setFiltersMonths] = useState(months); //months required
  const [l1, setL1] = useState("All");
  const [l2, setL2] = useState("All");
  const [l3, setL3] = useState("All");
  const [l4, setL4] = useState("All");
  const [company, setCompany] = useState("All");
  const [vendor, setVendor] = useState("All");
  const [country, setCountry] = useState("All");
  const [month, setMonth] = useState("All");
  const [year, setYear] = useState("All");
  const [exportRows, setExportRows] = useState(50000);

  //query state
  const queryParams = [
    l1 && l1 !== "All" && `ReportingLevel1='${l1}'`,
    l2 && l2 !== "All" && `ReportingLevel2='${l2}'`,
    l3 && l3 !== "All" && `ReportingLevel3='${l3}'`,
    l4 && l4 !== "All" && `ReportingLevel4='${l4}'`,
    company && company !== "All" && `CompanyName='${company}'`,
    vendor && vendor !== "All" && `VendorNameHarmonized='${vendor}'`,
    country && country !== "All" && `Entity_Country='${country}'`,
    month && month !== "All" && `PostingMonth=${month}`,
    year && year !== "All" && `PostingYear=${year}`,
  ];

  const finalQuery = queryParams.filter(Boolean).join(" AND ");

  //export modal add action popup
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //ag grid
  const gridRef = useRef();
  const [columnDefs, setColumnDefs] = useState([]);
  // Default column settings
  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      resizable: true,
      headerClass: "grid-style",
      height: "250px",
      cellStyle: {
        fontSize: rowFont,
        textAlign: "center",
        display: "flex",
        alignItems: "center",
      },
    }),
    [rowFont]
  );

  // Initialize grid on ready
  const onGridReady = () => {
    // const api = gridRef.current.api;
  };
  const cellClickedListener = useCallback((event) => {
    console.log("cellClicked", event);
  }, []);

  // Get Kpi Data
  const getSpendKpi = async () => {
    await axios
      .get(
        `${apiUrls.urlPrefix}/spend-kpis?SpendData_Clause=${encodeURIComponent(
          finalQuery
        )}`,
        requestHeader.json
      )
      .then((response) => {
        const data = response.data.result;
        setSpendKpi(data);
        if (!spendKpiMain) {
          console.log("set spend kpi main");
          setSpendKpiMain(data);
        }
      })
      .catch((error) => {
        console.log(error.message);
        console.log(toastMessages.errorMsgApi);
      });
  };

  //Get Spend Filters
  const getSpendFilters = async () => {
    console.log(finalQuery, "filters");
    await axios
      .get(
        `${
          apiUrls.urlPrefix
        }/spend-filters?SpendData_Clause=${encodeURIComponent(finalQuery)}`,
        requestHeader.json
      )
      .then((response) => {
        const data = response.data.result;
        if (filters.length === 0) {
          setFilters(data);
        }
        handleFilterSet(data);
      })
      .catch((error) => {
        console.log(error.message);
        console.log(toastMessages.errorMsgFilters);
      });
  };

  // function Filter set
  function handleFilterSet(response) {
    // Assuming response.data.result contains all your arrays
    const reportingLevel1 = response.ReportingLevel1;
    const reportingLevel2 = response.ReportingLevel2;
    const reportingLevel3 = response.ReportingLevel3;
    const reportingLevel4 = response.ReportingLevel4;
    const vendorName = response.VendorName;
    const companyName = response.CompanyName;
    const countries = response.Countries;
    const years = response.Years;

    // Prepend "All" to each array
    setFiltersL1(["All", ...reportingLevel1]);
    setFiltersL2(["All", ...reportingLevel2]);
    setFiltersL3(["All", ...reportingLevel3]);
    setFiltersL4(["All", ...reportingLevel4]);
    setFiltersVendor(["All", ...vendorName]);
    setFiltersCompany(["All", ...companyName]);
    setFiltersCountries(["All", ...countries]);
    setFiltersYears(["All", ...years]);
  }

  // Function to load spend data
  const getSpendData = async (loadCount, page, localFilter) => {
    setLoading(true);
    await axios
      .get(
        `${
          apiUrls.urlPrefix
        }/spend-data?lastId=${loadCount}&pageSize=${page}&SpendData_Clause=${encodeURIComponent(
          finalQuery
        )}`,
        requestHeader.json
      )
      .then((response) => {
        setLoading(false);
        const data = response.data.result;
        const fields =
          data?.length > 0
            ? Object.keys(data[0]).map((key) => ({ field: key }))
            : [];

        fields.shift();
        setColumnDefs(fields);
        handleSpendResponse(data, localFilter);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error.message);
      });
  };

  //Reponse Function
  function handleSpendResponse(res, localFilter) {
    if (finalQuery === "") {
      if (spendData.length === 0) {
        setSpendData(res);
        setSpendMain(res);
      } else {
        let ar = spendData;
        setSpendData([...ar, ...res]);
        setSpendMain([...ar, ...res]);
      }
      let newId = res[res.length - 1].Id;
      setLastId(newId);
      setMainId(newId);
      console.log(newId);
    } else {
      //handle filter spend load
      let lc;
      if (localFilter) {
        if (localFilter.length > 0) lc = [...localFilter, ...res];
        else lc = [...res];
      } else lc = [...res];
      setSpendData(lc);
      let newId = res[res.length - 1].Id;
      setLastId(newId);
    }
  }

  useEffect(() => {
    getSpendData(lastId, pageSize);
    getSpendKpi();
    getSpendFilters();
  }, []);

  const filterThoughInitialData = (isAll) => {
    // Filter the data based on the criteria
    let arr;
    if (isAll) arr = [...spendMain];
    else arr = [...spendData];
    console.log(isAll, arr, l1, l2);
    const filteredData = arr.filter((item) => {
      const matchesL1 = l1 && l1 !== "All" ? item.ReportingLevel1 === l1 : true;
      const matchesL2 = l2 && l2 !== "All" ? item.ReportingLevel2 === l2 : true;
      const matchesL3 = l3 && l3 !== "All" ? item.ReportingLevel3 === l3 : true;
      const matchesL4 = l4 && l4 !== "All" ? item.ReportingLevel4 === l4 : true;
      const matchesCompany =
        company && company !== "All" ? item.CompanyName === company : true;
      const matchesVendor =
        vendor && vendor !== "All" ? item.VendorName === vendor : true;
      const matchesCountry =
        country && country !== "All" ? item.Entity_Country === country : true;
      const matchesYear =
        year && year !== "All" ? item.PostingYear === year : true;
      const matchesMonth =
        month && month !== "All" ? item.PostingMonth === month : true;

      return (
        matchesL1 &&
        matchesL2 &&
        matchesL3 &&
        matchesL4 &&
        matchesCompany &&
        matchesVendor &&
        matchesCountry &&
        matchesYear &&
        matchesMonth
      );
    });

    console.log(filteredData);

    return filteredData;
  };

  const handleLoadMore = async () => {
    if (spendData.length < pageSize) return; // if data already less than pageSize, don't load more

    gridRef.current.api.showLoadingOverlay(); // Show AG Grid loading overlay

    try {
      if (finalQuery === "") {
        await getSpendData(lastId, pageSize); // Wait for data to be loaded
      } else {
        await getSpendData(lastId, pageSize, spendData); // Wait for data to be loaded
      }
    } catch (error) {
      console.error("Error loading data", error);
    } finally {
      gridRef.current.api.hideOverlay(); // Hide AG Grid loading overlay
    }
  };

  const handleApplyFilter = async () => {
    //handle if apply with same query again
    if (finalQuery === "") {
      handleResetFilter();
      return;
    }
    gridRef.current.api.showLoadingOverlay(); // Show AG Grid loading overlay

    try {
      // Apply filters locally
      const localFilter = filterThoughInitialData(isAllSelected);
      console.log(localFilter);

      let newPageSize = 0;

      // Determine if more data is needed to complete the page size
      if (localFilter.length < pageSize) {
        newPageSize = pageSize - localFilter.length;
      }

      // If local filter size is less than page size, load more data
      if (localFilter.length !== pageSize || localFilter.length < pageSize) {
        console.log("load more called");
        if (!isAllSelected) {
          await getSpendData(lastId, newPageSize, localFilter); // Wait for data load
        } else {
          await getSpendData(mainId, newPageSize, localFilter); // Wait for data load
          setIsAllSelected(false);
        }
      }

      // Fetch KPIs and filters after the data is loaded
      await getSpendKpi(); // Wait for KPI fetch
      await getSpendFilters(); // Wait for filters fetch
    } catch (error) {
      console.error("Error during loading process:", error);
    } finally {
      // Ensure loading is turned off after everything is completed
      gridRef.current.api.hideOverlay(); // Hide AG Grid loading overlay
    }
  };

  const handleResetFilter = () => {
    console.log(isAllSelected);
    if (finalQuery === "" && !isAllSelected) return; // fix later
    //reset filter state
    setL1("All");
    setL2("All");
    setL3("All");
    setL4("All");
    setCompany("All");
    setVendor("All");
    setCountry("All");
    setYear("All");
    setMonth("All");
    //reset filters options
    handleFilterSet(filters);
    //reset spend data
    let arr = [...spendMain];
    setSpendData(arr);
    setLastId(mainId);
    //reset kpi
    setSpendKpi(spendKpiMain);
  };

  // Adjust row height and font size
  const updateRowSize = (size) => {
    // Update row height
    setRowHeight(size);
    gridRef.current.api.forEachNode((rowNode) => {
      rowNode.setRowHeight(size);
    });

    // Set font size based on row height
    let fontSize;
    if (size === 24) {
      fontSize = "11px";
    } else if (size === 30) {
      fontSize = "13px";
    } else if (size === 35) {
      fontSize = "15px";
    }
    setRowFont(fontSize);

    // Update column definitions to apply the new cell style
    const updatedColumnDefs = columnDefs.map((colDef) => ({
      ...colDef,
      cellStyle: { fontSize },
    }));
    setColumnDefs(updatedColumnDefs);

    console.log(size);

    // Adjust header height using CSS
    const headerHeight = size + 10; // Example adjustment
    const headerElements = document.querySelectorAll(".ag-header");
    headerElements.forEach((header) => {
      header.style.height = `${headerHeight}px`;
    });

    // Refresh grid
    gridRef.current.api.onRowHeightChanged();
    gridRef.current.api.refreshCells();
  };

  //HANDLE EXPORT SPEND DATA
  const [progress, setProgress] = useState(0);
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    console.log(exportRows);
    try {
      setIsExporting(true);
      const res = await axios.get(
        `${
          apiUrls.urlPrefix
        }/spend-export?Rows=${exportRows}&SpendData_Clause=${encodeURIComponent(
          finalQuery
        )}`,
        { ...requestHeader.json, responseType: "blob" }
      );

      // Create a download link for the file
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "SpendData.xlsx");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setIsExporting(false);
      setProgress(false);
    } catch (error) {
      console.error("Error exporting data:", error);
      setIsExporting(false);
      setProgress(false);
    }
  };

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:4001"); // Connect to the WebSocket server
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log(data, data.totalFetched);
      const { totalFetched, totalRecords } = data;
      setProgress((totalFetched / totalRecords) * 100);
    };

    return () => {
      socket.close();
    };
  }, []);

  return (
    <div>
      {loading ? <Loading /> : <div></div>}
      {/* SPEND KPI */}
      <div className="global-kpi-container">
        <div className="global-kpi-box">
          <p className="global-kpi-num">
            {spendKpi?.totalAmount
              ? formatCompactNumber(spendKpi.totalAmount)
              : 0}
            <span className="global-kpi-name">Total Spend</span>
          </p>
        </div>

        <div className="global-kpi-box">
          <p className="global-kpi-num">
            {spendKpi?.transactionCount
              ? formatCompactNumber(spendKpi.transactionCount)
              : 0}
            <span className="global-kpi-name">Transactions</span>
          </p>
        </div>

        <div className="global-kpi-box">
          <p className="global-kpi-num">
            {spendKpi?.companyCount
              ? formatCompactNumber(spendKpi.companyCount)
              : 0}
            <span className="global-kpi-name">Company</span>
          </p>
        </div>

        <div className="global-kpi-box">
          <p className="global-kpi-num">
            {spendKpi?.supplierCount
              ? formatCompactNumber(spendKpi.supplierCount)
              : 0}
            <span className="global-kpi-name">Supplier</span>
          </p>
        </div>

        <div className="global-kpi-box">
          <p className="global-kpi-num">
            {spendKpi?.countryCount
              ? formatCompactNumber(spendKpi.countryCount)
              : 0}
            <span className="global-kpi-name">Country</span>
          </p>
        </div>

        <div className="global-kpi-box">
          <p className="global-kpi-num">
            {spendKpi?.l4Count ? formatCompactNumber(spendKpi.l4Count) : 0}
            <span className="global-kpi-name">L4 Category</span>
          </p>
        </div>
      </div>

      {/* SPEND DATA FILTERS */}
      <div className="global-filters">
        <Form.Group className="global-filter-input">
          <Form.Label className="global-filter-label">L1 Category</Form.Label>
          <Form.Select
            value={l1}
            onChange={(event) => {
              if (event.target.value === "All") setIsAllSelected(true);
              else setIsAllSelected(false);
              setL1(event.target.value);
            }}
            style={{ fontSize: "11px" }}
          >
            {filtersL1.map((x) => {
              return <option value={x}>{x}</option>;
            })}
          </Form.Select>
        </Form.Group>

        <Form.Group className="global-filter-input">
          <Form.Label className="global-filter-label">L2 Category</Form.Label>
          <Form.Select
            value={l2}
            onChange={(event) => {
              if (event.target.value === "All") setIsAllSelected(true);
              else setIsAllSelected(false);
              setL2(event.target.value);
            }}
            style={{ fontSize: "11px" }}
          >
            {filtersL2.map((x) => {
              return <option value={x}>{x}</option>;
            })}
          </Form.Select>
        </Form.Group>

        <Form.Group className="global-filter-input">
          <Form.Label className="global-filter-label">L3 Category</Form.Label>
          <Form.Select
            value={l3}
            onChange={(event) => {
              if (event.target.value === "All") setIsAllSelected(true);
              else setIsAllSelected(false);
              setL3(event.target.value);
            }}
            style={{ fontSize: "11px" }}
          >
            {filtersL3.map((x) => {
              return <option value={x}>{x}</option>;
            })}
          </Form.Select>
        </Form.Group>

        <Form.Group className="global-filter-input">
          <Form.Label className="global-filter-label">L4 Category</Form.Label>
          <Form.Select
            value={l4}
            onChange={(event) => {
              if (event.target.value === "All") setIsAllSelected(true);
              else setIsAllSelected(false);
              setL4(event.target.value);
            }}
            style={{ fontSize: "11px" }}
          >
            {filtersL4.map((x) => {
              return <option value={x}>{x}</option>;
            })}
          </Form.Select>
        </Form.Group>

        <Form.Group className="global-filter-input">
          <Form.Label className="global-filter-label">Company</Form.Label>
          <Form.Select
            value={company}
            onChange={(event) => {
              if (event.target.value === "All") setIsAllSelected(true);
              else setIsAllSelected(false);
              setCompany(event.target.value);
            }}
            style={{ fontSize: "11px" }}
          >
            {filterscompany.map((x) => {
              return <option value={x}>{x}</option>;
            })}
          </Form.Select>
        </Form.Group>

        <Form.Group className="global-filter-input">
          <Form.Label className="global-filter-label">Vendor</Form.Label>
          <Form.Select
            value={vendor}
            onChange={(event) => {
              if (event.target.value === "All") setIsAllSelected(true);
              else setIsAllSelected(false);
              setVendor(event.target.value);
            }}
            style={{ fontSize: "11px" }}
          >
            {filtersVendor.map((x) => {
              return <option value={x}>{x}</option>;
            })}
          </Form.Select>
        </Form.Group>

        <Form.Group className="global-filter-input">
          <Form.Label className="global-filter-label">Country</Form.Label>
          <Form.Select
            value={country}
            onChange={(event) => {
              if (event.target.value === "All") setIsAllSelected(true);
              else setIsAllSelected(false);
              setCountry(event.target.value);
            }}
            style={{ fontSize: "11px" }}
          >
            {filterscountries.map((x) => {
              return <option value={x}>{x}</option>;
            })}
          </Form.Select>
        </Form.Group>

        <Form.Group className="global-filter-input">
          <Form.Label className="global-filter-label">Year</Form.Label>
          <Form.Select
            value={year}
            onChange={(event) => {
              if (event.target.value === "All") setIsAllSelected(true);
              else setIsAllSelected(false);
              setYear(event.target.value);
            }}
            style={{ fontSize: "11px" }}
          >
            {filtersYears.map((x) => {
              return <option value={x}>{x}</option>;
            })}
          </Form.Select>
        </Form.Group>

        <Form.Group className="global-filter-input">
          <Form.Label className="global-filter-label">Month</Form.Label>
          <Form.Select
            value={month}
            onChange={(event) => {
              if (event.target.value === "All") setIsAllSelected(true);
              else setIsAllSelected(false);
              setMonth(months.indexOf(event.target.value) + 1);
            }}
            style={{ fontSize: "11px" }}
          >
            <option value="All">All</option>
            {filtersMonths.map((x) => {
              return <option value={x}>{x}</option>;
            })}
          </Form.Select>
        </Form.Group>
      </div>
      <div className="option-bar">
        <Button
          className="btn-theme"
          onClick={handleApplyFilter}
          size="sm"
          style={{ fontSize: "10px", margin: "2px 5px" }}
        >
          Apply
          <CiFilter
            style={{
              fontSize: "12px",
              marginLeft: "5px",
              paddingBottom: "1px",
            }}
          />
        </Button>
        <Button
          className="btn-theme"
          onClick={handleResetFilter}
          size="sm"
          style={{ fontSize: "10px", margin: "2px 5px" }}
        >
          Reset
          <MdOutlineRestartAlt
            style={{
              fontSize: "14px",
              marginLeft: "5px",
              paddingBottom: "1px",
            }}
          />
        </Button>
        <Dropdown>
          <Dropdown.Toggle
            style={{ fontSize: "10px", margin: "2px 5px" }}
            size="sm"
            id="dropdown-basic"
            className="btn-theme"
          >
            Density
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item
              style={{ fontSize: "10px" }}
              onClick={() => {
                updateRowSize(24);
              }}
            >
              Small
            </Dropdown.Item>
            <Dropdown.Item
              style={{ fontSize: "10px" }}
              onClick={() => {
                updateRowSize(30);
              }}
            >
              Medium
            </Dropdown.Item>
            <Dropdown.Item
              style={{ fontSize: "10px" }}
              onClick={() => {
                updateRowSize(35);
              }}
            >
              Large
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Button
          className="btn-theme"
          onClick={handleShow}
          size="sm"
          style={{ fontSize: "10px", margin: "2px 5px" }}
        >
          Export
          <CiExport
            style={{
              fontSize: "15px",
              marginLeft: "5px",
              paddingBottom: "3px",
            }}
          />
        </Button>
        {/* ADD EXPORT POPUP */}
        <Modal show={show} onHide={handleClose} centered>
          <Modal.Header className="form-header" closeButton>
            <Modal.Title className="form-head">Export Spend Data</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {isExporting ? (
              <div style={{ marginTop: "10px", display: "flex" }}>
                <div>
                  <p
                    style={{
                      fontSize: "11px",
                      color: "grey",
                      paddingLeft: "5px",
                    }}
                  >
                    Export In Progress: {Math.round(progress)}%
                  </p>
                  <progress
                    style={{ width: "300px" }}
                    value={progress}
                    max="100"
                  />
                </div>
              </div>
            ) : (
              <div>
                <p
                  style={{
                    fontSize: "13px",
                    paddingLeft: "5px",
                  }}
                >
                  Select Number of rows you want to export.
                </p>
                <Form.Select
                  value={exportRows}
                  onChange={(e) => setExportRows(e.target.value)}
                  style={{ fontSize: "11px", width: "300px" }}
                >
                  <option value={50000}>50000</option>
                  <option value={100000}>100000</option>
                  <option value={150000}>150000</option>
                  <option value={200000}>200000</option>
                </Form.Select>
              </div>
            )}
          </Modal.Body>
          <Modal.Footer className="form-header">
            {!isExporting ? (
              <Button
                style={{ fontSize: "10px", margin: "2px 5px" }}
                size="sm"
                variant="primary"
                onClick={handleExport}
                className="btn-theme"
              >
                Export
              </Button>
            ) : (
              <p style={{ fontSize: "12px", color: "grey" }}>
                Please wait, as it may take some time to load the data. Do not
                close the window, refresh, or navigate away from the page.
              </p>
            )}
          </Modal.Footer>
        </Modal>

        <Button
          className="btn-theme"
          onClick={handleLoadMore}
          size="sm"
          style={{ fontSize: "10px", margin: "2px 5px" }}
        >
          Load More
          <RiLoader2Fill
            style={{
              fontSize: "15px",
              marginLeft: "5px",
              paddingBottom: "3px",
            }}
          />
        </Button>
      </div>
      <div
        className="ag-theme-alpine global-ag-table"
        style={{
          fontSize: rowFont,
        }}
      >
        <AgGridReact
          ref={gridRef}
          onGridReady={onGridReady}
          rowData={spendData}
          rowHeight={rowHeight}
          headerHeight={30}
          pagination={true}
          paginationPageSize={1000}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          onCellClicked={cellClickedListener}
        />
      </div>
    </div>
  );
};

export default SpendData;
