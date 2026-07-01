import React, { Component } from 'react'

export default class Newsitem extends Component {
    
  render() {
    let {title, description,imageurl,newsurl, author, date ,source}=this.props;
    return (
      <div className='my-3'>
       <div className="card " >
        <div style={{display:'flex',
                     justifyContent:'flex-end',
                     position:'absolute',
                     right:'0'
        }}>
        <span className=" badge rounded-pill bg-danger" style={{left:"90%",zIndex:"1"}} > {source} </span></div>
  <img src={imageurl?imageurl:"https://static.tnn.in/thumb/msid-110541092,thumbsize-1069473,width-1280,height-720,resizemode-75/110541092.jpg"} className="card-img-top" alt="..."/>
  <div className="card-body">
    <h5 className="card-title">{title}
     </h5>
    <p className="card-text">{description}</p>
    <p className="card-text"><small className="text-muted">By {!author?"Unknown": author} on {new Date(date).toGMTString()}</small></p>
    <a  rel="noreferrer" href={newsurl} target='_balank' className="btn btn-sm btn-primary">Read More</a>
  
     </div>
   </div>
</div>
    )
  }
}
