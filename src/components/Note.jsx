import React from 'react'
import './styles.css'
const Note = ({title,textArea, date, handleOnDelete, category}) => (
      <div className='boxNote'>
        <div className='title'>
        <div className='titleNote'>{title}</div>
        <button className='eliminar' onClick={handleOnDelete}>X</button>
        </div>
        <div className='category'><div>Categoría: {category}</div>
        <div className='date'>{date}</div>
        </div>
        <div className='textNote'><p>{textArea}</p></div>
      </div>

)

export default Note