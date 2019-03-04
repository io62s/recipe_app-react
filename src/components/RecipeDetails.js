import React, { Component, Fragment } from 'react';
import { recipe } from "../tempDetails";


class RecipeDetails extends Component {
    state = {
      recipe: recipe,
    }


    async componentDidMount() {
      const id = this.props.id;
      const url = `https://www.food2fork.com/api/get?key=ddebce16785a37546cedd6898a3a04da&rId=${id}`
    try {
      const response = await fetch(url);
      const data = await response.json();

      this.setState({
        recipe: data.recipe
      })
    } catch (err) {
      console.log("ERROR:", err);
    }
  }
  

  render() {
    const { 
      image_url, 
      publisher_url, 
      publisher, 
      source_url, 
      title, 
      ingredients 
    } = this.state.recipe;

    const { backToList } = this.props;
    
    return (
      <Fragment>
        <div className="container">
          <div className="row">
            <div className="col-10 mx-auto col-md-6 my-3">
              <button 
                type="button" 
                className="btn btn-warning mb-5 text-capitalize" 
                onClick={() => backToList(1)}>back to recipes
              </button>
              <img 
                src={image_url} 
                className="d-block w-100 shadow" 
                alt="recipe"
              />
            </div>
            {/* details */}
            <div className="col-10 mx-auto col-md-6 my-3">
              <h6 className="text-capitalize">{title}</h6>
              <h6 className="text-warning text capitalize text-slanted">provided by {publisher}</h6>
              <a 
                href={publisher_url} 
                rel="noopener noreferrer" 
                target="_blank" 
                className="btn btn-primary mt-2 text-capitalize shadow-sm" >
                publisher webpage
              </a>
              <a 
                href={source_url} 
                rel="noopener noreferrer" 
                target="_blank" 
                className="btn btn-link mt-2 mx-3 text-capitalize shadow-sm" >
                recipe url
              </a>
              <ul className="list-group mt-4">
                <h2 className="mt-3 mb-4 text-slanted">Ingredients</h2>
                {ingredients.map((ingr, i) => (
                  <li key={i} className="list-group-item">{ingr}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Fragment>
    )
  }
}

export default RecipeDetails

