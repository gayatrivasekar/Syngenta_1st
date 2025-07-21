import React from "react";

const SSRTable = ({ records }) => {
  return (
    <table border="1" cellPadding="10" width="100%">
      <thead>
        <tr>
          <th>Name</th>
          <th>Title</th>
          <th>Email ID</th>
          <th>Phone Number</th>
          <th>Commercial</th>
          <th>SSR Sales Area / District</th>
        </tr>
      </thead>
      <tbody>
        {records.map((row, i) => (
          <tr key={i}>
            <td>{row["Name"]}</td>
            <td>{row["Title"]}</td>
            <td>{row["Email ID"]}</td>
            <td>{row["Phone Number"]}</td>
            <td>{row["Commercial"]}</td>
            <td>{row["SSR Sales Area / District"]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SSRTable;
