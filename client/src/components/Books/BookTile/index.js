import React from 'react';
import { Link } from 'react-router-dom';

const BookTile = ({
  id,
  title,
  author,
  language,
  genreId,
  url,
  slug,
  genres,
  onDeleteClick
}) => {
  const genre = genres.filter(genre => genre.id === genreId);

  return(
    <tr>
      <td>
        <Link to={"/book/" + slug}>{title}</Link>
      </td>
      <td>{author}</td>
      <td>{language}</td>
      <td>{genre.length > 0 ? genre[0].name : ''}</td>
      <td>
        <a
          className="btn btn-light"
          href={url}
        >
          View
        </a>
      </td>
      <td>
        <button
          className="btn btn-outline-danger"
          onClick={() => onDeleteClick(id)}
        >
          Delete
        </button>
      </td>
    </tr>
  )
}

export { BookTile };
