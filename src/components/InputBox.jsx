import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Note from "./Note"
import './styles.css'
import {observer} from "mobx-react"
import Store from "./store"
import Filter from "./Filter"
import NotesContainer from "./NotesContainer"

@observer
class InputBox extends Component {

  constructor(){
    super()
    this.Store= new Store();
    this.Store.fetch()

  }

  handleOnBlurTitle = (event) => {
    this.Store.setLatestTitle(event.target.value)
  }

  handleOnBlurText = (event) => {
    this.Store.setLatestText(event.target.value)
  }

  submit = () => {
    this.Store.submit()
  }

  deleteNote=(current)=>{
    this.Store.delete(current)
  }

  handleOnChangeSelect=(event)=>{
    this.Store.setSelect(event.target.value)
  }

  prepareOptions=()=>{
    return this.Store.categories.filter(item => item.id !== 0)
  }


    render()
    {
      return (
        <div>
        <div className='container'>
          <h1>Mis Notas</h1>
          <input placeholder='Título' type="text" value={this.Store.latestTitle} onChange={this.handleOnBlurTitle} onBlur={this.handleOnBlurTitle}/>
          <textarea placeholder='Texto' id='text' value={this.Store.latestText} onChange={this.handleOnBlurText} onBlur={this.handleOnBlurText}></textarea>
          <div className='selectInput'>
         <span>Categoría: </span>
            <select disabled={this.Store.disabled} onChange={this.handleOnChangeSelect}>
              {(this.prepareOptions().length !== 0) ? (
                this.prepareOptions().map((item) =>
                <option key={item.id} value={item.id}>{item.name}</option>
                )): (<option key={0} value={0}>Cargando..</option>)

              }
          </select>
          </div>

          <button onClick={this.submit}>Agregar Nota</button>

        </div>

         <Filter Store={this.Store}/>
         <NotesContainer Store={this.Store}/>

        </div>


      )
    }

  }

InputBox.propTypes = {}

export default InputBox