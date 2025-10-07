const toastMessages = {
  // General
  successMsgApi: "Data has been successfully retrieved.",
  errorMsgApi: "Failed to retrieve data. Please try again later.",
  errorMsgFilters:
    "Failed to load filters. Please refresh the page and try again.",
  errorMsgSubmit:
    "Unable to submit the data at the moment. Please try again later.",
  errorMsgUpdate:
    "Unable to update the data at the moment. Please try again later.",
  actionTreeSubmit:
    "The new Action Tree has been successfully submitted for approval.",
  categTreeSubmit:
    "The new Category Tree has been successfully submitted for approval.",
  helpQuerySubmit: "Your help query has been submitted successfully.",

  // Approve - Reject
  actionApproval: "The action has been approved successfully.",
  categApproval: "The category has been approved successfully.",
  helpApproval: "The help query has been resolved successfully.",
  actionRejection: "The action has been rejected.",
  categRejection: "The category has been rejected.",
  helpRejection: "The help query has been rejected.",

  // Dashboard
  dashboardFetchSuccess: "Dashboard data retrieved successfully.",
  dashboardFetchFail: "Unable to load dashboard data. Please try again later.",
};

const customErrorMsgApi = (section) => {
  return `Failed to retrieve data for ${section} section. Please try again later.`;
};

export default toastMessages;
