// ------------------------screenOne----------------------------
let usersAccounts = document.querySelector('.usersAccounts')
let btnAddScreenOne = document.querySelector('.btnAddScreenOne')
let screenOne = document.querySelector('.screenOne')
let btnAddScreentwo = document.querySelector('.btnAddScreentwo')

// ------------------------screenTwo----------------------------
let screenTwo = document.querySelector('.screenTwo')
let input = document.querySelector('input')
let buttonsScreenTwo = document.querySelector('.buttonsScreenTwo')

//----- defoult value -----
screenTwo.classList.add('deleteElem')
//-----counter for screenOne-----
let counter = 0
//-----counter for screenTwo-----
let secondCounter = 0
// ------------------------

let targetData = `{
	"accounts": [{
		"title": "Title1",
		"img": "img/instagram_photo_1.png"
	}, {
		"title": "Title2",
		"img": "img/instagram_photo_1.png"
	},{
		"title": "Title3",
		"img": "img/instagram_photo_1.png"
	}
]
}`

let data = JSON.parse(targetData)

function creatElemInPage(ArrJson) {
	for (let i = 0; i < ArrJson.length; i++) {
		let divAccountsItem = document.createElement('div')
		let imgAccountsItem = document.createElement('img')
		let titleAccountsItem = document.createElement('h1')

		divAccountsItem.classList.add('accountsItem')
		divAccountsItem.setAttribute('tabindex', '0')
		imgAccountsItem.setAttribute('src', `${ArrJson[i].img}`)
		titleAccountsItem.innerText = `${ArrJson[i].title}`
		usersAccounts.appendChild(divAccountsItem)
		divAccountsItem.appendChild(imgAccountsItem)
		divAccountsItem.appendChild(titleAccountsItem)
	}
	putFocus()
}

creatElemInPage(data.accounts)

function removeAccountsItem() {
	let accountsItem = document.querySelectorAll('.accountsItem')
	for (let i = 0; i < accountsItem.length; i++) {
		accountsItem[i].remove()
	}
}

function deletElemInPage(targetElem) {
	targetElem.remove()
}

function changeScreens(firstElem, secondElem) {
	firstElem.classList.toggle('deleteElem')
	secondElem.classList.toggle('deleteElem')
}

function putFocus() {
	let accountsItem = document.querySelectorAll('.accountsItem')
	accountsItem[0].focus()
}

putFocus()

// ------------------------screenOne----------------------------

screenOne.addEventListener("keydown", event => {
	if (event.keyCode === 37) {
		if (document.activeElement.classList.contains('btnAddScreenOne') && event.keyCode === 37) {
			usersAccounts.children[counter].focus()
		} else {
			data.accounts.splice(counter, 1)
			deletElemInPage(document.activeElement)
			counter = 0
			if (usersAccounts.children.length !== 0) {
				usersAccounts.children[counter].focus()
			} else {
				btnAddScreenOne.focus()
			}
		}
	} else if (event.keyCode === 40) {
		if (counter < usersAccounts.children.length - 1) {
			counter++
			usersAccounts.children[counter].focus()
		}
	} else if (event.keyCode === 38) {
		if (counter > 0) {
			counter--
			usersAccounts.children[counter].focus()
		}
	} else if (event.keyCode === 39) {
		btnAddScreenOne.focus()
	} else if (document.activeElement.classList.contains('btnAddScreenOne') && event.keyCode === 13) {
		changeScreens(screenOne, screenTwo)
		input.focus()
		counter = 0
	}
})

// ------------------------screenTwo----------------------------

screenTwo.addEventListener("keydown", event => {
	if (event.keyCode === 40) {
		if (document.activeElement.classList.contains('btnAddScreenTwo')) {
			counter++
			buttonsScreenTwo.children[secondCounter].focus()
			console.log(secondCounter)
		} else {
			buttonsScreenTwo.children[secondCounter].focus()
			console.log(secondCounter)
		}
	} else if (event.keyCode === 38) {
		input.focus()
	} else if (document.activeElement.classList.contains('btnCancelScreenTwo') && event.keyCode === 37) {
		buttonsScreenTwo.children[secondCounter - 1].focus()
		secondCounter--
	} else if (document.activeElement.classList.contains('btnAddScreenTwo') && event.keyCode === 39) {
		buttonsScreenTwo.children[secondCounter + 1].focus()
		secondCounter++
	} else if (document.activeElement.classList.contains('btnAddScreenTwo') && event.keyCode === 13) {
		let newUserObj = {
			"title": `${input.value}`,
			"img": "img/instagram_photo_1.png"
		}
		removeAccountsItem()
		data.accounts.push(newUserObj)
		input.value = ""
		console.log(data.accounts)
		changeScreens(screenOne, screenTwo)
		creatElemInPage(data.accounts)
	} else if (document.activeElement.classList.contains('btnCancelScreenTwo') && event.keyCode === 13) {
		input.value = ""
		changeScreens(screenOne, screenTwo)
		putFocus()
		secondCounter = 0
	}
})