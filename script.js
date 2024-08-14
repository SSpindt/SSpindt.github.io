document.getElementById('csvFileInput').addEventListener('change', handleFileSelect);
document.getElementById('drawButton').addEventListener('click', drawName);

let names = [];
let drawnNames = [];

function handleFileSelect(event) {
    const file = event.target.files[0];
    if (file) {
        Papa.parse(file, {
            complete: function(results) {
                names = results.data.flat().filter(Boolean); // Flatten the array and remove empty values
                drawnNames = [];
                document.getElementById('drawButton').disabled = false;
                document.getElementById('nameDisplay').innerText = "";
            }
        });
    }
}

function drawName() {
    // Check if all names have been drawn, if so reset lists
    if (names.length === 0 && drawnNames.length > 0) {
        names = drawnNames;
        drawnNames = [];
        document.getElementById('nameDisplay').innerText = "All students have gone!";
        return;
    }

    if (names.length === 0) {
        document.getElementById('nameDisplay').innerText = "No names available.";
        return;
    }

    const randomIndex = Math.floor(Math.random() * names.length);
    const name = names[randomIndex];

    // Remove the drawn name from the names array
    names.splice(randomIndex, 1);

    // Add the drawn name to the drawnNames array
    drawnNames.push(name);

    document.getElementById('nameDisplay').innerText = name;
}
