import React ,{ Component} from 'react';

//class CatDetail extends Component{
const CatDetail = (props) => {

  function handlClick(){
      //console.log("inside cat detail handlClick clicked "+props.selectedCat.id);
      props.onCatDetailClick(props.selectedCat.id);
    }

    return (
      <div className="thumbnail" style={{height:300,padding:35}} className="well">
        <label>catName: {props.selectedCat.name}</label><br/>
        <label>number of clicks: {props.selectedCat.clicks}</label><br/>
        <a onClick={handlClick}><img className="img responsive" src={props.selectedCat.imgURL} height={170} width={230}/></a>
        <label>Age: {props.selectedCat.age}</label>
        <label>nickName: {props.selectedCat.nickName}</label>
      </div>
    );
    }

export default CatDetail;
