const detailsContainer = document.getElementById("scholarshipDetails");

const scholarship = JSON.parse(
    localStorage.getItem("selectedScholarship")
);

function escapeHTML(text) {
    const element = document.createElement("div");
    element.textContent = text || "";
    return element.innerHTML;
}

function createBlogSections(sections) {
    if (!sections || sections.length === 0) {
        return `
            <section>
                <h2>About this Scholarship</h2>
                <p class="description">
                    Details for this scholarship have not been added yet.
                    Please visit the official website for more information.
                </p>
            </section>
        `;
    }

    return sections.map(section => `
        <section class="blog-section">
            <h2>${escapeHTML(section.heading)}</h2>

            ${section.paragraphs.map(paragraph => `
                <p class="description">${escapeHTML(paragraph)}</p>
            `).join("")}
        </section>
    `).join("");
}

function displayScholarship() {
    if (!scholarship) {
        detailsContainer.innerHTML = `
            <div class="not-found">
                <h1>Scholarship not found</h1>
                <p>Please return to the scholarship list and select a scholarship.</p>
            </div>
        `;
        return;
    }

    const title = scholarship.name || scholarship.title || "Scholarship";
    const programs = scholarship.available_program || scholarship.type || "Not specified";
    const location = scholarship.location || "Not specified";
    const deadline = scholarship.deadline || "Check official website";

    detailsContainer.innerHTML = `
        <section class="blog-header">
            <span class="type-badge">${escapeHTML(programs)}</span>
            <h1>${escapeHTML(title)}</h1>
            <p>Scholarship information and application guide.</p>
        </section>

        <section class="blog-content">
            <div class="info-grid">
                <div class="info-box">
                    <small>LOCATION</small>
                    <strong>${escapeHTML(location)}</strong>
                </div>

                <div class="info-box">
                    <small>APPLICATION DEADLINE</small>
                    <strong>${escapeHTML(deadline)}</strong>
                </div>
            </div>

            ${createBlogSections(scholarship.sections)}

            ${
                scholarship.link
                    ? `
                    <a
                        class="apply-button"
                        href="${escapeHTML(scholarship.link)}"
                        target="_blank"
                        rel="noopener"
                    >
                        Visit Official Website →
                    </a>
                    `
                    : ""
            }
        </section>
    `;
}

displayScholarship();