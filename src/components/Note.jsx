import React from 'react'
import './styles.css'
import img from '../editIcon.png'
const Note = ({title,textArea, date,handleOnEdit, handleOnDelete, category}) => (
      <div className='boxNote'>
        <div className='title'>
        <div className='titleNote'>{title}</div>
          <img onClick={handleOnEdit} className='img' src={img}/>
          <button className='eliminar' onClick={handleOnDelete}>X</button>
        </div>
        <div className='category'><div>Categoría: {category}</div>
        <div className='date'>{date}</div>
        </div>
        <div className='textNote'><p>{textArea}</p></div>

      </div>

)

export default Note