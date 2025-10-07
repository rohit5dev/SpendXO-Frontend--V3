import React, { useState } from "react";
import { Row, Col, Form } from "react-bootstrap";
import "./css/CategoryLandingPage.css";
import "./css/CategoryIntelligenceNew.css";
import FlatSteel from "./Categories/FlatSteel";
import IFM from "./Categories/IFM";
import { IoMdArrowRoundBack } from "react-icons/io";

// Mapping of category names to their corresponding components
const componentsMap = {
  "Flat Steel": <FlatSteel />,
  "Integrated Facilities Management": <IFM />,
};

const CategoryLandingPage = () => {
  const [view, setView] = useState("cards"); // 'cards' or 'intelligence'
  const [selectedCategory, setSelectedCategory] = useState({
    categoryName: "",
    category: "",
  });
  const [specification, setSpecification] = useState("IS 2062 E250");
  const [region, setRegion] = useState("India");

  const categoryData = [
    {
      categoryName: "Flat Steel",
      marketSize: "₹ 43,422.51 B",
      suppliers: "20",
      spendShare: "70%",
      growth: "4.8%",
      category: "Direct",
      componentKey: "Flat Steel",
    },
    {
      categoryName: "Polyethylene Glycol",
      marketSize: "₹ 328.99 B",
      suppliers: "20",
      spendShare: "70%",
      growth: "5.5%",
      category: "Direct",
      componentKey: "",
    },
    {
      categoryName: "Scroll Inverter Compressor",
      marketSize: "₹ 417.5 B",
      suppliers: "23",
      spendShare: "65%",
      growth: "7%",
      category: "Direct",
      componentKey: "",
    },
    {
      categoryName: "Integrated Facilities Management",
      marketSize: "₹ 9,996 B",
      suppliers: "15",
      spendShare: "65%",
      growth: "5.6%",
      category: "Indirect",
      componentKey: "Integrated Facilities Management",
    },
    {
      categoryName: "Cleaning Services",
      marketSize: "₹ 33,817.5 B",
      suppliers: "12",
      spendShare: "52%",
      growth: "6.7%",
      category: "Indirect",
      componentKey: "",
    },
    {
      categoryName: "Postal and Courier Services",
      marketSize: "₹ 21,334.3 B",
      suppliers: "25",
      spendShare: "45%",
      growth: "1.4%",
      category: "Indirect",
      componentKey: "",
    },
    {
      categoryName: "Freight Carrier Services",
      marketSize: "₹ 2,580.2 B",
      suppliers: "18",
      spendShare: "38%",
      growth: "11.3%",
      category: "Indirect",
      componentKey: "",
    },
    
  ];

  // Filter categories
  const directCategories = categoryData.filter(
    (item) => item.category === "Direct"
  );
  const indirectCategories = categoryData.filter(
    (item) => item.category === "Indirect"
  );

  const handleCardClick = (category) => {
    if (category.componentKey && componentsMap[category.componentKey]) {
      setSelectedCategory({
        categoryName: category.componentKey,
        category: category.category,
      });
      setView("intelligence");
    }
  };

  const handleBackToCards = () => {
    setView("cards");
  };

  const handleCategoryChange = (e) => {
    const selected = categoryData.find(
      (cat) => cat.categoryName === e.target.value && cat.componentKey
    );
    if (selected) {
      setSelectedCategory({
        categoryName: selected.categoryName,
        category: selected.category,
      });
    }
  };

  if (view === "cards") {
    return (
      <div className="mt-2">
        <div className="p-2">
          <h5 className="head-theme text-start mb-2">Direct Categories</h5>
          <Row className="g-2">
            {directCategories.map((data, index) => (
              <Col key={index} xs={12} sm={6} md={4} lg={3}>
                <div
                  className={`size-up-card pt-3 bg-white rounded shadow-sm text-center h-100 ${
                    data.componentKey ? "clickable-card" : ""
                  }`}
                  style={{ cursor:"pointer" }}
                  onClick={() => data.componentKey && handleCardClick(data)}
                >
                  <h6
                    className="mb-2"
                    style={{ fontSize: "13px", fontWeight: 600 }}
                  >
                    {data.categoryName}
                  </h6>
                  <h4 className="global-kpi-num">{data.marketSize}</h4>
                  <p
                    className="text-muted small mb-2"
                    style={{ fontSize: "11px" }}
                  >
                    Market Size
                  </p>
                  <Row>
                    <Col>
                      <h5
                        className="global-kpi-num"
                        style={{ fontSize: "14px" }}
                      >
                        {data.suppliers}
                      </h5>
                      <p
                        className="text-muted small"
                        style={{ fontSize: "10px" }}
                      >
                        Supplier
                      </p>
                    </Col>
                    <Col>
                      <h5
                        className="global-kpi-num"
                        style={{ fontSize: "14px" }}
                      >
                        {data.spendShare}
                      </h5>
                      <p
                        className="text-muted small"
                        style={{ fontSize: "10px" }}
                      >
                        Spend Share
                      </p>
                    </Col>
                    <Col>
                      <h5
                        className="global-kpi-num"
                        style={{ fontSize: "14px" }}
                      >
                        {data.growth}
                      </h5>
                      <p
                        className="text-muted small"
                        style={{ fontSize: "10px" }}
                      >
                        CAGR
                      </p>
                    </Col>
                  </Row>
                  <hr className="m-0 p-0" />
                  <p
                    className="text-muted small pt-1"
                    style={{ fontSize: "10px" }}
                  >
                    Last Updated on April 2025
                  </p>
                </div>
              </Col>
            ))}
          </Row>
          <h5 className="head-theme text-start mt-4 mb-2">
            Indirect Categories
          </h5>
          <Row className="g-2">
            {indirectCategories.map((data, index) => (
              <Col key={index} xs={12} sm={6} md={4} lg={3}>
                <div
                  className={`size-up-card pt-3 bg-white rounded shadow-sm text-center h-100 ${
                    data.componentKey ? "clickable-card" : ""
                  }`}
                    style={{ cursor:"pointer" }}
                  onClick={() => data.componentKey && handleCardClick(data)}
                >
                  <h6
                    className="mb-2"
                    style={{ fontSize: "13px", fontWeight: 600 }}
                  >
                    {data.categoryName}
                  </h6>
                  <h4 className="global-kpi-num">{data.marketSize}</h4>
                  <p
                    className="text-muted small mb-2"
                    style={{ fontSize: "11px" }}
                  >
                    Market Size
                  </p>
                  <Row>
                    <Col>
                      <h5
                        className="global-kpi-num"
                        style={{ fontSize: "14px" }}
                      >
                        {data.suppliers}
                      </h5>
                      <p
                        className="text-muted small"
                        style={{ fontSize: "10px" }}
                      >
                        Supplier
                      </p>
                    </Col>
                    <Col>
                      <h5
                        className="global-kpi-num"
                        style={{ fontSize: "14px" }}
                      >
                        {data.spendShare}
                      </h5>
                      <p
                        className="text-muted small"
                        style={{ fontSize: "10px" }}
                      >
                        Spend Share
                      </p>
                    </Col>
                    <Col>
                      <h5
                        className="global-kpi-num"
                        style={{ fontSize: "14px" }}
                      >
                        {data.growth}
                      </h5>
                      <p
                        className="text-muted small"
                        style={{ fontSize: "10px" }}
                      >
                        CAGR
                      </p>
                    </Col>
                  </Row>
                  <hr className="m-0 p-0" />
                  <p
                    className="text-muted small pt-1"
                    style={{ fontSize: "10px" }}
                  >
                    Last Updated on April 2025
                  </p>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      </div>
    );
  }

  // Intelligence view
  return (
    <div
      className="global-cards p-2 mt-2"
      style={{ backgroundColor: "rgba(255, 255, 255, 0.29)" }}
    >
      <div className="d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <button
            className="btn bck-btn-outline p-1 d-flex align-items-center ms-2"
            onClick={handleBackToCards}
          >
            <IoMdArrowRoundBack />
          </button>

          <button
            className="btn btn-sm btn-outline-secondary  ms-2"
            style={{ fontSize: "12px" ,padding:"2px 8px"}}
          >
            {selectedCategory.categoryName}
          </button>
          <button
            className="btn btn-sm btn-outline-secondary   ms-2"
            style={{ fontSize: "12px", padding:"2px 8px" }}
          >
            {selectedCategory.category}
          </button>
        </div>
        <div className="d-flex align-items-center">
          <Form.Group className="global-filter-input">
            <Form.Label className="global-filter-label">Category</Form.Label>
            <Form.Select
              value={selectedCategory.categoryName}
              onChange={handleCategoryChange}
              style={{
                fontSize: "11px",
                width: "100%",
                textOverflow: "ellipsis",
                overflow: "hidden",
              }}
            >
              {categoryData
                .filter((cat) => cat.componentKey)
                .map((category) => (
                  <option
                    key={category.categoryName}
                    value={category.categoryName}
                  >
                    {category.categoryName}
                  </option>
                ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="global-filter-input ms-3">
            <Form.Label className="global-filter-label">
              Specification
            </Form.Label>
            <Form.Select
              value={specification}
              onChange={(e) => setSpecification(e.target.value)}
              style={{
                fontSize: "11px",
                width: "100%",
                textOverflow: "ellipsis",
                overflow: "hidden",
              }}
            >
              <option value="IS 2062 E250">IS 2062 E250</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="global-filter-input ms-3">
            <Form.Label className="global-filter-label">Region</Form.Label>
            <Form.Select
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              style={{
                fontSize: "11px",
                width: "100%",
                textOverflow: "ellipsis",
                overflow: "hidden",
              }}
            >
              <option value="India">India</option>
            </Form.Select>
          </Form.Group>
        </div>
      </div>

      <div className="mt-3">
        {componentsMap[selectedCategory.categoryName] || (
          <div>No data available for selected category</div>
        )}
      </div>
    </div>
  );
};

export default CategoryLandingPage;
