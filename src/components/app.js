import React, { Component } from 'react';
import AddForm from './add_cat';
import CatDetail from './cat_detail';
import CatList from './cat_list';
import CatGallery from './cat_gallery';

  export default class App extends Component
  {
    constructor(props)
    {
      super(props);
      this.state =
      {
        catList: this.getCatList(),
        selectedCat: this.getSelectedCat(),
        selectedCatIndex: 0
      };
      this.changeCountPlus=this.changeCountPlus.bind(this);
      this.handleCatItemClick=this.handleCatItemClick.bind(this);
      this.onImageGalleryClick=this.onImageGalleryClick.bind(this);
    }

    getSelectedCat()
    {
      if (typeof(Storage) !== "undefined")
      {
        console.log("inside storage of selectedCat ");
        console.log(localStorage.getItem("selectedCat"));
        var selectedCat=window.JSON.parse(localStorage.getItem("selectedCat"));
        if(selectedCat)
        {
          console.log("existing selectedCat " +selectedCat);
          return selectedCat;
        }
        else
        {
          console.log("initial selected cat");
          const selectedCat=
          {
            id: 2,
            name: 'Duddy Naddy',
            clicks: 36,
            imgURL: './src/image/pic3.jpg',
            age: 9,
            nickName: 'Duddy N'
          };
          return selectedCat;
        }
      }
    }

    getCatList()
    {
      if (typeof(Storage) !== "undefined")
      {
        console.log("storage has values");
        console.log(localStorage.getItem("catList"));
        var catList=JSON.parse(localStorage.getItem("catList"));

        if(catList){
          console.log("using existing props..."+catList);
          return catList;
      }
      else
      {
        console.log("from initial values...");
        const catList=[
        {
          id: 0,
          name: 'Buddy Taddy',
          clicks: 6,
          imgURL: './src/image/pic1.jpg',
          age: 12,
          nickName: 'Buddy T'
        },
        {
          id: 1,
          name: 'Auddy Caddy',
          clicks: 34,
          imgURL: './src/image/pic2.jpg',
          age: 10,
          nickName: 'Auddy C'
        },
        {
          id: 2,
          name: 'Duddy Naddy',
          clicks: 36,
          imgURL: './src/image/pic3.jpg',
          age: 9,
          nickName: 'Duddy N'
        },
        {
          id: 3,
          name: 'Ruddy Caddy',
          clicks: 22,
          imgURL: './src/image/pic4.jpg',
          age: 4,
          nickName: 'Ruddy C'
        },
        {
          id: 4,
          name: 'Quddy Naddy',
          clicks: 22,
          imgURL: './src/image/pic5.jpg',
          age: 7,
          nickName: 'Quddy N'
        }];
        return catList;
      }
    }
  }

  //incrementing number of times cat image has been clicked
  changeCountPlus()
  {
    //console.log("inside change changeCountPlus clicked "+this.state.catList[id].clicks);
    this.state.selectedCat.clicks += 1;
    this.setState({selectedCat: this.state.selectedCat});
    localStorage.setItem("selectedCat",JSON.stringify(this.state.selectedCat));
  }

  //updating the cat detail form onClicking on catlist item
  handleCatItemClick(listIndex)
  {
    console.log("selectedCatIndex: "+listIndex);
    var selectedCatObj = this.state.catList[listIndex];
    //console.log(selectedCatObj);
    this.setState({selectedCatIndex : listIndex});
    this.setState({selectedCat: selectedCatObj});

    localStorage.setItem("selectedCat",JSON.stringify(selectedCatObj));
    console.log("updated selected cat  "+this.state.selectedCat);
  }

  //incrementing number of times gallery image has been clicked
  onImageGalleryClick(listIndex)
  {
    this.handleCatItemClick(listIndex);
    console.log("image gallery clicked "+listIndex);
  }

  //adding OR updating a new cat item
  submitNewForm(newCat,isNewCat)
  {
    console.log(isNewCat);
    if(isNewCat)
    {
      //adding a new cat
      console.log("new Cat added:");
      var list=this.state.catList;
      list.push(newCat);
      this.setState({catList: list});
      var len=list.length;
      this.setState({selectedCat: this.state.catList[len-1]});
    }
    else
    {
      //updating the existing cat
      var len,str,imagepath,newstr;
      console.log(newCat.imgURL);
      len=newCat.imgURL.length;
      str=newCat.imgURL.slice(52,len);
      console.log(len+" "+ str);
      imagepath='./src/image/';
      newstr=imagepath.concat(str);
      newCat.imgURL=newstr;
      const list = this.state.catList;
      list[this.state.selectedCatIndex] = newCat;
      this.setState({catList: list});
      this.setState({selectedCat: newCat});
      //localStorage.setItem("selectedCat",JSON.stringify(this.state.selectedCat));
      console.log("existing cat updated & selectedCat save to storage");
    }
    localStorage.setItem("catList",JSON.stringify(this.state.catList));
    localStorage.setItem("selectedCat",JSON.stringify(this.state.selectedCat));
    console.log("catList saved to storage "+  this.state.catList);
  }

  //deleting a cat item
  handleDeleteClick(index)
  {
    console.log("inside handleDeleteClick..");
    var selectedCat=this.state.selectedCat;
    console.log(index);
    var list=this.state.catList;
    list.pop(index);
    this.setState({catList: list});
    console.log(selectedCat);
    this.setState({selectedCat: this.state.catList[index+1]});
    localStorage.setItem("catList",JSON.stringify(this.state.catList));
    localStorage.setItem("selectedCat",JSON.stringify(this.state.selectedCat));
  }

  render() {
    return (
      <div className="container">

        <div className="jumbotron">
          <h1 className="text text-center">
            Cat Store App
          </h1>
        </div>

        <div className="row well" id="main" className="responsive">

          <div className="col-sm-4 col-md-3" id="designDiv">
            <CatList
              cats={this.state.catList}
              onCatItemClick={this.handleCatItemClick}
            />
          </div>

          <div className="col-sm-4 col-md-5">
            <CatDetail
              selectedCat={this.state.selectedCat}
              onCatDetailClick={this.changeCountPlus}
            />
          </div>

          <div className="col-sm-4 col-md-4">
            <AddForm
              selectedCat={this.state.selectedCat}
              addNewCat={this.submitNewForm.bind(this)}
              onDeleteclick={this.handleDeleteClick.bind(this)}
            />
          </div>
        </div>
        <div className="row well">
          <div className="col-sm-12 col-md-12">
            <CatGallery
              cats={this.state.catList}
              GalleryImageClick={this.onImageGalleryClick}
            />
          </div>
        </div>
      </div>
    );
  }
}
