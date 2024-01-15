import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';

export default class News extends Component {
  static defaultProps = {
    country: 'us',
    pageSize: 8,
    category: 'general',
  }
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  }

  constructor(){
    super();
    this.state ={
      articles: [],
      loading: false,
      page: 1
    }
  }
  
  async componentDidMount(){
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ea4b83a376ae49eda8328201a9dcfc29&page=1&pageSize=${this.props.pageSize}`;
    this.setState({loading:true});
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({articles: parsedData.articles,
    totalResults: parsedData.totalResults,
    loading:false
    })
  }

  handleNextClick = async () =>{
    console.log("Next");

    if(!(this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize))){
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ea4b83a376ae49eda8328201a9dcfc29&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
      this.setState({loading:true});
      let data = await fetch(url);
      let parsedData = await data.json();
      this.setState({
        page: this.state.page + 1,
        articles: parsedData.articles,
        loading: false
      })
    }
    
  }
  handlePrevClick = async() =>{
    console.log("Previous");

    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ea4b83a376ae49eda8328201a9dcfc29&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
    this.setState({loading:true});
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles,
      loading:false
    })
  }

  

  render() {
    return (
      <div className='container my-3'>
        <h1 style={{textAlign:'center'}}>Welcome to the Top HeadLines</h1>
        {this.state.loading && <Spinner />}

        <div className='row' style={{textAlign:'center'}}>
        {!this.state.loading && this.state.articles.map((elemnt)=>{
          return <div className='col-md-4' key={elemnt.url}>
                  <NewsItem title={elemnt.title?elemnt.title.slice(0, 45):""} description={elemnt.description?elemnt.description.slice(0, 88):""} imageUrl={elemnt.urlToImage} newsUrl={elemnt.url}/>
                  </div>
        })}
        </div>
        <div className='container d-flex justify-content-between'>
        <button type="button" disabled={this.state.page<=1} className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
        <button type="button" disabled={this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize)} className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
      </div>
    )
  }
}
