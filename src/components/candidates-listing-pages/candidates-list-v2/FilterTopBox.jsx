import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Constant } from '@/utils/constant/constant';

const FilterTopBox = () => {
  const [candidates, setCandidates] = useState([]);
  const token = localStorage.getItem(Constant.USER_TOKEN);
  useEffect(() => {
    // Fetch job seekers data
    const fetchJobSeekers = async () => {
      try {
        const response = await axios.get(
          'https://api.sentryspot.co.uk/api/employeer/job-seekers',
          {
            headers: {
              Authorization: token, // Replace with your token
            },
          }
        );
        
        // Set the data to the state
        if (response.data.code === 200) {
          setCandidates(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching job seekers:', error);
      }
    };

    fetchJobSeekers();
  }, []);

  return (
    <div className="row">
      {candidates.map((candidateWrapper) => {
        const candidate = candidateWrapper.jobskkers_detail;
        return (
          <div
            className="candidate-block-four col-lg-6 col-md-6 col-sm-12"
            key={candidate.id}
          >
            <div className="inner-box">
              <ul className="job-other-info">
                {candidate.job_seeker_shortlisted ? (
                  <li className="green">Shortlisted</li>
                ) : (
                  <li className="red">Not Shortlisted</li>
                )}
              </ul>

              <span className="thumb">
                <img
                  src={`https://api.sentryspot.co.uk${candidate.photo}`}
                  alt="candidate"
                />
              </span>
              <h3 className="name">
                <Link to={`/candidates-single-v1/${candidate.id}`}>
                  {candidate.first_name} {candidate.last_name}
                </Link>
              </h3>
              <span className="cat">{candidate.proffesional_title || 'Developer'}</span>

              <ul className="job-info">
                <li>
                  <span className="icon flaticon-map-locator"></span>{" "}
                  {candidate.cities?.name}, {candidate.states?.name}, {candidate.countries?.name}
                </li>
                <li>
                  <span className="icon flaticon-money"></span> 
                  ${candidate.current_salary || 'N/A'} / year
                </li>
              </ul>

              <ul className="post-tags">
                {candidate.skills_arr?.map((skill, index) => (
                  <li key={index}>
                    <a href="#">{skill}</a>
                  </li>
                ))}
              </ul>

              <Link
                to={`/candidates-single-v1/${candidate.id}`}
                className="theme-btn btn-style-three"
              >
                View Profile
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FilterTopBox;
