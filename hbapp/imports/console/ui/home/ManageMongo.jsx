import React from 'react';
import { Meteor } from 'meteor/meteor';


export default class ManageMongo extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      options: null,
      value: '',
    }
  }


  onChange(e) {
    this.setState({
      value: e.target.value
    })
  }

  onInsert(e) {
    let db = JSON.parse(this.state.value);
    let mongoDB = this.state.options;
    Meteor.call('insertCollection', mongoDB, db, (error, result) => {
      // console.log(error);
      // console.log(result);
    });
  }

  onDelete() {
    let db = JSON.parse(this.state.value);
    let mongoDB = this.state.options;
    Meteor.call('removeCollection', mongoDB, db, (error, result) => {
      // console.log(error);
      // console.log(result);
    });
  }

  onUpdate() {
    let db = JSON.parse(this.state.value);
    let mongoDB = this.state.options;
    Meteor.call('updateCollection', mongoDB, db, (error, result) => {
      // console.log(error);
      // console.log(result);
    });
  }

  onQuery() {
    let db = JSON.parse(this.state.value);
    let mongoDB = this.state.options;


    // Meteor.call('queryInfo', DB);
    Meteor.call('queryCollection', mongoDB, db, (error, result) => {
      // console.log(error);
      // console.log(result);
    });
  }

  onClick(e) {
    this.setState({
      options: e.target.value
    })
  }

  render() {
    let optionalCollection;
    var ALL_COLLECTIONS = Object.keys(Meteor.allCollections);
    optionalCollection = ALL_COLLECTIONS.map((v, i) => {
      return <option key={i} value={v}>{v}</option>
    });
    optionalCollection.unshift(<option key={99} value="null">请选择</option>)

    return (
      <div className="container" style={{ margin: "0 auto" }}>
        <div className="management-title" style={{ textAlign: "center" }}>
          <h2>DB 管理</h2>
        </div>
        <div className="container-body" style={{ marginTop: "10%", border: "1px solid #333", padding: "10px 0" }}>
          <div className="management-header">
            <select
              onChange={this.onClick.bind(this)}
              style={{ fontSize: "20px", width: "50%", height: "40px", marginLeft: "25%", marginBottom: "3%" }}>
              {optionalCollection}
            </select>
          </div>
          <div className="management-content">
            <form action="" id="manage_form" onSubmit={this.onInsert.bind(this)}>
              <input type="submit" style={{ visibility: "hidden", position: "absolute" }} />
              <textarea required="true"
                onChange={this.onChange.bind(this)}
                value={this.state.value}
                form="manage_form"
                placeholder="这里提交 Json 数据"
                style={{ width: "80%", marginLeft: "10%", height: "450px" }} >
              </textarea>
            </form>
          </div>
          <div className="management-button-group">
            <div className="button-group-first" style={{ margin: "3% 0 3% 20% " }}>
              <button type="" style={{ width: "30%", marginRight: "10%" }} onClick={this.onInsert.bind(this)}>Insert</button>
              <button type="" style={{ width: "30%" }} onClick={this.onDelete.bind(this)}>Delete</button>
            </div>
            <div className="button-group-second" style={{ marginLeft: "20%" }}>
              <button type="" style={{ width: "30%", marginRight: "10%" }} onClick={this.onUpdate.bind(this)}>Update</button>
              <button type="" style={{ width: "30%" }} onClick={this.onQuery.bind(this)}>Search</button>
            </div>
          </div>
        </div>

      </div>
    )
  }
}