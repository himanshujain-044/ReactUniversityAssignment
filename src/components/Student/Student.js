import React, { useEffect, useContext, Fragment } from "react";
import CommonTable from "../CommonComp/CommonTable";
import useHttp from "../../hooks/use-http";
import { getUserEnrolledCourses } from "../../lib/api";
import AuthContext from "../../store/auth-context";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";

const Student = (props) => {
  const token = useContext(AuthContext).token;
  const {
    sendRequest,
    status,
    data: response,
  
  } = useHttp(getUserEnrolledCourses, true);
  useEffect(() => {
    sendRequest(token);
  }, [sendRequest, token]);

  console.log(response);
  if (status === "pending") {
    return <LoadingSpinner />;
  }
  if (status === "completed" && response === "No courses available") {
    return <h4>No corses available</h4>;
  }
  let tableColumns = [
    { id: "Coursename", label: "Coursename" },
    { id: "courseImg", label: "Course image" },
    { id: "Progress", label: "Progress" },
  ];
  console.log(response);
  return (
    status === "completed" && (
      <Fragment>
        <h1>Your enrolled courses</h1>
        <hr style={{ width: "200px", marginBottom: "10px" }} />
        {status === "completed" && response.length === 0 && (
          <p>No course available now</p>
        )}
        {status === "completed" && response.length !== 0 && (
          <CommonTable tableColumns={tableColumns} tableRows={response} />
        )}
      </Fragment>
    )
  );
};
export default Student;
