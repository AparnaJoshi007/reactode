import { handleResponse, handleError } from "./apiUtils";
const baseUrl = "http://localhost:3001/genres/";

export function getGenres() {
  return fetch(baseUrl)
    .then(handleResponse)
    .catch(handleError);
}
