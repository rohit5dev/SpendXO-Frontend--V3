import React, { useEffect, useState } from "react";
import axios from "axios";
import { Form } from "react-bootstrap";
import { toast } from "react-toastify";
import "./css/UserAccessForm.css";
import Loading from "../../Helper/Loading";
import apiUrls from "../../../Config/apiUrls";
import { requestHeader } from "../../Helper/Constants/constant";

const UserAccessForm = () => {
  const [formData, setFormData] = useState({
    Name: "",
    Email: "",
    Company: "",
    Access: "",
    Location: "",
    AccessType: "",
  });

  // Error states
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [companyError, setCompanyError] = useState(false);
  const [accessError, setAccessError] = useState(false);
  const [locationError, setLocationError] = useState(false);
  const [accessTypeError, setAccessTypeError] = useState(false);

  const [userAccessData, setUserAccessData] = useState([]);
  const [loading, setLoading] = useState(false);

  //   Function to fetchh all user access data
  const fetchUserAccessData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${apiUrls.urlPrefix}/access/user-access-data`,
        requestHeader.json
      );
      if (response.data) {
        setUserAccessData(response?.data?.result || []);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserAccessData();
  }, []);

  // Default column settings (for styling)
  const defaultStyles = {
    textAlign: "center",
    padding: "8px",
  };
  const defaultStyleHead = {
    textAlign: "center",
    padding: "8px",
    backgroundColor: "var(--bg-ag)",
    color: "white",
  };

  //   Handle input val change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //   Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.Name) return setNameError(true);
    setNameError(false);

    if (!formData.Email) {
      return setEmailError(true);
    }

    if (userAccessData.some((user) => user.Email === formData.Email)) {
      toast.error("Email already exists!");
      return;
    }
    setEmailError(false);

    if (!formData.Company) return setCompanyError(true);
    setCompanyError(false);

    if (!formData.Access) return setAccessError(true);
    setAccessError(false);

    if (!formData.Location) return setLocationError(true);
    setLocationError(false);

    if (!formData.AccessType) return setAccessTypeError(true);
    setAccessTypeError(false);

    try {
      setLoading(true);
      const response = await axios.post(
        `${apiUrls.urlPrefix}/access/add-user-access`,
        formData,
        requestHeader.json
      );
      if (response.data.status) {
        setLoading(false);
        toast.success("User access added successfully");
        setFormData({
          Name: "",
          Email: "",
          Company: "",
          Access: "",
          Location: "",
          AccessType: "",
        });
        fetchUserAccessData();
      }
    } catch (error) {
      setLoading(false);
      console.error("Error posting data", error);
      toast.error("Failed to create user access");
    }
  };

  return (
    <div className="add-access-form">
      {loading && <Loading />}

      {/* TABLE TO SHOW USER EXISTING ACCESS */}
      <div className=" p-4 border rounded">
        <h5 className="mb-4">User Access</h5>

        <div
          style={{
            height: "36vh",
            overflow: "auto",
            border: "1px solid #ddd",
            marginTop: "10px",
          }}
        >
          <table className="table table-striped font">
            <thead
              style={{ position: "sticky", top: "0", backgroundColor: "#fff" }}
            >
              <tr>
                <th style={defaultStyleHead}>Name</th>
                <th style={defaultStyleHead}>Email</th>
                <th style={defaultStyleHead}>Company</th>
                <th style={defaultStyleHead}>Access</th>
                <th style={defaultStyleHead}>Location</th>
                <th style={defaultStyleHead}>Access Type</th>
              </tr>
            </thead>
            <tbody>
              {userAccessData.map((row) => (
                <tr key={row.id} style={{ borderBottom: "1px solid #ddd" }}>
                  <td style={defaultStyles}>{row.Name || "N/A"}</td>
                  <td style={defaultStyles}>{row.Email || "N/A"}</td>
                  <td style={defaultStyles}>{row.Company || "N/A"}</td>
                  <td style={defaultStyles}>{row.Access || "N/A"}</td>
                  <td style={defaultStyles}>{row.Location || "N/A"}</td>
                  <td style={defaultStyles}>{row.AccessType || "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* FORM TO SUBMIT USER ACCESS DATA */}
      <div>
        <form onSubmit={handleSubmit} className="p-4 border rounded mt-2">
          <h5 className="mb-4">Add New Access</h5>
          <div className="row">
            <div className="col">
              {/* Name */}
              <div className="mb-3">
                <label className="form-label">Name</label>
                <Form.Control
                  name="Name"
                  value={formData.Name}
                  onChange={handleChange}
                  className="form-control w-75 font"
                  placeholder="Enter name"
                  isInvalid={nameError}
                />
                <Form.Control.Feedback type="invalid">
                  Please input user's name.
                </Form.Control.Feedback>
              </div>

              {/* Email */}
              <div className="mb-3">
                <label className="form-label">Email</label>
                <Form.Control
                  name="Email"
                  type="email"
                  value={formData.Email}
                  onChange={handleChange}
                  className="form-control w-75 font"
                  placeholder="Enter email"
                  isInvalid={emailError}
                />
                <Form.Control.Feedback type="invalid">
                  Please input a valid email.
                </Form.Control.Feedback>
              </div>
            </div>

            <div className="col">
              {/* Company */}
              <div className="mb-3">
                <label className="form-label">Company</label>
                <Form.Control
                  name="Company"
                  value={formData.Company}
                  onChange={handleChange}
                  className="form-control w-75 font"
                  placeholder="Enter company name"
                  isInvalid={companyError}
                />
                <Form.Control.Feedback type="invalid">
                  Please input company name.
                </Form.Control.Feedback>
              </div>

              {/* Access */}
              <div className="mb-3">
                <label className="form-label">Access</label>
                <Form.Control
                  name="Access"
                  value={formData.Access}
                  onChange={handleChange}
                  className="form-control w-75 font"
                  placeholder="Enter access"
                  isInvalid={accessError}
                />
                <Form.Control.Feedback type="invalid">
                  Please input access information.
                </Form.Control.Feedback>
              </div>
            </div>
            <div className="col">
              {/* Location */}
              <div className="mb-3">
                <label className="form-label">Location</label>
                <Form.Control
                  name="Location"
                  value={formData.Location}
                  onChange={handleChange}
                  className="form-control w-75 font"
                  placeholder="Enter location"
                  isInvalid={locationError}
                />
                <Form.Control.Feedback type="invalid">
                  Please input location.
                </Form.Control.Feedback>
              </div>

              {/* Access Type */}
              <div className="mb-3">
                <label className="form-label">Access Type</label>
                <Form.Select
                  name="AccessType"
                  value={formData.AccessType}
                  onChange={handleChange}
                  className="form-control w-75 font"
                  isInvalid={accessTypeError}
                >
                  <option value="">Select...</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  Please select access type.
                </Form.Control.Feedback>
              </div>
            </div>
          </div>

          <button type="submit" className="btn btn-theme w-100 font">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserAccessForm;
