const getHtml = document.querySelector('html')
const getLeagueName = document.querySelector('#league-name')
const getLeagueCode = document.querySelector('#league-code')
const getLeagueSeason = document.querySelector('#league-season')
const getTable = document.querySelector('table')
const getTableBody = document.querySelector('#table-body')
const getDarkModeButton = document.querySelector("#dark-mode-button")

let leagueCode = getLeagueCode.value
let leagueSeason = getLeagueSeason.value

const borderColor = ['border-l-4 border-blue-500',
					'border-l-4 border-yellow-500',
					'border-l-4 border-green-500',
					'border-l-4 border-red-500']
const uefaLabel = ['Champions League',
				'Champions League qualifying',
				'Europa League',
				'Europa League qualifying',
				'Europa Conference League',
				'Europa Conference League qualifying',
				'Relegation',
				'Relegated']

getTheme()
setTheme()
getTable.classList.remove('hidden')
loadingData()
setLeagueName()
getStandings()

function loadingData(){
	getTableBody.innerHTML = `<td colspan="2"><i>Loading...</i></td>`
}

function setLeagueName(){
	getLeagueName.innerHTML = getLeagueCode.selectedOptions[0].text
}

function getStandings(){
	fetch(`https://api-football-standings.azharimm.site/leagues/${leagueCode}/standings?season=${leagueSeason}`)
	.then(response => response.json())
	.then(response => {
		const standingsTable = response.data.standings
		let selectedBorderColor

		getTableBody.innerHTML = ''
		standingsTable.forEach((e) => {
			if (e.note !== undefined){
				const uefa = e.note.description
				if (uefa === uefaLabel[0] || uefa === uefaLabel[1]){
					selectedBorderColor = borderColor[0]
				} else if (uefa === uefaLabel[2] || uefa === uefaLabel[3]){
					selectedBorderColor = borderColor[1]
				}
				else if (uefa === uefaLabel[4] || uefa === uefaLabel[5]){
					selectedBorderColor = borderColor[2]
				}
				else if (uefa === uefaLabel[6] || uefa === uefaLabel[7]){
					selectedBorderColor = borderColor[3]
				} else {
					selectedBorderColor = 'border-l-0'
				}
			} else {
				selectedBorderColor = 'border-l-0'
			}

			getTableBody.innerHTML += `<tr>
									<td class="${selectedBorderColor}">${e.stats[8].value}</td>
									<td>${e.team.shortDisplayName}</td>
									<td>${e.stats[3].value}</td>
									<td>${e.stats[0].value}</td>
									<td>${e.stats[2].value}</td>
									<td>${e.stats[1].value}</td>
									<td>${e.stats[4].value}</td>
									<td>${e.stats[5].value}</td>
									<td>${e.stats[9].value}</td>
									<td>${e.stats[6].value}</td>
								</tr>`
		})
	})
}

function getTheme(){
	if (localStorage.theme === 'dark' && !getHtml.classList.contains('dark')){
		getHtml.classList.add('dark')
	} else {
		getHtml.classList.remove('dark')
	}
}

function setTheme(){
	if (getHtml.classList.contains('dark')){
		getDarkModeButton.innerHTML = '[Light mode]'
		localStorage.theme = 'dark'
	} else {
		getDarkModeButton.innerHTML = `[Dark mode]`
		localStorage.theme = 'light'
	}
}

getLeagueCode.addEventListener('change', function() {
	leagueCode = this.value
	loadingData()
	setLeagueName()
	getStandings()
})

getLeagueSeason.addEventListener('change', function() {
	leagueSeason = this.value
	loadingData()
	setLeagueName()
	getStandings()
})

getDarkModeButton.addEventListener('click', function(){
	getHtml.classList.toggle('dark')
	setTheme()
})