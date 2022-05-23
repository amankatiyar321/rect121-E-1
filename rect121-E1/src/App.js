import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import Button from "./components/Button";
import CandidateCard from "./components/CandidateCard";
import "./styles.css";

export default function App() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [salary, setSalary] = useState("ASC");
  // let [f, setF] = useState(false);

  useEffect(() => {
    fetchData({ page, salary });
  }, [page, salary]);

  const fetchData = async ({ page, salary }) => {
    axios({
      method: "get",
      url: "https://json-server-mocker-masai.herokuapp.com/candidates",
      // url: "http://localhost:8080/tasks",
      params: {
        _page: page,
        _limit: 5,
        _sort: "salary",
        _order: salary,
      },
    })
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(true);
      });
  };

  console.log(data);
  return (
    <div className="App">
      <div>
        {loading ? <div id="loading-container">...Loading</div> : null}
        {salary === "DESC" ? (
          <Button
            id="SORT_BUTTON"
            onClick={() => setSalary("ASC")}
            title={`Sort by Ascending Salary`}
          />
        ) : (
          <Button
            id="SORT_BUTTON"
            onClick={() => setSalary("DESC")}
            title={`Sort by Descending Salary`}
          />
        )}
        <Button
          title="PREV"
          id="PREV"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        />
        <Button id="NEXT" onClick={() => setPage(page + 1)} title="NEXT" />
      </div>
      {data.map((item) => (
        <div>
          <CandidateCard key={item.id} {...item} />
        </div>
      ))}
    </div>
  );
}
