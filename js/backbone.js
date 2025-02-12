let svg, zoomPanWrapper;
let offsetX = 0, offsetY = 0;
let baseScale = 0.35; // Keep the initial scale
let scale = baseScale;
const supabaseUrl = "https://kctpkiogrhujxkozifpm.supabase.co";  // Replace with your Supabase URL
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtjdHBraW9ncmh1anhrb3ppZnBtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzkzMjE3NTYsImV4cCI6MjA1NDg5Nzc1Nn0.fKjso6WZ3tTNvlL2BVa6LnRze8QdhrvlGX3Gprejngw";  // Replace with your API Key
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

console.log("Supabase initialized:", supabase);  // Debugging check

function initializeSvgClickPan() {
    centerAndZoomTree();

    svg = document.getElementById("passive-tree-svg");
    zoomPanWrapper = svg?.querySelector("#zoom-pan-wrapper");

    if (!svg || !zoomPanWrapper) {
        console.error("SVG or zoom-pan-wrapper not found!");
        return;
    }

    // Add click event to jewel sockets
    document.querySelectorAll(".jewel-socket-socket").forEach(socket => {
        socket.addEventListener("click", function () {
            panAndZoomToNode(this);
            handleJewelSocketClick(this);
        });
    });
    document.querySelectorAll(".notable-node").forEach(node => {
        node.addEventListener("mouseover", showTooltip);
        node.addEventListener("mousemove", moveTooltip);
        node.addEventListener("mouseout", hideTooltip);
    });

    document.getElementById("seed").addEventListener("change", handleJewelSocketUpdate);
    document.getElementById("conqueror").addEventListener("change", handleJewelSocketUpdate);
}

async function handleJewelSocketUpdate() {
    let selectedSocket = document.querySelector(".jewel-socket-socket[selected]");

    if (!selectedSocket) {
        selectedSocket = document.querySelector(".jewel-socket-socket");
        if (selectedSocket) {
            console.log("No selected socket found, selecting the first one.");
            selectedSocket.setAttribute("selected", "true");
        }
    }

    if (selectedSocket) {
        await handleJewelSocketClick(selectedSocket);
    }
}


function showTooltip(event) {
    const tooltip = document.getElementById("tooltip");
    const notableName = event.target.getAttribute("data-name");
    const alternateName = event.target.getAttribute("data-alternate");

    if (notableName) {
        // If an alternate passive exists, show it in the tooltip
        if (alternateName) {
            tooltip.textContent = `${notableName} (Alt: ${alternateName})`;
        } else {
            tooltip.textContent = notableName;
        }
        tooltip.style.display = "block";
    }
}


function moveTooltip(event) {
    const tooltip = document.getElementById("tooltip");

    tooltip.style.left = event.pageX + 10 + "px";  // Offset tooltip to the right
    tooltip.style.top = event.pageY + 10 + "px";   // Offset tooltip downward
}

function hideTooltip() {
    const tooltip = document.getElementById("tooltip");
    tooltip.style.display = "none";
}


async function handleJewelSocketClick(socketElement) {
    if (!socketElement) return;

    document.querySelectorAll(".notable-node").forEach(node => {
        node.classList.remove("highlighted");
    });

    // Remove 'selected' from all sockets, then set it on the clicked one
    document.querySelectorAll(".jewel-socket-socket").forEach(socket => socket.removeAttribute("selected"));
    socketElement.setAttribute("selected", "true");

    const socketId = socketElement.getAttribute("id");
    const seed = document.getElementById("seed").value;
    const conqueror = document.getElementById("conqueror").value;

    // Fetch existing data from the database
    const { data, error } = await supabase
        .from("notable_submissions")
        .select("notables")
        .eq("socket_id", socketId)
        .eq("seed", parseInt(seed))
        .eq("conqueror", conqueror)
        .maybeSingle({
            headers: { "Accept": "application/json" }  // 👈 Fix added here
        });

    if (error && error.code !== "PGRST116") {
        console.error("Error fetching data:", error);
    }

    let storedNotables = [];
    if (data && data.notables) {
        storedNotables = JSON.parse(data.notables);
    }


    // Get the coordinates of the clicked jewel socket
    const nodeX = parseFloat(socketElement.getAttribute("cx"));
    const nodeY = parseFloat(socketElement.getAttribute("cy"));

    if (isNaN(nodeX) || isNaN(nodeY)) {
        console.error("Error: Jewel socket coordinates not found.");
        return;
    }

    // Define the radius (adjust as needed)
    const radiusSize = 175;

    // Remove any existing radius visualization
    let existingRadius = document.getElementById("radius-visual");
    if (existingRadius) existingRadius.remove();

    // Create a new circle to represent the radius
    const radiusCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    radiusCircle.setAttribute("id", "radius-visual");
    radiusCircle.setAttribute("cx", nodeX);
    radiusCircle.setAttribute("cy", nodeY);
    radiusCircle.setAttribute("r", radiusSize);
    radiusCircle.setAttribute("fill", "none"); // Transparent
    radiusCircle.setAttribute("stroke", "white"); // White outline
    radiusCircle.setAttribute("stroke-width", "2");
    radiusCircle.setAttribute("stroke-dasharray", "5,5"); // Dashed outline

    // Append to the SVG
    document.getElementById("zoom-pan-wrapper").appendChild(radiusCircle);

    // Highlight the socket
    panAndZoomToNode(socketElement);
    findNotableNodesInRange(parseFloat(socketElement.getAttribute("cx")), parseFloat(socketElement.getAttribute("cy")), 175, socketElement, storedNotables);
}


function panAndZoomToNode(node) {
    const nodeX = parseFloat(node.getAttribute("cx"));
    const nodeY = parseFloat(node.getAttribute("cy"));

    if (isNaN(nodeX) || isNaN(nodeY)) {
        console.error("Node coordinates are invalid!");
        return;
    }

    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    // Step 1: PAN - Center the node first
    offsetX = windowWidth / 2 - nodeX * scale;
    offsetY = windowHeight / 2 - nodeY * scale;

    zoomPanWrapper.style.transition = "transform 0.4s ease-in-out";
    zoomPanWrapper.setAttribute("transform", `translate(${offsetX}, ${offsetY}) scale(${scale})`);

    // Step 2: ZOOM - Wait for panning to finish, then zoom in
    setTimeout(() => {
        scale = 1.2; // Adjust zoom level as needed

        // Recalculate offsets after scaling
        offsetX = windowWidth / 2 - nodeX * scale;
        offsetY = windowHeight / 2 - nodeY * scale;

        zoomPanWrapper.style.transition = "transform 0.4s ease-in-out";
        zoomPanWrapper.setAttribute("transform", `translate(${offsetX}, ${offsetY}) scale(${scale})`);

    }, 400); // Wait for pan to complete before zooming
}

function findNotableNodesInRange(centerX, centerY, radius, socketElement, storedNotables = []) {
    let notableNodes = [];

    document.querySelectorAll(".jewel-socket-ring, .notable-node").forEach(node => {
        const nodeX = parseFloat(node.getAttribute("cx"));
        const nodeY = parseFloat(node.getAttribute("cy"));

        if (!isNaN(nodeX) && !isNaN(nodeY)) {
            const distance = Math.sqrt((nodeX - centerX) ** 2 + (nodeY - centerY) ** 2);
            if (distance <= radius) {
                const nodeName = node.getAttribute("data-name");
                if (nodeName && nodeName !== "Unknown Node") {
                    // Find stored alternate notable if it exists
                    let storedAlternate = storedNotables.find(n => n.original === nodeName)?.alternate || "";

                    // Set data-alternate attribute
                    if (storedAlternate) {
                        node.setAttribute("data-alternate", storedAlternate);
                    } else {
                        node.removeAttribute("data-alternate");
                    }

                    notableNodes.push({
                        name: nodeName,
                        x: nodeX,
                        y: nodeY,
                        alternate: storedAlternate
                    });
                }
            }
        }
    });

    updateNotableList(notableNodes, socketElement);
}

function updateNotableList(notableNodes, socketElement) {
    const notableList = document.getElementById("notable-list");
    if (!notableList) return;

    notableList.innerHTML = "";  // Clear previous list

    if (notableNodes.length === 0) {
        notableList.innerHTML = "<p>Seed yet to be discovered.</p>";
        return;
    }

    notableNodes.forEach(node => {
        let listItem = document.createElement("div");
        listItem.style.display = "flex";
        listItem.style.alignItems = "center";
        listItem.style.marginBottom = "5px";

        let label = document.createElement("span");
        label.textContent = node.name;
        label.style.flex = "1";
        label.style.width = "500px";

        let separator = document.createElement("span");
        separator.textContent = " | ";
        separator.style.margin = "0 10px";

        let input = document.createElement("input");
        input.type = "text";
        input.placeholder = "Enter alternate notable";
        input.dataset.nodeName = node.name;
        input.value = node.alternate;

        listItem.appendChild(label);
        listItem.appendChild(separator);
        listItem.appendChild(input);
        notableList.appendChild(listItem);
    });

    // Submit button
    let submitButton = document.createElement("button");
    submitButton.textContent = "Submit Notables";
    submitButton.style.marginTop = "10px";
    submitButton.id = "submitNotables";
    submitButton.onclick = () => submitNotableSelections(socketElement);
    notableList.appendChild(submitButton);

    // Move the summary container outside the notable list
    let summaryContainer = document.getElementById("alternate-summary");
    if (!summaryContainer) {
        summaryContainer = document.createElement("div");
        summaryContainer.id = "alternate-summary";
        summaryContainer.innerHTML = "<h4>Alternate Passive Summary</h4><p>Loading...</p>";
        document.getElementById("summary-container").appendChild(summaryContainer);
    }

    // Populate summary initially
    updateAlternateSummary();
}



function updateAlternateSummary() {
    let alternateCount = {};

    // Get all input fields in the notable list
    let inputs = document.querySelectorAll("#notable-list input");

    inputs.forEach(input => {
        let altNotable = input.value.trim();
        if (altNotable) {
            alternateCount[altNotable] = (alternateCount[altNotable] || 0) + 1;
        }
    });

    // Convert to sorted array
    let sortedNotables = Object.entries(alternateCount)
        .sort((a, b) => b[1] - a[1]) // Sort by count descending
        .map(([name, count]) => ({ name, count }));

    // Update the summary box
    let summaryBox = document.getElementById("alternate-summary");
    if (summaryBox) {
        summaryBox.innerHTML = `<h4>Alternate Passive Summary (click item in list to find)</h4>`;

        if (sortedNotables.length) {
            sortedNotables.forEach(({ name, count }) => {
                let summaryItem = document.createElement("div");
                summaryItem.classList.add("summary-item");
                summaryItem.textContent = `(${count}) ${name}`;
                summaryItem.addEventListener("click", () => highlightNotables(name));
                summaryBox.appendChild(summaryItem);
            });
        } else {
            summaryBox.innerHTML += "<p>Seed yet to be discovered.</p>";
        }
    }
}

function highlightNotables(notableName) {
    // Clear any existing highlights first
    document.querySelectorAll(".notable-node").forEach(node => {
        node.classList.remove("highlighted");
    });

    // Find all notable nodes with the matching alternate name and highlight them
    document.querySelectorAll(".notable-node").forEach(node => {
        let nodeAltName = node.getAttribute("data-alternate");
        if (nodeAltName === notableName) {
            node.classList.add("highlighted");
        }
    });
}

function centerAndZoomTree() {
    const wrapper = document.getElementById("zoom-pan-wrapper");
    if (!wrapper) return;

    const bbox = wrapper.getBBox();
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    scale = baseScale;

    // Centering offsets
    offsetX = windowWidth / 2 - (bbox.x + bbox.width / 2) * scale;
    offsetY = windowHeight / 2 - (bbox.y + bbox.height / 2) * scale;

    wrapper.setAttribute("transform", `translate(${offsetX}, ${offsetY}) scale(0.45)`);
}

async function submitNotableSelections(socketElement) {
    const seed = document.getElementById("seed").value;
    const conqueror = document.getElementById("conqueror").value;
    const socketId = socketElement.getAttribute("id");

    let notableInputs = document.querySelectorAll("#notable-list input");
    let notableData = [];

    notableInputs.forEach(input => {
        let originalNotable = input.dataset.nodeName;
        let alternateNotable = input.value.trim();
        notableData.push({ original: originalNotable, alternate: alternateNotable || null });
    });

    // Check if an entry exists
    const { data: existingData, error: fetchError } = await supabase
        .from("notable_submissions")
        .select("id")
        .eq("socket_id", socketId)
        .eq("seed", parseInt(seed))
        .eq("conqueror", conqueror)
        .maybeSingle({
            headers: { "Accept": "application/json" }  // 👈 Fix added here
        });

    if (fetchError && fetchError.code !== "PGRST116") {
        console.error("Error checking existing data:", fetchError);
        alert("Error checking existing data.");
        return;
    }

    if (existingData) {
        // Update existing record
        const { error: updateError } = await supabase
            .from("notable_submissions")
            .update({ notables: JSON.stringify(notableData) })
            .eq("id", existingData.id);

        if (updateError) {
            console.error("Error updating data:", updateError);
            alert("Failed to update data.");
        } else {
            alert("Notables updated successfully!");
        }
    } else {
        // Insert new record
        const { error: insertError } = await supabase.from("notable_submissions").insert([
            {
                socket_id: socketId,
                seed: parseInt(seed),
                conqueror: conqueror,
                notables: JSON.stringify(notableData)
            }
        ]);

        if (insertError) {
            console.error("Error inserting data:", insertError);
            alert("Failed to submit data.");
        } else {
            alert("Notables submitted successfully!");
        }
    }
}



