// Tab Group AI - Popup Script
// Handles the popup UI and user interactions

document.addEventListener("DOMContentLoaded", async () => {
    // Initialize components
    await initializePopup();

    // Set up event listeners
    setupEventListeners();
});

/**
 * Initialize the popup UI
 */
async function initializePopup() {
    try {
        // Initialize group manager
        await GroupManager.init();

        // Load settings and apply theme
        const settings = await StorageUtil.getSettings();
        applyTheme(settings.theme);

        // Set settings toggle states
        document.getElementById("theme-toggle").checked =
            settings.theme === "dark";
        document.getElementById("persistence-toggle").checked =
            settings.persistGroups;

        // Hide loading indicator
        document.getElementById("loading").classList.add("hidden");
    } catch (error) {
        console.error("Error initializing popup:", error);
        document.getElementById("loading").classList.add("hidden");
        document.getElementById("error-message").classList.remove("hidden");
    }
}

/**
 * Set up event listeners for UI elements
 */
function setupEventListeners() {
    // Refresh button
    document
        .getElementById("refresh-btn")
        .addEventListener("click", async () => {
            await GroupManager.categorizeTabs();
        });

    // Settings button
    document.getElementById("settings-btn").addEventListener("click", () => {
        const settingsPanel = document.getElementById("settings-panel");
        settingsPanel.classList.toggle("hidden");
    });

    // Theme toggle
    document
        .getElementById("theme-toggle")
        .addEventListener("change", async (e) => {
            const theme = e.target.checked ? "dark" : "light";
            applyTheme(theme);

            // Save setting
            const settings = await StorageUtil.getSettings();
            settings.theme = theme;
            await StorageUtil.saveSettings(settings);
        });

    // Persistence toggle
    document
        .getElementById("persistence-toggle")
        .addEventListener("change", async (e) => {
            const persistGroups = e.target.checked;

            // Save setting
            const settings = await StorageUtil.getSettings();
            settings.persistGroups = persistGroups;
            await StorageUtil.saveSettings(settings);
        });

    // Close popup when clicking outside of it (for settings panel)
    document.addEventListener("click", (e) => {
        const settingsPanel = document.getElementById("settings-panel");
        const settingsBtn = document.getElementById("settings-btn");

        if (
            !settingsPanel.classList.contains("hidden") &&
            !settingsPanel.contains(e.target) &&
            !settingsBtn.contains(e.target)
        ) {
            settingsPanel.classList.add("hidden");
        }
    });

    // Add smooth scrolling for tab groups
    const tabGroupsContainer = document.getElementById("tab-groups");
    tabGroupsContainer.addEventListener("click", (e) => {
        // Handle group header clicks for smooth scrolling
        const groupHeader = e.target.closest(".group-header");
        if (groupHeader) {
            const tabGroup = groupHeader.closest(".tab-group");
            if (tabGroup) {
                // Smooth scroll to the clicked group
                setTimeout(() => {
                    tabGroup.scrollIntoView({
                        behavior: "smooth",
                        block: "nearest",
                    });
                }, 100);
            }
        }
    });

    // Add keyboard navigation
    document.addEventListener("keydown", (e) => {
        // Escape key closes settings panel
        if (e.key === "Escape") {
            const settingsPanel = document.getElementById("settings-panel");
            if (!settingsPanel.classList.contains("hidden")) {
                settingsPanel.classList.add("hidden");
                e.preventDefault();
            }
        }
    });

    // Prevent body scrolling when scrolling inside tab groups
    preventBodyScrolling();

    // Handle scroll indicator
    setupScrollIndicator();
}

/**
 * Apply theme to the UI
 * @param {string} theme - Theme name ('light' or 'dark')
 */
function applyTheme(theme) {
    if (theme === "dark") {
        document.documentElement.setAttribute("data-theme", "dark");
    } else {
        document.documentElement.removeAttribute("data-theme");
    }
}

/**
 * Handle errors in the UI
 * @param {Error} error - Error object
 */
function handleError(error) {
    console.error("Error:", error);
    document.getElementById("loading").classList.add("hidden");

    const errorMessage = document.getElementById("error-message");
    errorMessage.textContent = `Error: ${error.message}`;
    errorMessage.classList.remove("hidden");

    // Hide error after 5 seconds
    setTimeout(() => {
        errorMessage.classList.add("hidden");
    }, 5000);
}

/**
 * Set up scroll indicator for tab groups
 */
function setupScrollIndicator() {
    const tabGroupsContainer = document.getElementById("tab-groups");
    const scrollIndicator = document.getElementById("scroll-indicator");

    // Show/hide scroll indicator based on scroll position
    tabGroupsContainer.addEventListener("scroll", () => {
        const { scrollTop, scrollHeight, clientHeight } = tabGroupsContainer;

        // Show indicator when there's more content to scroll
        if (
            scrollHeight > clientHeight &&
            scrollTop < scrollHeight - clientHeight - 50
        ) {
            scrollIndicator.classList.remove("hidden");
        } else {
            scrollIndicator.classList.add("hidden");
        }
    });

    // Scroll down when indicator is clicked
    scrollIndicator.addEventListener("click", () => {
        tabGroupsContainer.scrollBy({
            top: 200,
            behavior: "smooth",
        });
    });

    // Initial check
    setTimeout(() => {
        const { scrollHeight, clientHeight } = tabGroupsContainer;
        if (scrollHeight > clientHeight + 50) {
            scrollIndicator.classList.remove("hidden");
        }
    }, 500);
}

/**
 * Prevent body scrolling when scrolling inside tab groups
 */
function preventBodyScrolling() {
    // Get scrollable elements
    const tabGroupsContainer = document.getElementById("tab-groups");
    const tabsContainers = document.querySelectorAll(".tabs-container");

    // Prevent propagation of wheel events
    const preventPropagation = (e) => {
        // Check if the element is scrolled to the top or bottom
        const element = e.currentTarget;
        const scrollTop = element.scrollTop;
        const scrollHeight = element.scrollHeight;
        const clientHeight = element.clientHeight;

        // Allow scrolling if not at the edge
        if (
            (scrollTop > 0 && scrollTop < scrollHeight - clientHeight) ||
            (scrollTop === 0 && e.deltaY > 0) ||
            (scrollTop === scrollHeight - clientHeight && e.deltaY < 0)
        ) {
            e.stopPropagation();
        }
    };

    // Add event listeners
    tabGroupsContainer.addEventListener("wheel", preventPropagation, {
        passive: true,
    });

    // Add event listeners to tab containers
    tabsContainers.forEach((container) => {
        container.addEventListener("wheel", preventPropagation, {
            passive: true,
        });
    });

    // Add event listeners to new tab containers when groups are updated
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === "childList") {
                const newTabsContainers =
                    tabGroupsContainer.querySelectorAll(".tabs-container");
                newTabsContainers.forEach((container) => {
                    container.removeEventListener("wheel", preventPropagation);
                    container.addEventListener("wheel", preventPropagation, {
                        passive: true,
                    });
                });
            }
        });
    });

    // Observe changes to the tab groups container
    observer.observe(tabGroupsContainer, { childList: true, subtree: true });
}
