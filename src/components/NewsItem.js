import React, { Component } from 'react'

export class NewsItem extends Component {
  
  render() {
    let {title, description, imageUrl, newsUrl} = this.props;
    return (
      <div className='my-3'>
        <div className="card" style={{width: "18rem"}}>
          <img src={!imageUrl?"https://s40424.pcdn.co/in/wp-content/uploads/2023/04/what-does-a-business-analyst-do.png":imageUrl} className="card-img-top" alt="..."/>
          <div className="card-body">
            <h5 className="card-title" >{title}...</h5>
            <p className="card-text" style={{textAlign:"left"}}>{description}...</p>
            <a href={newsUrl} target='_blank' rel="noreferrer" className="btn btn-sm btn-dark" style={{textAlign:"left"}}>Read More..</a>
          </div>
        </div>
      </div>
    )
  }
}

export default NewsItem;
