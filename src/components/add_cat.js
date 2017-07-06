import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class AddForm extends Component{

  constructor(props){
    super(props);
    this.state={
      name: ' ',
      clicks: '',
      imgURL: ' ',
      age: ' ',
      nickName: '',
      isNewCat: false,
      istouched: false
    };
  }

  componentDidMount(){
    this.setState({
      id: this.props.selectedCat.id,
      name: this.props.selectedCat.name,
      clicks: this.props.selectedCat.clicks,
      imgURL: this.props.selectedCat.imgURL,
      age: this.props.selectedCat.age,
      nickName: this.props.selectedCat.nickName,
    });
  }

  componentWillReceiveProps(newProps){
    this.setState
    ({
      id: newProps.selectedCat.id,
      name: newProps.selectedCat.name,
      clicks: newProps.selectedCat.clicks,
      imgURL: newProps.selectedCat.imgURL,
      age: newProps.selectedCat.age,
      nickName: newProps.selectedCat.nickName
    });
  }

  handleChange1(e){this.setState({name: e.target.value,istouched: true});}
  handleChange2(e){this.setState({clicks: e.target.value,istouched: true});}
  handleChange4(e){this.setState({age: e.target.value,istouched: true});}
  handleChange5(e){this.setState({nickName: e.target.value,istouched: true});}
  handleChange3(e){this.setState({imgURL: e.target.value,istouched: true});}

  handleSubmit(e)
  {
    e.preventDefault();
    /*if(!this.refs.name.value)
    console.log("please enter name");*/
    if(this.state.istouched)
    {
      var str,len,imagepath,newstr;
      var newCat=
      {
        id: this.state.id+1,
        name: this.refs.name.value,
        clicks: Number(this.refs.clicks.value),
        imgURL: this.refs.imgURL.src,
        age: Number(this.refs.age.value),
        nickName: this.refs.nickName.value
      };
      newCat.imgURL=this.refs.imgURL.src;
      len=newCat.imgURL.length;
      str=newCat.imgURL.slice(12,len);
      imagepath='http://localhost:8080/src/image/';
      newstr=imagepath.concat(str);
      //console.log(newstr);
      newCat.imgURL=newstr;
      //console.log(this.props.selectedCat.id);
      this.props.addNewCat(newCat,this.state.isNewCat);
      //this.props.refs.name.getInputDOMNOde().focus();
    }
    else
    {
      alert("can't update , did't touched even..");
    }
  }

  handleReset(e){
    this.setState({
      name: '',
      clicks: '',
      imgURL: ' ',
      age: '',
      nickName: '',
      isNewCat: true
    });
  }

  handleDelete(e){
    console.log("inside handleDelete ..");
    this.props.onDeleteclick(this.props.selectedCat.id);
  }

  render(){
    return (
        <div>
          <button className="btn btn-primary" type="button" onClick={this.handleReset.bind(this)}>Add New Cat</button>
          <div className="form-group" className="well">
			   		<form ref="catForm">
			   			<input type="text" ref="name" className="form-control"
                onChange={this.handleChange1.bind(this)}
                value={this.state.name}
              />
			   			<input type="text" ref="clicks" className="form-control"
                onChange={this.handleChange2.bind(this)}
                value={this.state.clicks}
              />
			   			<input type="file" ref="imgURL"  className="form-control"
                onChange={this.handleChange3.bind(this)}
                src={this.state.imgURL}
              />

			   			<input type="text" ref="age" className="form-control"
                onChange={this.handleChange4.bind(this)}
                value={this.state.age}
              />
			   			<input type="text" ref="nickName" className="form-control"
                onChange={this.handleChange5.bind(this)}
                value={this.state.nickName}
              />
			   			<br /><span className="space"></span>
				   		<button type="button" className="btn btn-primary" onClick={this.handleSubmit.bind(this)}>Save</button><span className="space"></span>
              <button type="button" className="btn btn-danger" onClick={this.handleDelete.bind(this)}>Delete</button>
			   		</form>
		   		</div>

        </div>
    );
  }
}
