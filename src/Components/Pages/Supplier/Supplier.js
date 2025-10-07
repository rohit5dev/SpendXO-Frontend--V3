import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Button, Form } from "react-bootstrap";
import "./css/supplier.css";
import { SupplierData } from "./Data/SupplierData";

const Supplier = () => {
  const navigate = useNavigate();
  const [suppliers, setSuppliers] = useState(SupplierData.companyDetails);

  //filters load
  let name = ["All"],
    country = ["All"],
    cate = ["All"];
  SupplierData.companyDetails.forEach((x) => {
    name.push(x.name);
    cate.push(x.category);
    x.locations.forEach((z) => {
      if (!country.includes(z)) country.push(z);
    });
  });

  const [countries] = useState(country);
  const [categories] = useState(cate);
  const [names] = useState(name);

  const [countryFilter, setCountryFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [nameFilter, setNameFilter] = useState("All");

  const resetFilters = () => {
    setCountryFilter("");
    setCategoryFilter("");
    setNameFilter("");
  };

  const filteredSuppliers = suppliers.filter((supplier) => {
    return (
      (countryFilter === "" ||
        countryFilter === "All" ||
        supplier.locations.includes(countryFilter)) &&
      (categoryFilter === "" ||
        categoryFilter === "All" ||
        supplier.category === categoryFilter) &&
      (nameFilter === "" ||
        nameFilter === "All" ||
        supplier.name === nameFilter)
    );
  });

  return (
    <div>
      <div style={{ padding: "10px" }}>
        <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
          <Form.Group className="global-filter-input" style={{ gap: "8px" }}>
            <Form.Label className="global-filter-label">Category</Form.Label>
            <Form.Select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              style={{ fontSize: "11px" }}
            >
              {categories?.map((x) => (
                <option key={x} value={x}>
                  {x}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="global-filter-input" style={{ gap: "8px" }}>
            <Form.Label className="global-filter-label">Name</Form.Label>
            <Form.Select
              value={nameFilter}
              onChange={(e) => setNameFilter(e.target.value)}
              style={{ fontSize: "11px" }}
            >
              {names?.map((x) => (
                <option key={x} value={x}>
                  {x}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="global-filter-input" style={{ gap: "8px" }}>
            <Form.Label className="global-filter-label">Country</Form.Label>
            <Form.Select
              value={countryFilter}
              onChange={(e) => setCountryFilter(e.target.value)}
              style={{ fontSize: "11px" }}
            >
              {countries?.map((x) => (
                <option key={x} value={x}>
                  {x}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Button
            onClick={resetFilters}
            size="sm"
            className="btn-theme"
            style={{ fontSize: "12px", marginTop: "20px" }}
          >
            Reset
          </Button>
        </div>

        <Row className="g-3 mt-1">
          {filteredSuppliers.map((supplier, i) => (
            <Col key={i} xs={12} sm={6} md={3}>
              <div
                style={{
                  background:
                    "linear-gradient(to bottom, white, var(--color-main-light))",
                  padding: "10px",
                  borderRadius: "3px",
                  boxShadow: "0px 0px 5px rgba(0,0,0,0.1)",
                  textAlign: "center",
                }}
              >
                <div className="avatar-img">
                  <img
                    src={supplier.image}
                    alt="Company Logo"
                    style={{
                      maxWidth: "100px",
                      maxHeight: "80px",
                      objectFit: "contain",
                    }}
                  />
                </div>
                <hr style={{ margin: "2px", color: "white" }} />
                <div style={{ textAlign: "left" }}>
                  <p
                    style={{
                      fontSize: "14px",
                      fontWeight: 600,
                      marginBottom: "2px",
                    }}
                  >
                    {supplier.name}
                  </p>
                  <p
                    style={{
                      fontSize: "11px",
                      height: "70px",
                      overflow: "hidden",
                    }}
                  >
                    {supplier.description.slice(0, 150)}...
                  </p>
                </div>
                <div
                  style={{
                    textAlign: "left",
                  }}
                >
                  <Button
                    size="sm"
                    className="btn-theme-dark"
                    style={{ fontSize: "10px" }}
                    onClick={() => {
                      navigate(`/supplier-profile/${supplier.id}`);
                    }}
                  >
                    Read More
                  </Button>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default Supplier;
