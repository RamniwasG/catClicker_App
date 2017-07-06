import React, { Component } from 'react';

class CatGallery extends Component{

  onGallryClick(index){
    //console.log("gallery item clicked "+index);
    this.props.GalleryImageClick(index);
  }
  render(){
    const catlist = this.props.cats.map((cat,index) => {
      return (
          <div className="thumbnail" key={index} >
            <label>catName: {cat.name}</label><br />
            <label>clicks: {cat.clicks}</label><br/>
            <a onClick={this.onGallryClick.bind(this,index)}><img className="img responsive" src={cat.imgURL} style={{ width: 160, height: 160}} /></a><br />
            <label>age: {cat.age}</label><br />
            <label>NickName :{cat.nickName}</label>
          </div>
      );
    });

  return (
      <div>
          {catlist}
      </div>
  );
  }
}

export default CatGallery;
