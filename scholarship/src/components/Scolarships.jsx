import React from "react";
import ScholarshipCard from "../components/ScholarshipCard";
import { page1, page2 } from "../data/scholarships";

import "../styles/Scholarships.css";


function Scholarships() {

  const scholarships = [
    ...page1,
    ...page2
  ];


  return (

    <div className="scholarships-page">

      <h1>
        Scholarship Opportunities
      </h1>


      <div className="scholarship-grid">

        {
          scholarships.map((scholarship) => (

            <ScholarshipCard
              key={scholarship.id}
              scholarship={scholarship}
            />

          ))
        }

      </div>


    </div>

  );

}


export default Scholarships;