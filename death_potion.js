if (typeof elements !== 'undefined') {
    elements.death_potion = {
        color: ["#4a0e4e", "#2c003e", "#6a1b76"],
        behavior: behaviors.LIQUID,
        category: "liquids",
        state: "liquid",
        density: 1050,
        viscosity: 20,
        glow: true,
        reactions: {
            "water": { elem1: null, elem2: "plague" },
            "dirty_water": { elem1: null, elem2: "plague" }
        },
        tick: function(pixel) {
            let neighbors = [
                {x: pixel.x, y: pixel.y - 1},
                {x: pixel.x, y: pixel.y + 1},
                {x: pixel.x - 1, y: pixel.y},
                {x: pixel.x + 1, y: pixel.y}
            ];
            for (let i = 0; i < neighbors.length; i++) {
                let n = neighbors[i];
                if (!isEmpty(n.x, n.y, true)) {
                    let neighborPixel = pixelMap[n.x][n.y];
                    if (neighborPixel) {
                        let neighborInfo = elements[neighborPixel.element];
                        if (neighborInfo && (neighborInfo.category === "life" || neighborInfo.category === "plants" || neighborInfo.category === "animals")) {
                            if (neighborPixel.element !== "dead_body" && neighborPixel.element !== "plague") {
                                changePixel(neighborPixel, "plague");
                            }
                        }
                    }
                }
            }
        }
    };
    elements.death_potion.desc = "A cursed fluid. Instantly infects any living tissue with the plague upon contact.";
}
