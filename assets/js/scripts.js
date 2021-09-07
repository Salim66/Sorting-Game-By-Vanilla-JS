// grap everything we will
let draggable_list  = document.querySelector('#draggable-list');
let check           = document.querySelector('#check');


// variable for this project 10 richest people
let richestPeople = [
    'Bernard Arnault',
    'Jeff Bezos', 
    'Elon Musk',
    'Bill Gates', 
    'Mark Zuckerberg',
    'Warren Buffett',
    'Larry Ellison',
    'Larry Page',
    'Sergey Brin',
    'Mukesh Ambani'
];


// Store list item
const listItems = [];

let dragStartIndex;

createList();


// Insert list item into DOM
function createList(){
    [...richestPeople]
    .map(a => ({ value: a, sort: Math.random() })) // randomly generate 
    .sort((a, b) => a.sort - b.sort) // ascending order
    .map(a => a.value) // find the value
    .forEach((person, index) => {  // each value load list
        // console.log(person);
        // create li
        const listItem = document.createElement('li');
        // set attribute into li
        listItem.setAttribute('data-index', index);
        
        listItem.innerHTML = `
            <span class="number">${index + 1}</span>
            <div class="draggable" draggable="true">
                <p class="person-name">${person}</p>
                <i class="fas fa-grip-lines"></i>
            </div>
        `;
        // push li into listItems li
        listItems.push(listItem);
        // display the all list
        draggable_list.appendChild(listItem);
    });

    addEventListener();
}

function dragstart(){
    // console.log('Event:', 'dragstart');
    dragStartIndex = +this.closest('li').getAttribute('data-index');
    // console.log(dragStartIndex);
}

function dragEnter(){
    // console.log('Event:', 'dragenter');
    this.classList.add('over');
}

function dragLeave(){
    // console.log('Event:', 'dragleave');
    this.classList.remove('over');
}

function dragOver(e){
    // console.log('Event:', 'dragover');
    e.preventDefault();
}

function dragDrop(){
    // console.log('Event:', 'drop');
    let dragEndIndex = +this.getAttribute('data-index');
    swipItem(dragStartIndex, dragEndIndex);

    this.classList.remove('over');
}

function swipItem(formIndex, toIndex){
    let itemOne = listItems[formIndex].querySelector('.draggable');
    let itemTwo = listItems[toIndex].querySelector('.draggable');
   
    listItems[formIndex].appendChild(itemTwo);
    listItems[toIndex].appendChild(itemOne);
}

function checkOrder(){
    listItems.forEach((listItem, index) => {
        const personName    = listItem.querySelector('.draggable').innerText.trim();

        if(personName !== richestPeople[index]){
            listItem.classList.add('wrong');
        }else {
            listItem.classList.remove('wrong');
            listItem.classList.add('right');
        }
    })
}

// drag and drop the list
function addEventListener(){
    let draggables      = document.querySelectorAll('.draggable');
    let draggable_lists  = document.querySelectorAll('.draggable-list li');

    
    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', dragstart);
    });

    draggable_lists.forEach(item => {
        item.addEventListener('dragover', dragOver);
        item.addEventListener('drop', dragDrop);
        item.addEventListener('dragenter', dragEnter);
        item.addEventListener('dragleave', dragLeave);
    });

}

check.addEventListener('click', checkOrder);