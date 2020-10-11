import React from 'react';
import { connect } from 'react-redux';
import { changeCurrentTab } from '../../redux/actions';
import { RecipeForm } from '../RecipeForm';

const _New = (props) => (
  <div>
    <RecipeForm />
  </div>
);

const mapStateToProps = (state) => ({
  newItem: state.newItem,
});

const mapDispatchToProps = () => ({
  changeCurrentTab: (type) => changeCurrentTab({ type })
});

export const New = connect(mapStateToProps, mapDispatchToProps)(_New);
