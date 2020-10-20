import React, { useRef } from 'react';
import { InputText } from '../InputText';

const InputGenre = ({ values, setValues, deleteValue }) => {
  const tagRef = useRef();

  const handleClick = (e) => {
    e.preventDefault();
    if(tagRef.current.value !== '') {
      setValues({
        tag: tagRef.current.value,
        key: Date.now()
      })
      tagRef.current.value = '';
    }
  }

  return (
    <div>
      <div className="genre-creator">
        <InputText id="genres"
          ref={tagRef}
          placeHolder="Genres"
          errors={''} />
        <button className="btn btn-primary" onClick={handleClick}>+</button>
      </div>
      <div className="genre-holder">
      {
        values.map((value) => {
          return (
            <span className="input-genre" key={value.key}>
              {value.tag}
              <span className="genre-close" aria-hidden="true" onClick={() => deleteValue(value.key)}>&times;</span>
            </span>
          )
        })
      }
      </div>
    </div>
  );
}

export { InputGenre };
