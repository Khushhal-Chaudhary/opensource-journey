
// OpenSource Journey - Interactive Roadmap

// 1. Select all roadmap checkboxes
const checkboxes = document.querySelectorAll(".roadmap-checkbox");

// 2. Select progress elements
const progressBar = document.querySelector("#progress-bar");
const progressText = document.querySelector("#progress-text");
const completedText = document.querySelector("#completed-text");

// 3. Load previously saved progress
const savedProgress = JSON.parse(
    localStorage.getItem("opensource-progress")
) || [];

// 4. Restore previously checked tasks
checkboxes.forEach((checkbox, index) => {
    checkbox.checked = savedProgress.includes(index);
});

// 5. Update the progress display
function updateProgress() {
    const totalTasks = checkboxes.length;

    const completedTasks = document.querySelectorAll(
        ".roadmap-checkbox:checked"
    ).length;

    const percentage = totalTasks === 0
        ? 0
        : Math.round((completedTasks / totalTasks) * 100);

    progressBar.style.width = percentage + "%";
    progressText.textContent = percentage + "%";
    completedText.textContent = completedTasks + " of " + totalTasks + " completed";

    // Save progress in the browser
    const currentProgress = [];

    checkboxes.forEach((checkbox, index) => {
        if (checkbox.checked) {
            currentProgress.push(index);
        }
    });

    localStorage.setItem(
        "opensource-progress",
        JSON.stringify(currentProgress)
    );
}

// 6. Listen for checkbox changes
checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", updateProgress);
});

// 7. Show initial progress
updateProgress();


// =====================================
// MY LEARNING JOURNEY - JOURNAL
// =====================================

// Find the journal form and entry container
const journalForm = document.querySelector("#journal-form");
const journalEntries = document.querySelector("#journal-entries");

// Load saved journal entries
let entries = JSON.parse(
    localStorage.getItem("opensource-journal")
) || [];

// Display all journal entries
function displayEntries() {

    journalEntries.innerHTML = "";

    if (entries.length === 0) {
        const message = document.createElement("p");
        message.className = "empty-message";
        message.textContent = "No entries yet. Start writing your journey!";
        journalEntries.appendChild(message);
        return;
    }

    entries.forEach((entry, index) => {

        const card = document.createElement("article");
        card.className = "journal-entry";

        const title = document.createElement("h4");
        title.textContent = entry.title;

        const details = document.createElement("p");
        details.className = "entry-details";
        details.textContent = entry.date + " | " + entry.category;

        const notes = document.createElement("p");
        notes.textContent = entry.notes;

        const deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.className = "delete-entry";
        deleteButton.textContent = "Delete Entry";

        // Delete this entry
        deleteButton.addEventListener("click", function () {

            entries.splice(index, 1);

            localStorage.setItem(
                "opensource-journal",
                JSON.stringify(entries)
            );

            displayEntries();
        });

        card.appendChild(title);
        card.appendChild(details);
        card.appendChild(notes);
        card.appendChild(deleteButton);

        journalEntries.appendChild(card);
    });
}

// Save a new journal entry
journalForm.addEventListener("submit", function (event) {

    // Stop the page from refreshing
    event.preventDefault();

    const newEntry = {
        title: document.querySelector("#entry-title").value.trim(),
        date: document.querySelector("#entry-date").value,
        category: document.querySelector("#entry-category").value,
        notes: document.querySelector("#entry-notes").value.trim()
    };

    // Add the new entry
    entries.unshift(newEntry);

    // Save entries in LocalStorage
    localStorage.setItem(
        "opensource-journal",
        JSON.stringify(entries)
    );

    // Clear the form
    journalForm.reset();

    // Show the updated journal
    displayEntries();
});

// Display saved entries when the page opens
displayEntries();

// Learning Library Search

const searchInput = document.querySelector("#lesson-search");
const lessonCards = document.querySelectorAll(".feature-card");
const searchMessage = document.querySelector("#search-message");

if (searchInput && searchMessage) {

    searchInput.addEventListener("input", function () {

        const searchTerm = searchInput.value.toLowerCase().trim();
        let visibleCount = 0;

        lessonCards.forEach(function (card) {

            const lessonText = card.textContent.toLowerCase();

            if (lessonText.includes(searchTerm)) {
                card.style.display = "";
                visibleCount++;
            } else {
                card.style.display = "none";
            }

        });

        if (searchTerm !== "" && visibleCount === 0) {
            searchMessage.textContent = "No lessons found. Try another keyword.";
        } else {
            searchMessage.textContent = "";
        }

    });

}
