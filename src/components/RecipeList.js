import React, { Component, Fragment } from 'react';
import Recipe from "./Recipe";
import RecipeSearch from "./RecipeSearch";


class RecipeList extends Component {
  
  render() {
    const { recipes, details, value, handleSubmit, handleChange, error } = this.props;
    return (
      <Fragment>
        <RecipeSearch 
          value={value} 
          handleChange={handleChange} 
          handleSubmit={handleSubmit}
        />

        <div className="container mb-5">
          {/* row title */}
          <div className="row">
            <div className="col-10 mx-auto col-md-6 text-center mb-3">
              <h1 className="text-slanted">Recipe List</h1>
            </div>
          </div>
          {/* row title-end */}
          <div className="row">
            {error ? <h1 className="text-danger text-center">{error}</h1> : recipes.map(recipe => (
              <Recipe key={recipe.recipe_id} recipe={recipe} details={details} />
            ))}
          </div>
        </div>
      </Fragment>
    )
  }
}

export default RecipeList