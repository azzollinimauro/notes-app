import React, {Component} from 'react'
import {observer} from "mobx-react"
import './styles.css'

@observer
class Filter extends Component {
  constructor(props){
    super(props);
    this.Store= this.props.Store;
  }

  componentDidMount() {
    this.Store.fetch()
    console.log('constructor',this.Store.categories)
  }

  handleOnChangeSelectFilter = (event)=>{
    this.Store.notesFiltered=[]
    console.log(event.target.value)
    this.Store.setFilterSelect(event.target.value)
    console.log(this.Store.notesFiltered)
  }

  render() {
    return (
      <div className='filterContainer'>
        <span>Filtrar por categorías: </span>
        <select disabled={this.Store.disabled} onChange={this.handleOnChangeSelectFilter}>
          {this.Store.categories.map ((item) =>
            <option key={item.id} value={item.id}>{item.name}</option>
          )

          }

        </select>
      </div>
    )
  }
}

export default Filter
