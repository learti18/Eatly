/**
 * Maps ingredient names to their corresponding emoji representations
 * @param {string} name - The name of the ingredient
 * @returns {string} - The emoji representation of the ingredient
 */
export const getIngredientEmoji = (name) => {
  if (!name) return "🍴";
  
  const ingredientMap = {
    onion: "🧅",
    carrot: "🥕",
    tomato: "🍅",
    cucumber: "🥒",
    garlic: "🧄",
    potato: "🥔",
    cheese: "🧀",
    mushroom: "🍄",
    pepper: "🌶️",
    lettuce: "🥬",
    egg: "🥚",
    olive: "🫒",
    rice: "🍚",
    bread: "🍞",
    meat: "🥩",
    chicken: "🍗",
    fish: "🐟",
    shrimp: "🍤",
    // Add more ingredients as needed
  };

  // Try to find an exact match
  if (ingredientMap[name.toLowerCase()]) {
    return ingredientMap[name.toLowerCase()];
  }

  // Otherwise, try to find a partial match
  for (const [key, emoji] of Object.entries(ingredientMap)) {
    if (name.toLowerCase().includes(key)) {
      return emoji;
    }
  }

  // Default emoji if no match
  return "🍴";
};

/**
 * Gets a background color for an ingredient based on its index
 * @param {number} index - The index of the ingredient in a list
 * @returns {string} - Tailwind CSS class for background color
 */
export const getIngredientBgColor = (index) => {
  const colors = ["pink", "orange", "red", "green", "blue", "yellow"];
  return `bg-${colors[index % colors.length]}-200`;
};
