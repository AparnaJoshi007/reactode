import React from 'react';
import { useInput } from '../hooks/useInput';
import { useModal } from '../hooks/useModal';
import { InputText } from '../common/InputText';
import { Modal, ModalTitle, ModalBody, ModalFooter } from "../common/Modal";


const RecipeForm = (props) => {
  const [ values, errors, setInputValues, setInputErrors ] = useInput({values: {}, errors: {}});
  const { isOpen: showIngredientsBuilder, toggle: toggleIngredientsBuilder } = useModal();
  const { isOpen: showStepsBuilder, toggle: toggleStepsBuilder } = useModal();

  return (
    <div>
      <form>
        <InputText id="recipeTitle"
          title="Recipe Title"
          value={values["recipeTitle"] || ''} 
          changeHandler={setInputValues}
          placeHolder="Recipe Title"
          errors={errors["recipeTitle"] || ''}
          />
        <div className="form-group">
          <div className="col-sm-12">
            <button type="button" className="btn btn-light w-100" onClick={toggleIngredientsBuilder}>Add Ingredients</button>
            <Modal isOpen={showIngredientsBuilder} toggle={toggleIngredientsBuilder}>
              <ModalTitle handleClick={toggleIngredientsBuilder}>Modal title</ModalTitle>
              <ModalBody>Modal body</ModalBody>
              <ModalFooter>Modal footer</ModalFooter>
            </Modal>
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-12">
            <button type="button" className="btn btn-light w-100" onClick={toggleStepsBuilder}>Add Steps</button>
            <Modal isOpen={showStepsBuilder} toggle={toggleStepsBuilder}>
              <ModalTitle handleClick={toggleStepsBuilder}>Modal title</ModalTitle>
              <ModalBody>Modal body</ModalBody>
              <ModalFooter>Modal footer</ModalFooter>
            </Modal>
          </div>
        </div>
        <div className="form-group row m-0">
          <div className="col-sm-6 mb-3 mb-sm-0">
            <button type="button" className="btn btn-light w-100">Add cooking time</button>
          </div>
          <div className="col-sm-6">
            <button type="button" className="btn btn-light w-100">Add tags</button>
          </div>
        </div>
        <InputText id="recipeDescription"
          title="Description"
          value={values["recipeDescription"] || ''} 
          changeHandler={setInputValues}
          placeHolder="Description"
          errors={errors["recipeDescription"] || ''}
          />
        <InputText id="recipeSource"
          title="Source"
          value={values["recipeSource"] || ''} 
          changeHandler={setInputValues}
          placeHolder="Example.com"
          errors={errors["recipeSource"] || ''}
          />
        <InputText id="recipeUrl"
          title="URL"
          value={values["recipeUrl"] || ''} 
          changeHandler={setInputValues}
          placeHolder="https://example.com"
          errors={errors["recipeUrl"] || ''}
          />
        
        <div className="form-group row m-0"> 
          <div className="col-sm-6 mb-3 mb-sm-0">
            <button type="button" className="btn btn-primary w-100">Preview</button>
          </div>
          <div className="col-sm-6">
            <button type="submit" className="btn btn-primary w-100">Save</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export { RecipeForm };
