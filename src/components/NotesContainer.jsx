import React, {Component} from 'react'
import Note from "./Note"
import './styles.css'
import Store from "./store"
import {observer} from "mobx-react"

@observer
class NotesContainer extends Component {
  constructor(props){
    super(props)
    this.Store= this.props.Store
  }

  handleOnDeleteItem = index => () => this.Store.delete(index)

  render() {
    return (

        <div id='notes'>

          {this.Store.notesFiltered.map ((item, index) =>

            (<Note key={index} category={item.category} handleOnDelete={this.handleOnDeleteItem(index)} title={item.title} textArea={item.text}/> )

          )
          }
        </div>

    )
  }
}

export default NotesContainer