import React, { useEffect, useState } from "react";
import form from '../components/form'

function index() {
  const [message, setMessage] = useState("loading");
  const [people, setPeople] = useState([]);
  const [status, setStatus] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/api/home")
      .then((response) => response.json())
      .then((data) => {
        setMessage(data.message);
        setPeople(data.people);
        setStatus(data.status);
      });
  }, []);

  return (
    <div>
      <div>{form()}</div>
      <div>{message}</div>

      {people.map((person, index) => (
        <div key={index}>{person}</div>
      ))}

      <div>{status}</div>
    </div>
  );
}

export default index;
