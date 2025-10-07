import React, { useState, useRef } from "react";
import axios from "axios";
import { Form } from "react-bootstrap";
import { toast } from "react-toastify";
import "./css/addCategoryReport.css";
import apiUrls from "../../../Config/apiUrls";
import Loading from "../../Helper/Loading";

const AddCategoryReport = () => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    geography: "",
    type: "",
    section: "",
    date: new Date().toISOString().split("T")[0],
    pageData: [],
  });

  // error states
  const [nameError, setNameError] = useState(false);
  const [categoryError, setCategoryError] = useState(false);
  const [geographyError, setGeographyError] = useState(false);
  const [typeError, setTypeError] = useState(false);
  const [sectionError, setSectionError] = useState(false);
  const [dateError, setDateError] = useState(false);

  //   state for handling report sections
  const [sections, setSections] = useState([
    { section: "", start_pg: "", end_pg: "" },
  ]);

  const fileInputRef = useRef();
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSectionChange = (index, field, value) => {
    setSections((prevSections) => {
      const updatedSections = [...prevSections];
      updatedSections[index][field] = value;
      return updatedSections;
    });
  };

  const addSection = () => {
    setSections((prevSections) => [
      ...prevSections,
      { section: "", start_pg: "", end_pg: "" },
    ]);
  };

  const removeSection = (index) => {
    setSections((prevSections) => {
      // Check if there is only one section
      if (prevSections.length === 1) {
        // Reset the single section instead of removing it
        const updatedSections = [...prevSections];
        updatedSections[0] = { section: "", start_pg: "", end_pg: "" };
        return updatedSections;
      }

      // Remove the section if there are multiple rows and no fields are filled
      return prevSections.filter((_, i) => i !== index);
    });
  };

  // STATE FOR TOGGLING THE INPUT
  const [sectionCustomToggle, setSectionCustomToggle] = useState(
    sections.map(() => false) // Initialize an array to track custom state for each section
  );

  // TOGGLE CUSTOM INPUT TYPE
  const toggleIsCustom = (index) => {
    setSectionCustomToggle((prev) => {
      const newState = [...prev];
      newState[index] = !newState[index]; // Toggle only for the clicked index
      return newState;
    });
  };

  // SUBMMITTING THE FORM
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name) {
      setNameError(true);
      return;
    }
    if (!formData.category) {
      setNameError(false);
      setCategoryError(true);
      return;
    }
    if (!formData.geography) {
      setCategoryError(false);
      setGeographyError(true);
      return;
    }
    if (!formData.type) {
      setGeographyError(false);
      setTypeError(true);
      return;
    }
    if (!formData.section) {
      setTypeError(false);
      setSectionError(true);
      return;
    }
    if (!formData.date) {
      setSectionError(false);
      setDateError(true);
      return;
    }
    setDateError(false);

    setLoading(true);

    const files = fileInputRef.current.files;
    if (files.length === 0) {
      toast.error("Please upload a file.");
      setLoading(false);
      return;
    }

    if (files.length > 1) {
      toast.error("You can only upload one file.");
      setLoading(false);
      return;
    }

    const data = new FormData();
    data.append("name", formData.name);
    data.append("category", formData.category);
    data.append("geography", formData.geography);
    data.append("type", formData.type);
    data.append("section", formData.section);
    data.append("date", formData.date);

    // Convert sections into pageData format
    const pageData = sections
      .map(({ section, start_pg, end_pg }) => {
        // Parse start and end page numbers
        const startPage = parseInt(start_pg, 10);
        const endPage = parseInt(end_pg, 10);

        // Check if start page is greater than end page
        if (startPage > endPage) {
          // Show toast error and return null to filter out this entry
          toast.error("Start page cannot be greater than end page");
          return null;
        }

        // Return the data if the condition is not met
        return {
          name: section,
          start_pg: startPage,
          end_pg: endPage,
        };
      })
      .filter((page) => page !== null); // Remove invalid pageData entries

    // If no valid page data, prevent API call
    if (pageData.length === 0) {
      setLoading(false);
      return;
    }
    data.append("pageData", JSON.stringify(pageData)); // Send as JSON string
    data.append("file", files[0]);

    try {
      const response = await axios.post(
        `${apiUrls.urlPrefix}/sourcing-intel/add-sourcing-reports`,
        data,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      toast.success("Data submitted successfully!");

      setFormData({
        name: "",
        category: "",
        geography: "",
        type: "",
        section: "",
        date: new Date().toISOString().split("T")[0],
        pageData: [],
      });
      setSections([{ section: "", start_pg: "", end_pg: "" }]);
      setSectionCustomToggle(sections.map(() => false));
      fileInputRef.current.value = null;
      console.log(response.data);
    } catch (error) {
      console.error("Error submitting the form:", error);
      toast.error("Failed to submit data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-report-form">
      {loading && <Loading />}

      <div className=" mt-2 ">
        <h5 className=" text-center mb-2 ms-2 ">
          Add Category Intelligence Reports
        </h5>

        <form onSubmit={handleSubmit} className="p-4 border rounded ">
          <div className="row ">
            <div className="col">
              <div className="mb-3">
                <label className="form-label">Name</label>
                <Form.Control
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="form-control w-75 font"
                  placeholder="Enter name"
                  isInvalid={nameError}
                />
                <Form.Control.Feedback type="invalid">
                  Please input report name.
                </Form.Control.Feedback>
              </div>

              <Form.Group className="mb-3">
                <Form.Label>Category</Form.Label>
                <div className="d-flex">
                  <Form.Check
                    type="radio"
                    label="Direct"
                    name="category"
                    value="Direct"
                    checked={formData.category === "Direct"}
                    onChange={handleInputChange}
                    isInvalid={categoryError}
                    className="me-3"
                  />
                  <Form.Check
                    type="radio"
                    label="Indirect"
                    name="category"
                    value="Indirect"
                    checked={formData.category === "Indirect"}
                    isInvalid={categoryError}
                    onChange={handleInputChange}
                  />
                </div>
                <Form.Control.Feedback type="invalid">
                  Please select a category.
                </Form.Control.Feedback>
              </Form.Group>

              <div className="mb-3">
                <label className="form-label">Geography</label>
                <Form.Control
                  name="geography"
                  value={formData.geography}
                  onChange={handleInputChange}
                  className="form-control w-75 font"
                  placeholder="Enter geography "
                  isInvalid={geographyError}
                />
                <Form.Control.Feedback type="invalid">
                  Please input the geography.
                </Form.Control.Feedback>
              </div>
            </div>
            <div className="col">
              {" "}
              <Form.Group className="mb-3">
                <Form.Label>Type</Form.Label>
                <div className="d-flex">
                  <Form.Check
                    type="radio"
                    label="Gold"
                    name="type"
                    value="Gold"
                    checked={formData.type === "Gold"}
                    onChange={handleInputChange}
                    isInvalid={typeError}
                    className="me-3"
                  />
                  <Form.Check
                    type="radio"
                    label="Silver"
                    name="type"
                    value="Silver"
                    checked={formData.type === "Silver"}
                    onChange={handleInputChange}
                    isInvalid={typeError}
                  />
                </div>
                <Form.Control.Feedback type="invalid">
                  Please select a type.
                </Form.Control.Feedback>
              </Form.Group>
              <div className="mb-3">
                <label className="form-label">Section</label>
                <input
                  type="text"
                  name="section"
                  value={formData.section}
                  onChange={handleInputChange}
                  className="form-control w-75 font"
                  placeholder="Enter section"
                  isInvalid={sectionError}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Date</label>
                <Form.Control
                  type="date"
                  name="date"
                  value={
                    formData.date || new Date().toISOString().split("T")[0]
                  }
                  onChange={handleInputChange}
                  className="form-control w-75 font"
                  isInvalid={dateError}
                />
              </div>
            </div>
          </div>

          {/* Choose pdf */}
          <div className="mb-3 mt-3">
            <label className="form-label">File (PDF only)</label>
            <input
              type="file"
              ref={fileInputRef}
              accept=".pdf"
              className="form-control font"
            />
          </div>

          <div className="mb-3 ">
            <label className="form-label">Report Sections</label>
            {sections.map((section, index) => (
              <div key={index} className="row mb-2 align-items-center">
                <div className="col-md-3">
                  {sectionCustomToggle[index] ? (
                    <input
                      type="text"
                      value={section.section}
                      onChange={(e) =>
                        handleSectionChange(index, "section", e.target.value)
                      }
                      placeholder="Section Name "
                      className="form-control font"
                    />
                  ) : (
                    <select
                      value={section.section}
                      onChange={(e) =>
                        handleSectionChange(index, "section", e.target.value)
                      }
                      className="form-select font"
                    >
                      <option value="">Select Section</option>
                      <option value="Executive Summary">
                        Executive Summary
                      </option>
                      <option value="Category Profile">Category Profile</option>
                      <option value="Category Strategy">
                        Category Strategy
                      </option>
                      <option value="Contracting">Contracting</option>
                      <option value="Supplier Landscape">
                        Supplier Landscape
                      </option>
                    </select>
                  )}
                </div>
                <div
                  className="square-btn btn btn-secondary d-flex align-items-center justify-content-center p-0 btn-theme"
                  onClick={() => toggleIsCustom(index)} // Pass the current index
                >
                  {sectionCustomToggle[index] ? "-" : "+"}
                </div>

                <div className="col-md-3">
                  <Form.Control
                    type="number"
                    value={section.start_pg}
                    onChange={(e) => {
                      const inputValue = e.target.value.trim();
                      const value =
                        inputValue !== "" ? parseInt(inputValue, 10) : "";
                      handleSectionChange(
                        index,
                        "start_pg",
                        value === "" || value > 0 ? value : 1
                      );
                    }}
                    placeholder="Start Page"
                    className="form-control font"
                  />
                </div>
                <div className="col-md-3">
                  <Form.Control
                    type="number"
                    value={section.end_pg || ""}
                    onChange={(e) =>
                      handleSectionChange(index, "end_pg", e.target.value)
                    }
                    placeholder="End Page"
                    className="form-control font"
                    disabled={!section.start_pg}
                  />
                </div>
                <div className="col-md-2 d-flex align-items-center">
                  <button
                    type="button"
                    className="btn btn-danger btn-sm font btn-red"
                    onClick={() => removeSection(index)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}

            <button
              type="button"
              className="btn btn-secondary btn-sm font btn-theme"
              onClick={addSection}
            >
              Add Section
            </button>
          </div>

          <button type="submit" className="btn btn-theme w-100 font">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCategoryReport;
