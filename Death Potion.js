{\rtf1\ansi\ansicpg1252\cocoartf2870
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs26 \cf0 // Check if the game elements object exists before running\
if (typeof elements !== 'undefined') \{\
\
    // 1. Define the Death Potion element\
    elements.death_potion = \{\
        color: ["#4a0e4e", "#2c003e", "#6a1b76"], // Dark magical purple shades\
        behavior: behaviors.LIQUID, // Flows like a liquid\
        category: "liquids", // Appears in the Liquids tab\
        state: "liquid",\
        density: 1050, // Slightly heavier than water\
        viscosity: 20, // A little thick and gooey\
        glow: true, // Makes the potion glow in dark mode\
        \
        // 2. Define the reactions when it touches other things\
        reactions: \{\
            // If it touches water, it corrupts it into plague\
            "water": \{ elem1: null, elem2: "plague" \},\
            "dirty_water": \{ elem1: null, elem2: "plague" \},\
        \},\
        \
        // 3. Custom tick function to scan for nearby living things\
        tick: function(pixel) \{\
            // Directions to check around the potion pixel (Up, Down, Left, Right)\
            let neighbors = [\
                \{x: pixel.x, y: pixel.y - 1\},\
                \{x: pixel.x, y: pixel.y + 1\},\
                \{x: pixel.x - 1, y: pixel.y\},\
                \{x: pixel.x + 1, y: pixel.y\}\
            ];\
            \
            for (let i = 0; i < neighbors.length; i++) \{\
                let n = neighbors[i];\
                // Check if a pixel exists at that coordinate\
                if (!isEmpty(n.x, n.y, true)) \{\
                    let neighborPixel = pixelMap[n.x][n.y];\
                    let neighborInfo = elements[neighborPixel.element];\
                    \
                    // If the neighbor belongs to the "life" or "organic" category\
                    if (neighborInfo && (neighborInfo.category === "life" || neighborInfo.category === "plants" || neighborInfo.category === "animals")) \{\
                        // Avoid infecting things that are already dead or immune\
                        if (neighborPixel.element !== "dead_body" && neighborPixel.element !== "plague") \{\
                            // Convert the living pixel into the Plague!\
                            changePixel(neighborPixel, "plague");\
                        \}\
                    \}\
                \}\
            \}\
        \}\
    \};\
\
    // Optional: Add a special description when hovering over it in the menu\
    elements.death_potion.desc = "A cursed fluid. Instantly infects any living tissue with the plague upon contact.";\
\}\
}