import React from "react";

export default function Badge({ type }) {
  const style = {
    Healthy: {
      backgroundColor: "#F7EDD0",
      color: "#DAA31A",
    },
    Trending: {
      backgroundColor: "#F7C5BA",
      color: "#FB471D",
    },
    Special: {
      backgroundColor: "#D6EEE0",
      color: "#309D5B",
    },
  };
  return (
    <div className="badge text-xs h-[1.3rem] md:h-6" style={style[type]}>
      {type}
    </div>
  );
}
