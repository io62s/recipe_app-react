import React, { Component, Fragment } from 'react';
import './App.css';
//import { recipes } from "./tempList";
import RecipeList from "./components/RecipeList";
import RecipeDetails from "./components/RecipeDetails";


class App extends Component {
  state = {
    recipes: [],
    url: "https://www.food2fork.com/api/search?key=ddebce16785a37546cedd6898a3a04da",
    base_url: "https://www.food2fork.com/api/search?key=ddebce16785a37546cedd6898a3a04da",
    details_id: 35389,
    pageIndex: 1,
    search: "",
    query: "&q=",
    error: ""
  }

  async getRecipes() {
    try {
      const response = await fetch(this.state.url);
      const data = await response.json();
      if (data.recipes.length === 0) {
        this.setState(() => {
          return {error: "No recipes found..."}
        })
      } else {
        this.setState(() => {
          return {
            recipes: data.recipes
          }
        })
      }
      
      this.setState({
        recipes: data.recipes
      })

    } catch (err) {
      console.log("ERROR:", err);
    }
  }

  componentDidMount = () => {
    this.getRecipes();
  }

  displayPage = (index) => {
    switch (index) {
      default:
      case 1:
        return (
        <RecipeList 
          recipes={this.state.recipes} 
          details={this.handleDetails}
          value={this.state.search}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          error={this.state.error}
        />
        )
      case 0:
        return (<RecipeDetails id={this.state.details_id} backToList={this.handleIndex}/>)  
    }
  }

  handleIndex = (index) => {
    this.setState({
      pageIndex: index
    })
  }

  handleDetails = (index, id) => {
    this.setState({
      pageIndex: index,
      details_id: id
    })
  }

  handleChange = (e) => {
    this.setState({
      search: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { base_url, query, search } = this.state; 

    this.setState(() => {
      return {
        url: `${base_url}${query}${search}`,
        search: ""
      }
    })
    this.getRecipes();
  }
  
  render() {
    
    return (
      <Fragment>
        {this.displayPage(this.state.pageIndex)}
      </Fragment>
    );
  }
} 

export default App;


