import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


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
  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }


  constructor(props) {
    super(props);
    console.log("Hello I am a constructor from News component");
    console.log(props.apiKey);
    this.state = {
      articles:  [],
      loading: true,
      page: 1,
      totalResults:0
    }
    document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsQuick`;
  }

  async updateNews(props) {
    this.props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
  console.log(url);

    // this.setState({ loading: true });
    let data = await fetch(url);
    this.props.setProgress(30);
    let parsedData = await data.json();
    this.props.setProgress(70);
    console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false
    })
    this.props.setProgress(100);
    
  }

  async componentDidMount() {
    this.updateNews();
  }


  handleNextClick = async () => {
    this.setState({ page: this.state.page + 1 });
    this.updateNews();

  }

  handlePreviousClick = async () => {
    this.setState({ page: this.state.page - 1 });
    this.updateNews();

  }
 
  fetchMoreData = async()=>{
    this.setState({page:this.state.page + 1})
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
    console.log(url);
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
        articles: this.state.articles.concat(parsedData.articles),
        totalResults: parsedData.totalResults,
        loading: false
    })
    
  }

// stopSpinner=()=>{
//   if(this.state.articles.length === this.state.totalResults){
//     this.setState({

//       loading: false,
//   })

//   }
// }

  render() {
    return (
<>
  <div className="my container">
        <h1 className='text-center' style={{ margin: "40px",marginTop:'90px' }}>NewsQuick- Top
        {this.capitalizeFirstLetter(this.props.category)} HeadLines</h1>
        {this.state.loading && <Spinner />}
        <InfiniteScroll
        dataLength={this.state.articles.length}
        next={this.fetchMoreData}
        hasMore={this.state.articles.length !== this.state.totalResults}
        loader={<Spinner/>}> 
       {/* {this.stopSpinner} */}
       <div className="Container" style={ {overflowX: 'hidden'}}>
        <div className='row'>
          {this.state.articles.map((element) => {
            return <div className="col-md-4" key={element.url}>
              <Newsitem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageurl={element.urlToImage} newsurl={element.url} author={element.author} date={element.publishedAt}
                source={element.source.name} />
            </div> 
           
         
          })}
        </div>
        
         </div>
          </InfiniteScroll>
       </div>
       
      
    </>
    )
  }
}
