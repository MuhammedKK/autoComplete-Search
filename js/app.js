// Input Search
const searchInput = document.querySelector(".search");
let resultList = document.querySelector(".result-list");

// search Statuc Json 

const searchStats = async searchText => {
    const res       = await fetch("data/data.json");
    const states   = await res.json();

    // Get Matches With RegExp
    let matches = states.filter((state) => {
        // Create New Reg Exp To Matches With Input Search
        const regExp = new RegExp(`^${searchText}`, 'gi');
        return state.name.match(regExp) || state.abbr.match(regExp);
    });
    
    if(searchText.length === 0) {// If Nothing In Input Filed
        // Make Matching Filter Empty
        matches = [];
        // Clear HTML Results
        resultList.innerHTML = "";
    }

    outputHtml(matches);
}

// Display Matches Data In HTML

const outputHtml = matches => {
    if(matches.length > 0) {
        // Looping Throught Matches
        const result = matches.map(match => 
            `<div class="card card-body mb-1">
                <h4>${match.name} (${match.abbr}) <span class="text-primary">${match.capital}</span></h4>
                <small>Lat: ${match.lat} / Long: ${match.long}</small>
            </div>
            `
        ).join("");
        resultList.innerHTML = result;
    }
}

searchInput.addEventListener("input", () => searchStats(searchInput.value));