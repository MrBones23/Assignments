// The following code is used for the acordion function
$(document).ready(function() {
    // Initialize the accordion on the container element
    $("#player-list").accordion({
        collapsible: true, // Allow all panels to be closed
        active: false // Start with all panels closed
    });

    // Display NHL team players and dynamically populate accordion panels
    //displayNHLTeamPlayers(playersData);
});







// Function to fetch NHL team players
async function fetchNHLTeamPlayers(teamsId) {
    const url = `https://nhl-api5.p.rapidapi.com/nhlteamplayers?teamid=${teamsId}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '24ca61f485msh332b28376f07497p1b87d2jsn0d0884f9ffd8',
            'X-RapidAPI-Host': 'nhl-api5.p.rapidapi.com'
        }
    };

    try {
        // Fetch NHL team player data from the API
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error('Failed to fetch NHL team players');
        }
        // Parse the JSON response
        const jsonData = await response.json();
        // Return the parsed JSON data
        return jsonData;
    } catch (error) {
        // Handle errors
        console.error('Error fetching NHL team players:', error);
        return null;
    }
}

function fetchNHLPlayer(playersId) {
    const url = `https://nhl-api5.p.rapidapi.com/player-statistic?playerId=${playersId}`;
    const options = {
	    method: 'GET',
        headers: {
            'X-RapidAPI-Key': '24ca61f485msh332b28376f07497p1b87d2jsn0d0884f9ffd8',
            'X-RapidAPI-Host': 'nhl-api5.p.rapidapi.com'
        }
    };

    return fetch(url, options)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch specific player');
            }
            return response.json();
        })
        .catch(error => {
            console.error('Error fetching specific player:', error);
            return null;
        });
}


function displayNHLTeamPlayers(playersData) {
    const playerList = $('#player-list');

    // Check if the data is valid
    if (playersData && playersData.team && playersData.team.athletes && Array.isArray(playersData.team.athletes)) {
        const playerAthletesArr = playersData.team.athletes;

        // Loop through each player in the athletes array
        for (let i = 0; i < playerAthletesArr.length; i++) {
            const player = playerAthletesArr[i];

            // Create a div element to contain player information
            const playerInfo = $('<div>').addClass('panel');

            // Set id attribute using the divStr variable
            const divStr = "div" + i;
            playerInfo.attr('id', divStr);

            // Set style attribute
            playerInfo.css('border', '1px solid black');

            // Create a header element for the player name
            const playerNameHeader = $('<h3>').text(player.displayName);

            // Fetch detailed player information and store the promise
            const individualPlayerPromise = fetchNHLPlayer(player.id);

            // Handle the promise later
            individualPlayerPromise.then(detailedPlayer => {
                // Populate playerInfo with detailed player information
                playerInfo.html(`
                    <p>Height: ${player.displayHeight}</p>
                    <aside id="player-picture">
                        <img id="player-image" src="${player.headshot.href}" alt="Player Image">
                    </aside>

                    <p>Age: ${player.age}</p>
                    <p>Position: ${player.position.displayName}</p>
                    <p>Total games played: ${detailedPlayer.categories[1].stats[0].displayValue}</p>
                    <p>Plus/Minus Rating: ${detailedPlayer.categories[1].stats[6].displayValue}</p>
                    <p>Total goals: ${detailedPlayer.categories[2].stats[0].displayValue}</p>
                    <p>Total assists: ${detailedPlayer.categories[2].stats[1].displayValue}</p>
                    <!-- Add more player information as needed -->
                `);

                // Append the header and playerInfo div to the playerList container
                playerList.append(playerNameHeader).accordion("refresh");
                playerList.append(playerInfo).accordion("refresh");
                
            }).catch(error => {
                console.error('Error fetching detailed player information:', error);
            });
        }

        // // Initialize accordion using event delegation
        // playerList.on('click', '.panel', function() {
        //     $(this).accordion();
        // });
    } else {
        // Display error message if data is invalid
        console.error('Invalid or empty NHL team player data');
    }
}


// const playerList = $("#player-list");
    
// // Check if the data is valid
// if (playersData && playersData.team && playersData.team.athletes && Array.isArray(playersData.team.athletes)) {
//     const playerAthletesArr = playersData.team.athletes;
    
//     // Loop through each player in the athletes array
//     playerAthletesArr.forEach((player, index) => {
//         // Create a div element to contain player information
//         const playerInfo = $("<div>", {
//             class: "panel", // Set the class
//             id: "player-" + index, // Set a unique ID for each player panel
//             style: "border: 1px solid black;", // Set the inline style
//             html: `<h3>${player.displayName}</h3>
//                    <p>${player.firstName} ${player.lastName}</p>
//                    <p>Weight: ${player.displayWeight}</p>
//                    <p>Height: ${player.displayHeight}</p>
//                    <p>Age: ${player.age}</p>
//                    <p>Position: ${player.position.displayName}</p>`
//         });

//         // Append the playerInfo div to the playerList container and initialize it as an accordion panel
//         playerList.append(playerInfo).accordion("refresh");
//     });
// } else {
//     // Display error message if data is invalid
//     console.error('Invalid or empty NHL team player data');
// }




// function displayNHLTeamPlayers(playersData) {
//     const playerList = $('#player-list');

//     // Check if the data is valid
//     if (playersData && playersData.team && playersData.team.athletes && Array.isArray(playersData.team.athletes)) {
//         const playerAthletesArr = playersData.team.athletes;

//         // Loop through each player in the athletes array
//         for (let i = 0; i < playerAthletesArr.length; i++) {
//             const player = playerAthletesArr[i];

//             // Create a div element to contain player information
//             const playerInfo = $('<div>').addClass('panel');

//             // Set id attribute using the divStr variable
//             const divStr = "div" + i;
//             playerInfo.attr('id', divStr);

//             // Set style attribute
//             playerInfo.css('border', '1px solid black');

//             // Create a header element for the player name
//             const playerNameHeader = $('<h3>').text(player.displayName);

//             // Fetch detailed player information and store the promise
//             const individualPlayerPromise = fetchNHLPlayer(player.id);

//             // Handle the promise later
//             individualPlayerPromise.then(detailedPlayer => {
//                 // Populate playerInfo with detailed player information
//                 playerInfo.html(`
//                     <p>Height: ${player.displayHeight}</p>
//                     <p>Age: ${player.age}</p>
//                     <p>Position: ${player.position.displayName}</p>
//                     <p>Total games played: ${detailedPlayer.categories[1].stats[0].displayValue}</p>
//                     <p>Plus/Minus Rating: ${detailedPlayer.categories[1].stats[6].displayValue}</p>
//                     <p>Total goals: ${detailedPlayer.categories[2].stats[0].displayValue}</p>
//                     <p>Total assists: ${detailedPlayer.categories[2].stats[1].displayValue}</p>
//                     <!-- Add more player information as needed -->
//                 `);

//                 // Append the header and playerInfo div to the playerList container
//                 playerList.append(playerNameHeader);
//                 playerList.append(playerInfo);
//             }).catch(error => {
//                 console.error('Error fetching detailed player information:', error);
//             });
//         }

//         // Initialize accordion using event delegation
//         playerList.on('click', '.panel', function() {
//             $(this).accordion();
//         });
//     } else {
//         // Display error message if data is invalid
//         console.error('Invalid or empty NHL team player data');
//     }
// }


// Fetch NHL team players when the DOM content is loaded
document.addEventListener('DOMContentLoaded', async function() {
    try {
        // Fetch NHL team players data with team ID 17
        const teamPlayersData = await fetchNHLTeamPlayers(9);
        

        if (teamPlayersData.team.hasOwnProperty('athletes')) {
            console.log('The JSON object has a variable named athletes');
        } else {
            console.log('The JSON object does not have a variable named players');
        }
        // Display NHL team players data
        displayNHLTeamPlayers(teamPlayersData);
    } catch (error) {
        // Handle errors
        console.error('Error fetching NHL team players: for async function', error);
    }
});


