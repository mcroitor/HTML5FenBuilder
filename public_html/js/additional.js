var fonts = [
    "Chess Merida",
    "Chess Motif",
    "Chess Adventurer",
    "Chess Leipzig",
    "Chess Usual"
];

var chars = [];

chars["Chess Merida"] = {
    "empty": [
        "!\"\"\"\"\"\"\"\"#",
        "$*+*+*+*+%",
        "$+*+*+*+*%",
        "$*+*+*+*+%",
        "$+*+*+*+*%",
        "$*+*+*+*+%",
        "$+*+*+*+*%",
        "$*+*+*+*+%",
        "$+*+*+*+*%",
        "/(((((((()"
    ],
    "light": "*",
    "dark": "+",
    "K0": "k", "Q0": "q", "R0": "r", "B0": "b", "N0": "n", "P0": "p",
    "K1": "K", "Q1": "Q", "R1": "R", "B1": "B", "N1": "N", "P1": "P",
    "k0": "l", "q0": "w", "r0": "t", "b0": "v", "n0": "m", "p0": "o",
    "k1": "L", "q1": "W", "r1": "T", "b1": "V", "n1": "M", "p1": "O"
};

chars["Chess Motif"] = {
    "empty": [
        "!\"\"\"\"\"\"\"\"#",
        "$*+*+*+*+%",
        "$+*+*+*+*%",
        "$*+*+*+*+%",
        "$+*+*+*+*%",
        "$*+*+*+*+%",
        "$+*+*+*+*%",
        "$*+*+*+*+%",
        "$+*+*+*+*%",
        "/(((((((()"
    ],
    "light": "*",
    "dark": "+",
    "K0": "k", "Q0": "q", "R0": "r", "B0": "b", "N0": "n", "P0": "p",
    "K1": "K", "Q1": "Q", "R1": "R", "B1": "B", "N1": "N", "P1": "P",
    "k0": "l", "q0": "w", "r0": "t", "b0": "v", "n0": "m", "p0": "o",
    "k1": "L", "q1": "W", "r1": "T", "b1": "V", "n1": "M", "p1": "O"
};

chars["Chess Adventurer"] = {
    "empty": [
        "!\"\"\"\"\"\"\"\"#",
        "$*+*+*+*+%",
        "$+*+*+*+*%",
        "$*+*+*+*+%",
        "$+*+*+*+*%",
        "$*+*+*+*+%",
        "$+*+*+*+*%",
        "$*+*+*+*+%",
        "$+*+*+*+*%",
        "/(((((((()"
    ],
    "light": "*",
    "dark": "+",
    "K0": "k", "Q0": "q", "R0": "r", "B0": "b", "N0": "n", "P0": "p",
    "K1": "K", "Q1": "Q", "R1": "R", "B1": "B", "N1": "N", "P1": "P",
    "k0": "l", "q0": "w", "r0": "t", "b0": "v", "n0": "m", "p0": "o",
    "k1": "L", "q1": "W", "r1": "T", "b1": "V", "n1": "M", "p1": "O"
};

chars["Chess Leipzig"] = {
    "empty": [
        "!\"\"\"\"\"\"\"\"#",
        "$*+*+*+*+%",
        "$+*+*+*+*%",
        "$*+*+*+*+%",
        "$+*+*+*+*%",
        "$*+*+*+*+%",
        "$+*+*+*+*%",
        "$*+*+*+*+%",
        "$+*+*+*+*%",
        "/(((((((()"
    ],
    "light": "*",
    "dark": "+",
    "K0": "k", "Q0": "q", "R0": "r", "B0": "b", "N0": "n", "P0": "p",
    "K1": "K", "Q1": "Q", "R1": "R", "B1": "B", "N1": "N", "P1": "P",
    "k0": "l", "q0": "w", "r0": "t", "b0": "v", "n0": "m", "p0": "o",
    "k1": "L", "q1": "W", "r1": "T", "b1": "V", "n1": "M", "p1": "O"
};

chars["Chess Usual"] = {
    "empty": [
        "1222222223",
        "4 + + + +5",
        "4+ + + + 5",
        "4 + + + +5",
        "4+ + + + 5",
        "4 + + + +5",
        "4+ + + + 5",
        "4 + + + +5",
        "4+ + + + 5",
        "7888888889"
    ],
    "light": " ",
    "dark": "+",
    "K0": "k", "Q0": "q", "R0": "r", "B0": "b", "N0": "h", "P0": "p",
    "K1": "K", "Q1": "Q", "R1": "R", "B1": "B", "N1": "H", "P1": "P",
    "k0": "l", "q0": "w", "r0": "t", "b0": "n", "n0": "j", "p0": "o",
    "k1": "L", "q1": "W", "r1": "T", "b1": "N", "n1": "J", "p1": "O"
};

var isDigit = function(param) {
    return (param >= '0' && param <= '9');
}

function _debug(str){
    document.getElementById("message").innerHTML += "<p>" + str + "</p>";
}