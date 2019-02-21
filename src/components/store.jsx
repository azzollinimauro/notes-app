import {action, observable, computed, decorate, runInAction} from "mobx"
import React from "react"

const TODAS = 0
class Store {

  @observable latestTitle = '';
  @observable latestText = ''
  @observable notes = (this.getStorage())
  @observable select = 1
  @observable edition= {status:false, item: null}
  @observable notesFiltered=this.notes
  @observable filterSelected = 0
  @observable categories=[{id: TODAS, name:'Cargando..'}]
  @observable disabled= true;
  @observable orderByDate=1;
  @observable currentCategory=1

  @action
  fetch() {
    fetch('http://private-59944-ejercicioreact.apiary-mock.com/categories').then(resolve=>
    resolve.json()
    ).then(data=> {
      console.log('then')

        if (this.categories.length===1) {
          runInAction(() => {
            this.categories=[{id: TODAS, name: 'Todas'}]
            console.log('runInAction', data)
            this.disabled=false
            data.forEach(item => {
              this.categories.push(item)
            })

            return data
            console.log(this.categories)
          })
        }
      }

      )
  }

  @action
  setLatestTitle(value) {
    this.latestTitle = value;
  }

  @action
  setOrderByDate(value) {
    this.orderByDate = value;
  }

  @action
  getStorage (){
    if (!window.localStorage.getItem('notes')) {
      window.localStorage.setItem('notes', JSON.stringify([]))
      console.log(JSON.parse(window.localStorage.getItem('notes')))
      return (JSON.parse(window.localStorage.getItem('notes')))
    }

    return (JSON.parse(window.localStorage.getItem('notes')))

  }


  @action
  setLatestText(value) {
    this.latestText = value;
  }

  @action
  setSelect (value){
    this.currentCategory=value
  }

  @action
  setFilterSelect (value){
    this.filterSelected= value
    if (value*1 === TODAS) {
      this.notesFiltered = this.notes
    } else {
      this.notesFiltered = this.notes.filter(item => item.category === this.categories[value].name)
    }

    if (this.orderByDate==='2'){
      console.log('entre aca')
      const c=this.notesFiltered.reverse();
      this.notesFiltered=c

    }
    console.log('filtrado', this.notesFiltered)
    console.log('sin filtrar', this.notes)
    console.log(this.orderByDate)
  return this.notesFiltered
  }

  @computed
  get datetime (){
    const date= new Date();
    const time= (date.getDate()) + '-' + (date.getMonth()+1)+ '-' + (date.getFullYear()) + ' | ' + (date.getHours())+':'+(date.getMinutes()) + ' hs'
    return time
  }

  condition (){
    if(this.edition.status===false){
    return (this.notes.length)
  }else{
      console.log('itemdeedicion',this.edition.item)
    return (this.edition.item)
  }
  }

  @action
  submit() {
    if (this.latestText === '') {
      alert('ERROR, EL CAMPO DE TEXTO ES REQUERIDO')
      document.getElementById('text').focus();
    } else {
      const index= this.condition()
      console.log('array',index)
      if (this.latestTitle === '') {
        this.notes[index] = ({title: 'Sin título', datetime: ((!this.notes[index])? ((this.datetime)): (this.notes[index].datetime)), text: this.latestText, category: (this.categories[(this.currentCategory)].name)})
        console.log('filterselect',this.notesFiltered)

      } else {
        this.notes[index] = ({title: this.latestTitle, datetime: ((!this.notes[index].datetime)? ((this.datetime)): (this.notes[index].datetime)), text: this.latestText, category: (this.categories[(this.currentCategory)].name)})
        console.log('filterselect',this.notesFiltered)
      }

    }
    this.edition={status:false, item: null}
    this.notesFiltered=[]
    this.setFilterSelect(this.filterSelected)
    window.localStorage.setItem('notes', JSON.stringify(this.notes))
    console.log(this.notes)
    this.latestText = ''
    this.latestTitle = ''
  }


  @action
  edit(current) {
    console.log(current)
    this.latestTitle= this.notesFiltered[current].title
    this.latestText= this.notesFiltered[current].text
    this.edition.status= true;
    (this.categories.forEach((item,index)=>{
    if (item.name===this.notesFiltered[current].category) {
      this.currentCategory=item.id
      this.select=this.currentCategory
      }
      }))

    this.notes.forEach((note, index)=>{

        if (note === this.notesFiltered[current]) {
          console.log('index', index)
          this.edition.item=index
        }


      })



  }

  @action
  cancel(){
    this.edition.status=false
    this.latestText=''
    this.latestTitle=''
  }

  @action
  delete(current) {
    const newArray = this.notes.filter(a => {
      return a !== this.notesFiltered[current];
      console.log('a',a)
    })


    if (this.notes!==newArray) {
      this.notes = newArray
      console.log('cambio')
    }
    this.notesFiltered=[]
    this.setFilterSelect(this.filterSelected)

    window.localStorage.setItem('notes', JSON.stringify(newArray))

  }

}

export default Store;
