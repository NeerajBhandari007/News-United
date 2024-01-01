import React, { useEffect,useState } from "react";
import NewsItem from "./NewsItem";
import Spin from "./Spin";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News=(props)=> {
  const [articles, setArticles] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [totalResults, setTotalResults] = useState(0)

  const updateNews=async()=> {
    props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pagesize}`;
    setLoading(true)
    let data = await fetch(url);
    props.setProgress(30);
    let parseddata = await data.json();
    props.setProgress(70);
    setArticles(parseddata.articles);
    setTotalResults(parseddata.totalResults)
    setLoading(false)
    props.setProgress(100);
  }
  useEffect(() => {
    document.title = `${props.category}--News-United`;
    updateNews();
  },[])
  
  // handlenext = async () => {
  //   // if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / 20))) {
  //   //   this.setState({ loading: true });
  //   //   let url = `https://newsapi.org/v2/top-headlines?country=${
  //   //     props.country
  //   //   }&category=${
  //   //     props.category
  //   //   }&apiKey=a0029be87a1745bd80f2a0c2bb5d0944&page=${
  //   //     this.state.page + 1
  //   //   }&pageSize=${props.pagesize}`;
  //   //   let data = await fetch(url);
  //   //   let parseddata = await data.json();
  //   //   this.setState({
  //   //     page: this.state.page + 1,
  //   //     articles: parseddata.articles,
  //   //     loading: false,
  //   //   });
  //   // }
  //   this.setState({
  //     page: this.state.page + 1,
  //   });
  //   this.updateNews();
  // };
  // handleprev = async () => {
  //   // let url = `https://newsapi.org/v2/top-headlines?country=${
  //   //   props.country
  //   // }&category=${
  //   //   props.category
  //   // }&apiKey=a0029be87a1745bd80f2a0c2bb5d0944&page=${
  //   //   this.state.page - 1
  //   // }&pageSize=${props.pagesize}`;
  //   // this.setState({ loading: true });
  //   // let data = await fetch(url);
  //   // let parseddata = await data.json();
  //   // this.setState({
  //   //   page: this.state.page - 1,
  //   //   articles: parseddata.articles,
  //   //   loading: false,
  //   // });
  //   this.setState({
  //     page: this.state.page - 1,
  //   });
  //   this.updateNews();
  // };
  const fetchMoreData = async () => {
    // this.updateNews();         We will not call we will direct concatinate
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pagesize}`;
    // this.setState({ loading: true });
    setPage(page+1);
    let data = await fetch(url);
    let parseddata = await data.json();
    setArticles(articles.concat(parseddata.articles));
    setTotalResults(parseddata.totalResults)
    setLoading(false)
  };

    return (
      <>
        <h1 className="text-center" style={{ margin: "40px 0px", marginTop:'90px' }}>
          News-United -- Top {props.category} Headlines
        </h1> 
        {loading && <Spin />}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spin />}
        >
          <div className="container">
            <div className="row">
              {articles.map((elemenet) => {
                return (
                  <div className="col-md-4 my-2" key={elemenet.url}>
                    <NewsItem
                      title={elemenet.title ? elemenet.title.slice(0, 88) : ""}
                      description={
                        elemenet.description
                          ? elemenet.description.slice(0, 88)
                          : ""
                      }
                      imageurl={
                        elemenet.urlToImage
                          ? elemenet.urlToImage
                          : "https://cdn.dribbble.com/users/1610832/screenshots/6582277/dribbble-new-news_4x.png?compress=1&resize=400x300&vertical=top"
                      }
                      newsurl={elemenet.url}
                      author={elemenet.author ? elemenet.author : "Author"}
                      date={elemenet.publishedAt}
                      source={elemenet.source.name}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={this.handleprev}
          >
            &larr; Previous
          </button>
          <button
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / props.pagesize)
            }
            type="button"
            className="btn btn-dark"
            onClick={this.handlenext}
          >
            Next &rarr;
          </button>
        </div> */}
      </>
    );
}
News.defaultProps = {
  country: "in",
  pagesize: 4,
  category: "general",
};
News.propTypes = {
  country: PropTypes.string,
  pagesize: PropTypes.number,
  category: PropTypes.string,
};
export default News;
