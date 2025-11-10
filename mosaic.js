document.addEventListener("DOMContentLoaded", () => {
  const hexagons = document.querySelectorAll(".hexagon");

  hexagons.forEach(h => {
    // default = mic (2 coloane x 1 rând)
    h.style.gridColumn = "span 2";
    h.style.gridRow = "span 1";
  });

  // alegem câteva random să fie "mari"
  hexagons.forEach(h => {
    if (Math.random() > 0.7) { // ~30% dintre ele
      h.style.gridColumn = "span 3";
      h.style.gridRow = "span 2";
    }
  });
});