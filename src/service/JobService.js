export const jobResource = `http://18.223.182.178:30897/api/v1/jobs`;
export const base=window.location.origin;
export const jobResource = `http://localhost:8081/api/v1/jobs`;
// const jobResource = `http://localhost:9000/jobs`;
import axios from "axios";

export const getAllJobs = (reqParams, cb) => {
  return axios(`${base}?${reqParams}`).then((res) => {
    const result = res.data;
    cb(result);
  });
};

export const saveJob = (jobId, cb) => {
  return axios
    .post(`${base}/${jobId}/save`, {
      jobId: jobId,
    })
    .then((res) => cb(res.data.id));
};

export const removeJob = (saveJobId) => {
  return axios.delete(`${base}/saved/${saveJobId}`);
};

export const getAllSavedJobs = (cb) => {
  return axios(`${base}/saved`).then((res) => {
    const savedJobsId = res.map((item) => item.id);
    cb(savedJobsId);
  });
};
