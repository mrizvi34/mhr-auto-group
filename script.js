document.getElementById("year").textContent = new Date().getFullYear();

function initializeDealButtons() {
  const vehicleField = document.getElementById("vehicleField");
  const selectedDeal = document.getElementById("selectedDeal");
  document.querySelectorAll(".claim-deal").forEach((button) => {
    if (button.dataset.bound === "true") return;
    button.dataset.bound = "true";
    button.addEventListener("click", () => {
      const deal = button.dataset.vehicle;
      selectedDeal.value = deal;
      vehicleField.value = `I am interested in the ${deal}. Please contact me with availability and next steps.`;
    });
  });
}

document.addEventListener("mhr-content-ready", initializeDealButtons);
initializeDealButtons();

const form = document.getElementById("leadForm");
const message = document.getElementById("formMessage");
form.addEventListener("submit", () => { message.textContent = "Submitting your request…"; });
