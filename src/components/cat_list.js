import React from 'react';

const Badge =(props) => {

  function handleClick(listIndex){
		console.log("i am inside badge click:"+props.listIndex);
		props.onListItemClick(props.listIndex);
	}

  return <div>
			<button className="btn btn-default"
				type="button"
				title={props.name} onClick={handleClick}>
				{props.name}
				<span className="badge">
					{props.clicks}
				</span>
			</button>
		</div>
  }

class catList extends React.Component{

  constructor(props){
    super(props);
    this.state={
      name: ' '
    };
  }

  handleClick(listIndex) {
		//console.log("i am inside handleClick list");
		this.props.onCatItemClick(listIndex);
	}

  render(){
    var sortedlist=[];
    sortedlist=this.props.cats.sort((a,b) => {
      if(b.clicks==a.clicks)
        return 0;
      else {
        return b.clicks-a.clicks;
      }
    });
    //console.log(this.props.cats);
    //console.log(sortedlist);
    var catlist = [],index=0;
		for(index=0; index<this.props.cats.length; index++) {
			catlist.push(<Badge {...this.props.cats[index]} listIndex={index} key={index} onListItemClick={this.handleClick.bind(this,index)}/>);
		};

    return (
      <div>
        <h3>Cat list </h3>
        <div className="btn-group">
          {catlist}
        </div>
      </div>
    );
  }
}

export default catList;
