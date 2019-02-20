import {action, observable, computed, decorate, runInAction} from "mobx"

const TODAS = 0
class Store {

  @observable latestTitle = '';
  @observable latestText = ''
  @observable notes = (this.getStorage())
  @observable select = 1
  @observable notesFiltered=this.notes
  @observable filterSelected = 0
  @observable categories=[{id: TODAS, name:'Cargando..'}]
  @observable disabled= true;

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
    this.select=value
    console.log(this.select)
  }

  @action
  setFilterSelect (value){
    this.filterSelected= value
    if (value*1 === TODAS) {
      this.notesFiltered = this.notes
    } else {
      this.notesFiltered = this.notes.filter(item => item.category === this.categories[value].name)
    }

    console.log('filtrado', this.notesFiltered)
    console.log('sin filtrar', this.notes)

  return this.notesFiltered
  }


  @action
  submit() {
    if (this.latestText === '') {
      alert('ERROR, EL CAMPO DE TEXTO ES REQUERIDO')
      document.getElementById('text').focus();
    } else {

      if (this.latestTitle === '') {
        this.notes[this.notes.length] = ({title: 'Sin título', text: this.latestText, category: (this.categories[(this.select)].name)})
        console.log('filterselect',this.notesFiltered)

      } else {
        this.notes[this.notes.length] = ({title: this.latestTitle, text: this.latestText, category: (this.categories[(this.select)].name)})
        console.log('filterselect',this.notesFiltered)

      }

    }
    this.notesFiltered=[]
    this.setFilterSelect(this.filterSelected)
    window.localStorage.setItem('notes', JSON.stringify(this.notes))
    console.log(this.notes)
    this.latestText = ''
    this.latestTitle = ''
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
