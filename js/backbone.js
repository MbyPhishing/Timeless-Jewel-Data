let svg;
let zoomPanWrapper;
let offsetX = 0x0;
let offsetY = 0x0;
let scale = 0.15;
let alternateNotables = [];
const supabase = window.supabase.createClient('https://kctpkiogrhujxkozifpm.supabase.co', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtjdHBraW9ncmh1anhrb3ppZnBtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzkzMjE3NTYsImV4cCI6MjA1NDg5Nzc1Nn0.fKjso6WZ3tTNvlL2BVa6LnRze8QdhrvlGX3Gprejngw");
function initializeSvgClickPan() {
    loadAlternateNotables();
    centerAndZoomTree();
    svg = document.getElementById('passive-tree-svg');
    zoomPanWrapper = svg?.["querySelector"]("#zoom-pan-wrapper");
    if (!svg || !zoomPanWrapper) {
        console.error("SVG or zoom-pan-wrapper not found!");
        return;
    }
    const _0x1a90b2 = document.getElementById("reset-zoom-button");
    if (_0x1a90b2) {
        _0x1a90b2.addEventListener('click', centerAndZoomTree);
    }
    document.querySelectorAll(".jewel-socket-socket").forEach(_0x34334f => {
        _0x34334f.addEventListener("click", function () {
            panAndZoomToNode(this);
            handleJewelSocketClick(this);
        });
    });
    document.querySelectorAll(".notable-node").forEach(_0x13949f => {
        _0x13949f.addEventListener("mouseover", showTooltip);
        _0x13949f.addEventListener("mousemove", moveTooltip);
        _0x13949f.addEventListener('mouseout', hideTooltip);
    });
    document.getElementById('seed').addEventListener("change", handleJewelSocketUpdate);
    document.getElementById('conqueror').addEventListener("change", handleJewelSocketUpdate);
}
async function loadAlternateNotables() {
    const response = await fetch('data/alternate_passive_skills.json');
    const jsonData = await response.json(); // Parse the JSON file

    // Extract only the "Skill" values into an array
    alternateNotables = Object.values(jsonData).map(entry => entry.Skill);

    //console.log(alternateNotables); // Check if it contains the skill names
    populateOptions();
}

async function handleJewelSocketUpdate() {
    let _0x9b8bde = document.querySelector(".jewel-socket-socket[selected]");
    if (_0x9b8bde) {
        await handleJewelSocketClick(_0x9b8bde);
    }
}
function showTooltip(_0x3fd83f) {
    const _0x4cf3dd = document.getElementById("tooltip");
    const _0x1f0def = _0x3fd83f.target.getAttribute("data-name");
    const _0x4d6e79 = _0x3fd83f.target.getAttribute("data-alternate");
    if (_0x1f0def) {
        if (_0x4d6e79) {
            _0x4cf3dd.textContent = _0x1f0def + " (Alt: " + _0x4d6e79 + ')';
        } else {
            _0x4cf3dd.textContent = _0x1f0def;
        }
        _0x4cf3dd.style.display = "block";
        _0x4cf3dd.style.fontSize = '16px';
    }
}
function moveTooltip(_0x5ad1fc) {
    const _0x1f15af = document.getElementById("tooltip");
    _0x1f15af.style.left = _0x5ad1fc.pageX + 0xa + 'px';
    _0x1f15af.style.top = _0x5ad1fc.pageY + 0xa + 'px';
}
function hideTooltip() {
    const _0x30f54f = document.getElementById("tooltip");
    _0x30f54f.style.display = "none";
}
async function handleJewelSocketClick(_0x521935) {
    if (!_0x521935) {
        return;
    }
    document.querySelectorAll('.notable-node').forEach(_0x4d2fd5 => {
        _0x4d2fd5.classList.remove("highlighted");
    });
    document.querySelectorAll(".jewel-socket-socket").forEach(_0x28a686 => _0x28a686.removeAttribute("selected"));
    _0x521935.setAttribute("selected", "true");
    const _0x4cce95 = _0x521935.getAttribute('id');
    const _0x15adad = document.getElementById('seed').value;
    const _0x4c1bf7 = document.getElementById("conqueror").value;
    const {
        data: _0x2c8f9d,
        error: _0x3c58df
    } = await supabase.from('notable_submissions').select('notables').eq("socket_id", _0x4cce95).eq("seed", parseInt(_0x15adad)).eq("conqueror", _0x4c1bf7).maybeSingle({
        'headers': {
            'Accept': "application/json"
        }
    });
    if (_0x3c58df && _0x3c58df.code !== "PGRST116") {
        console.error("Error fetching data:", _0x3c58df);
    }
    let _0x51c039 = [];
    if (_0x2c8f9d && _0x2c8f9d.notables) {
        _0x51c039 = JSON.parse(_0x2c8f9d.notables);
    }
    const _0x58a8d1 = parseFloat(_0x521935.getAttribute('cx'));
    const _0x551bca = parseFloat(_0x521935.getAttribute('cy'));
    if (isNaN(_0x58a8d1) || isNaN(_0x551bca)) {
        console.error("Error: Jewel socket coordinates not found.");
        return;
    }
    let _0x4768ff = document.getElementById("radius-visual");
    if (_0x4768ff) {
        _0x4768ff.remove();
    }
    const _0x291358 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    _0x291358.setAttribute('id', "radius-visual");
    _0x291358.setAttribute('cx', _0x58a8d1);
    _0x291358.setAttribute('cy', _0x551bca);
    _0x291358.setAttribute('r', 0xaf);
    _0x291358.setAttribute("fill", 'none');
    _0x291358.setAttribute("stroke", "white");
    _0x291358.setAttribute("stroke-width", '2');
    _0x291358.setAttribute("stroke-dasharray", "5,5");
    document.getElementById("zoom-pan-wrapper").appendChild(_0x291358);
    panAndZoomToNode(_0x521935);
    findNotableNodesInRange(parseFloat(_0x521935.getAttribute('cx')), parseFloat(_0x521935.getAttribute('cy')), 0xaf, _0x521935, _0x51c039);
}
function panAndZoomToNode(_0x263852) {
    const _0x2cfb5d = parseFloat(_0x263852.getAttribute('cx'));
    const _0x3055f1 = parseFloat(_0x263852.getAttribute('cy'));
    document.getElementById("reset-zoom-button").style.display = "block";
    if (isNaN(_0x2cfb5d) || isNaN(_0x3055f1)) {
        console.error("Node coordinates are invalid!");
        return;
    }
    const _0x145669 = window.innerWidth;
    const _0x438a12 = window.innerHeight;
    offsetX = _0x145669 / 0x2 - _0x2cfb5d * scale;
    offsetY = _0x438a12 / 0x2 - _0x3055f1 * scale;
    zoomPanWrapper.style.transition = "transform 0.4s ease-in-out";
    zoomPanWrapper.setAttribute("transform", 'translate(' + offsetX + ", " + offsetY + ") scale(" + scale + ')');
    setTimeout(() => {
        scale = 1.2;
        offsetX = _0x145669 / 0x2 - _0x2cfb5d * scale;
        offsetY = _0x438a12 / 0x2 - _0x3055f1 * scale;
        zoomPanWrapper.style.transition = "transform 0.4s ease-in-out";
        zoomPanWrapper.setAttribute("transform", "translate(" + offsetX + ", " + offsetY + ") scale(" + scale + ')');
    }, 0x190);
}
function findNotableNodesInRange(_0x33fb49, _0x32ffa9, _0x580210, _0x2f7766, _0x22a1b1 = []) {
    document.querySelectorAll(".notable-node").forEach(_0x554d49 => {
        _0x554d49.setAttribute("fill", 'gray');
        _0x554d49.setAttribute("cursor", "default");
        _0x554d49.removeEventListener('click', showAlternateNotables);
    });
    let _0x1a196f = [];
    document.querySelectorAll(".jewel-socket-ring, .notable-node").forEach(_0x2542ea => {
        _0x2542ea.removeAttribute('data-alternate');
    });
    document.querySelectorAll(".jewel-socket-ring, .notable-node").forEach(_0x22d258 => {
        const _0x36e7b1 = parseFloat(_0x22d258.getAttribute('cx'));
        const _0x43ffdc = parseFloat(_0x22d258.getAttribute('cy'));
        if (!isNaN(_0x36e7b1) && !isNaN(_0x43ffdc)) {
            const _0x479ae7 = Math.sqrt((_0x36e7b1 - _0x33fb49) ** 0x2 + (_0x43ffdc - _0x32ffa9) ** 0x2);
            if (_0x479ae7 <= _0x580210) {
                const _0x2ee961 = _0x22d258.getAttribute('data-name');
                if (_0x2ee961 && _0x2ee961 !== "Unknown Node") {
                    let _0x4b1b37 = _0x22a1b1.find(_0x21d891 => _0x21d891.original === _0x2ee961)?.["alternate"] || '';
                    if (_0x4b1b37) {
                        _0x22d258.setAttribute("data-alternate", _0x4b1b37);
                    } else {
                        _0x22d258.removeAttribute("data-alternate");
                    }
                    _0x22d258.setAttribute("fill", "yellow");
                    _0x22d258.setAttribute("cursor", "pointer");
                    _0x1a196f.push({
                        'name': _0x2ee961,
                        'x': _0x36e7b1,
                        'y': _0x43ffdc,
                        'alternate': _0x4b1b37
                    });

                    _0x22d258.addEventListener('click', showAlternateNotables);
                }
            }
        }
    });
    updateNotableList(_0x1a196f, _0x2f7766);
}
function showAlternateNotables(event) {
    const notableNode = event.target;

    // Find the modal container and alternateNotablesList div
    const modal = document.getElementById('modal');
    const alternateListDiv = document.getElementById('alternateNotablesList');

    // Clear any previous alternate notables
    alternateListDiv.innerHTML = '';

    // Add the alternate notable options to the modal
    alternateNotables.forEach(option => {
        const optionButton = document.createElement('button');
        optionButton.textContent = option;
        optionButton.onclick = () => selectAlternateNotable(option, notableNode);
        alternateListDiv.appendChild(optionButton);
    });

    // Show the modal
    modal.style.display = 'flex';
}
document.getElementById('closeModalBtn').addEventListener('click', closeModal);
function selectAlternateNotable(alternate, notableNode) {
    // Find the corresponding input field in the "Notables in Radius" list
    const inputField = document.querySelector(`#notable-list input[data-node-name="${notableNode.getAttribute("data-name")}"]`);

    if (inputField) {
        inputField.value = alternate;  // Set the value of the input field to the selected alternate notable
        inputField.style.borderColor = 'white';

        notableNode.setAttribute("data-alternate", alternate);
    }
    updateAlternateSummary();
    closeModal();
}

function closeModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';  // Hide the modal
}

function populateOptions() {
    const nodeList = document.getElementById("notable-options");
    nodeList.innerHTML = "";  // Clear any previous options if you are updating dynamically

    alternateNotables.forEach(node => {
        let option = document.createElement("option");
        option.value = node;
        nodeList.appendChild(option);
    });

    //console.log(nodeList);
}
function updateNotableList(_0x380e63, _0x8798b5) {
    const _0x2e37f8 = document.getElementById("notable-list");
    if (!_0x2e37f8) {
        return;
    }
    _0x2e37f8.innerHTML = '';
    if (_0x380e63.length === 0x0) {
        _0x2e37f8.innerHTML = "<p>Seed yet to be discovered.</p>";
        return;
    }
    _0x380e63.forEach(_0x8a7c06 => {
        let _0x111af5 = document.createElement("div");
        _0x111af5.style.display = "flex";
        _0x111af5.style.alignItems = 'center';
        _0x111af5.style.marginBottom = "5px";
        _0x111af5.style.margin = "0px";
        _0x111af5.style.padding = "0px";
        let _0x51012d = document.createElement('span');
        _0x51012d.textContent = _0x8a7c06.name;
        _0x51012d.style.flex = '1';
        _0x51012d.style.width = "150px";
        _0x51012d.style.textAlign = "right";
        _0x51012d.style.fontSize = "16px";
        let _0x581f28 = document.createElement('span');
        _0x581f28.textContent = " | ";
        _0x581f28.style.margin = "0px 20px";
        _0x581f28.style.width = "1px";
        let _0x334b54 = document.createElement("input");
        _0x334b54.type = "text";
        _0x334b54.placeholder = "Enter alt notable";
        _0x334b54.dataset.nodeName = _0x8a7c06.name;
        _0x334b54.value = _0x8a7c06.alternate;
        _0x334b54.setAttribute("list", "notable-options");

        // Add input validation for each input field
        _0x334b54.oninput = () => validateInput(_0x334b54);

        _0x111af5.appendChild(_0x51012d);
        _0x111af5.appendChild(_0x581f28);
        _0x111af5.appendChild(_0x334b54);
        _0x2e37f8.appendChild(_0x111af5);
    });

    let _0x4f19b5 = document.createElement("div");
    _0x4f19b5.style.textAlign = "center";
    _0x4f19b5.style.marginTop = '10px';
    _0x4f19b5.style.width = "100%";
    let _0x1e2224 = document.createElement("button");
    _0x1e2224.textContent = "Submit";
    _0x1e2224.style.marginTop = "10px";
    _0x1e2224.id = "submitNotables";
    _0x1e2224.onclick = () => submitNotableSelections(_0x8798b5);
    _0x4f19b5.appendChild(_0x1e2224);
    _0x2e37f8.appendChild(_0x4f19b5);
    let _0x4e06ef = document.getElementById("alternate-summary");
    if (!_0x4e06ef) {
        _0x4e06ef = document.createElement("div");
        _0x4e06ef.id = "alternate-summary";
        _0x4e06ef.innerHTML = "<h4>Alternate Passive Summary</h4><p>Loading...</p>";
        document.getElementById('summary-container').appendChild(_0x4e06ef);
    }
    document.getElementById("summary-container").style.display = "block";
    document.getElementById("notable-list-container").style.display = "block";

    updateAlternateSummary();
}
function validateInput(inputField) {
    const normalizedInput = inputField.value.trim().toLowerCase(); // Normalize to lowercase

    if (alternateNotables.some(notable => notable.toLowerCase() === normalizedInput)) {
        inputField.style.borderColor = 'white'; // Reset any error styling
    } else {
        inputField.style.borderColor = 'red'; // Highlight invalid input
    }
}
function updateAlternateSummary() {
    let _0x344968 = {};
    let _0x2c5391 = document.querySelectorAll("#notable-list input");
    _0x2c5391.forEach(_0x4d2c8d => {
        let _0x11e837 = _0x4d2c8d.value.trim();
        if (_0x11e837) {
            _0x344968[_0x11e837] = (_0x344968[_0x11e837] || 0x0) + 0x1;
        }
    });
    let _0xce6269 = Object.entries(_0x344968).sort((_0x178055, _0x51d419) => _0x51d419[0x1] - _0x178055[0x1]).map(([_0x221ed0, _0x480099]) => ({
        'name': _0x221ed0,
        'count': _0x480099
    }));
    let _0x19cd74 = document.getElementById('alternate-summary');
    if (_0x19cd74) {
        _0x19cd74.innerHTML = "<h4>Replaced Passives (click to find)</h4>";
        if (_0xce6269.length) {
            _0xce6269.forEach(({
                name: _0x3bc8c0,
                count: _0x3186fd
            }) => {
                let _0x2f1703 = document.createElement('div');
                _0x2f1703.classList.add('summary-item');
                _0x2f1703.textContent = '(' + _0x3186fd + ") " + _0x3bc8c0;
                _0x2f1703.addEventListener("click", function () {
                    document.querySelectorAll(".summary-item").forEach(_0x2ba8dc => {
                        _0x2ba8dc.classList.remove("selected");
                    });
                    this.classList.add("selected");
                    highlightNotables(_0x3bc8c0);
                });
                _0x19cd74.appendChild(_0x2f1703);
            });
        } else {
            _0x19cd74.innerHTML += "<p>Seed yet to be discovered.</p>";
        }
    }
    _0x19cd74.style.display = "block";
}
function highlightNotables(_0x5a5968) {
    document.querySelectorAll('.notable-node').forEach(_0x13c928 => {
        _0x13c928.classList.remove("highlighted");
    });
    document.querySelectorAll(".notable-node").forEach(_0x5d2731 => {
        let _0x22a970 = _0x5d2731.getAttribute("data-alternate");
        if (_0x22a970 === _0x5a5968) {
            _0x5d2731.classList.add("highlighted");
        }
    });
}
function centerAndZoomTree() {
    const _0x1a2c6b = document.getElementById('zoom-pan-wrapper');
    if (!_0x1a2c6b) {
        return;
    }
    document.getElementById("reset-zoom-button").style.display = "none";
    document.querySelectorAll(".jewel-socket-socket").forEach(_0x46d245 => _0x46d245.removeAttribute("selected"));
    document.querySelectorAll(".notable-node").forEach(_0x1c7241 => {
        _0x1c7241.classList.remove("highlighted");
        _0x1c7241.setAttribute("fill", 'gray');
        _0x1c7241.setAttribute("cursor", "default");
        _0x1c7241.removeEventListener('click', showAlternateNotables);
    });
    document.getElementById('summary-container').style.display = "none";
    document.getElementById("notable-list-container").style.display = "none";
    const _0x321b02 = _0x1a2c6b.getBBox();
    const _0x4211b3 = window.innerWidth;
    const _0x231705 = window.innerHeight;
    scale = 0.15;
    offsetX = _0x4211b3 / 0x2 - (_0x321b02.x + _0x321b02.width / 0x2) * scale;
    offsetY = _0x231705 / 0x2 - (_0x321b02.y + _0x321b02.height / 0x2) * scale;
    _0x1a2c6b.setAttribute("transform", "translate(" + offsetX + ", " + offsetY + ") scale(0.32)");
}
async function submitNotableSelections(_0x44b2b6) {
    const _0x94d9fe = document.getElementById("seed").value;
    const _0x6eecc5 = document.getElementById("conqueror").value;
    const _0xd29dd4 = _0x44b2b6.getAttribute('id');
    let _0x3d3494 = document.querySelectorAll("#notable-list input");
    let _0x48c0c1 = [];
    let allValid = true; // Flag to track if all inputs are valid
    _0x3d3494.forEach(_0x1aef6b => {
        let _0x4d9f55 = _0x1aef6b.dataset.nodeName;
        let _0x58de4c = _0x1aef6b.value.trim().toLowerCase(); // Convert input to lowercase

        // Check if the input matches any of the allowed notables (case-insensitive)
        const validNotable = alternateNotables.some(notable => notable.toLowerCase() === _0x58de4c);

        // Check if the input is empty (null or just whitespace)
        if (!_0x58de4c) {
            _0x1aef6b.style.borderColor = 'red'; // Highlight invalid input
            allValid = false; // Set the validation flag to false
        } else {
            // Check if the input matches any of the allowed notables (case-insensitive)
            const validNotable = alternateNotables.some(notable => notable.toLowerCase() === _0x58de4c);

            // If the input doesn't match any valid notables, highlight it and set the flag to false
            if (!validNotable) {
                _0x1aef6b.style.borderColor = 'red'; // Highlight invalid input
                allValid = false; // Set the validation flag to false
            } else {
                _0x1aef6b.style.borderColor = ''; // Reset the border if valid
            }
        }

        _0x48c0c1.push({
            'original': _0x4d9f55,
            'alternate': _0x58de4c || null
        });
    });
    if (!allValid) {
        alert("Please enter valid alternate passives for all nodes.");
        return; // Prevent the form submission
    }
    const {
        data: _0x35a583,
        error: _0xfcaea3
    } = await supabase.from("notable_submissions").select('id').eq("socket_id", _0xd29dd4).eq("seed", parseInt(_0x94d9fe)).eq("conqueror", _0x6eecc5).maybeSingle();
    if (_0xfcaea3 && _0xfcaea3.code !== "PGRST116") {
        console.error("Error checking existing data:", _0xfcaea3);
        alert("Error checking existing data.");
        return;
    }
    if (_0x35a583) {
        const {
            error: _0x4eb293
        } = await supabase.from("notable_submissions").update({
            'notables': JSON.stringify(_0x48c0c1)
        }).eq('id', _0x35a583.id);
        if (_0x4eb293) {
            console.error("Error updating data:", _0x4eb293);
            alert("Failed to update data.");
        } else {
            alert("Notables updated successfully!");
        }
    } else {
        const {
            error: _0xcb59f7
        } = await supabase.from("notable_submissions").insert([{
            'socket_id': _0xd29dd4,
            'seed': parseInt(_0x94d9fe),
            'conqueror': _0x6eecc5,
            'notables': JSON.stringify(_0x48c0c1)
        }]);
        if (_0xcb59f7) {
            console.error("Error inserting data:", _0xcb59f7);
            alert("Failed to submit data.");
        } else {
            alert("Notables submitted successfully!");
        }
    }
}