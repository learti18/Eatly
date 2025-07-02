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
  const colors = [
    "bg-pink-200",
    "bg-orange-200", 
    "bg-red-200",
    "bg-green-200",
    "bg-blue-200",
    "bg-yellow-200",
    "bg-purple-200",
    "bg-indigo-200",
    "bg-teal-200",
    "bg-cyan-200"
  ];
  return colors[index % colors.length];
};
