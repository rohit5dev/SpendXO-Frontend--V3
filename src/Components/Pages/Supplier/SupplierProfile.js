import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import { SupplierData } from "./Data/SupplierData";
import { Table } from "react-bootstrap";
import { Card, Row, Col, Button } from "react-bootstrap";

const SupplierProfile = () => {
  const [profileData, setProfileData] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getProfileData = async () => {
      const filteredData = SupplierData.companyDetails.find(
        (item) => item.id === id
      );
      setProfileData(filteredData);
    };

    getProfileData();
  }, [id]);

  const numFormatter = (num) => {
    if (Math.abs(num) >= 1_000_000) {
      return Math.sign(num) * (Math.abs(num) / 1_000_000).toFixed(1) + "M+";
    } else if (Math.abs(num) >= 1_000) {
      return Math.sign(num) * (Math.abs(num) / 1_000).toFixed(1) + "K+";
    } else {
      return Math.sign(num) * Math.abs(num);
    }
  };

  if (!profileData) {
    return <p>Loading...</p>;
  }

  const handleClick = () => {
    navigate("/supplier"); // Navigate to the desired route
  };

  return (
    <div style={{ padding: "0px 40px" }}>
      <div
        style={{
          padding: "5px",
          marginTop: "10px",
          display: "flex",
          justifyContent: "space-between",
          background: "#B6CFD6",
          // color: "white",
          borderRadius: "5px",
          position: "relative",
        }}
      >
        <Button
          size="sm"
          className="btn-theme"
          style={{
            fontSize: "10px",
            position: "absolute",
            bottom: 0,
            right: 0,
          }}
          onClick={handleClick}
        >
          Go Back
        </Button>
        <div style={{ width: "200px" }}>
          <div
            className="avatar-img"
            style={{
              textAlign: "left",
              padding: "10px",
            }}
          >
            <img
              src={profileData?.image}
              alt="Company Logo"
              style={{
                maxWidth: "100px",
                maxHeight: "90px",
                objectFit: "contain",
                alignContent: "center",
              }}
            />
          </div>
          <div
            style={{ textAlign: "left", width: "400px", paddingLeft: "40px" }}
          >
            <p
              style={{
                fontSize: "10px",
                marginTop: "0px",
                textAlign: "left",
                // color: "var(--color-main)",
                fontWeight: 500,
              }}
            >
              {profileData?.description}
            </p>
            <p style={{ fontSize: "11px", margin: "0px", marginTop: "10px" }}>
              Main Product : {profileData?.product}
            </p>
            <p style={{ fontSize: "11px", margin: "0px", marginTop: "2px" }}>
              Headquarter : {profileData?.headquarters}
            </p>
            <p style={{ fontSize: "11px", margin: "0px", marginTop: "2px" }}>
              Website :{" "}
              <a
                style={{ color: "var(--color-main)" }}
                href={profileData?.website}
              >
                Link
              </a>
            </p>
          </div>
        </div>
        {/* First Block */}
        <div
          style={{
            borderRadius: "5px",
            padding: "15px 5px",
            width: "260px",
          }}
        >
          <div>
            <h3 style={{ color: "var(--color-main)", fontSize: "18px" }}>
              {profileData?.founded_year}
            </h3>
            <p
              style={{
                fontSize: "11px",
                margin: "2px",
              }}
            >
              Founded
            </p>
          </div>
          <hr style={{ color: "white", margin: "5px" }} />
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <div>
              <h3 style={{ color: "var(--color-main)", fontSize: "18px" }}>
                {profileData?.active_users}
              </h3>
              <p
                style={{
                  fontSize: "11px",
                  margin: "2px",
                }}
              >
                Users
              </p>
            </div>

            <div>
              <h3 style={{ color: "var(--color-main)", fontSize: "18px" }}>
                {profileData?.clients_count}
              </h3>
              <p
                style={{
                  fontSize: "11px",
                  margin: "2px",
                }}
              >
                Clients
              </p>
            </div>
          </div>
          <hr style={{ color: "white", margin: "5px" }} />
          <div>
            <h3 style={{ color: "var(--color-main)", fontSize: "18px" }}>
              {profileData?.employees_count}
            </h3>
            <p
              style={{
                fontSize: "11px",
                margin: "2px",
              }}
            >
              Employees
            </p>
          </div>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap", // Allow items to wrap
          gap: "10px",
          marginTop: "10px",
        }}
      >
        {/* Second Block */}
        <div
          style={{
            background: "white",
            borderRadius: "5px",
            padding: "10px",
            height: "360px",
            overflowY: "auto",
            boxShadow: "0px 0px 2px rgba(0,0,0,0.2)",
            flex: "0 0 calc(33.333% - 10px)", // Each block takes 1/3 of the row
          }}
        >
          <p
            style={{
              fontSize: "14px",
              fontWeight: 600,
              color: "var(--color-main)",
              textAlign: "left",
              paddingLeft: "20px",
            }}
          >
            Unique Selling Points
          </p>
          <ul>
            {profileData?.usp.map((point, index) => (
              <li key={index} style={{ borderBottom: "1px solid #ddd" }}>
                <p
                  style={{
                    fontSize: "11px",
                    padding: "7px",
                    textAlign: "left",
                    margin: "4px",
                  }}
                >
                  {point}
                </p>
              </li>
            ))}
          </ul>
        </div>

        {/* Third Block */}
        <div
          style={{
            background: "white",
            boxShadow: "0px 0px 2px rgba(0,0,0,0.2)",
            borderRadius: "5px",
            padding: "10px",
            height: "360px",
            overflowY: "auto",
            flex: "0 0 calc(33.333% - 10px)", // Each block takes 1/3 of the row
          }}
        >
          <p
            style={{
              fontSize: "14px",
              fontWeight: 600,
              color: "var(--color-main)",
              textAlign: "left",
              paddingLeft: "20px",
            }}
          >
            Financial Information
          </p>
          <Table style={{ fontSize: "11px" }} hover responsive>
            <tbody>
              <tr>
                <td>Pricing Model</td>
                <td>{profileData?.pricing_Model}</td>
              </tr>
              <tr>
                <td>Tools Revenue</td>
                <td>{profileData?.tools_revenue}</td>
              </tr>
              <tr>
                <td>Other Revenue</td>
                <td>{profileData?.other_revenue}</td>
              </tr>
              <tr>
                <td>Minimum Contract Value</td>
                <td>{profileData?.min_contract_value}</td>
              </tr>
              <tr>
                <td>Solution Cost</td>
                <td>{profileData?.solution_cost}</td>
              </tr>
            </tbody>
          </Table>
        </div>

        {/* Fourth Block */}
        <div
          style={{
            background: "white",
            boxShadow: "0px 0px 2px rgba(0,0,0,0.2)",
            borderRadius: "5px",
            padding: "10px",
            height: "360px",
            overflowY: "auto",
            flex: "0 0 calc(33.333% - 10px)", // Each block takes 1/3 of the row
          }}
        >
          <p
            style={{
              fontSize: "14px",
              fontWeight: 600,
              color: "var(--color-main)",
              textAlign: "left",
              paddingLeft: "20px",
            }}
          >
            Operational Information
          </p>
          <Table style={{ fontSize: "11px" }} hover responsive>
            <tbody>
              <tr>
                <td>Locations</td>
                <td>{profileData.locations.join(", ")}</td>
              </tr>
              <tr>
                <td>Served Locations Count</td>
                <td>{profileData.served_locations_count}</td>
              </tr>
              <tr>
                <td>Served Locations</td>
                <td>{profileData.served_locations}</td>
              </tr>
              <tr>
                <td>Clients Count</td>
                <td>{profileData.clients_count}</td>
              </tr>
              <tr>
                <td>Key Clients</td>
                <td>{profileData.key_clients.join(", ")}</td>
              </tr>
            </tbody>
          </Table>
        </div>

        {/* FIFTH BOX */}
        <div
          style={{
            background: "white",
            boxShadow: "0px 0px 2px rgba(0,0,0,0.2)",
            borderRadius: "5px",
            padding: "10px",
            height: "360px",
            overflowY: "auto",
            flex: "0 0 calc(33.333% - 10px)", // Each block takes 1/3 of the row
          }}
        >
          <p
            style={{
              fontSize: "14px",
              fontWeight: 600,
              color: "var(--color-main)",
              textAlign: "left",
              paddingLeft: "20px",
            }}
          >
            Additional Information
          </p>
          <Table style={{ fontSize: "11px" }} hover responsive>
            <tbody>
              <tr>
                <td>Awards</td>
                <td>{profileData.awards}</td>
              </tr>
              <tr>
                <td>Key Client Size</td>
                <td>{profileData.key_client_size}</td>
              </tr>
              <tr>
                <td>Key Client Locations</td>
                <td>{profileData.key_client_locations}</td>
              </tr>
              <tr>
                <td>Industries Served</td>
                <td>{profileData.industries_served}</td>
              </tr>
              <tr>
                <td>Partners Affiliations</td>
                <td>{profileData.partners_affiliations}</td>
              </tr>
              <tr>
                <td>Comments</td>
                <td>{profileData.comments.join(", ")}</td>
              </tr>
            </tbody>
          </Table>
        </div>
        <div
          style={{
            borderRadius: "5px",
            padding: "10px",
            height: "360px",
            overflowY: "auto",
            flex: "0 0 calc(66.333% - 10px)", // Each block takes 1/3 of the row
          }}
        >
          <p
            style={{
              fontSize: "14px",
              fontWeight: 600,
              color: "var(--color-main)",
              textAlign: "left",
              paddingLeft: "20px",
            }}
          >
            Reviews
          </p>
          <Row>
            {profileData.reviews.map((review, index) => (
              <Col xs={12} md={4} key={index} className="mb-3">
                <Card
                  className="border-0 shadow-sm"
                  style={{
                    borderRadius: "8px",
                    background: "#B6CFD6",
                    textAlign: "left",
                  }}
                >
                  <Card.Body>
                    <Card.Title
                      className="text-capitalize"
                      style={{ fontSize: "15px" }}
                    >
                      {review.name}
                    </Card.Title>
                    <Card.Text style={{ fontSize: "12px" }}>
                      <strong
                        style={{
                          color: "var(--color-main)",
                          fontWeight: 600,
                        }}
                      >
                        Rating:
                      </strong>{" "}
                      {review.rating}⭐
                    </Card.Text>
                    <Card.Text style={{ fontSize: "11px" }}>
                      <strong
                        style={{
                          color: "var(--color-main)",
                          fontWeight: 600,
                        }}
                      >
                        Profession:
                      </strong>{" "}
                      {review.profession}
                    </Card.Text>
                    <Card.Text style={{ fontSize: "11px" }}>
                      <strong
                        style={{
                          color: "var(--color-main)",
                          fontWeight: 600,
                        }}
                      >
                        Feedback:
                      </strong>{" "}
                      {review.feedback}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </div>
  );
};

export default SupplierProfile;
