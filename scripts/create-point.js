function populateUFs() {
  const ufSelect = document.querySelector('select[name=uf]')

  fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
  .then(res => res.json())
  .then(states => {
    for (state of states) {
      ufSelect.innerHTML += `<option value='${state.id}'>${state.nome}</option>`
    }
  })
}

populateUFs()

function getCities(event) {
  const citySelect = document.querySelector('[name=city')
  const stateInput = document.querySelector('[name=state]')

  const ufValue = event.target.value

  const indexOfSelectedState = event.target.selectedIndex
  stateInput.value = event.target.options[indexOfSelectedState].text

  const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

  citySelect.innerHTML = '<option value>Selecione a Cidade</option>'
  citySelect.disabled = true

  fetch(url)
  .then(res => res.json())
  .then( cities => {
    for (city of cities) {
      citySelect.innerHTML += `<option value='${city.nome}'>${city.nome}</option>`
    }

    citySelect.disabled = false
  })
}

document
  .querySelector('select[name=uf]')
  .addEventListener('change', getCities)

// Itens de coleta  
const itemsToCollect = document.querySelectorAll('.items-grid li')

for (const item of itemsToCollect) {
  item.addEventListener('click', handleSelectedItem)
}

const collectedItems = document.querySelector('input[name=items]')

let selectdItems = []

function handleSelectedItem(event) {
  const itemLi = event.target

  //add a class javascript
  itemLi.classList.toggle('selected')
 
  const itemId = itemLi.dataset.id

  // verying if exists selected items
  const alreadySelected = selectdItems.findIndex( (item) => item == itemId
  )

  // if already selected, remove
  if( alreadySelected >= 0 ) {
    const filteredItems = selectdItems.filter(item => {
      const itemIsDifferent = item != itemId
      return itemIsDifferent
    })
    selectdItems = filteredItems
  } else {
    // if not selected, add
    selectdItems.push(itemId)
  }
  //update hidden input
  collectedItems.value = selectdItems 
}