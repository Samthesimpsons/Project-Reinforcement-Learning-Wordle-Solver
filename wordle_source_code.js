!(function (e, a) {
  "object" == typeof exports && "undefined" != typeof module
    ? a(
        require("react"),
        require("react-dom"),
        require("react-redux"),
        require("foundation"),
        require("classnames"),
        require("reselect"),
        require("redux"),
        require("redux-thunk")
      )
    : "function" == typeof define && define.amd
    ? define(
        [
          "react",
          "react-dom",
          "react-redux",
          "foundation",
          "classnames",
          "reselect",
          "redux",
          "redux-thunk",
        ],
        a
      )
    : a(
        (e = e || self).React,
        e.ReactDOM,
        e.ReactRedux,
        e.Foundation,
        e.classNames,
        e.Reselect,
        e.Redux,
        e.ReduxThunk
      );
})(this, function (p, e, a, w, y, t, n, o) {
  "use strict";
  var g = "default" in p ? p.default : p;
  (e = e && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e),
    (y =
      y && Object.prototype.hasOwnProperty.call(y, "default") ? y.default : y),
    (o =
      o && Object.prototype.hasOwnProperty.call(o, "default") ? o.default : o);
  var i = p.createContext({
    getVariant: function () {
      return null;
    },
    reportExposure: function (e) {
      return null;
    },
    tests: {},
    hasAbraLoaded: !1,
  });
  function r(a, e) {
    var t,
      n = Object.keys(a);
    return (
      Object.getOwnPropertySymbols &&
        ((t = Object.getOwnPropertySymbols(a)),
        e &&
          (t = t.filter(function (e) {
            return Object.getOwnPropertyDescriptor(a, e).enumerable;
          })),
        n.push.apply(n, t)),
      n
    );
  }
  function l(n) {
    for (var e = 1; e < arguments.length; e++) {
      var o = null != arguments[e] ? arguments[e] : {};
      e % 2
        ? r(Object(o), !0).forEach(function (e) {
            var a, t;
            (a = n),
              (e = o[(t = e)]),
              t in a
                ? Object.defineProperty(a, t, {
                    value: e,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                  })
                : (a[t] = e);
          })
        : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(n, Object.getOwnPropertyDescriptors(o))
        : r(Object(o)).forEach(function (e) {
            Object.defineProperty(n, e, Object.getOwnPropertyDescriptor(o, e));
          });
    }
    return n;
  }
  function u(e, a) {
    return (
      (function (e) {
        if (Array.isArray(e)) return e;
      })(e) ||
      (function (e, a) {
        var t =
          null == e
            ? null
            : ("undefined" != typeof Symbol && e[Symbol.iterator]) ||
              e["@@iterator"];
        if (null != t) {
          var n,
            o,
            r = [],
            s = !0,
            i = !1;
          try {
            for (
              t = t.call(e);
              !(s = (n = t.next()).done) &&
              (r.push(n.value), !a || r.length !== a);
              s = !0
            );
          } catch (e) {
            (i = !0), (o = e);
          } finally {
            try {
              s || null == t.return || t.return();
            } finally {
              if (i) throw o;
            }
          }
          return r;
        }
      })(e, a) ||
      (function (e, a) {
        if (e) {
          if ("string" == typeof e) return s(e, a);
          var t = Object.prototype.toString.call(e).slice(8, -1);
          return "Map" ===
            (t = "Object" === t && e.constructor ? e.constructor.name : t) ||
            "Set" === t
            ? Array.from(e)
            : "Arguments" === t ||
              /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)
            ? s(e, a)
            : void 0;
        }
      })(e, a) ||
      (function () {
        throw new TypeError(
          "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
        );
      })()
    );
  }
  function s(e, a) {
    (null == a || a > e.length) && (a = e.length);
    for (var t = 0, n = new Array(a); t < a; t++) n[t] = e[t];
    return n;
  }
  function c(e) {
    var a = e.children,
      n = e.regiId,
      t = (e = u(p.useState({}), 2))[0],
      o = e[1],
      r = (e = u(p.useState(!1), 2))[0],
      s = e[1];
    return (
      p.useEffect(
        function () {
          var e,
            a,
            t =
              (null === (e = window.config) || void 0 === e
                ? void 0
                : e.AbraConfig) || {};
          w.abra.init(
            window.abra.config,
            {
              agent_id:
                (null === (e = window.config) ||
                void 0 === e ||
                null === (a = e.userInfo) ||
                void 0 === a
                  ? void 0
                  : a.agentID) || w.agentIdCookie,
              regi_id: n,
            },
            t
          ),
            o(l({}, w.abra.getTests())),
            s(!0);
        },
        [n]
      ),
      (e = p.useMemo(
        function () {
          return {
            tests: t,
            getVariant: function (e) {
              return t[e];
            },
            reportExposure: function (e) {
              return w.abra.reportExposure(e);
            },
            hasAbraLoaded: r,
          };
        },
        [t, r]
      )),
      g.createElement(i.Provider, { value: e }, a)
    );
  }
  function h(e, a) {
    var t = p.useRef(e);
    p.useLayoutEffect(
      function () {
        t.current = e;
      },
      [e]
    ),
      p.useEffect(
        function () {
          if (a || 0 === a) {
            var e = setTimeout(function () {
              return t.current();
            }, a);
            return function () {
              return clearTimeout(e);
            };
          }
        },
        [a]
      );
  }
  var d,
    m = "nyt-wordle-refresh",
    f = window.localStorage,
    b = 432e5;
  function k() {
    return (d =
      d ||
      setInterval(function () {
        f.getItem(m) &&
          (f.removeItem(m),
          window.location.href.match(/.*\.nytimes\.com/g)
            ? window.location.reload(!0)
            : window.location.replace("https://www.nytimes.com/games/wordle"));
      }, b));
  }
  var v = "nyt-wordle-statistics",
    _ = window.localStorage;
  function x(e, a) {
    if (e.gamesPlayed) {
      var t = (function () {
        var a = { gamesPlayed: 0 };
        try {
          var e = JSON.parse(_.getItem(v));
          if (e && e.gamesPlayed) return e;
        } catch (e) {
          return a;
        }
        return a;
      })();
      return (
        !t.gamesPlayed ||
        a ||
        (console.log(
          "WORDLE DATA TRANSFER: Comparing existing game count with incoming data game count...",
          t.gamesPlayed,
          e.gamesPlayed
        ),
        e.gamesPlayed > t.gamesPlayed)
      );
    }
  }
  function S() {
    if (_) {
      try {
        var e = new Proxy(new URLSearchParams(window.location.search), {
          get: function (e, a) {
            return e.get(a);
          },
        });
        e.data
          ? ((t = JSON.parse(e.data)),
            console.log(
              "WORDLE DATA TRANSFER: Accepted event from origin: ".concat(
                document.referrer
              ),
              t
            ),
            (function (e) {
              if (!e.statistics)
                throw new Error(
                  "User local data does not contain statistics. Aborting transfer."
                );
              x(e.statistics, e.force)
                ? _.setItem(v, JSON.stringify(e.statistics))
                : console.log(
                    "WORDLE DATA TRANSFER: Existing data is fresher. Will not overwrite."
                  );
            })(t))
          : console.log("WORDLE DATA TRANSFER: No data received");
      } catch (e) {
        console.warn(
          "WORDLE DATA TRANSFER: Data may not have been transferred: ",
          e
        );
      }
      (a = "data"),
        (e = window.location),
        (t = new URL(e.href)),
        (t = new URLSearchParams(t.search)).delete(a),
        (t = t.toString() ? "?".concat(t.toString()) : ""),
        (e = new URL("".concat(e.pathname).concat(t), e.href)),
        window.history.replaceState({}, document.title, e.href);
    }
    var a, t;
  }
  var j = {
    help: "M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z",
    settings:
      "M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z",
    backspace:
      "M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H7.07L2.4 12l4.66-7H22v14zm-11.59-2L14 13.41 17.59 17 19 15.59 15.41 12 19 8.41 17.59 7 14 10.59 10.41 7 9 8.41 12.59 12 9 15.59z",
    close:
      "M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z",
    share:
      "M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92c0-1.61-1.31-2.92-2.92-2.92zM18 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM6 13c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm12 7.02c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z",
    statistics:
      "M16,11V3H8v6H2v12h20V11H16z M10,5h4v14h-4V5z M4,11h4v8H4V11z M20,19h-4v-6h4V19z",
  };
  function E(e) {
    var a = e.icon,
      t = e.onClick,
      n = e.disabled,
      o = void 0 !== n && n,
      e = e.id;
    return g.createElement(
      "svg",
      {
        id: e,
        xmlns: "http://www.w3.org/2000/svg",
        height: "24",
        viewBox: "0 0 24 24",
        width: "24",
        className: "game-icon",
        onClick: t,
        "data-testid": "icon-".concat(a),
      },
      g.createElement("path", {
        fill: o
          ? "var(--icon-disabled)"
          : "share" === a
          ? "var(--white)"
          : "var(--color-tone-1)",
        d: j[a],
      })
    );
  }
  var z = [
      "cigar",
      "rebut",
      "sissy",
      "humph",
      "awake",
      "blush",
      "focal",
      "evade",
      "naval",
      "serve",
      "heath",
      "dwarf",
      "model",
      "karma",
      "stink",
      "grade",
      "quiet",
      "bench",
      "abate",
      "feign",
      "major",
      "death",
      "fresh",
      "crust",
      "stool",
      "colon",
      "abase",
      "marry",
      "react",
      "batty",
      "pride",
      "floss",
      "helix",
      "croak",
      "staff",
      "paper",
      "unfed",
      "whelp",
      "trawl",
      "outdo",
      "adobe",
      "crazy",
      "sower",
      "repay",
      "digit",
      "crate",
      "cluck",
      "spike",
      "mimic",
      "pound",
      "maxim",
      "linen",
      "unmet",
      "flesh",
      "booby",
      "forth",
      "first",
      "stand",
      "belly",
      "ivory",
      "seedy",
      "print",
      "yearn",
      "drain",
      "bribe",
      "stout",
      "panel",
      "crass",
      "flume",
      "offal",
      "agree",
      "error",
      "swirl",
      "argue",
      "bleed",
      "delta",
      "flick",
      "totem",
      "wooer",
      "front",
      "shrub",
      "parry",
      "biome",
      "lapel",
      "start",
      "greet",
      "goner",
      "golem",
      "lusty",
      "loopy",
      "round",
      "audit",
      "lying",
      "gamma",
      "labor",
      "islet",
      "civic",
      "forge",
      "corny",
      "moult",
      "basic",
      "salad",
      "agate",
      "spicy",
      "spray",
      "essay",
      "fjord",
      "spend",
      "kebab",
      "guild",
      "aback",
      "motor",
      "alone",
      "hatch",
      "hyper",
      "thumb",
      "dowry",
      "ought",
      "belch",
      "dutch",
      "pilot",
      "tweed",
      "comet",
      "jaunt",
      "enema",
      "steed",
      "abyss",
      "growl",
      "fling",
      "dozen",
      "boozy",
      "erode",
      "world",
      "gouge",
      "click",
      "briar",
      "great",
      "altar",
      "pulpy",
      "blurt",
      "coast",
      "duchy",
      "groin",
      "fixer",
      "group",
      "rogue",
      "badly",
      "smart",
      "pithy",
      "gaudy",
      "chill",
      "heron",
      "vodka",
      "finer",
      "surer",
      "radio",
      "rouge",
      "perch",
      "retch",
      "wrote",
      "clock",
      "tilde",
      "store",
      "prove",
      "bring",
      "solve",
      "cheat",
      "grime",
      "exult",
      "usher",
      "epoch",
      "triad",
      "break",
      "rhino",
      "viral",
      "conic",
      "masse",
      "sonic",
      "vital",
      "trace",
      "using",
      "peach",
      "champ",
      "baton",
      "brake",
      "pluck",
      "craze",
      "gripe",
      "weary",
      "picky",
      "acute",
      "ferry",
      "aside",
      "tapir",
      "troll",
      "unify",
      "rebus",
      "boost",
      "truss",
      "siege",
      "tiger",
      "banal",
      "slump",
      "crank",
      "gorge",
      "query",
      "drink",
      "favor",
      "abbey",
      "tangy",
      "panic",
      "solar",
      "shire",
      "proxy",
      "point",
      "robot",
      "prick",
      "wince",
      "crimp",
      "knoll",
      "sugar",
      "whack",
      "mount",
      "perky",
      "could",
      "wrung",
      "light",
      "those",
      "moist",
      "shard",
      "pleat",
      "aloft",
      "skill",
      "elder",
      "frame",
      "humor",
      "pause",
      "ulcer",
      "ultra",
      "robin",
      "cynic",
      "aroma",
      "caulk",
      "shake",
      "dodge",
      "swill",
      "tacit",
      "other",
      "thorn",
      "trove",
      "bloke",
      "vivid",
      "spill",
      "chant",
      "choke",
      "rupee",
      "nasty",
      "mourn",
      "ahead",
      "brine",
      "cloth",
      "hoard",
      "sweet",
      "month",
      "lapse",
      "watch",
      "today",
      "focus",
      "smelt",
      "tease",
      "cater",
      "movie",
      "saute",
      "allow",
      "renew",
      "their",
      "slosh",
      "purge",
      "chest",
      "depot",
      "epoxy",
      "nymph",
      "found",
      "shall",
      "stove",
      "lowly",
      "snout",
      "trope",
      "fewer",
      "shawl",
      "natal",
      "comma",
      "foray",
      "scare",
      "stair",
      "black",
      "squad",
      "royal",
      "chunk",
      "mince",
      "shame",
      "cheek",
      "ample",
      "flair",
      "foyer",
      "cargo",
      "oxide",
      "plant",
      "olive",
      "inert",
      "askew",
      "heist",
      "shown",
      "zesty",
      "trash",
      "larva",
      "forgo",
      "story",
      "hairy",
      "train",
      "homer",
      "badge",
      "midst",
      "canny",
      "shine",
      "gecko",
      "farce",
      "slung",
      "tipsy",
      "metal",
      "yield",
      "delve",
      "being",
      "scour",
      "glass",
      "gamer",
      "scrap",
      "money",
      "hinge",
      "album",
      "vouch",
      "asset",
      "tiara",
      "crept",
      "bayou",
      "atoll",
      "manor",
      "creak",
      "showy",
      "phase",
      "froth",
      "depth",
      "gloom",
      "flood",
      "trait",
      "girth",
      "piety",
      "goose",
      "float",
      "donor",
      "atone",
      "primo",
      "apron",
      "blown",
      "cacao",
      "loser",
      "input",
      "gloat",
      "awful",
      "brink",
      "smite",
      "beady",
      "rusty",
      "retro",
      "droll",
      "gawky",
      "hutch",
      "pinto",
      "egret",
      "lilac",
      "sever",
      "field",
      "fluff",
      "agape",
      "voice",
      "stead",
      "berth",
      "madam",
      "night",
      "bland",
      "liver",
      "wedge",
      "roomy",
      "wacky",
      "flock",
      "angry",
      "trite",
      "aphid",
      "tryst",
      "midge",
      "power",
      "elope",
      "cinch",
      "motto",
      "stomp",
      "upset",
      "bluff",
      "cramp",
      "quart",
      "coyly",
      "youth",
      "rhyme",
      "buggy",
      "alien",
      "smear",
      "unfit",
      "patty",
      "cling",
      "glean",
      "label",
      "hunky",
      "khaki",
      "poker",
      "gruel",
      "twice",
      "twang",
      "shrug",
      "treat",
      "waste",
      "merit",
      "woven",
      "needy",
      "clown",
      "irony",
      "ruder",
      "gauze",
      "chief",
      "onset",
      "prize",
      "fungi",
      "charm",
      "gully",
      "inter",
      "whoop",
      "taunt",
      "leery",
      "class",
      "theme",
      "lofty",
      "tibia",
      "booze",
      "alpha",
      "thyme",
      "doubt",
      "parer",
      "chute",
      "stick",
      "trice",
      "alike",
      "recap",
      "saint",
      "glory",
      "grate",
      "admit",
      "brisk",
      "soggy",
      "usurp",
      "scald",
      "scorn",
      "leave",
      "twine",
      "sting",
      "bough",
      "marsh",
      "sloth",
      "dandy",
      "vigor",
      "howdy",
      "enjoy",
      "valid",
      "ionic",
      "equal",
      "floor",
      "catch",
      "spade",
      "stein",
      "exist",
      "quirk",
      "denim",
      "grove",
      "spiel",
      "mummy",
      "fault",
      "foggy",
      "flout",
      "carry",
      "sneak",
      "libel",
      "waltz",
      "aptly",
      "piney",
      "inept",
      "aloud",
      "photo",
      "dream",
      "stale",
      "unite",
      "snarl",
      "baker",
      "there",
      "glyph",
      "pooch",
      "hippy",
      "spell",
      "folly",
      "louse",
      "gulch",
      "vault",
      "godly",
      "threw",
      "fleet",
      "grave",
      "inane",
      "shock",
      "crave",
      "spite",
      "valve",
      "skimp",
      "claim",
      "rainy",
      "musty",
      "pique",
      "daddy",
      "quasi",
      "arise",
      "aging",
      "valet",
      "opium",
      "avert",
      "stuck",
      "recut",
      "mulch",
      "genre",
      "plume",
      "rifle",
      "count",
      "incur",
      "total",
      "wrest",
      "mocha",
      "deter",
      "study",
      "lover",
      "safer",
      "rivet",
      "funny",
      "smoke",
      "mound",
      "undue",
      "sedan",
      "pagan",
      "swine",
      "guile",
      "gusty",
      "equip",
      "tough",
      "canoe",
      "chaos",
      "covet",
      "human",
      "udder",
      "lunch",
      "blast",
      "stray",
      "manga",
      "melee",
      "lefty",
      "quick",
      "paste",
      "given",
      "octet",
      "risen",
      "groan",
      "leaky",
      "grind",
      "carve",
      "loose",
      "sadly",
      "spilt",
      "apple",
      "slack",
      "honey",
      "final",
      "sheen",
      "eerie",
      "minty",
      "slick",
      "derby",
      "wharf",
      "spelt",
      "coach",
      "erupt",
      "singe",
      "price",
      "spawn",
      "fairy",
      "jiffy",
      "filmy",
      "stack",
      "chose",
      "sleep",
      "ardor",
      "nanny",
      "niece",
      "woozy",
      "handy",
      "grace",
      "ditto",
      "stank",
      "cream",
      "usual",
      "diode",
      "valor",
      "angle",
      "ninja",
      "muddy",
      "chase",
      "reply",
      "prone",
      "spoil",
      "heart",
      "shade",
      "diner",
      "arson",
      "onion",
      "sleet",
      "dowel",
      "couch",
      "palsy",
      "bowel",
      "smile",
      "evoke",
      "creek",
      "lance",
      "eagle",
      "idiot",
      "siren",
      "built",
      "embed",
      "award",
      "dross",
      "annul",
      "goody",
      "frown",
      "patio",
      "laden",
      "humid",
      "elite",
      "lymph",
      "edify",
      "might",
      "reset",
      "visit",
      "gusto",
      "purse",
      "vapor",
      "crock",
      "write",
      "sunny",
      "loath",
      "chaff",
      "slide",
      "queer",
      "venom",
      "stamp",
      "sorry",
      "still",
      "acorn",
      "aping",
      "pushy",
      "tamer",
      "hater",
      "mania",
      "awoke",
      "brawn",
      "swift",
      "exile",
      "birch",
      "lucky",
      "freer",
      "risky",
      "ghost",
      "plier",
      "lunar",
      "winch",
      "snare",
      "nurse",
      "house",
      "borax",
      "nicer",
      "lurch",
      "exalt",
      "about",
      "savvy",
      "toxin",
      "tunic",
      "pried",
      "inlay",
      "chump",
      "lanky",
      "cress",
      "eater",
      "elude",
      "cycle",
      "kitty",
      "boule",
      "moron",
      "tenet",
      "place",
      "lobby",
      "plush",
      "vigil",
      "index",
      "blink",
      "clung",
      "qualm",
      "croup",
      "clink",
      "juicy",
      "stage",
      "decay",
      "nerve",
      "flier",
      "shaft",
      "crook",
      "clean",
      "china",
      "ridge",
      "vowel",
      "gnome",
      "snuck",
      "icing",
      "spiny",
      "rigor",
      "snail",
      "flown",
      "rabid",
      "prose",
      "thank",
      "poppy",
      "budge",
      "fiber",
      "moldy",
      "dowdy",
      "kneel",
      "track",
      "caddy",
      "quell",
      "dumpy",
      "paler",
      "swore",
      "rebar",
      "scuba",
      "splat",
      "flyer",
      "horny",
      "mason",
      "doing",
      "ozone",
      "amply",
      "molar",
      "ovary",
      "beset",
      "queue",
      "cliff",
      "magic",
      "truce",
      "sport",
      "fritz",
      "edict",
      "twirl",
      "verse",
      "llama",
      "eaten",
      "range",
      "whisk",
      "hovel",
      "rehab",
      "macaw",
      "sigma",
      "spout",
      "verve",
      "sushi",
      "dying",
      "fetid",
      "brain",
      "buddy",
      "thump",
      "scion",
      "candy",
      "chord",
      "basin",
      "march",
      "crowd",
      "arbor",
      "gayly",
      "musky",
      "stain",
      "dally",
      "bless",
      "bravo",
      "stung",
      "title",
      "ruler",
      "kiosk",
      "blond",
      "ennui",
      "layer",
      "fluid",
      "tatty",
      "score",
      "cutie",
      "zebra",
      "barge",
      "matey",
      "bluer",
      "aider",
      "shook",
      "river",
      "privy",
      "betel",
      "frisk",
      "bongo",
      "begun",
      "azure",
      "weave",
      "genie",
      "sound",
      "glove",
      "braid",
      "scope",
      "wryly",
      "rover",
      "assay",
      "ocean",
      "bloom",
      "irate",
      "later",
      "woken",
      "silky",
      "wreck",
      "dwelt",
      "slate",
      "smack",
      "solid",
      "amaze",
      "hazel",
      "wrist",
      "jolly",
      "globe",
      "flint",
      "rouse",
      "civil",
      "vista",
      "relax",
      "cover",
      "alive",
      "beech",
      "jetty",
      "bliss",
      "vocal",
      "often",
      "dolly",
      "eight",
      "joker",
      "since",
      "event",
      "ensue",
      "shunt",
      "diver",
      "poser",
      "worst",
      "sweep",
      "alley",
      "creed",
      "anime",
      "leafy",
      "bosom",
      "dunce",
      "stare",
      "pudgy",
      "waive",
      "choir",
      "stood",
      "spoke",
      "outgo",
      "delay",
      "bilge",
      "ideal",
      "clasp",
      "seize",
      "hotly",
      "laugh",
      "sieve",
      "block",
      "meant",
      "grape",
      "noose",
      "hardy",
      "shied",
      "drawl",
      "daisy",
      "putty",
      "strut",
      "burnt",
      "tulip",
      "crick",
      "idyll",
      "vixen",
      "furor",
      "geeky",
      "cough",
      "naive",
      "shoal",
      "stork",
      "bathe",
      "aunty",
      "check",
      "prime",
      "brass",
      "outer",
      "furry",
      "razor",
      "elect",
      "evict",
      "imply",
      "demur",
      "quota",
      "haven",
      "cavil",
      "swear",
      "crump",
      "dough",
      "gavel",
      "wagon",
      "salon",
      "nudge",
      "harem",
      "pitch",
      "sworn",
      "pupil",
      "excel",
      "stony",
      "cabin",
      "unzip",
      "queen",
      "trout",
      "polyp",
      "earth",
      "storm",
      "until",
      "taper",
      "enter",
      "child",
      "adopt",
      "minor",
      "fatty",
      "husky",
      "brave",
      "filet",
      "slime",
      "glint",
      "tread",
      "steal",
      "regal",
      "guest",
      "every",
      "murky",
      "share",
      "spore",
      "hoist",
      "buxom",
      "inner",
      "otter",
      "dimly",
      "level",
      "sumac",
      "donut",
      "stilt",
      "arena",
      "sheet",
      "scrub",
      "fancy",
      "slimy",
      "pearl",
      "silly",
      "porch",
      "dingo",
      "sepia",
      "amble",
      "shady",
      "bread",
      "friar",
      "reign",
      "dairy",
      "quill",
      "cross",
      "brood",
      "tuber",
      "shear",
      "posit",
      "blank",
      "villa",
      "shank",
      "piggy",
      "freak",
      "which",
      "among",
      "fecal",
      "shell",
      "would",
      "algae",
      "large",
      "rabbi",
      "agony",
      "amuse",
      "bushy",
      "copse",
      "swoon",
      "knife",
      "pouch",
      "ascot",
      "plane",
      "crown",
      "urban",
      "snide",
      "relay",
      "abide",
      "viola",
      "rajah",
      "straw",
      "dilly",
      "crash",
      "amass",
      "third",
      "trick",
      "tutor",
      "woody",
      "blurb",
      "grief",
      "disco",
      "where",
      "sassy",
      "beach",
      "sauna",
      "comic",
      "clued",
      "creep",
      "caste",
      "graze",
      "snuff",
      "frock",
      "gonad",
      "drunk",
      "prong",
      "lurid",
      "steel",
      "halve",
      "buyer",
      "vinyl",
      "utile",
      "smell",
      "adage",
      "worry",
      "tasty",
      "local",
      "trade",
      "finch",
      "ashen",
      "modal",
      "gaunt",
      "clove",
      "enact",
      "adorn",
      "roast",
      "speck",
      "sheik",
      "missy",
      "grunt",
      "snoop",
      "party",
      "touch",
      "mafia",
      "emcee",
      "array",
      "south",
      "vapid",
      "jelly",
      "skulk",
      "angst",
      "tubal",
      "lower",
      "crest",
      "sweat",
      "cyber",
      "adore",
      "tardy",
      "swami",
      "notch",
      "groom",
      "roach",
      "hitch",
      "young",
      "align",
      "ready",
      "frond",
      "strap",
      "puree",
      "realm",
      "venue",
      "swarm",
      "offer",
      "seven",
      "dryer",
      "diary",
      "dryly",
      "drank",
      "acrid",
      "heady",
      "theta",
      "junto",
      "pixie",
      "quoth",
      "bonus",
      "shalt",
      "penne",
      "amend",
      "datum",
      "build",
      "piano",
      "shelf",
      "lodge",
      "suing",
      "rearm",
      "coral",
      "ramen",
      "worth",
      "psalm",
      "infer",
      "overt",
      "mayor",
      "ovoid",
      "glide",
      "usage",
      "poise",
      "randy",
      "chuck",
      "prank",
      "fishy",
      "tooth",
      "ether",
      "drove",
      "idler",
      "swath",
      "stint",
      "while",
      "begat",
      "apply",
      "slang",
      "tarot",
      "radar",
      "credo",
      "aware",
      "canon",
      "shift",
      "timer",
      "bylaw",
      "serum",
      "three",
      "steak",
      "iliac",
      "shirk",
      "blunt",
      "puppy",
      "penal",
      "joist",
      "bunny",
      "shape",
      "beget",
      "wheel",
      "adept",
      "stunt",
      "stole",
      "topaz",
      "chore",
      "fluke",
      "afoot",
      "bloat",
      "bully",
      "dense",
      "caper",
      "sneer",
      "boxer",
      "jumbo",
      "lunge",
      "space",
      "avail",
      "short",
      "slurp",
      "loyal",
      "flirt",
      "pizza",
      "conch",
      "tempo",
      "droop",
      "plate",
      "bible",
      "plunk",
      "afoul",
      "savoy",
      "steep",
      "agile",
      "stake",
      "dwell",
      "knave",
      "beard",
      "arose",
      "motif",
      "smash",
      "broil",
      "glare",
      "shove",
      "baggy",
      "mammy",
      "swamp",
      "along",
      "rugby",
      "wager",
      "quack",
      "squat",
      "snaky",
      "debit",
      "mange",
      "skate",
      "ninth",
      "joust",
      "tramp",
      "spurn",
      "medal",
      "micro",
      "rebel",
      "flank",
      "learn",
      "nadir",
      "maple",
      "comfy",
      "remit",
      "gruff",
      "ester",
      "least",
      "mogul",
      "fetch",
      "cause",
      "oaken",
      "aglow",
      "meaty",
      "gaffe",
      "shyly",
      "racer",
      "prowl",
      "thief",
      "stern",
      "poesy",
      "rocky",
      "tweet",
      "waist",
      "spire",
      "grope",
      "havoc",
      "patsy",
      "truly",
      "forty",
      "deity",
      "uncle",
      "swish",
      "giver",
      "preen",
      "bevel",
      "lemur",
      "draft",
      "slope",
      "annoy",
      "lingo",
      "bleak",
      "ditty",
      "curly",
      "cedar",
      "dirge",
      "grown",
      "horde",
      "drool",
      "shuck",
      "crypt",
      "cumin",
      "stock",
      "gravy",
      "locus",
      "wider",
      "breed",
      "quite",
      "chafe",
      "cache",
      "blimp",
      "deign",
      "fiend",
      "logic",
      "cheap",
      "elide",
      "rigid",
      "false",
      "renal",
      "pence",
      "rowdy",
      "shoot",
      "blaze",
      "envoy",
      "posse",
      "brief",
      "never",
      "abort",
      "mouse",
      "mucky",
      "sulky",
      "fiery",
      "media",
      "trunk",
      "yeast",
      "clear",
      "skunk",
      "scalp",
      "bitty",
      "cider",
      "koala",
      "duvet",
      "segue",
      "creme",
      "super",
      "grill",
      "after",
      "owner",
      "ember",
      "reach",
      "nobly",
      "empty",
      "speed",
      "gipsy",
      "recur",
      "smock",
      "dread",
      "merge",
      "burst",
      "kappa",
      "amity",
      "shaky",
      "hover",
      "carol",
      "snort",
      "synod",
      "faint",
      "haunt",
      "flour",
      "chair",
      "detox",
      "shrew",
      "tense",
      "plied",
      "quark",
      "burly",
      "novel",
      "waxen",
      "stoic",
      "jerky",
      "blitz",
      "beefy",
      "lyric",
      "hussy",
      "towel",
      "quilt",
      "below",
      "bingo",
      "wispy",
      "brash",
      "scone",
      "toast",
      "easel",
      "saucy",
      "value",
      "spice",
      "honor",
      "route",
      "sharp",
      "bawdy",
      "radii",
      "skull",
      "phony",
      "issue",
      "lager",
      "swell",
      "urine",
      "gassy",
      "trial",
      "flora",
      "upper",
      "latch",
      "wight",
      "brick",
      "retry",
      "holly",
      "decal",
      "grass",
      "shack",
      "dogma",
      "mover",
      "defer",
      "sober",
      "optic",
      "crier",
      "vying",
      "nomad",
      "flute",
      "hippo",
      "shark",
      "drier",
      "obese",
      "bugle",
      "tawny",
      "chalk",
      "feast",
      "ruddy",
      "pedal",
      "scarf",
      "cruel",
      "bleat",
      "tidal",
      "slush",
      "semen",
      "windy",
      "dusty",
      "sally",
      "igloo",
      "nerdy",
      "jewel",
      "shone",
      "whale",
      "hymen",
      "abuse",
      "fugue",
      "elbow",
      "crumb",
      "pansy",
      "welsh",
      "syrup",
      "terse",
      "suave",
      "gamut",
      "swung",
      "drake",
      "freed",
      "afire",
      "shirt",
      "grout",
      "oddly",
      "tithe",
      "plaid",
      "dummy",
      "broom",
      "blind",
      "torch",
      "enemy",
      "again",
      "tying",
      "pesky",
      "alter",
      "gazer",
      "noble",
      "ethos",
      "bride",
      "extol",
      "decor",
      "hobby",
      "beast",
      "idiom",
      "utter",
      "these",
      "sixth",
      "alarm",
      "erase",
      "elegy",
      "spunk",
      "piper",
      "scaly",
      "scold",
      "hefty",
      "chick",
      "sooty",
      "canal",
      "whiny",
      "slash",
      "quake",
      "joint",
      "swept",
      "prude",
      "heavy",
      "wield",
      "femme",
      "lasso",
      "maize",
      "shale",
      "screw",
      "spree",
      "smoky",
      "whiff",
      "scent",
      "glade",
      "spent",
      "prism",
      "stoke",
      "riper",
      "orbit",
      "cocoa",
      "guilt",
      "humus",
      "shush",
      "table",
      "smirk",
      "wrong",
      "noisy",
      "alert",
      "shiny",
      "elate",
      "resin",
      "whole",
      "hunch",
      "pixel",
      "polar",
      "hotel",
      "sword",
      "cleat",
      "mango",
      "rumba",
      "puffy",
      "filly",
      "billy",
      "leash",
      "clout",
      "dance",
      "ovate",
      "facet",
      "chili",
      "paint",
      "liner",
      "curio",
      "salty",
      "audio",
      "snake",
      "fable",
      "cloak",
      "navel",
      "spurt",
      "pesto",
      "balmy",
      "flash",
      "unwed",
      "early",
      "churn",
      "weedy",
      "stump",
      "lease",
      "witty",
      "wimpy",
      "spoof",
      "saner",
      "blend",
      "salsa",
      "thick",
      "warty",
      "manic",
      "blare",
      "squib",
      "spoon",
      "probe",
      "crepe",
      "knack",
      "force",
      "debut",
      "order",
      "haste",
      "teeth",
      "agent",
      "widen",
      "icily",
      "slice",
      "ingot",
      "clash",
      "juror",
      "blood",
      "abode",
      "throw",
      "unity",
      "pivot",
      "slept",
      "troop",
      "spare",
      "sewer",
      "parse",
      "morph",
      "cacti",
      "tacky",
      "spool",
      "demon",
      "moody",
      "annex",
      "begin",
      "fuzzy",
      "patch",
      "water",
      "lumpy",
      "admin",
      "omega",
      "limit",
      "tabby",
      "macho",
      "aisle",
      "skiff",
      "basis",
      "plank",
      "verge",
      "botch",
      "crawl",
      "lousy",
      "slain",
      "cubic",
      "raise",
      "wrack",
      "guide",
      "foist",
      "cameo",
      "under",
      "actor",
      "revue",
      "fraud",
      "harpy",
      "scoop",
      "climb",
      "refer",
      "olden",
      "clerk",
      "debar",
      "tally",
      "ethic",
      "cairn",
      "tulle",
      "ghoul",
      "hilly",
      "crude",
      "apart",
      "scale",
      "older",
      "plain",
      "sperm",
      "briny",
      "abbot",
      "rerun",
      "quest",
      "crisp",
      "bound",
      "befit",
      "drawn",
      "suite",
      "itchy",
      "cheer",
      "bagel",
      "guess",
      "broad",
      "axiom",
      "chard",
      "caput",
      "leant",
      "harsh",
      "curse",
      "proud",
      "swing",
      "opine",
      "taste",
      "lupus",
      "gumbo",
      "miner",
      "green",
      "chasm",
      "lipid",
      "topic",
      "armor",
      "brush",
      "crane",
      "mural",
      "abled",
      "habit",
      "bossy",
      "maker",
      "dusky",
      "dizzy",
      "lithe",
      "brook",
      "jazzy",
      "fifty",
      "sense",
      "giant",
      "surly",
      "legal",
      "fatal",
      "flunk",
      "began",
      "prune",
      "small",
      "slant",
      "scoff",
      "torus",
      "ninny",
      "covey",
      "viper",
      "taken",
      "moral",
      "vogue",
      "owing",
      "token",
      "entry",
      "booth",
      "voter",
      "chide",
      "elfin",
      "ebony",
      "neigh",
      "minim",
      "melon",
      "kneed",
      "decoy",
      "voila",
      "ankle",
      "arrow",
      "mushy",
      "tribe",
      "cease",
      "eager",
      "birth",
      "graph",
      "odder",
      "terra",
      "weird",
      "tried",
      "clack",
      "color",
      "rough",
      "weigh",
      "uncut",
      "ladle",
      "strip",
      "craft",
      "minus",
      "dicey",
      "titan",
      "lucid",
      "vicar",
      "dress",
      "ditch",
      "gypsy",
      "pasta",
      "taffy",
      "flame",
      "swoop",
      "aloof",
      "sight",
      "broke",
      "teary",
      "chart",
      "sixty",
      "wordy",
      "sheer",
      "leper",
      "nosey",
      "bulge",
      "savor",
      "clamp",
      "funky",
      "foamy",
      "toxic",
      "brand",
      "plumb",
      "dingy",
      "butte",
      "drill",
      "tripe",
      "bicep",
      "tenor",
      "krill",
      "worse",
      "drama",
      "hyena",
      "think",
      "ratio",
      "cobra",
      "basil",
      "scrum",
      "bused",
      "phone",
      "court",
      "camel",
      "proof",
      "heard",
      "angel",
      "petal",
      "pouty",
      "throb",
      "maybe",
      "fetal",
      "sprig",
      "spine",
      "shout",
      "cadet",
      "macro",
      "dodgy",
      "satyr",
      "rarer",
      "binge",
      "trend",
      "nutty",
      "leapt",
      "amiss",
      "split",
      "myrrh",
      "width",
      "sonar",
      "tower",
      "baron",
      "fever",
      "waver",
      "spark",
      "belie",
      "sloop",
      "expel",
      "smote",
      "baler",
      "above",
      "north",
      "wafer",
      "scant",
      "frill",
      "awash",
      "snack",
      "scowl",
      "frail",
      "drift",
      "limbo",
      "fence",
      "motel",
      "ounce",
      "wreak",
      "revel",
      "talon",
      "prior",
      "knelt",
      "cello",
      "flake",
      "debug",
      "anode",
      "crime",
      "salve",
      "scout",
      "imbue",
      "pinky",
      "stave",
      "vague",
      "chock",
      "fight",
      "video",
      "stone",
      "teach",
      "cleft",
      "frost",
      "prawn",
      "booty",
      "twist",
      "apnea",
      "stiff",
      "plaza",
      "ledge",
      "tweak",
      "board",
      "grant",
      "medic",
      "bacon",
      "cable",
      "brawl",
      "slunk",
      "raspy",
      "forum",
      "drone",
      "women",
      "mucus",
      "boast",
      "toddy",
      "coven",
      "tumor",
      "truer",
      "wrath",
      "stall",
      "steam",
      "axial",
      "purer",
      "daily",
      "trail",
      "niche",
      "mealy",
      "juice",
      "nylon",
      "plump",
      "merry",
      "flail",
      "papal",
      "wheat",
      "berry",
      "cower",
      "erect",
      "brute",
      "leggy",
      "snipe",
      "sinew",
      "skier",
      "penny",
      "jumpy",
      "rally",
      "umbra",
      "scary",
      "modem",
      "gross",
      "avian",
      "greed",
      "satin",
      "tonic",
      "parka",
      "sniff",
      "livid",
      "stark",
      "trump",
      "giddy",
      "reuse",
      "taboo",
      "avoid",
      "quote",
      "devil",
      "liken",
      "gloss",
      "gayer",
      "beret",
      "noise",
      "gland",
      "dealt",
      "sling",
      "rumor",
      "opera",
      "thigh",
      "tonga",
      "flare",
      "wound",
      "white",
      "bulky",
      "etude",
      "horse",
      "circa",
      "paddy",
      "inbox",
      "fizzy",
      "grain",
      "exert",
      "surge",
      "gleam",
      "belle",
      "salvo",
      "crush",
      "fruit",
      "sappy",
      "taker",
      "tract",
      "ovine",
      "spiky",
      "frank",
      "reedy",
      "filth",
      "spasm",
      "heave",
      "mambo",
      "right",
      "clank",
      "trust",
      "lumen",
      "borne",
      "spook",
      "sauce",
      "amber",
      "lathe",
      "carat",
      "corer",
      "dirty",
      "slyly",
      "affix",
      "alloy",
      "taint",
      "sheep",
      "kinky",
      "wooly",
      "mauve",
      "flung",
      "yacht",
      "fried",
      "quail",
      "brunt",
      "grimy",
      "curvy",
      "cagey",
      "rinse",
      "deuce",
      "state",
      "grasp",
      "milky",
      "bison",
      "graft",
      "sandy",
      "baste",
      "flask",
      "hedge",
      "girly",
      "swash",
      "boney",
      "coupe",
      "endow",
      "abhor",
      "welch",
      "blade",
      "tight",
      "geese",
      "miser",
      "mirth",
      "cloud",
      "cabal",
      "leech",
      "close",
      "tenth",
      "pecan",
      "droit",
      "grail",
      "clone",
      "guise",
      "ralph",
      "tango",
      "biddy",
      "smith",
      "mower",
      "payee",
      "serif",
      "drape",
      "fifth",
      "spank",
      "glaze",
      "allot",
      "truck",
      "kayak",
      "virus",
      "testy",
      "tepee",
      "fully",
      "zonal",
      "metro",
      "curry",
      "grand",
      "banjo",
      "axion",
      "bezel",
      "occur",
      "chain",
      "nasal",
      "gooey",
      "filer",
      "brace",
      "allay",
      "pubic",
      "raven",
      "plead",
      "gnash",
      "flaky",
      "munch",
      "dully",
      "eking",
      "thing",
      "slink",
      "hurry",
      "theft",
      "shorn",
      "pygmy",
      "ranch",
      "wring",
      "lemon",
      "shore",
      "mamma",
      "froze",
      "newer",
      "style",
      "moose",
      "antic",
      "drown",
      "vegan",
      "chess",
      "guppy",
      "union",
      "lever",
      "lorry",
      "image",
      "cabby",
      "druid",
      "exact",
      "truth",
      "dopey",
      "spear",
      "cried",
      "chime",
      "crony",
      "stunk",
      "timid",
      "batch",
      "gauge",
      "rotor",
      "crack",
      "curve",
      "latte",
      "witch",
      "bunch",
      "repel",
      "anvil",
      "soapy",
      "meter",
      "broth",
      "madly",
      "dried",
      "scene",
      "known",
      "magma",
      "roost",
      "woman",
      "thong",
      "punch",
      "pasty",
      "downy",
      "knead",
      "whirl",
      "rapid",
      "clang",
      "anger",
      "drive",
      "goofy",
      "email",
      "music",
      "stuff",
      "bleep",
      "rider",
      "mecca",
      "folio",
      "setup",
      "verso",
      "quash",
      "fauna",
      "gummy",
      "happy",
      "newly",
      "fussy",
      "relic",
      "guava",
      "ratty",
      "fudge",
      "femur",
      "chirp",
      "forte",
      "alibi",
      "whine",
      "petty",
      "golly",
      "plait",
      "fleck",
      "felon",
      "gourd",
      "brown",
      "thrum",
      "ficus",
      "stash",
      "decry",
      "wiser",
      "junta",
      "visor",
      "daunt",
      "scree",
      "impel",
      "await",
      "press",
      "whose",
      "turbo",
      "stoop",
      "speak",
      "mangy",
      "eying",
      "inlet",
      "crone",
      "pulse",
      "mossy",
      "staid",
      "hence",
      "pinch",
      "teddy",
      "sully",
      "snore",
      "ripen",
      "snowy",
      "attic",
      "going",
      "leach",
      "mouth",
      "hound",
      "clump",
      "tonal",
      "bigot",
      "peril",
      "piece",
      "blame",
      "haute",
      "spied",
      "undid",
      "intro",
      "basal",
      "rodeo",
      "guard",
      "steer",
      "loamy",
      "scamp",
      "scram",
      "manly",
      "hello",
      "vaunt",
      "organ",
      "feral",
      "knock",
      "extra",
      "condo",
      "adapt",
      "willy",
      "polka",
      "rayon",
      "skirt",
      "faith",
      "torso",
      "match",
      "mercy",
      "tepid",
      "sleek",
      "riser",
      "twixt",
      "peace",
      "flush",
      "catty",
      "login",
      "eject",
      "roger",
      "rival",
      "untie",
      "refit",
      "aorta",
      "adult",
      "judge",
      "rower",
      "artsy",
      "rural",
      "shave",
      "bobby",
      "eclat",
      "fella",
      "gaily",
      "harry",
      "hasty",
      "hydro",
      "liege",
      "octal",
      "ombre",
      "payer",
      "sooth",
      "unset",
      "unlit",
      "vomit",
      "fanny",
      "fetus",
      "butch",
      "stalk",
      "flack",
      "widow",
      "augur",
    ],
    O = [
      "aahed",
      "aalii",
      "aargh",
      "aarti",
      "abaca",
      "abaci",
      "abacs",
      "abaft",
      "abaka",
      "abamp",
      "aband",
      "abash",
      "abask",
      "abaya",
      "abbas",
      "abbed",
      "abbes",
      "abcee",
      "abeam",
      "abear",
      "abele",
      "abers",
      "abets",
      "abies",
      "abler",
      "ables",
      "ablet",
      "ablow",
      "abmho",
      "abohm",
      "aboil",
      "aboma",
      "aboon",
      "abord",
      "abore",
      "abram",
      "abray",
      "abrim",
      "abrin",
      "abris",
      "absey",
      "absit",
      "abuna",
      "abune",
      "abuts",
      "abuzz",
      "abyes",
      "abysm",
      "acais",
      "acari",
      "accas",
      "accoy",
      "acerb",
      "acers",
      "aceta",
      "achar",
      "ached",
      "aches",
      "achoo",
      "acids",
      "acidy",
      "acing",
      "acini",
      "ackee",
      "acker",
      "acmes",
      "acmic",
      "acned",
      "acnes",
      "acock",
      "acold",
      "acred",
      "acres",
      "acros",
      "acted",
      "actin",
      "acton",
      "acyls",
      "adaws",
      "adays",
      "adbot",
      "addax",
      "added",
      "adder",
      "addio",
      "addle",
      "adeem",
      "adhan",
      "adieu",
      "adios",
      "adits",
      "adman",
      "admen",
      "admix",
      "adobo",
      "adown",
      "adoze",
      "adrad",
      "adred",
      "adsum",
      "aduki",
      "adunc",
      "adust",
      "advew",
      "adyta",
      "adzed",
      "adzes",
      "aecia",
      "aedes",
      "aegis",
      "aeons",
      "aerie",
      "aeros",
      "aesir",
      "afald",
      "afara",
      "afars",
      "afear",
      "aflaj",
      "afore",
      "afrit",
      "afros",
      "agama",
      "agami",
      "agars",
      "agast",
      "agave",
      "agaze",
      "agene",
      "agers",
      "agger",
      "aggie",
      "aggri",
      "aggro",
      "aggry",
      "aghas",
      "agila",
      "agios",
      "agism",
      "agist",
      "agita",
      "aglee",
      "aglet",
      "agley",
      "agloo",
      "aglus",
      "agmas",
      "agoge",
      "agone",
      "agons",
      "agood",
      "agora",
      "agria",
      "agrin",
      "agros",
      "agued",
      "agues",
      "aguna",
      "aguti",
      "aheap",
      "ahent",
      "ahigh",
      "ahind",
      "ahing",
      "ahint",
      "ahold",
      "ahull",
      "ahuru",
      "aidas",
      "aided",
      "aides",
      "aidoi",
      "aidos",
      "aiery",
      "aigas",
      "aight",
      "ailed",
      "aimed",
      "aimer",
      "ainee",
      "ainga",
      "aioli",
      "aired",
      "airer",
      "airns",
      "airth",
      "airts",
      "aitch",
      "aitus",
      "aiver",
      "aiyee",
      "aizle",
      "ajies",
      "ajiva",
      "ajuga",
      "ajwan",
      "akees",
      "akela",
      "akene",
      "aking",
      "akita",
      "akkas",
      "alaap",
      "alack",
      "alamo",
      "aland",
      "alane",
      "alang",
      "alans",
      "alant",
      "alapa",
      "alaps",
      "alary",
      "alate",
      "alays",
      "albas",
      "albee",
      "alcid",
      "alcos",
      "aldea",
      "alder",
      "aldol",
      "aleck",
      "alecs",
      "alefs",
      "aleft",
      "aleph",
      "alews",
      "aleye",
      "alfas",
      "algal",
      "algas",
      "algid",
      "algin",
      "algor",
      "algum",
      "alias",
      "alifs",
      "aline",
      "alist",
      "aliya",
      "alkie",
      "alkos",
      "alkyd",
      "alkyl",
      "allee",
      "allel",
      "allis",
      "allod",
      "allyl",
      "almah",
      "almas",
      "almeh",
      "almes",
      "almud",
      "almug",
      "alods",
      "aloed",
      "aloes",
      "aloha",
      "aloin",
      "aloos",
      "alowe",
      "altho",
      "altos",
      "alula",
      "alums",
      "alure",
      "alvar",
      "alway",
      "amahs",
      "amain",
      "amate",
      "amaut",
      "amban",
      "ambit",
      "ambos",
      "ambry",
      "ameba",
      "ameer",
      "amene",
      "amens",
      "ament",
      "amias",
      "amice",
      "amici",
      "amide",
      "amido",
      "amids",
      "amies",
      "amiga",
      "amigo",
      "amine",
      "amino",
      "amins",
      "amirs",
      "amlas",
      "amman",
      "ammon",
      "ammos",
      "amnia",
      "amnic",
      "amnio",
      "amoks",
      "amole",
      "amort",
      "amour",
      "amove",
      "amowt",
      "amped",
      "ampul",
      "amrit",
      "amuck",
      "amyls",
      "anana",
      "anata",
      "ancho",
      "ancle",
      "ancon",
      "andro",
      "anear",
      "anele",
      "anent",
      "angas",
      "anglo",
      "anigh",
      "anile",
      "anils",
      "anima",
      "animi",
      "anion",
      "anise",
      "anker",
      "ankhs",
      "ankus",
      "anlas",
      "annal",
      "annas",
      "annat",
      "anoas",
      "anole",
      "anomy",
      "ansae",
      "antae",
      "antar",
      "antas",
      "anted",
      "antes",
      "antis",
      "antra",
      "antre",
      "antsy",
      "anura",
      "anyon",
      "apace",
      "apage",
      "apaid",
      "apayd",
      "apays",
      "apeak",
      "apeek",
      "apers",
      "apert",
      "apery",
      "apgar",
      "aphis",
      "apian",
      "apiol",
      "apish",
      "apism",
      "apode",
      "apods",
      "apoop",
      "aport",
      "appal",
      "appay",
      "appel",
      "appro",
      "appui",
      "appuy",
      "apres",
      "apses",
      "apsis",
      "apsos",
      "apted",
      "apter",
      "aquae",
      "aquas",
      "araba",
      "araks",
      "arame",
      "arars",
      "arbas",
      "arced",
      "archi",
      "arcos",
      "arcus",
      "ardeb",
      "ardri",
      "aread",
      "areae",
      "areal",
      "arear",
      "areas",
      "areca",
      "aredd",
      "arede",
      "arefy",
      "areic",
      "arene",
      "arepa",
      "arere",
      "arete",
      "arets",
      "arett",
      "argal",
      "argan",
      "argil",
      "argle",
      "argol",
      "argon",
      "argot",
      "argus",
      "arhat",
      "arias",
      "ariel",
      "ariki",
      "arils",
      "ariot",
      "arish",
      "arked",
      "arled",
      "arles",
      "armed",
      "armer",
      "armet",
      "armil",
      "arnas",
      "arnut",
      "aroba",
      "aroha",
      "aroid",
      "arpas",
      "arpen",
      "arrah",
      "arras",
      "arret",
      "arris",
      "arroz",
      "arsed",
      "arses",
      "arsey",
      "arsis",
      "artal",
      "artel",
      "artic",
      "artis",
      "aruhe",
      "arums",
      "arval",
      "arvee",
      "arvos",
      "aryls",
      "asana",
      "ascon",
      "ascus",
      "asdic",
      "ashed",
      "ashes",
      "ashet",
      "asked",
      "asker",
      "askoi",
      "askos",
      "aspen",
      "asper",
      "aspic",
      "aspie",
      "aspis",
      "aspro",
      "assai",
      "assam",
      "asses",
      "assez",
      "assot",
      "aster",
      "astir",
      "astun",
      "asura",
      "asway",
      "aswim",
      "asyla",
      "ataps",
      "ataxy",
      "atigi",
      "atilt",
      "atimy",
      "atlas",
      "atman",
      "atmas",
      "atmos",
      "atocs",
      "atoke",
      "atoks",
      "atoms",
      "atomy",
      "atony",
      "atopy",
      "atria",
      "atrip",
      "attap",
      "attar",
      "atuas",
      "audad",
      "auger",
      "aught",
      "aulas",
      "aulic",
      "auloi",
      "aulos",
      "aumil",
      "aunes",
      "aunts",
      "aurae",
      "aural",
      "aurar",
      "auras",
      "aurei",
      "aures",
      "auric",
      "auris",
      "aurum",
      "autos",
      "auxin",
      "avale",
      "avant",
      "avast",
      "avels",
      "avens",
      "avers",
      "avgas",
      "avine",
      "avion",
      "avise",
      "aviso",
      "avize",
      "avows",
      "avyze",
      "awarn",
      "awato",
      "awave",
      "aways",
      "awdls",
      "aweel",
      "aweto",
      "awing",
      "awmry",
      "awned",
      "awner",
      "awols",
      "awork",
      "axels",
      "axile",
      "axils",
      "axing",
      "axite",
      "axled",
      "axles",
      "axman",
      "axmen",
      "axoid",
      "axone",
      "axons",
      "ayahs",
      "ayaya",
      "ayelp",
      "aygre",
      "ayins",
      "ayont",
      "ayres",
      "ayrie",
      "azans",
      "azide",
      "azido",
      "azine",
      "azlon",
      "azoic",
      "azole",
      "azons",
      "azote",
      "azoth",
      "azuki",
      "azurn",
      "azury",
      "azygy",
      "azyme",
      "azyms",
      "baaed",
      "baals",
      "babas",
      "babel",
      "babes",
      "babka",
      "baboo",
      "babul",
      "babus",
      "bacca",
      "bacco",
      "baccy",
      "bacha",
      "bachs",
      "backs",
      "baddy",
      "baels",
      "baffs",
      "baffy",
      "bafts",
      "baghs",
      "bagie",
      "bahts",
      "bahus",
      "bahut",
      "bails",
      "bairn",
      "baisa",
      "baith",
      "baits",
      "baiza",
      "baize",
      "bajan",
      "bajra",
      "bajri",
      "bajus",
      "baked",
      "baken",
      "bakes",
      "bakra",
      "balas",
      "balds",
      "baldy",
      "baled",
      "bales",
      "balks",
      "balky",
      "balls",
      "bally",
      "balms",
      "baloo",
      "balsa",
      "balti",
      "balun",
      "balus",
      "bambi",
      "banak",
      "banco",
      "bancs",
      "banda",
      "bandh",
      "bands",
      "bandy",
      "baned",
      "banes",
      "bangs",
      "bania",
      "banks",
      "banns",
      "bants",
      "bantu",
      "banty",
      "banya",
      "bapus",
      "barbe",
      "barbs",
      "barby",
      "barca",
      "barde",
      "bardo",
      "bards",
      "bardy",
      "bared",
      "barer",
      "bares",
      "barfi",
      "barfs",
      "baric",
      "barks",
      "barky",
      "barms",
      "barmy",
      "barns",
      "barny",
      "barps",
      "barra",
      "barre",
      "barro",
      "barry",
      "barye",
      "basan",
      "based",
      "basen",
      "baser",
      "bases",
      "basho",
      "basij",
      "basks",
      "bason",
      "basse",
      "bassi",
      "basso",
      "bassy",
      "basta",
      "basti",
      "basto",
      "basts",
      "bated",
      "bates",
      "baths",
      "batik",
      "batta",
      "batts",
      "battu",
      "bauds",
      "bauks",
      "baulk",
      "baurs",
      "bavin",
      "bawds",
      "bawks",
      "bawls",
      "bawns",
      "bawrs",
      "bawty",
      "bayed",
      "bayer",
      "bayes",
      "bayle",
      "bayts",
      "bazar",
      "bazoo",
      "beads",
      "beaks",
      "beaky",
      "beals",
      "beams",
      "beamy",
      "beano",
      "beans",
      "beany",
      "beare",
      "bears",
      "beath",
      "beats",
      "beaty",
      "beaus",
      "beaut",
      "beaux",
      "bebop",
      "becap",
      "becke",
      "becks",
      "bedad",
      "bedel",
      "bedes",
      "bedew",
      "bedim",
      "bedye",
      "beedi",
      "beefs",
      "beeps",
      "beers",
      "beery",
      "beets",
      "befog",
      "begad",
      "begar",
      "begem",
      "begot",
      "begum",
      "beige",
      "beigy",
      "beins",
      "bekah",
      "belah",
      "belar",
      "belay",
      "belee",
      "belga",
      "bells",
      "belon",
      "belts",
      "bemad",
      "bemas",
      "bemix",
      "bemud",
      "bends",
      "bendy",
      "benes",
      "benet",
      "benga",
      "benis",
      "benne",
      "benni",
      "benny",
      "bento",
      "bents",
      "benty",
      "bepat",
      "beray",
      "beres",
      "bergs",
      "berko",
      "berks",
      "berme",
      "berms",
      "berob",
      "beryl",
      "besat",
      "besaw",
      "besee",
      "beses",
      "besit",
      "besom",
      "besot",
      "besti",
      "bests",
      "betas",
      "beted",
      "betes",
      "beths",
      "betid",
      "beton",
      "betta",
      "betty",
      "bever",
      "bevor",
      "bevue",
      "bevvy",
      "bewet",
      "bewig",
      "bezes",
      "bezil",
      "bezzy",
      "bhais",
      "bhaji",
      "bhang",
      "bhats",
      "bhels",
      "bhoot",
      "bhuna",
      "bhuts",
      "biach",
      "biali",
      "bialy",
      "bibbs",
      "bibes",
      "biccy",
      "bices",
      "bided",
      "bider",
      "bides",
      "bidet",
      "bidis",
      "bidon",
      "bield",
      "biers",
      "biffo",
      "biffs",
      "biffy",
      "bifid",
      "bigae",
      "biggs",
      "biggy",
      "bigha",
      "bight",
      "bigly",
      "bigos",
      "bijou",
      "biked",
      "biker",
      "bikes",
      "bikie",
      "bilbo",
      "bilby",
      "biled",
      "biles",
      "bilgy",
      "bilks",
      "bills",
      "bimah",
      "bimas",
      "bimbo",
      "binal",
      "bindi",
      "binds",
      "biner",
      "bines",
      "bings",
      "bingy",
      "binit",
      "binks",
      "bints",
      "biogs",
      "biont",
      "biota",
      "biped",
      "bipod",
      "birds",
      "birks",
      "birle",
      "birls",
      "biros",
      "birrs",
      "birse",
      "birsy",
      "bises",
      "bisks",
      "bisom",
      "bitch",
      "biter",
      "bites",
      "bitos",
      "bitou",
      "bitsy",
      "bitte",
      "bitts",
      "bivia",
      "bivvy",
      "bizes",
      "bizzo",
      "bizzy",
      "blabs",
      "blads",
      "blady",
      "blaer",
      "blaes",
      "blaff",
      "blags",
      "blahs",
      "blain",
      "blams",
      "blart",
      "blase",
      "blash",
      "blate",
      "blats",
      "blatt",
      "blaud",
      "blawn",
      "blaws",
      "blays",
      "blear",
      "blebs",
      "blech",
      "blees",
      "blent",
      "blert",
      "blest",
      "blets",
      "bleys",
      "blimy",
      "bling",
      "blini",
      "blins",
      "bliny",
      "blips",
      "blist",
      "blite",
      "blits",
      "blive",
      "blobs",
      "blocs",
      "blogs",
      "blook",
      "bloop",
      "blore",
      "blots",
      "blows",
      "blowy",
      "blubs",
      "blude",
      "bluds",
      "bludy",
      "blued",
      "blues",
      "bluet",
      "bluey",
      "bluid",
      "blume",
      "blunk",
      "blurs",
      "blype",
      "boabs",
      "boaks",
      "boars",
      "boart",
      "boats",
      "bobac",
      "bobak",
      "bobas",
      "bobol",
      "bobos",
      "bocca",
      "bocce",
      "bocci",
      "boche",
      "bocks",
      "boded",
      "bodes",
      "bodge",
      "bodhi",
      "bodle",
      "boeps",
      "boets",
      "boeuf",
      "boffo",
      "boffs",
      "bogan",
      "bogey",
      "boggy",
      "bogie",
      "bogle",
      "bogue",
      "bogus",
      "bohea",
      "bohos",
      "boils",
      "boing",
      "boink",
      "boite",
      "boked",
      "bokeh",
      "bokes",
      "bokos",
      "bolar",
      "bolas",
      "bolds",
      "boles",
      "bolix",
      "bolls",
      "bolos",
      "bolts",
      "bolus",
      "bomas",
      "bombe",
      "bombo",
      "bombs",
      "bonce",
      "bonds",
      "boned",
      "boner",
      "bones",
      "bongs",
      "bonie",
      "bonks",
      "bonne",
      "bonny",
      "bonza",
      "bonze",
      "booai",
      "booay",
      "boobs",
      "boody",
      "booed",
      "boofy",
      "boogy",
      "boohs",
      "books",
      "booky",
      "bools",
      "booms",
      "boomy",
      "boong",
      "boons",
      "boord",
      "boors",
      "boose",
      "boots",
      "boppy",
      "borak",
      "boral",
      "boras",
      "borde",
      "bords",
      "bored",
      "boree",
      "borel",
      "borer",
      "bores",
      "borgo",
      "boric",
      "borks",
      "borms",
      "borna",
      "boron",
      "borts",
      "borty",
      "bortz",
      "bosie",
      "bosks",
      "bosky",
      "boson",
      "bosun",
      "botas",
      "botel",
      "botes",
      "bothy",
      "botte",
      "botts",
      "botty",
      "bouge",
      "bouks",
      "boult",
      "bouns",
      "bourd",
      "bourg",
      "bourn",
      "bouse",
      "bousy",
      "bouts",
      "bovid",
      "bowat",
      "bowed",
      "bower",
      "bowes",
      "bowet",
      "bowie",
      "bowls",
      "bowne",
      "bowrs",
      "bowse",
      "boxed",
      "boxen",
      "boxes",
      "boxla",
      "boxty",
      "boyar",
      "boyau",
      "boyed",
      "boyfs",
      "boygs",
      "boyla",
      "boyos",
      "boysy",
      "bozos",
      "braai",
      "brach",
      "brack",
      "bract",
      "brads",
      "braes",
      "brags",
      "brail",
      "braks",
      "braky",
      "brame",
      "brane",
      "brank",
      "brans",
      "brant",
      "brast",
      "brats",
      "brava",
      "bravi",
      "braws",
      "braxy",
      "brays",
      "braza",
      "braze",
      "bream",
      "brede",
      "breds",
      "breem",
      "breer",
      "brees",
      "breid",
      "breis",
      "breme",
      "brens",
      "brent",
      "brere",
      "brers",
      "breve",
      "brews",
      "breys",
      "brier",
      "bries",
      "brigs",
      "briki",
      "briks",
      "brill",
      "brims",
      "brins",
      "brios",
      "brise",
      "briss",
      "brith",
      "brits",
      "britt",
      "brize",
      "broch",
      "brock",
      "brods",
      "brogh",
      "brogs",
      "brome",
      "bromo",
      "bronc",
      "brond",
      "brool",
      "broos",
      "brose",
      "brosy",
      "brows",
      "brugh",
      "bruin",
      "bruit",
      "brule",
      "brume",
      "brung",
      "brusk",
      "brust",
      "bruts",
      "buats",
      "buaze",
      "bubal",
      "bubas",
      "bubba",
      "bubbe",
      "bubby",
      "bubus",
      "buchu",
      "bucko",
      "bucks",
      "bucku",
      "budas",
      "budis",
      "budos",
      "buffa",
      "buffe",
      "buffi",
      "buffo",
      "buffs",
      "buffy",
      "bufos",
      "bufty",
      "buhls",
      "buhrs",
      "buiks",
      "buist",
      "bukes",
      "bulbs",
      "bulgy",
      "bulks",
      "bulla",
      "bulls",
      "bulse",
      "bumbo",
      "bumfs",
      "bumph",
      "bumps",
      "bumpy",
      "bunas",
      "bunce",
      "bunco",
      "bunde",
      "bundh",
      "bunds",
      "bundt",
      "bundu",
      "bundy",
      "bungs",
      "bungy",
      "bunia",
      "bunje",
      "bunjy",
      "bunko",
      "bunks",
      "bunns",
      "bunts",
      "bunty",
      "bunya",
      "buoys",
      "buppy",
      "buran",
      "buras",
      "burbs",
      "burds",
      "buret",
      "burfi",
      "burgh",
      "burgs",
      "burin",
      "burka",
      "burke",
      "burks",
      "burls",
      "burns",
      "buroo",
      "burps",
      "burqa",
      "burro",
      "burrs",
      "burry",
      "bursa",
      "burse",
      "busby",
      "buses",
      "busks",
      "busky",
      "bussu",
      "busti",
      "busts",
      "busty",
      "buteo",
      "butes",
      "butle",
      "butoh",
      "butts",
      "butty",
      "butut",
      "butyl",
      "buzzy",
      "bwana",
      "bwazi",
      "byded",
      "bydes",
      "byked",
      "bykes",
      "byres",
      "byrls",
      "byssi",
      "bytes",
      "byway",
      "caaed",
      "cabas",
      "caber",
      "cabob",
      "caboc",
      "cabre",
      "cacas",
      "cacks",
      "cacky",
      "cadee",
      "cades",
      "cadge",
      "cadgy",
      "cadie",
      "cadis",
      "cadre",
      "caeca",
      "caese",
      "cafes",
      "caffs",
      "caged",
      "cager",
      "cages",
      "cagot",
      "cahow",
      "caids",
      "cains",
      "caird",
      "cajon",
      "cajun",
      "caked",
      "cakes",
      "cakey",
      "calfs",
      "calid",
      "calif",
      "calix",
      "calks",
      "calla",
      "calls",
      "calms",
      "calmy",
      "calos",
      "calpa",
      "calps",
      "calve",
      "calyx",
      "caman",
      "camas",
      "cames",
      "camis",
      "camos",
      "campi",
      "campo",
      "camps",
      "campy",
      "camus",
      "caned",
      "caneh",
      "caner",
      "canes",
      "cangs",
      "canid",
      "canna",
      "canns",
      "canso",
      "canst",
      "canto",
      "cants",
      "canty",
      "capas",
      "caped",
      "capes",
      "capex",
      "caphs",
      "capiz",
      "caple",
      "capon",
      "capos",
      "capot",
      "capri",
      "capul",
      "carap",
      "carbo",
      "carbs",
      "carby",
      "cardi",
      "cards",
      "cardy",
      "cared",
      "carer",
      "cares",
      "caret",
      "carex",
      "carks",
      "carle",
      "carls",
      "carns",
      "carny",
      "carob",
      "carom",
      "caron",
      "carpi",
      "carps",
      "carrs",
      "carse",
      "carta",
      "carte",
      "carts",
      "carvy",
      "casas",
      "casco",
      "cased",
      "cases",
      "casks",
      "casky",
      "casts",
      "casus",
      "cates",
      "cauda",
      "cauks",
      "cauld",
      "cauls",
      "caums",
      "caups",
      "cauri",
      "causa",
      "cavas",
      "caved",
      "cavel",
      "caver",
      "caves",
      "cavie",
      "cawed",
      "cawks",
      "caxon",
      "ceaze",
      "cebid",
      "cecal",
      "cecum",
      "ceded",
      "ceder",
      "cedes",
      "cedis",
      "ceiba",
      "ceili",
      "ceils",
      "celeb",
      "cella",
      "celli",
      "cells",
      "celom",
      "celts",
      "cense",
      "cento",
      "cents",
      "centu",
      "ceorl",
      "cepes",
      "cerci",
      "cered",
      "ceres",
      "cerge",
      "ceria",
      "ceric",
      "cerne",
      "ceroc",
      "ceros",
      "certs",
      "certy",
      "cesse",
      "cesta",
      "cesti",
      "cetes",
      "cetyl",
      "cezve",
      "chace",
      "chack",
      "chaco",
      "chado",
      "chads",
      "chaft",
      "chais",
      "chals",
      "chams",
      "chana",
      "chang",
      "chank",
      "chape",
      "chaps",
      "chapt",
      "chara",
      "chare",
      "chark",
      "charr",
      "chars",
      "chary",
      "chats",
      "chave",
      "chavs",
      "chawk",
      "chaws",
      "chaya",
      "chays",
      "cheep",
      "chefs",
      "cheka",
      "chela",
      "chelp",
      "chemo",
      "chems",
      "chere",
      "chert",
      "cheth",
      "chevy",
      "chews",
      "chewy",
      "chiao",
      "chias",
      "chibs",
      "chica",
      "chich",
      "chico",
      "chics",
      "chiel",
      "chiks",
      "chile",
      "chimb",
      "chimo",
      "chimp",
      "chine",
      "ching",
      "chink",
      "chino",
      "chins",
      "chips",
      "chirk",
      "chirl",
      "chirm",
      "chiro",
      "chirr",
      "chirt",
      "chiru",
      "chits",
      "chive",
      "chivs",
      "chivy",
      "chizz",
      "choco",
      "chocs",
      "chode",
      "chogs",
      "choil",
      "choko",
      "choky",
      "chola",
      "choli",
      "cholo",
      "chomp",
      "chons",
      "choof",
      "chook",
      "choom",
      "choon",
      "chops",
      "chota",
      "chott",
      "chout",
      "choux",
      "chowk",
      "chows",
      "chubs",
      "chufa",
      "chuff",
      "chugs",
      "chums",
      "churl",
      "churr",
      "chuse",
      "chuts",
      "chyle",
      "chyme",
      "chynd",
      "cibol",
      "cided",
      "cides",
      "ciels",
      "ciggy",
      "cilia",
      "cills",
      "cimar",
      "cimex",
      "cinct",
      "cines",
      "cinqs",
      "cions",
      "cippi",
      "circs",
      "cires",
      "cirls",
      "cirri",
      "cisco",
      "cissy",
      "cists",
      "cital",
      "cited",
      "citer",
      "cites",
      "cives",
      "civet",
      "civie",
      "civvy",
      "clach",
      "clade",
      "clads",
      "claes",
      "clags",
      "clame",
      "clams",
      "clans",
      "claps",
      "clapt",
      "claro",
      "clart",
      "clary",
      "clast",
      "clats",
      "claut",
      "clave",
      "clavi",
      "claws",
      "clays",
      "cleck",
      "cleek",
      "cleep",
      "clefs",
      "clegs",
      "cleik",
      "clems",
      "clepe",
      "clept",
      "cleve",
      "clews",
      "clied",
      "clies",
      "clift",
      "clime",
      "cline",
      "clint",
      "clipe",
      "clips",
      "clipt",
      "clits",
      "cloam",
      "clods",
      "cloff",
      "clogs",
      "cloke",
      "clomb",
      "clomp",
      "clonk",
      "clons",
      "cloop",
      "cloot",
      "clops",
      "clote",
      "clots",
      "clour",
      "clous",
      "clows",
      "cloye",
      "cloys",
      "cloze",
      "clubs",
      "clues",
      "cluey",
      "clunk",
      "clype",
      "cnida",
      "coact",
      "coady",
      "coala",
      "coals",
      "coaly",
      "coapt",
      "coarb",
      "coate",
      "coati",
      "coats",
      "cobbs",
      "cobby",
      "cobia",
      "coble",
      "cobza",
      "cocas",
      "cocci",
      "cocco",
      "cocks",
      "cocky",
      "cocos",
      "codas",
      "codec",
      "coded",
      "coden",
      "coder",
      "codes",
      "codex",
      "codon",
      "coeds",
      "coffs",
      "cogie",
      "cogon",
      "cogue",
      "cohab",
      "cohen",
      "cohoe",
      "cohog",
      "cohos",
      "coifs",
      "coign",
      "coils",
      "coins",
      "coirs",
      "coits",
      "coked",
      "cokes",
      "colas",
      "colby",
      "colds",
      "coled",
      "coles",
      "coley",
      "colic",
      "colin",
      "colls",
      "colly",
      "colog",
      "colts",
      "colza",
      "comae",
      "comal",
      "comas",
      "combe",
      "combi",
      "combo",
      "combs",
      "comby",
      "comer",
      "comes",
      "comix",
      "commo",
      "comms",
      "commy",
      "compo",
      "comps",
      "compt",
      "comte",
      "comus",
      "coned",
      "cones",
      "coney",
      "confs",
      "conga",
      "conge",
      "congo",
      "conia",
      "conin",
      "conks",
      "conky",
      "conne",
      "conns",
      "conte",
      "conto",
      "conus",
      "convo",
      "cooch",
      "cooed",
      "cooee",
      "cooer",
      "cooey",
      "coofs",
      "cooks",
      "cooky",
      "cools",
      "cooly",
      "coomb",
      "cooms",
      "coomy",
      "coons",
      "coops",
      "coopt",
      "coost",
      "coots",
      "cooze",
      "copal",
      "copay",
      "coped",
      "copen",
      "coper",
      "copes",
      "coppy",
      "copra",
      "copsy",
      "coqui",
      "coram",
      "corbe",
      "corby",
      "cords",
      "cored",
      "cores",
      "corey",
      "corgi",
      "coria",
      "corks",
      "corky",
      "corms",
      "corni",
      "corno",
      "corns",
      "cornu",
      "corps",
      "corse",
      "corso",
      "cosec",
      "cosed",
      "coses",
      "coset",
      "cosey",
      "cosie",
      "costa",
      "coste",
      "costs",
      "cotan",
      "coted",
      "cotes",
      "coths",
      "cotta",
      "cotts",
      "coude",
      "coups",
      "courb",
      "courd",
      "coure",
      "cours",
      "couta",
      "couth",
      "coved",
      "coves",
      "covin",
      "cowal",
      "cowan",
      "cowed",
      "cowks",
      "cowls",
      "cowps",
      "cowry",
      "coxae",
      "coxal",
      "coxed",
      "coxes",
      "coxib",
      "coyau",
      "coyed",
      "coyer",
      "coypu",
      "cozed",
      "cozen",
      "cozes",
      "cozey",
      "cozie",
      "craal",
      "crabs",
      "crags",
      "craic",
      "craig",
      "crake",
      "crame",
      "crams",
      "crans",
      "crape",
      "craps",
      "crapy",
      "crare",
      "craws",
      "crays",
      "creds",
      "creel",
      "crees",
      "crems",
      "crena",
      "creps",
      "crepy",
      "crewe",
      "crews",
      "crias",
      "cribs",
      "cries",
      "crims",
      "crine",
      "crios",
      "cripe",
      "crips",
      "crise",
      "crith",
      "crits",
      "croci",
      "crocs",
      "croft",
      "crogs",
      "cromb",
      "crome",
      "cronk",
      "crons",
      "crool",
      "croon",
      "crops",
      "crore",
      "crost",
      "crout",
      "crows",
      "croze",
      "cruck",
      "crudo",
      "cruds",
      "crudy",
      "crues",
      "cruet",
      "cruft",
      "crunk",
      "cruor",
      "crura",
      "cruse",
      "crusy",
      "cruve",
      "crwth",
      "cryer",
      "ctene",
      "cubby",
      "cubeb",
      "cubed",
      "cuber",
      "cubes",
      "cubit",
      "cuddy",
      "cuffo",
      "cuffs",
      "cuifs",
      "cuing",
      "cuish",
      "cuits",
      "cukes",
      "culch",
      "culet",
      "culex",
      "culls",
      "cully",
      "culms",
      "culpa",
      "culti",
      "cults",
      "culty",
      "cumec",
      "cundy",
      "cunei",
      "cunit",
      "cunts",
      "cupel",
      "cupid",
      "cuppa",
      "cuppy",
      "curat",
      "curbs",
      "curch",
      "curds",
      "curdy",
      "cured",
      "curer",
      "cures",
      "curet",
      "curfs",
      "curia",
      "curie",
      "curli",
      "curls",
      "curns",
      "curny",
      "currs",
      "cursi",
      "curst",
      "cusec",
      "cushy",
      "cusks",
      "cusps",
      "cuspy",
      "cusso",
      "cusum",
      "cutch",
      "cuter",
      "cutes",
      "cutey",
      "cutin",
      "cutis",
      "cutto",
      "cutty",
      "cutup",
      "cuvee",
      "cuzes",
      "cwtch",
      "cyano",
      "cyans",
      "cycad",
      "cycas",
      "cyclo",
      "cyder",
      "cylix",
      "cymae",
      "cymar",
      "cymas",
      "cymes",
      "cymol",
      "cysts",
      "cytes",
      "cyton",
      "czars",
      "daals",
      "dabba",
      "daces",
      "dacha",
      "dacks",
      "dadah",
      "dadas",
      "dados",
      "daffs",
      "daffy",
      "dagga",
      "daggy",
      "dagos",
      "dahls",
      "daiko",
      "daine",
      "daint",
      "daker",
      "daled",
      "dales",
      "dalis",
      "dalle",
      "dalts",
      "daman",
      "damar",
      "dames",
      "damme",
      "damns",
      "damps",
      "dampy",
      "dancy",
      "dangs",
      "danio",
      "danks",
      "danny",
      "dants",
      "daraf",
      "darbs",
      "darcy",
      "dared",
      "darer",
      "dares",
      "darga",
      "dargs",
      "daric",
      "daris",
      "darks",
      "darky",
      "darns",
      "darre",
      "darts",
      "darzi",
      "dashi",
      "dashy",
      "datal",
      "dated",
      "dater",
      "dates",
      "datos",
      "datto",
      "daube",
      "daubs",
      "dauby",
      "dauds",
      "dault",
      "daurs",
      "dauts",
      "daven",
      "davit",
      "dawah",
      "dawds",
      "dawed",
      "dawen",
      "dawks",
      "dawns",
      "dawts",
      "dayan",
      "daych",
      "daynt",
      "dazed",
      "dazer",
      "dazes",
      "deads",
      "deair",
      "deals",
      "deans",
      "deare",
      "dearn",
      "dears",
      "deary",
      "deash",
      "deave",
      "deaws",
      "deawy",
      "debag",
      "debby",
      "debel",
      "debes",
      "debts",
      "debud",
      "debur",
      "debus",
      "debye",
      "decad",
      "decaf",
      "decan",
      "decko",
      "decks",
      "decos",
      "dedal",
      "deeds",
      "deedy",
      "deely",
      "deems",
      "deens",
      "deeps",
      "deere",
      "deers",
      "deets",
      "deeve",
      "deevs",
      "defat",
      "deffo",
      "defis",
      "defog",
      "degas",
      "degum",
      "degus",
      "deice",
      "deids",
      "deify",
      "deils",
      "deism",
      "deist",
      "deked",
      "dekes",
      "dekko",
      "deled",
      "deles",
      "delfs",
      "delft",
      "delis",
      "dells",
      "delly",
      "delos",
      "delph",
      "delts",
      "deman",
      "demes",
      "demic",
      "demit",
      "demob",
      "demoi",
      "demos",
      "dempt",
      "denar",
      "denay",
      "dench",
      "denes",
      "denet",
      "denis",
      "dents",
      "deoxy",
      "derat",
      "deray",
      "dered",
      "deres",
      "derig",
      "derma",
      "derms",
      "derns",
      "derny",
      "deros",
      "derro",
      "derry",
      "derth",
      "dervs",
      "desex",
      "deshi",
      "desis",
      "desks",
      "desse",
      "devas",
      "devel",
      "devis",
      "devon",
      "devos",
      "devot",
      "dewan",
      "dewar",
      "dewax",
      "dewed",
      "dexes",
      "dexie",
      "dhaba",
      "dhaks",
      "dhals",
      "dhikr",
      "dhobi",
      "dhole",
      "dholl",
      "dhols",
      "dhoti",
      "dhows",
      "dhuti",
      "diact",
      "dials",
      "diane",
      "diazo",
      "dibbs",
      "diced",
      "dicer",
      "dices",
      "dicht",
      "dicks",
      "dicky",
      "dicot",
      "dicta",
      "dicts",
      "dicty",
      "diddy",
      "didie",
      "didos",
      "didst",
      "diebs",
      "diels",
      "diene",
      "diets",
      "diffs",
      "dight",
      "dikas",
      "diked",
      "diker",
      "dikes",
      "dikey",
      "dildo",
      "dilli",
      "dills",
      "dimbo",
      "dimer",
      "dimes",
      "dimps",
      "dinar",
      "dined",
      "dines",
      "dinge",
      "dings",
      "dinic",
      "dinks",
      "dinky",
      "dinna",
      "dinos",
      "dints",
      "diols",
      "diota",
      "dippy",
      "dipso",
      "diram",
      "direr",
      "dirke",
      "dirks",
      "dirls",
      "dirts",
      "disas",
      "disci",
      "discs",
      "dishy",
      "disks",
      "disme",
      "dital",
      "ditas",
      "dited",
      "dites",
      "ditsy",
      "ditts",
      "ditzy",
      "divan",
      "divas",
      "dived",
      "dives",
      "divis",
      "divna",
      "divos",
      "divot",
      "divvy",
      "diwan",
      "dixie",
      "dixit",
      "diyas",
      "dizen",
      "djinn",
      "djins",
      "doabs",
      "doats",
      "dobby",
      "dobes",
      "dobie",
      "dobla",
      "dobra",
      "dobro",
      "docht",
      "docks",
      "docos",
      "docus",
      "doddy",
      "dodos",
      "doeks",
      "doers",
      "doest",
      "doeth",
      "doffs",
      "dogan",
      "doges",
      "dogey",
      "doggo",
      "doggy",
      "dogie",
      "dohyo",
      "doilt",
      "doily",
      "doits",
      "dojos",
      "dolce",
      "dolci",
      "doled",
      "doles",
      "dolia",
      "dolls",
      "dolma",
      "dolor",
      "dolos",
      "dolts",
      "domal",
      "domed",
      "domes",
      "domic",
      "donah",
      "donas",
      "donee",
      "doner",
      "donga",
      "dongs",
      "donko",
      "donna",
      "donne",
      "donny",
      "donsy",
      "doobs",
      "dooce",
      "doody",
      "dooks",
      "doole",
      "dools",
      "dooly",
      "dooms",
      "doomy",
      "doona",
      "doorn",
      "doors",
      "doozy",
      "dopas",
      "doped",
      "doper",
      "dopes",
      "dorad",
      "dorba",
      "dorbs",
      "doree",
      "dores",
      "doric",
      "doris",
      "dorks",
      "dorky",
      "dorms",
      "dormy",
      "dorps",
      "dorrs",
      "dorsa",
      "dorse",
      "dorts",
      "dorty",
      "dosai",
      "dosas",
      "dosed",
      "doseh",
      "doser",
      "doses",
      "dosha",
      "dotal",
      "doted",
      "doter",
      "dotes",
      "dotty",
      "douar",
      "douce",
      "doucs",
      "douks",
      "doula",
      "douma",
      "doums",
      "doups",
      "doura",
      "douse",
      "douts",
      "doved",
      "doven",
      "dover",
      "doves",
      "dovie",
      "dowar",
      "dowds",
      "dowed",
      "dower",
      "dowie",
      "dowle",
      "dowls",
      "dowly",
      "downa",
      "downs",
      "dowps",
      "dowse",
      "dowts",
      "doxed",
      "doxes",
      "doxie",
      "doyen",
      "doyly",
      "dozed",
      "dozer",
      "dozes",
      "drabs",
      "drack",
      "draco",
      "draff",
      "drags",
      "drail",
      "drams",
      "drant",
      "draps",
      "drats",
      "drave",
      "draws",
      "drays",
      "drear",
      "dreck",
      "dreed",
      "dreer",
      "drees",
      "dregs",
      "dreks",
      "drent",
      "drere",
      "drest",
      "dreys",
      "dribs",
      "drice",
      "dries",
      "drily",
      "drips",
      "dript",
      "droid",
      "droil",
      "droke",
      "drole",
      "drome",
      "drony",
      "droob",
      "droog",
      "drook",
      "drops",
      "dropt",
      "drouk",
      "drows",
      "drubs",
      "drugs",
      "drums",
      "drupe",
      "druse",
      "drusy",
      "druxy",
      "dryad",
      "dryas",
      "dsobo",
      "dsomo",
      "duads",
      "duals",
      "duans",
      "duars",
      "dubbo",
      "ducal",
      "ducat",
      "duces",
      "ducks",
      "ducky",
      "ducts",
      "duddy",
      "duded",
      "dudes",
      "duels",
      "duets",
      "duett",
      "duffs",
      "dufus",
      "duing",
      "duits",
      "dukas",
      "duked",
      "dukes",
      "dukka",
      "dulce",
      "dules",
      "dulia",
      "dulls",
      "dulse",
      "dumas",
      "dumbo",
      "dumbs",
      "dumka",
      "dumky",
      "dumps",
      "dunam",
      "dunch",
      "dunes",
      "dungs",
      "dungy",
      "dunks",
      "dunno",
      "dunny",
      "dunsh",
      "dunts",
      "duomi",
      "duomo",
      "duped",
      "duper",
      "dupes",
      "duple",
      "duply",
      "duppy",
      "dural",
      "duras",
      "dured",
      "dures",
      "durgy",
      "durns",
      "duroc",
      "duros",
      "duroy",
      "durra",
      "durrs",
      "durry",
      "durst",
      "durum",
      "durzi",
      "dusks",
      "dusts",
      "duxes",
      "dwaal",
      "dwale",
      "dwalm",
      "dwams",
      "dwang",
      "dwaum",
      "dweeb",
      "dwile",
      "dwine",
      "dyads",
      "dyers",
      "dyked",
      "dykes",
      "dykey",
      "dykon",
      "dynel",
      "dynes",
      "dzhos",
      "eagre",
      "ealed",
      "eales",
      "eaned",
      "eards",
      "eared",
      "earls",
      "earns",
      "earnt",
      "earst",
      "eased",
      "easer",
      "eases",
      "easle",
      "easts",
      "eathe",
      "eaved",
      "eaves",
      "ebbed",
      "ebbet",
      "ebons",
      "ebook",
      "ecads",
      "eched",
      "eches",
      "echos",
      "ecrus",
      "edema",
      "edged",
      "edger",
      "edges",
      "edile",
      "edits",
      "educe",
      "educt",
      "eejit",
      "eensy",
      "eeven",
      "eevns",
      "effed",
      "egads",
      "egers",
      "egest",
      "eggar",
      "egged",
      "egger",
      "egmas",
      "ehing",
      "eider",
      "eidos",
      "eigne",
      "eiked",
      "eikon",
      "eilds",
      "eisel",
      "ejido",
      "ekkas",
      "elain",
      "eland",
      "elans",
      "elchi",
      "eldin",
      "elemi",
      "elfed",
      "eliad",
      "elint",
      "elmen",
      "eloge",
      "elogy",
      "eloin",
      "elops",
      "elpee",
      "elsin",
      "elute",
      "elvan",
      "elven",
      "elver",
      "elves",
      "emacs",
      "embar",
      "embay",
      "embog",
      "embow",
      "embox",
      "embus",
      "emeer",
      "emend",
      "emerg",
      "emery",
      "emeus",
      "emics",
      "emirs",
      "emits",
      "emmas",
      "emmer",
      "emmet",
      "emmew",
      "emmys",
      "emoji",
      "emong",
      "emote",
      "emove",
      "empts",
      "emule",
      "emure",
      "emyde",
      "emyds",
      "enarm",
      "enate",
      "ended",
      "ender",
      "endew",
      "endue",
      "enews",
      "enfix",
      "eniac",
      "enlit",
      "enmew",
      "ennog",
      "enoki",
      "enols",
      "enorm",
      "enows",
      "enrol",
      "ensew",
      "ensky",
      "entia",
      "enure",
      "enurn",
      "envoi",
      "enzym",
      "eorls",
      "eosin",
      "epact",
      "epees",
      "ephah",
      "ephas",
      "ephod",
      "ephor",
      "epics",
      "epode",
      "epopt",
      "epris",
      "eques",
      "equid",
      "erbia",
      "erevs",
      "ergon",
      "ergos",
      "ergot",
      "erhus",
      "erica",
      "erick",
      "erics",
      "ering",
      "erned",
      "ernes",
      "erose",
      "erred",
      "erses",
      "eruct",
      "erugo",
      "eruvs",
      "erven",
      "ervil",
      "escar",
      "escot",
      "esile",
      "eskar",
      "esker",
      "esnes",
      "esses",
      "estoc",
      "estop",
      "estro",
      "etage",
      "etape",
      "etats",
      "etens",
      "ethal",
      "ethne",
      "ethyl",
      "etics",
      "etnas",
      "ettin",
      "ettle",
      "etuis",
      "etwee",
      "etyma",
      "eughs",
      "euked",
      "eupad",
      "euros",
      "eusol",
      "evens",
      "evert",
      "evets",
      "evhoe",
      "evils",
      "evite",
      "evohe",
      "ewers",
      "ewest",
      "ewhow",
      "ewked",
      "exams",
      "exeat",
      "execs",
      "exeem",
      "exeme",
      "exfil",
      "exies",
      "exine",
      "exing",
      "exits",
      "exode",
      "exome",
      "exons",
      "expat",
      "expos",
      "exude",
      "exuls",
      "exurb",
      "eyass",
      "eyers",
      "eyots",
      "eyras",
      "eyres",
      "eyrie",
      "eyrir",
      "ezine",
      "fabby",
      "faced",
      "facer",
      "faces",
      "facia",
      "facta",
      "facts",
      "faddy",
      "faded",
      "fader",
      "fades",
      "fadge",
      "fados",
      "faena",
      "faery",
      "faffs",
      "faffy",
      "faggy",
      "fagin",
      "fagot",
      "faiks",
      "fails",
      "faine",
      "fains",
      "fairs",
      "faked",
      "faker",
      "fakes",
      "fakey",
      "fakie",
      "fakir",
      "falaj",
      "falls",
      "famed",
      "fames",
      "fanal",
      "fands",
      "fanes",
      "fanga",
      "fango",
      "fangs",
      "fanks",
      "fanon",
      "fanos",
      "fanum",
      "faqir",
      "farad",
      "farci",
      "farcy",
      "fards",
      "fared",
      "farer",
      "fares",
      "farle",
      "farls",
      "farms",
      "faros",
      "farro",
      "farse",
      "farts",
      "fasci",
      "fasti",
      "fasts",
      "fated",
      "fates",
      "fatly",
      "fatso",
      "fatwa",
      "faugh",
      "fauld",
      "fauns",
      "faurd",
      "fauts",
      "fauve",
      "favas",
      "favel",
      "faver",
      "faves",
      "favus",
      "fawns",
      "fawny",
      "faxed",
      "faxes",
      "fayed",
      "fayer",
      "fayne",
      "fayre",
      "fazed",
      "fazes",
      "feals",
      "feare",
      "fears",
      "feart",
      "fease",
      "feats",
      "feaze",
      "feces",
      "fecht",
      "fecit",
      "fecks",
      "fedex",
      "feebs",
      "feeds",
      "feels",
      "feens",
      "feers",
      "feese",
      "feeze",
      "fehme",
      "feint",
      "feist",
      "felch",
      "felid",
      "fells",
      "felly",
      "felts",
      "felty",
      "femal",
      "femes",
      "femmy",
      "fends",
      "fendy",
      "fenis",
      "fenks",
      "fenny",
      "fents",
      "feods",
      "feoff",
      "ferer",
      "feres",
      "feria",
      "ferly",
      "fermi",
      "ferms",
      "ferns",
      "ferny",
      "fesse",
      "festa",
      "fests",
      "festy",
      "fetas",
      "feted",
      "fetes",
      "fetor",
      "fetta",
      "fetts",
      "fetwa",
      "feuar",
      "feuds",
      "feued",
      "feyed",
      "feyer",
      "feyly",
      "fezes",
      "fezzy",
      "fiars",
      "fiats",
      "fibre",
      "fibro",
      "fices",
      "fiche",
      "fichu",
      "ficin",
      "ficos",
      "fides",
      "fidge",
      "fidos",
      "fiefs",
      "fient",
      "fiere",
      "fiers",
      "fiest",
      "fifed",
      "fifer",
      "fifes",
      "fifis",
      "figgy",
      "figos",
      "fiked",
      "fikes",
      "filar",
      "filch",
      "filed",
      "files",
      "filii",
      "filks",
      "fille",
      "fillo",
      "fills",
      "filmi",
      "films",
      "filos",
      "filum",
      "finca",
      "finds",
      "fined",
      "fines",
      "finis",
      "finks",
      "finny",
      "finos",
      "fiord",
      "fiqhs",
      "fique",
      "fired",
      "firer",
      "fires",
      "firie",
      "firks",
      "firms",
      "firns",
      "firry",
      "firth",
      "fiscs",
      "fisks",
      "fists",
      "fisty",
      "fitch",
      "fitly",
      "fitna",
      "fitte",
      "fitts",
      "fiver",
      "fives",
      "fixed",
      "fixes",
      "fixit",
      "fjeld",
      "flabs",
      "flaff",
      "flags",
      "flaks",
      "flamm",
      "flams",
      "flamy",
      "flane",
      "flans",
      "flaps",
      "flary",
      "flats",
      "flava",
      "flawn",
      "flaws",
      "flawy",
      "flaxy",
      "flays",
      "fleam",
      "fleas",
      "fleek",
      "fleer",
      "flees",
      "flegs",
      "fleme",
      "fleur",
      "flews",
      "flexi",
      "flexo",
      "fleys",
      "flics",
      "flied",
      "flies",
      "flimp",
      "flims",
      "flips",
      "flirs",
      "flisk",
      "flite",
      "flits",
      "flitt",
      "flobs",
      "flocs",
      "floes",
      "flogs",
      "flong",
      "flops",
      "flors",
      "flory",
      "flosh",
      "flota",
      "flote",
      "flows",
      "flubs",
      "flued",
      "flues",
      "fluey",
      "fluky",
      "flump",
      "fluor",
      "flurr",
      "fluty",
      "fluyt",
      "flyby",
      "flype",
      "flyte",
      "foals",
      "foams",
      "foehn",
      "fogey",
      "fogie",
      "fogle",
      "fogou",
      "fohns",
      "foids",
      "foils",
      "foins",
      "folds",
      "foley",
      "folia",
      "folic",
      "folie",
      "folks",
      "folky",
      "fomes",
      "fonda",
      "fonds",
      "fondu",
      "fones",
      "fonly",
      "fonts",
      "foods",
      "foody",
      "fools",
      "foots",
      "footy",
      "foram",
      "forbs",
      "forby",
      "fordo",
      "fords",
      "forel",
      "fores",
      "forex",
      "forks",
      "forky",
      "forme",
      "forms",
      "forts",
      "forza",
      "forze",
      "fossa",
      "fosse",
      "fouat",
      "fouds",
      "fouer",
      "fouet",
      "foule",
      "fouls",
      "fount",
      "fours",
      "fouth",
      "fovea",
      "fowls",
      "fowth",
      "foxed",
      "foxes",
      "foxie",
      "foyle",
      "foyne",
      "frabs",
      "frack",
      "fract",
      "frags",
      "fraim",
      "franc",
      "frape",
      "fraps",
      "frass",
      "frate",
      "frati",
      "frats",
      "fraus",
      "frays",
      "frees",
      "freet",
      "freit",
      "fremd",
      "frena",
      "freon",
      "frere",
      "frets",
      "fribs",
      "frier",
      "fries",
      "frigs",
      "frise",
      "frist",
      "frith",
      "frits",
      "fritt",
      "frize",
      "frizz",
      "froes",
      "frogs",
      "frons",
      "frore",
      "frorn",
      "frory",
      "frosh",
      "frows",
      "frowy",
      "frugs",
      "frump",
      "frush",
      "frust",
      "fryer",
      "fubar",
      "fubby",
      "fubsy",
      "fucks",
      "fucus",
      "fuddy",
      "fudgy",
      "fuels",
      "fuero",
      "fuffs",
      "fuffy",
      "fugal",
      "fuggy",
      "fugie",
      "fugio",
      "fugle",
      "fugly",
      "fugus",
      "fujis",
      "fulls",
      "fumed",
      "fumer",
      "fumes",
      "fumet",
      "fundi",
      "funds",
      "fundy",
      "fungo",
      "fungs",
      "funks",
      "fural",
      "furan",
      "furca",
      "furls",
      "furol",
      "furrs",
      "furth",
      "furze",
      "furzy",
      "fused",
      "fusee",
      "fusel",
      "fuses",
      "fusil",
      "fusks",
      "fusts",
      "fusty",
      "futon",
      "fuzed",
      "fuzee",
      "fuzes",
      "fuzil",
      "fyces",
      "fyked",
      "fykes",
      "fyles",
      "fyrds",
      "fytte",
      "gabba",
      "gabby",
      "gable",
      "gaddi",
      "gades",
      "gadge",
      "gadid",
      "gadis",
      "gadje",
      "gadjo",
      "gadso",
      "gaffs",
      "gaged",
      "gager",
      "gages",
      "gaids",
      "gains",
      "gairs",
      "gaita",
      "gaits",
      "gaitt",
      "gajos",
      "galah",
      "galas",
      "galax",
      "galea",
      "galed",
      "gales",
      "galls",
      "gally",
      "galop",
      "galut",
      "galvo",
      "gamas",
      "gamay",
      "gamba",
      "gambe",
      "gambo",
      "gambs",
      "gamed",
      "games",
      "gamey",
      "gamic",
      "gamin",
      "gamme",
      "gammy",
      "gamps",
      "ganch",
      "gandy",
      "ganef",
      "ganev",
      "gangs",
      "ganja",
      "ganof",
      "gants",
      "gaols",
      "gaped",
      "gaper",
      "gapes",
      "gapos",
      "gappy",
      "garbe",
      "garbo",
      "garbs",
      "garda",
      "gares",
      "garis",
      "garms",
      "garni",
      "garre",
      "garth",
      "garum",
      "gases",
      "gasps",
      "gaspy",
      "gasts",
      "gatch",
      "gated",
      "gater",
      "gates",
      "gaths",
      "gator",
      "gauch",
      "gaucy",
      "gauds",
      "gauje",
      "gault",
      "gaums",
      "gaumy",
      "gaups",
      "gaurs",
      "gauss",
      "gauzy",
      "gavot",
      "gawcy",
      "gawds",
      "gawks",
      "gawps",
      "gawsy",
      "gayal",
      "gazal",
      "gazar",
      "gazed",
      "gazes",
      "gazon",
      "gazoo",
      "geals",
      "geans",
      "geare",
      "gears",
      "geats",
      "gebur",
      "gecks",
      "geeks",
      "geeps",
      "geest",
      "geist",
      "geits",
      "gelds",
      "gelee",
      "gelid",
      "gelly",
      "gelts",
      "gemel",
      "gemma",
      "gemmy",
      "gemot",
      "genal",
      "genas",
      "genes",
      "genet",
      "genic",
      "genii",
      "genip",
      "genny",
      "genoa",
      "genom",
      "genro",
      "gents",
      "genty",
      "genua",
      "genus",
      "geode",
      "geoid",
      "gerah",
      "gerbe",
      "geres",
      "gerle",
      "germs",
      "germy",
      "gerne",
      "gesse",
      "gesso",
      "geste",
      "gests",
      "getas",
      "getup",
      "geums",
      "geyan",
      "geyer",
      "ghast",
      "ghats",
      "ghaut",
      "ghazi",
      "ghees",
      "ghest",
      "ghyll",
      "gibed",
      "gibel",
      "giber",
      "gibes",
      "gibli",
      "gibus",
      "gifts",
      "gigas",
      "gighe",
      "gigot",
      "gigue",
      "gilas",
      "gilds",
      "gilet",
      "gills",
      "gilly",
      "gilpy",
      "gilts",
      "gimel",
      "gimme",
      "gimps",
      "gimpy",
      "ginch",
      "ginge",
      "gings",
      "ginks",
      "ginny",
      "ginzo",
      "gipon",
      "gippo",
      "gippy",
      "girds",
      "girls",
      "girns",
      "giron",
      "giros",
      "girrs",
      "girsh",
      "girts",
      "gismo",
      "gisms",
      "gists",
      "gitch",
      "gites",
      "giust",
      "gived",
      "gives",
      "gizmo",
      "glace",
      "glads",
      "glady",
      "glaik",
      "glair",
      "glams",
      "glans",
      "glary",
      "glaum",
      "glaur",
      "glazy",
      "gleba",
      "glebe",
      "gleby",
      "glede",
      "gleds",
      "gleed",
      "gleek",
      "glees",
      "gleet",
      "gleis",
      "glens",
      "glent",
      "gleys",
      "glial",
      "glias",
      "glibs",
      "gliff",
      "glift",
      "glike",
      "glime",
      "glims",
      "glisk",
      "glits",
      "glitz",
      "gloam",
      "globi",
      "globs",
      "globy",
      "glode",
      "glogg",
      "gloms",
      "gloop",
      "glops",
      "glost",
      "glout",
      "glows",
      "gloze",
      "glued",
      "gluer",
      "glues",
      "gluey",
      "glugs",
      "glume",
      "glums",
      "gluon",
      "glute",
      "gluts",
      "gnarl",
      "gnarr",
      "gnars",
      "gnats",
      "gnawn",
      "gnaws",
      "gnows",
      "goads",
      "goafs",
      "goals",
      "goary",
      "goats",
      "goaty",
      "goban",
      "gobar",
      "gobbi",
      "gobbo",
      "gobby",
      "gobis",
      "gobos",
      "godet",
      "godso",
      "goels",
      "goers",
      "goest",
      "goeth",
      "goety",
      "gofer",
      "goffs",
      "gogga",
      "gogos",
      "goier",
      "gojis",
      "golds",
      "goldy",
      "goles",
      "golfs",
      "golpe",
      "golps",
      "gombo",
      "gomer",
      "gompa",
      "gonch",
      "gonef",
      "gongs",
      "gonia",
      "gonif",
      "gonks",
      "gonna",
      "gonof",
      "gonys",
      "gonzo",
      "gooby",
      "goods",
      "goofs",
      "googs",
      "gooks",
      "gooky",
      "goold",
      "gools",
      "gooly",
      "goons",
      "goony",
      "goops",
      "goopy",
      "goors",
      "goory",
      "goosy",
      "gopak",
      "gopik",
      "goral",
      "goras",
      "gored",
      "gores",
      "goris",
      "gorms",
      "gormy",
      "gorps",
      "gorse",
      "gorsy",
      "gosht",
      "gosse",
      "gotch",
      "goths",
      "gothy",
      "gotta",
      "gouch",
      "gouks",
      "goura",
      "gouts",
      "gouty",
      "gowan",
      "gowds",
      "gowfs",
      "gowks",
      "gowls",
      "gowns",
      "goxes",
      "goyim",
      "goyle",
      "graal",
      "grabs",
      "grads",
      "graff",
      "graip",
      "grama",
      "grame",
      "gramp",
      "grams",
      "grana",
      "grans",
      "grapy",
      "gravs",
      "grays",
      "grebe",
      "grebo",
      "grece",
      "greek",
      "grees",
      "grege",
      "grego",
      "grein",
      "grens",
      "grese",
      "greve",
      "grews",
      "greys",
      "grice",
      "gride",
      "grids",
      "griff",
      "grift",
      "grigs",
      "grike",
      "grins",
      "griot",
      "grips",
      "gript",
      "gripy",
      "grise",
      "grist",
      "grisy",
      "grith",
      "grits",
      "grize",
      "groat",
      "grody",
      "grogs",
      "groks",
      "groma",
      "grone",
      "groof",
      "grosz",
      "grots",
      "grouf",
      "grovy",
      "grows",
      "grrls",
      "grrrl",
      "grubs",
      "grued",
      "grues",
      "grufe",
      "grume",
      "grump",
      "grund",
      "gryce",
      "gryde",
      "gryke",
      "grype",
      "grypt",
      "guaco",
      "guana",
      "guano",
      "guans",
      "guars",
      "gucks",
      "gucky",
      "gudes",
      "guffs",
      "gugas",
      "guids",
      "guimp",
      "guiro",
      "gulag",
      "gular",
      "gulas",
      "gules",
      "gulet",
      "gulfs",
      "gulfy",
      "gulls",
      "gulph",
      "gulps",
      "gulpy",
      "gumma",
      "gummi",
      "gumps",
      "gundy",
      "gunge",
      "gungy",
      "gunks",
      "gunky",
      "gunny",
      "guqin",
      "gurdy",
      "gurge",
      "gurls",
      "gurly",
      "gurns",
      "gurry",
      "gursh",
      "gurus",
      "gushy",
      "gusla",
      "gusle",
      "gusli",
      "gussy",
      "gusts",
      "gutsy",
      "gutta",
      "gutty",
      "guyed",
      "guyle",
      "guyot",
      "guyse",
      "gwine",
      "gyals",
      "gyans",
      "gybed",
      "gybes",
      "gyeld",
      "gymps",
      "gynae",
      "gynie",
      "gynny",
      "gynos",
      "gyoza",
      "gypos",
      "gyppo",
      "gyppy",
      "gyral",
      "gyred",
      "gyres",
      "gyron",
      "gyros",
      "gyrus",
      "gytes",
      "gyved",
      "gyves",
      "haafs",
      "haars",
      "hable",
      "habus",
      "hacek",
      "hacks",
      "hadal",
      "haded",
      "hades",
      "hadji",
      "hadst",
      "haems",
      "haets",
      "haffs",
      "hafiz",
      "hafts",
      "haggs",
      "hahas",
      "haick",
      "haika",
      "haiks",
      "haiku",
      "hails",
      "haily",
      "hains",
      "haint",
      "hairs",
      "haith",
      "hajes",
      "hajis",
      "hajji",
      "hakam",
      "hakas",
      "hakea",
      "hakes",
      "hakim",
      "hakus",
      "halal",
      "haled",
      "haler",
      "hales",
      "halfa",
      "halfs",
      "halid",
      "hallo",
      "halls",
      "halma",
      "halms",
      "halon",
      "halos",
      "halse",
      "halts",
      "halva",
      "halwa",
      "hamal",
      "hamba",
      "hamed",
      "hames",
      "hammy",
      "hamza",
      "hanap",
      "hance",
      "hanch",
      "hands",
      "hangi",
      "hangs",
      "hanks",
      "hanky",
      "hansa",
      "hanse",
      "hants",
      "haole",
      "haoma",
      "hapax",
      "haply",
      "happi",
      "hapus",
      "haram",
      "hards",
      "hared",
      "hares",
      "harim",
      "harks",
      "harls",
      "harms",
      "harns",
      "haros",
      "harps",
      "harts",
      "hashy",
      "hasks",
      "hasps",
      "hasta",
      "hated",
      "hates",
      "hatha",
      "hauds",
      "haufs",
      "haugh",
      "hauld",
      "haulm",
      "hauls",
      "hault",
      "hauns",
      "hause",
      "haver",
      "haves",
      "hawed",
      "hawks",
      "hawms",
      "hawse",
      "hayed",
      "hayer",
      "hayey",
      "hayle",
      "hazan",
      "hazed",
      "hazer",
      "hazes",
      "heads",
      "heald",
      "heals",
      "heame",
      "heaps",
      "heapy",
      "heare",
      "hears",
      "heast",
      "heats",
      "heben",
      "hebes",
      "hecht",
      "hecks",
      "heder",
      "hedgy",
      "heeds",
      "heedy",
      "heels",
      "heeze",
      "hefte",
      "hefts",
      "heids",
      "heigh",
      "heils",
      "heirs",
      "hejab",
      "hejra",
      "heled",
      "heles",
      "helio",
      "hells",
      "helms",
      "helos",
      "helot",
      "helps",
      "helve",
      "hemal",
      "hemes",
      "hemic",
      "hemin",
      "hemps",
      "hempy",
      "hench",
      "hends",
      "henge",
      "henna",
      "henny",
      "henry",
      "hents",
      "hepar",
      "herbs",
      "herby",
      "herds",
      "heres",
      "herls",
      "herma",
      "herms",
      "herns",
      "heros",
      "herry",
      "herse",
      "hertz",
      "herye",
      "hesps",
      "hests",
      "hetes",
      "heths",
      "heuch",
      "heugh",
      "hevea",
      "hewed",
      "hewer",
      "hewgh",
      "hexad",
      "hexed",
      "hexer",
      "hexes",
      "hexyl",
      "heyed",
      "hiant",
      "hicks",
      "hided",
      "hider",
      "hides",
      "hiems",
      "highs",
      "hight",
      "hijab",
      "hijra",
      "hiked",
      "hiker",
      "hikes",
      "hikoi",
      "hilar",
      "hilch",
      "hillo",
      "hills",
      "hilts",
      "hilum",
      "hilus",
      "himbo",
      "hinau",
      "hinds",
      "hings",
      "hinky",
      "hinny",
      "hints",
      "hiois",
      "hiply",
      "hired",
      "hiree",
      "hirer",
      "hires",
      "hissy",
      "hists",
      "hithe",
      "hived",
      "hiver",
      "hives",
      "hizen",
      "hoaed",
      "hoagy",
      "hoars",
      "hoary",
      "hoast",
      "hobos",
      "hocks",
      "hocus",
      "hodad",
      "hodja",
      "hoers",
      "hogan",
      "hogen",
      "hoggs",
      "hoghs",
      "hohed",
      "hoick",
      "hoied",
      "hoiks",
      "hoing",
      "hoise",
      "hokas",
      "hoked",
      "hokes",
      "hokey",
      "hokis",
      "hokku",
      "hokum",
      "holds",
      "holed",
      "holes",
      "holey",
      "holks",
      "holla",
      "hollo",
      "holme",
      "holms",
      "holon",
      "holos",
      "holts",
      "homas",
      "homed",
      "homes",
      "homey",
      "homie",
      "homme",
      "homos",
      "honan",
      "honda",
      "honds",
      "honed",
      "honer",
      "hones",
      "hongi",
      "hongs",
      "honks",
      "honky",
      "hooch",
      "hoods",
      "hoody",
      "hooey",
      "hoofs",
      "hooka",
      "hooks",
      "hooky",
      "hooly",
      "hoons",
      "hoops",
      "hoord",
      "hoors",
      "hoosh",
      "hoots",
      "hooty",
      "hoove",
      "hopak",
      "hoped",
      "hoper",
      "hopes",
      "hoppy",
      "horah",
      "horal",
      "horas",
      "horis",
      "horks",
      "horme",
      "horns",
      "horst",
      "horsy",
      "hosed",
      "hosel",
      "hosen",
      "hoser",
      "hoses",
      "hosey",
      "hosta",
      "hosts",
      "hotch",
      "hoten",
      "hotty",
      "houff",
      "houfs",
      "hough",
      "houri",
      "hours",
      "houts",
      "hovea",
      "hoved",
      "hoven",
      "hoves",
      "howbe",
      "howes",
      "howff",
      "howfs",
      "howks",
      "howls",
      "howre",
      "howso",
      "hoxed",
      "hoxes",
      "hoyas",
      "hoyed",
      "hoyle",
      "hubby",
      "hucks",
      "hudna",
      "hudud",
      "huers",
      "huffs",
      "huffy",
      "huger",
      "huggy",
      "huhus",
      "huias",
      "hulas",
      "hules",
      "hulks",
      "hulky",
      "hullo",
      "hulls",
      "hully",
      "humas",
      "humfs",
      "humic",
      "humps",
      "humpy",
      "hunks",
      "hunts",
      "hurds",
      "hurls",
      "hurly",
      "hurra",
      "hurst",
      "hurts",
      "hushy",
      "husks",
      "husos",
      "hutia",
      "huzza",
      "huzzy",
      "hwyls",
      "hydra",
      "hyens",
      "hygge",
      "hying",
      "hykes",
      "hylas",
      "hyleg",
      "hyles",
      "hylic",
      "hymns",
      "hynde",
      "hyoid",
      "hyped",
      "hypes",
      "hypha",
      "hyphy",
      "hypos",
      "hyrax",
      "hyson",
      "hythe",
      "iambi",
      "iambs",
      "ibrik",
      "icers",
      "iched",
      "iches",
      "ichor",
      "icier",
      "icker",
      "ickle",
      "icons",
      "ictal",
      "ictic",
      "ictus",
      "idant",
      "ideas",
      "idees",
      "ident",
      "idled",
      "idles",
      "idola",
      "idols",
      "idyls",
      "iftar",
      "igapo",
      "igged",
      "iglus",
      "ihram",
      "ikans",
      "ikats",
      "ikons",
      "ileac",
      "ileal",
      "ileum",
      "ileus",
      "iliad",
      "ilial",
      "ilium",
      "iller",
      "illth",
      "imago",
      "imams",
      "imari",
      "imaum",
      "imbar",
      "imbed",
      "imide",
      "imido",
      "imids",
      "imine",
      "imino",
      "immew",
      "immit",
      "immix",
      "imped",
      "impis",
      "impot",
      "impro",
      "imshi",
      "imshy",
      "inapt",
      "inarm",
      "inbye",
      "incel",
      "incle",
      "incog",
      "incus",
      "incut",
      "indew",
      "india",
      "indie",
      "indol",
      "indow",
      "indri",
      "indue",
      "inerm",
      "infix",
      "infos",
      "infra",
      "ingan",
      "ingle",
      "inion",
      "inked",
      "inker",
      "inkle",
      "inned",
      "innit",
      "inorb",
      "inrun",
      "inset",
      "inspo",
      "intel",
      "intil",
      "intis",
      "intra",
      "inula",
      "inure",
      "inurn",
      "inust",
      "invar",
      "inwit",
      "iodic",
      "iodid",
      "iodin",
      "iotas",
      "ippon",
      "irade",
      "irids",
      "iring",
      "irked",
      "iroko",
      "irone",
      "irons",
      "isbas",
      "ishes",
      "isled",
      "isles",
      "isnae",
      "issei",
      "istle",
      "items",
      "ither",
      "ivied",
      "ivies",
      "ixias",
      "ixnay",
      "ixora",
      "ixtle",
      "izard",
      "izars",
      "izzat",
      "jaaps",
      "jabot",
      "jacal",
      "jacks",
      "jacky",
      "jaded",
      "jades",
      "jafas",
      "jaffa",
      "jagas",
      "jager",
      "jaggs",
      "jaggy",
      "jagir",
      "jagra",
      "jails",
      "jaker",
      "jakes",
      "jakey",
      "jalap",
      "jalop",
      "jambe",
      "jambo",
      "jambs",
      "jambu",
      "james",
      "jammy",
      "jamon",
      "janes",
      "janns",
      "janny",
      "janty",
      "japan",
      "japed",
      "japer",
      "japes",
      "jarks",
      "jarls",
      "jarps",
      "jarta",
      "jarul",
      "jasey",
      "jaspe",
      "jasps",
      "jatos",
      "jauks",
      "jaups",
      "javas",
      "javel",
      "jawan",
      "jawed",
      "jaxie",
      "jeans",
      "jeats",
      "jebel",
      "jedis",
      "jeels",
      "jeely",
      "jeeps",
      "jeers",
      "jeeze",
      "jefes",
      "jeffs",
      "jehad",
      "jehus",
      "jelab",
      "jello",
      "jells",
      "jembe",
      "jemmy",
      "jenny",
      "jeons",
      "jerid",
      "jerks",
      "jerry",
      "jesse",
      "jests",
      "jesus",
      "jetes",
      "jeton",
      "jeune",
      "jewed",
      "jewie",
      "jhala",
      "jiaos",
      "jibba",
      "jibbs",
      "jibed",
      "jiber",
      "jibes",
      "jiffs",
      "jiggy",
      "jigot",
      "jihad",
      "jills",
      "jilts",
      "jimmy",
      "jimpy",
      "jingo",
      "jinks",
      "jinne",
      "jinni",
      "jinns",
      "jirds",
      "jirga",
      "jirre",
      "jisms",
      "jived",
      "jiver",
      "jives",
      "jivey",
      "jnana",
      "jobed",
      "jobes",
      "jocko",
      "jocks",
      "jocky",
      "jocos",
      "jodel",
      "joeys",
      "johns",
      "joins",
      "joked",
      "jokes",
      "jokey",
      "jokol",
      "joled",
      "joles",
      "jolls",
      "jolts",
      "jolty",
      "jomon",
      "jomos",
      "jones",
      "jongs",
      "jonty",
      "jooks",
      "joram",
      "jorum",
      "jotas",
      "jotty",
      "jotun",
      "joual",
      "jougs",
      "jouks",
      "joule",
      "jours",
      "jowar",
      "jowed",
      "jowls",
      "jowly",
      "joyed",
      "jubas",
      "jubes",
      "jucos",
      "judas",
      "judgy",
      "judos",
      "jugal",
      "jugum",
      "jujus",
      "juked",
      "jukes",
      "jukus",
      "julep",
      "jumar",
      "jumby",
      "jumps",
      "junco",
      "junks",
      "junky",
      "jupes",
      "jupon",
      "jural",
      "jurat",
      "jurel",
      "jures",
      "justs",
      "jutes",
      "jutty",
      "juves",
      "juvie",
      "kaama",
      "kabab",
      "kabar",
      "kabob",
      "kacha",
      "kacks",
      "kadai",
      "kades",
      "kadis",
      "kafir",
      "kagos",
      "kagus",
      "kahal",
      "kaiak",
      "kaids",
      "kaies",
      "kaifs",
      "kaika",
      "kaiks",
      "kails",
      "kaims",
      "kaing",
      "kains",
      "kakas",
      "kakis",
      "kalam",
      "kales",
      "kalif",
      "kalis",
      "kalpa",
      "kamas",
      "kames",
      "kamik",
      "kamis",
      "kamme",
      "kanae",
      "kanas",
      "kandy",
      "kaneh",
      "kanes",
      "kanga",
      "kangs",
      "kanji",
      "kants",
      "kanzu",
      "kaons",
      "kapas",
      "kaphs",
      "kapok",
      "kapow",
      "kapus",
      "kaput",
      "karas",
      "karat",
      "karks",
      "karns",
      "karoo",
      "karos",
      "karri",
      "karst",
      "karsy",
      "karts",
      "karzy",
      "kasha",
      "kasme",
      "katal",
      "katas",
      "katis",
      "katti",
      "kaugh",
      "kauri",
      "kauru",
      "kaury",
      "kaval",
      "kavas",
      "kawas",
      "kawau",
      "kawed",
      "kayle",
      "kayos",
      "kazis",
      "kazoo",
      "kbars",
      "kebar",
      "kebob",
      "kecks",
      "kedge",
      "kedgy",
      "keech",
      "keefs",
      "keeks",
      "keels",
      "keema",
      "keeno",
      "keens",
      "keeps",
      "keets",
      "keeve",
      "kefir",
      "kehua",
      "keirs",
      "kelep",
      "kelim",
      "kells",
      "kelly",
      "kelps",
      "kelpy",
      "kelts",
      "kelty",
      "kembo",
      "kembs",
      "kemps",
      "kempt",
      "kempy",
      "kenaf",
      "kench",
      "kendo",
      "kenos",
      "kente",
      "kents",
      "kepis",
      "kerbs",
      "kerel",
      "kerfs",
      "kerky",
      "kerma",
      "kerne",
      "kerns",
      "keros",
      "kerry",
      "kerve",
      "kesar",
      "kests",
      "ketas",
      "ketch",
      "ketes",
      "ketol",
      "kevel",
      "kevil",
      "kexes",
      "keyed",
      "keyer",
      "khadi",
      "khafs",
      "khans",
      "khaph",
      "khats",
      "khaya",
      "khazi",
      "kheda",
      "kheth",
      "khets",
      "khoja",
      "khors",
      "khoum",
      "khuds",
      "kiaat",
      "kiack",
      "kiang",
      "kibbe",
      "kibbi",
      "kibei",
      "kibes",
      "kibla",
      "kicks",
      "kicky",
      "kiddo",
      "kiddy",
      "kidel",
      "kidge",
      "kiefs",
      "kiers",
      "kieve",
      "kievs",
      "kight",
      "kikes",
      "kikoi",
      "kiley",
      "kilim",
      "kills",
      "kilns",
      "kilos",
      "kilps",
      "kilts",
      "kilty",
      "kimbo",
      "kinas",
      "kinda",
      "kinds",
      "kindy",
      "kines",
      "kings",
      "kinin",
      "kinks",
      "kinos",
      "kiore",
      "kipes",
      "kippa",
      "kipps",
      "kirby",
      "kirks",
      "kirns",
      "kirri",
      "kisan",
      "kissy",
      "kists",
      "kited",
      "kiter",
      "kites",
      "kithe",
      "kiths",
      "kitul",
      "kivas",
      "kiwis",
      "klang",
      "klaps",
      "klett",
      "klick",
      "klieg",
      "kliks",
      "klong",
      "kloof",
      "kluge",
      "klutz",
      "knags",
      "knaps",
      "knarl",
      "knars",
      "knaur",
      "knawe",
      "knees",
      "knell",
      "knish",
      "knits",
      "knive",
      "knobs",
      "knops",
      "knosp",
      "knots",
      "knout",
      "knowe",
      "knows",
      "knubs",
      "knurl",
      "knurr",
      "knurs",
      "knuts",
      "koans",
      "koaps",
      "koban",
      "kobos",
      "koels",
      "koffs",
      "kofta",
      "kogal",
      "kohas",
      "kohen",
      "kohls",
      "koine",
      "kojis",
      "kokam",
      "kokas",
      "koker",
      "kokra",
      "kokum",
      "kolas",
      "kolos",
      "kombu",
      "konbu",
      "kondo",
      "konks",
      "kooks",
      "kooky",
      "koori",
      "kopek",
      "kophs",
      "kopje",
      "koppa",
      "korai",
      "koran",
      "koras",
      "korat",
      "kores",
      "korma",
      "koros",
      "korun",
      "korus",
      "koses",
      "kotch",
      "kotos",
      "kotow",
      "koura",
      "kraal",
      "krabs",
      "kraft",
      "krais",
      "krait",
      "krang",
      "krans",
      "kranz",
      "kraut",
      "krays",
      "kreep",
      "kreng",
      "krewe",
      "krona",
      "krone",
      "kroon",
      "krubi",
      "krunk",
      "ksars",
      "kubie",
      "kudos",
      "kudus",
      "kudzu",
      "kufis",
      "kugel",
      "kuias",
      "kukri",
      "kukus",
      "kulak",
      "kulan",
      "kulas",
      "kulfi",
      "kumis",
      "kumys",
      "kuris",
      "kurre",
      "kurta",
      "kurus",
      "kusso",
      "kutas",
      "kutch",
      "kutis",
      "kutus",
      "kuzus",
      "kvass",
      "kvell",
      "kwela",
      "kyack",
      "kyaks",
      "kyang",
      "kyars",
      "kyats",
      "kybos",
      "kydst",
      "kyles",
      "kylie",
      "kylin",
      "kylix",
      "kyloe",
      "kynde",
      "kynds",
      "kypes",
      "kyrie",
      "kytes",
      "kythe",
      "laari",
      "labda",
      "labia",
      "labis",
      "labra",
      "laced",
      "lacer",
      "laces",
      "lacet",
      "lacey",
      "lacks",
      "laddy",
      "laded",
      "lader",
      "lades",
      "laers",
      "laevo",
      "lagan",
      "lahal",
      "lahar",
      "laich",
      "laics",
      "laids",
      "laigh",
      "laika",
      "laiks",
      "laird",
      "lairs",
      "lairy",
      "laith",
      "laity",
      "laked",
      "laker",
      "lakes",
      "lakhs",
      "lakin",
      "laksa",
      "laldy",
      "lalls",
      "lamas",
      "lambs",
      "lamby",
      "lamed",
      "lamer",
      "lames",
      "lamia",
      "lammy",
      "lamps",
      "lanai",
      "lanas",
      "lanch",
      "lande",
      "lands",
      "lanes",
      "lanks",
      "lants",
      "lapin",
      "lapis",
      "lapje",
      "larch",
      "lards",
      "lardy",
      "laree",
      "lares",
      "largo",
      "laris",
      "larks",
      "larky",
      "larns",
      "larnt",
      "larum",
      "lased",
      "laser",
      "lases",
      "lassi",
      "lassu",
      "lassy",
      "lasts",
      "latah",
      "lated",
      "laten",
      "latex",
      "lathi",
      "laths",
      "lathy",
      "latke",
      "latus",
      "lauan",
      "lauch",
      "lauds",
      "laufs",
      "laund",
      "laura",
      "laval",
      "lavas",
      "laved",
      "laver",
      "laves",
      "lavra",
      "lavvy",
      "lawed",
      "lawer",
      "lawin",
      "lawks",
      "lawns",
      "lawny",
      "laxed",
      "laxer",
      "laxes",
      "laxly",
      "layed",
      "layin",
      "layup",
      "lazar",
      "lazed",
      "lazes",
      "lazos",
      "lazzi",
      "lazzo",
      "leads",
      "leady",
      "leafs",
      "leaks",
      "leams",
      "leans",
      "leany",
      "leaps",
      "leare",
      "lears",
      "leary",
      "leats",
      "leavy",
      "leaze",
      "leben",
      "leccy",
      "ledes",
      "ledgy",
      "ledum",
      "leear",
      "leeks",
      "leeps",
      "leers",
      "leese",
      "leets",
      "leeze",
      "lefte",
      "lefts",
      "leger",
      "leges",
      "legge",
      "leggo",
      "legit",
      "lehrs",
      "lehua",
      "leirs",
      "leish",
      "leman",
      "lemed",
      "lemel",
      "lemes",
      "lemma",
      "lemme",
      "lends",
      "lenes",
      "lengs",
      "lenis",
      "lenos",
      "lense",
      "lenti",
      "lento",
      "leone",
      "lepid",
      "lepra",
      "lepta",
      "lered",
      "leres",
      "lerps",
      "lesbo",
      "leses",
      "lests",
      "letch",
      "lethe",
      "letup",
      "leuch",
      "leuco",
      "leuds",
      "leugh",
      "levas",
      "levee",
      "leves",
      "levin",
      "levis",
      "lewis",
      "lexes",
      "lexis",
      "lezes",
      "lezza",
      "lezzy",
      "liana",
      "liane",
      "liang",
      "liard",
      "liars",
      "liart",
      "liber",
      "libra",
      "libri",
      "lichi",
      "licht",
      "licit",
      "licks",
      "lidar",
      "lidos",
      "liefs",
      "liens",
      "liers",
      "lieus",
      "lieve",
      "lifer",
      "lifes",
      "lifts",
      "ligan",
      "liger",
      "ligge",
      "ligne",
      "liked",
      "liker",
      "likes",
      "likin",
      "lills",
      "lilos",
      "lilts",
      "liman",
      "limas",
      "limax",
      "limba",
      "limbi",
      "limbs",
      "limby",
      "limed",
      "limen",
      "limes",
      "limey",
      "limma",
      "limns",
      "limos",
      "limpa",
      "limps",
      "linac",
      "linch",
      "linds",
      "lindy",
      "lined",
      "lines",
      "liney",
      "linga",
      "lings",
      "lingy",
      "linin",
      "links",
      "linky",
      "linns",
      "linny",
      "linos",
      "lints",
      "linty",
      "linum",
      "linux",
      "lions",
      "lipas",
      "lipes",
      "lipin",
      "lipos",
      "lippy",
      "liras",
      "lirks",
      "lirot",
      "lisks",
      "lisle",
      "lisps",
      "lists",
      "litai",
      "litas",
      "lited",
      "liter",
      "lites",
      "litho",
      "liths",
      "litre",
      "lived",
      "liven",
      "lives",
      "livor",
      "livre",
      "llano",
      "loach",
      "loads",
      "loafs",
      "loams",
      "loans",
      "loast",
      "loave",
      "lobar",
      "lobed",
      "lobes",
      "lobos",
      "lobus",
      "loche",
      "lochs",
      "locie",
      "locis",
      "locks",
      "locos",
      "locum",
      "loden",
      "lodes",
      "loess",
      "lofts",
      "logan",
      "loges",
      "loggy",
      "logia",
      "logie",
      "logoi",
      "logon",
      "logos",
      "lohan",
      "loids",
      "loins",
      "loipe",
      "loirs",
      "lokes",
      "lolls",
      "lolly",
      "lolog",
      "lomas",
      "lomed",
      "lomes",
      "loner",
      "longa",
      "longe",
      "longs",
      "looby",
      "looed",
      "looey",
      "loofa",
      "loofs",
      "looie",
      "looks",
      "looky",
      "looms",
      "loons",
      "loony",
      "loops",
      "loord",
      "loots",
      "loped",
      "loper",
      "lopes",
      "loppy",
      "loral",
      "loran",
      "lords",
      "lordy",
      "lorel",
      "lores",
      "loric",
      "loris",
      "losed",
      "losel",
      "losen",
      "loses",
      "lossy",
      "lotah",
      "lotas",
      "lotes",
      "lotic",
      "lotos",
      "lotsa",
      "lotta",
      "lotte",
      "lotto",
      "lotus",
      "loued",
      "lough",
      "louie",
      "louis",
      "louma",
      "lound",
      "louns",
      "loupe",
      "loups",
      "loure",
      "lours",
      "loury",
      "louts",
      "lovat",
      "loved",
      "loves",
      "lovey",
      "lovie",
      "lowan",
      "lowed",
      "lowes",
      "lownd",
      "lowne",
      "lowns",
      "lowps",
      "lowry",
      "lowse",
      "lowts",
      "loxed",
      "loxes",
      "lozen",
      "luach",
      "luaus",
      "lubed",
      "lubes",
      "lubra",
      "luces",
      "lucks",
      "lucre",
      "ludes",
      "ludic",
      "ludos",
      "luffa",
      "luffs",
      "luged",
      "luger",
      "luges",
      "lulls",
      "lulus",
      "lumas",
      "lumbi",
      "lumme",
      "lummy",
      "lumps",
      "lunas",
      "lunes",
      "lunet",
      "lungi",
      "lungs",
      "lunks",
      "lunts",
      "lupin",
      "lured",
      "lurer",
      "lures",
      "lurex",
      "lurgi",
      "lurgy",
      "lurks",
      "lurry",
      "lurve",
      "luser",
      "lushy",
      "lusks",
      "lusts",
      "lusus",
      "lutea",
      "luted",
      "luter",
      "lutes",
      "luvvy",
      "luxed",
      "luxer",
      "luxes",
      "lweis",
      "lyams",
      "lyard",
      "lyart",
      "lyase",
      "lycea",
      "lycee",
      "lycra",
      "lymes",
      "lynch",
      "lynes",
      "lyres",
      "lysed",
      "lyses",
      "lysin",
      "lysis",
      "lysol",
      "lyssa",
      "lyted",
      "lytes",
      "lythe",
      "lytic",
      "lytta",
      "maaed",
      "maare",
      "maars",
      "mabes",
      "macas",
      "maced",
      "macer",
      "maces",
      "mache",
      "machi",
      "machs",
      "macks",
      "macle",
      "macon",
      "madge",
      "madid",
      "madre",
      "maerl",
      "mafic",
      "mages",
      "maggs",
      "magot",
      "magus",
      "mahoe",
      "mahua",
      "mahwa",
      "maids",
      "maiko",
      "maiks",
      "maile",
      "maill",
      "mails",
      "maims",
      "mains",
      "maire",
      "mairs",
      "maise",
      "maist",
      "makar",
      "makes",
      "makis",
      "makos",
      "malam",
      "malar",
      "malas",
      "malax",
      "males",
      "malic",
      "malik",
      "malis",
      "malls",
      "malms",
      "malmy",
      "malts",
      "malty",
      "malus",
      "malva",
      "malwa",
      "mamas",
      "mamba",
      "mamee",
      "mamey",
      "mamie",
      "manas",
      "manat",
      "mandi",
      "maneb",
      "maned",
      "maneh",
      "manes",
      "manet",
      "mangs",
      "manis",
      "manky",
      "manna",
      "manos",
      "manse",
      "manta",
      "manto",
      "manty",
      "manul",
      "manus",
      "mapau",
      "maqui",
      "marae",
      "marah",
      "maras",
      "marcs",
      "mardy",
      "mares",
      "marge",
      "margs",
      "maria",
      "marid",
      "marka",
      "marks",
      "marle",
      "marls",
      "marly",
      "marms",
      "maron",
      "maror",
      "marra",
      "marri",
      "marse",
      "marts",
      "marvy",
      "masas",
      "mased",
      "maser",
      "mases",
      "mashy",
      "masks",
      "massa",
      "massy",
      "masts",
      "masty",
      "masus",
      "matai",
      "mated",
      "mater",
      "mates",
      "maths",
      "matin",
      "matlo",
      "matte",
      "matts",
      "matza",
      "matzo",
      "mauby",
      "mauds",
      "mauls",
      "maund",
      "mauri",
      "mausy",
      "mauts",
      "mauzy",
      "maven",
      "mavie",
      "mavin",
      "mavis",
      "mawed",
      "mawks",
      "mawky",
      "mawns",
      "mawrs",
      "maxed",
      "maxes",
      "maxis",
      "mayan",
      "mayas",
      "mayed",
      "mayos",
      "mayst",
      "mazed",
      "mazer",
      "mazes",
      "mazey",
      "mazut",
      "mbira",
      "meads",
      "meals",
      "meane",
      "means",
      "meany",
      "meare",
      "mease",
      "meath",
      "meats",
      "mebos",
      "mechs",
      "mecks",
      "medii",
      "medle",
      "meeds",
      "meers",
      "meets",
      "meffs",
      "meins",
      "meint",
      "meiny",
      "meith",
      "mekka",
      "melas",
      "melba",
      "melds",
      "melic",
      "melik",
      "mells",
      "melts",
      "melty",
      "memes",
      "memos",
      "menad",
      "mends",
      "mened",
      "menes",
      "menge",
      "mengs",
      "mensa",
      "mense",
      "mensh",
      "menta",
      "mento",
      "menus",
      "meous",
      "meows",
      "merch",
      "mercs",
      "merde",
      "mered",
      "merel",
      "merer",
      "meres",
      "meril",
      "meris",
      "merks",
      "merle",
      "merls",
      "merse",
      "mesal",
      "mesas",
      "mesel",
      "meses",
      "meshy",
      "mesic",
      "mesne",
      "meson",
      "messy",
      "mesto",
      "meted",
      "metes",
      "metho",
      "meths",
      "metic",
      "metif",
      "metis",
      "metol",
      "metre",
      "meuse",
      "meved",
      "meves",
      "mewed",
      "mewls",
      "meynt",
      "mezes",
      "mezze",
      "mezzo",
      "mhorr",
      "miaou",
      "miaow",
      "miasm",
      "miaul",
      "micas",
      "miche",
      "micht",
      "micks",
      "micky",
      "micos",
      "micra",
      "middy",
      "midgy",
      "midis",
      "miens",
      "mieve",
      "miffs",
      "miffy",
      "mifty",
      "miggs",
      "mihas",
      "mihis",
      "miked",
      "mikes",
      "mikra",
      "mikva",
      "milch",
      "milds",
      "miler",
      "miles",
      "milfs",
      "milia",
      "milko",
      "milks",
      "mille",
      "mills",
      "milor",
      "milos",
      "milpa",
      "milts",
      "milty",
      "miltz",
      "mimed",
      "mimeo",
      "mimer",
      "mimes",
      "mimsy",
      "minae",
      "minar",
      "minas",
      "mincy",
      "minds",
      "mined",
      "mines",
      "minge",
      "mings",
      "mingy",
      "minis",
      "minke",
      "minks",
      "minny",
      "minos",
      "mints",
      "mired",
      "mires",
      "mirex",
      "mirid",
      "mirin",
      "mirks",
      "mirky",
      "mirly",
      "miros",
      "mirvs",
      "mirza",
      "misch",
      "misdo",
      "mises",
      "misgo",
      "misos",
      "missa",
      "mists",
      "misty",
      "mitch",
      "miter",
      "mites",
      "mitis",
      "mitre",
      "mitts",
      "mixed",
      "mixen",
      "mixer",
      "mixes",
      "mixte",
      "mixup",
      "mizen",
      "mizzy",
      "mneme",
      "moans",
      "moats",
      "mobby",
      "mobes",
      "mobey",
      "mobie",
      "moble",
      "mochi",
      "mochs",
      "mochy",
      "mocks",
      "moder",
      "modes",
      "modge",
      "modii",
      "modus",
      "moers",
      "mofos",
      "moggy",
      "mohel",
      "mohos",
      "mohrs",
      "mohua",
      "mohur",
      "moile",
      "moils",
      "moira",
      "moire",
      "moits",
      "mojos",
      "mokes",
      "mokis",
      "mokos",
      "molal",
      "molas",
      "molds",
      "moled",
      "moles",
      "molla",
      "molls",
      "molly",
      "molto",
      "molts",
      "molys",
      "momes",
      "momma",
      "mommy",
      "momus",
      "monad",
      "monal",
      "monas",
      "monde",
      "mondo",
      "moner",
      "mongo",
      "mongs",
      "monic",
      "monie",
      "monks",
      "monos",
      "monte",
      "monty",
      "moobs",
      "mooch",
      "moods",
      "mooed",
      "mooks",
      "moola",
      "mooli",
      "mools",
      "mooly",
      "moong",
      "moons",
      "moony",
      "moops",
      "moors",
      "moory",
      "moots",
      "moove",
      "moped",
      "moper",
      "mopes",
      "mopey",
      "moppy",
      "mopsy",
      "mopus",
      "morae",
      "moras",
      "morat",
      "moray",
      "morel",
      "mores",
      "moria",
      "morne",
      "morns",
      "morra",
      "morro",
      "morse",
      "morts",
      "mosed",
      "moses",
      "mosey",
      "mosks",
      "mosso",
      "moste",
      "mosts",
      "moted",
      "moten",
      "motes",
      "motet",
      "motey",
      "moths",
      "mothy",
      "motis",
      "motte",
      "motts",
      "motty",
      "motus",
      "motza",
      "mouch",
      "moues",
      "mould",
      "mouls",
      "moups",
      "moust",
      "mousy",
      "moved",
      "moves",
      "mowas",
      "mowed",
      "mowra",
      "moxas",
      "moxie",
      "moyas",
      "moyle",
      "moyls",
      "mozed",
      "mozes",
      "mozos",
      "mpret",
      "mucho",
      "mucic",
      "mucid",
      "mucin",
      "mucks",
      "mucor",
      "mucro",
      "mudge",
      "mudir",
      "mudra",
      "muffs",
      "mufti",
      "mugga",
      "muggs",
      "muggy",
      "muhly",
      "muids",
      "muils",
      "muirs",
      "muist",
      "mujik",
      "mulct",
      "muled",
      "mules",
      "muley",
      "mulga",
      "mulie",
      "mulla",
      "mulls",
      "mulse",
      "mulsh",
      "mumms",
      "mumps",
      "mumsy",
      "mumus",
      "munga",
      "munge",
      "mungo",
      "mungs",
      "munis",
      "munts",
      "muntu",
      "muons",
      "muras",
      "mured",
      "mures",
      "murex",
      "murid",
      "murks",
      "murls",
      "murly",
      "murra",
      "murre",
      "murri",
      "murrs",
      "murry",
      "murti",
      "murva",
      "musar",
      "musca",
      "mused",
      "muser",
      "muses",
      "muset",
      "musha",
      "musit",
      "musks",
      "musos",
      "musse",
      "mussy",
      "musth",
      "musts",
      "mutch",
      "muted",
      "muter",
      "mutes",
      "mutha",
      "mutis",
      "muton",
      "mutts",
      "muxed",
      "muxes",
      "muzak",
      "muzzy",
      "mvule",
      "myall",
      "mylar",
      "mynah",
      "mynas",
      "myoid",
      "myoma",
      "myope",
      "myops",
      "myopy",
      "mysid",
      "mythi",
      "myths",
      "mythy",
      "myxos",
      "mzees",
      "naams",
      "naans",
      "nabes",
      "nabis",
      "nabks",
      "nabla",
      "nabob",
      "nache",
      "nacho",
      "nacre",
      "nadas",
      "naeve",
      "naevi",
      "naffs",
      "nagas",
      "naggy",
      "nagor",
      "nahal",
      "naiad",
      "naifs",
      "naiks",
      "nails",
      "naira",
      "nairu",
      "naked",
      "naker",
      "nakfa",
      "nalas",
      "naled",
      "nalla",
      "named",
      "namer",
      "names",
      "namma",
      "namus",
      "nanas",
      "nance",
      "nancy",
      "nandu",
      "nanna",
      "nanos",
      "nanua",
      "napas",
      "naped",
      "napes",
      "napoo",
      "nappa",
      "nappe",
      "nappy",
      "naras",
      "narco",
      "narcs",
      "nards",
      "nares",
      "naric",
      "naris",
      "narks",
      "narky",
      "narre",
      "nashi",
      "natch",
      "nates",
      "natis",
      "natty",
      "nauch",
      "naunt",
      "navar",
      "naves",
      "navew",
      "navvy",
      "nawab",
      "nazes",
      "nazir",
      "nazis",
      "nduja",
      "neafe",
      "neals",
      "neaps",
      "nears",
      "neath",
      "neats",
      "nebek",
      "nebel",
      "necks",
      "neddy",
      "needs",
      "neeld",
      "neele",
      "neemb",
      "neems",
      "neeps",
      "neese",
      "neeze",
      "negro",
      "negus",
      "neifs",
      "neist",
      "neive",
      "nelis",
      "nelly",
      "nemas",
      "nemns",
      "nempt",
      "nenes",
      "neons",
      "neper",
      "nepit",
      "neral",
      "nerds",
      "nerka",
      "nerks",
      "nerol",
      "nerts",
      "nertz",
      "nervy",
      "nests",
      "netes",
      "netop",
      "netts",
      "netty",
      "neuks",
      "neume",
      "neums",
      "nevel",
      "neves",
      "nevus",
      "newbs",
      "newed",
      "newel",
      "newie",
      "newsy",
      "newts",
      "nexts",
      "nexus",
      "ngaio",
      "ngana",
      "ngati",
      "ngoma",
      "ngwee",
      "nicad",
      "nicht",
      "nicks",
      "nicol",
      "nidal",
      "nided",
      "nides",
      "nidor",
      "nidus",
      "niefs",
      "nieve",
      "nifes",
      "niffs",
      "niffy",
      "nifty",
      "niger",
      "nighs",
      "nihil",
      "nikab",
      "nikah",
      "nikau",
      "nills",
      "nimbi",
      "nimbs",
      "nimps",
      "niner",
      "nines",
      "ninon",
      "nipas",
      "nippy",
      "niqab",
      "nirls",
      "nirly",
      "nisei",
      "nisse",
      "nisus",
      "niter",
      "nites",
      "nitid",
      "niton",
      "nitre",
      "nitro",
      "nitry",
      "nitty",
      "nival",
      "nixed",
      "nixer",
      "nixes",
      "nixie",
      "nizam",
      "nkosi",
      "noahs",
      "nobby",
      "nocks",
      "nodal",
      "noddy",
      "nodes",
      "nodus",
      "noels",
      "noggs",
      "nohow",
      "noils",
      "noily",
      "noint",
      "noirs",
      "noles",
      "nolls",
      "nolos",
      "nomas",
      "nomen",
      "nomes",
      "nomic",
      "nomoi",
      "nomos",
      "nonas",
      "nonce",
      "nones",
      "nonet",
      "nongs",
      "nonis",
      "nonny",
      "nonyl",
      "noobs",
      "nooit",
      "nooks",
      "nooky",
      "noons",
      "noops",
      "nopal",
      "noria",
      "noris",
      "norks",
      "norma",
      "norms",
      "nosed",
      "noser",
      "noses",
      "notal",
      "noted",
      "noter",
      "notes",
      "notum",
      "nould",
      "noule",
      "nouls",
      "nouns",
      "nouny",
      "noups",
      "novae",
      "novas",
      "novum",
      "noway",
      "nowed",
      "nowls",
      "nowts",
      "nowty",
      "noxal",
      "noxes",
      "noyau",
      "noyed",
      "noyes",
      "nubby",
      "nubia",
      "nucha",
      "nuddy",
      "nuder",
      "nudes",
      "nudie",
      "nudzh",
      "nuffs",
      "nugae",
      "nuked",
      "nukes",
      "nulla",
      "nulls",
      "numbs",
      "numen",
      "nummy",
      "nunny",
      "nurds",
      "nurdy",
      "nurls",
      "nurrs",
      "nutso",
      "nutsy",
      "nyaff",
      "nyala",
      "nying",
      "nyssa",
      "oaked",
      "oaker",
      "oakum",
      "oared",
      "oases",
      "oasis",
      "oasts",
      "oaten",
      "oater",
      "oaths",
      "oaves",
      "obang",
      "obeah",
      "obeli",
      "obeys",
      "obias",
      "obied",
      "obiit",
      "obits",
      "objet",
      "oboes",
      "obole",
      "oboli",
      "obols",
      "occam",
      "ocher",
      "oches",
      "ochre",
      "ochry",
      "ocker",
      "ocrea",
      "octad",
      "octan",
      "octas",
      "octyl",
      "oculi",
      "odahs",
      "odals",
      "odeon",
      "odeum",
      "odism",
      "odist",
      "odium",
      "odors",
      "odour",
      "odyle",
      "odyls",
      "ofays",
      "offed",
      "offie",
      "oflag",
      "ofter",
      "ogams",
      "ogeed",
      "ogees",
      "oggin",
      "ogham",
      "ogive",
      "ogled",
      "ogler",
      "ogles",
      "ogmic",
      "ogres",
      "ohias",
      "ohing",
      "ohmic",
      "ohone",
      "oidia",
      "oiled",
      "oiler",
      "oinks",
      "oints",
      "ojime",
      "okapi",
      "okays",
      "okehs",
      "okras",
      "oktas",
      "oldie",
      "oleic",
      "olein",
      "olent",
      "oleos",
      "oleum",
      "olios",
      "ollas",
      "ollav",
      "oller",
      "ollie",
      "ology",
      "olpae",
      "olpes",
      "omasa",
      "omber",
      "ombus",
      "omens",
      "omers",
      "omits",
      "omlah",
      "omovs",
      "omrah",
      "oncer",
      "onces",
      "oncet",
      "oncus",
      "onely",
      "oners",
      "onery",
      "onium",
      "onkus",
      "onlay",
      "onned",
      "ontic",
      "oobit",
      "oohed",
      "oomph",
      "oonts",
      "ooped",
      "oorie",
      "ooses",
      "ootid",
      "oozed",
      "oozes",
      "opahs",
      "opals",
      "opens",
      "opepe",
      "oping",
      "oppos",
      "opsin",
      "opted",
      "opter",
      "orach",
      "oracy",
      "orals",
      "orang",
      "orant",
      "orate",
      "orbed",
      "orcas",
      "orcin",
      "ordos",
      "oread",
      "orfes",
      "orgia",
      "orgic",
      "orgue",
      "oribi",
      "oriel",
      "orixa",
      "orles",
      "orlon",
      "orlop",
      "ormer",
      "ornis",
      "orpin",
      "orris",
      "ortho",
      "orval",
      "orzos",
      "oscar",
      "oshac",
      "osier",
      "osmic",
      "osmol",
      "ossia",
      "ostia",
      "otaku",
      "otary",
      "ottar",
      "ottos",
      "oubit",
      "oucht",
      "ouens",
      "ouija",
      "oulks",
      "oumas",
      "oundy",
      "oupas",
      "ouped",
      "ouphe",
      "ouphs",
      "ourie",
      "ousel",
      "ousts",
      "outby",
      "outed",
      "outre",
      "outro",
      "outta",
      "ouzel",
      "ouzos",
      "ovals",
      "ovels",
      "ovens",
      "overs",
      "ovist",
      "ovoli",
      "ovolo",
      "ovule",
      "owche",
      "owies",
      "owled",
      "owler",
      "owlet",
      "owned",
      "owres",
      "owrie",
      "owsen",
      "oxbow",
      "oxers",
      "oxeye",
      "oxids",
      "oxies",
      "oxime",
      "oxims",
      "oxlip",
      "oxter",
      "oyers",
      "ozeki",
      "ozzie",
      "paals",
      "paans",
      "pacas",
      "paced",
      "pacer",
      "paces",
      "pacey",
      "pacha",
      "packs",
      "pacos",
      "pacta",
      "pacts",
      "padis",
      "padle",
      "padma",
      "padre",
      "padri",
      "paean",
      "paedo",
      "paeon",
      "paged",
      "pager",
      "pages",
      "pagle",
      "pagod",
      "pagri",
      "paiks",
      "pails",
      "pains",
      "paire",
      "pairs",
      "paisa",
      "paise",
      "pakka",
      "palas",
      "palay",
      "palea",
      "paled",
      "pales",
      "palet",
      "palis",
      "palki",
      "palla",
      "palls",
      "pally",
      "palms",
      "palmy",
      "palpi",
      "palps",
      "palsa",
      "pampa",
      "panax",
      "pance",
      "panda",
      "pands",
      "pandy",
      "paned",
      "panes",
      "panga",
      "pangs",
      "panim",
      "panko",
      "panne",
      "panni",
      "panto",
      "pants",
      "panty",
      "paoli",
      "paolo",
      "papas",
      "papaw",
      "papes",
      "pappi",
      "pappy",
      "parae",
      "paras",
      "parch",
      "pardi",
      "pards",
      "pardy",
      "pared",
      "paren",
      "pareo",
      "pares",
      "pareu",
      "parev",
      "parge",
      "pargo",
      "paris",
      "parki",
      "parks",
      "parky",
      "parle",
      "parly",
      "parma",
      "parol",
      "parps",
      "parra",
      "parrs",
      "parti",
      "parts",
      "parve",
      "parvo",
      "paseo",
      "pases",
      "pasha",
      "pashm",
      "paska",
      "paspy",
      "passe",
      "pasts",
      "pated",
      "paten",
      "pater",
      "pates",
      "paths",
      "patin",
      "patka",
      "patly",
      "patte",
      "patus",
      "pauas",
      "pauls",
      "pavan",
      "paved",
      "paven",
      "paver",
      "paves",
      "pavid",
      "pavin",
      "pavis",
      "pawas",
      "pawaw",
      "pawed",
      "pawer",
      "pawks",
      "pawky",
      "pawls",
      "pawns",
      "paxes",
      "payed",
      "payor",
      "paysd",
      "peage",
      "peags",
      "peaks",
      "peaky",
      "peals",
      "peans",
      "peare",
      "pears",
      "peart",
      "pease",
      "peats",
      "peaty",
      "peavy",
      "peaze",
      "pebas",
      "pechs",
      "pecke",
      "pecks",
      "pecky",
      "pedes",
      "pedis",
      "pedro",
      "peece",
      "peeks",
      "peels",
      "peens",
      "peeoy",
      "peepe",
      "peeps",
      "peers",
      "peery",
      "peeve",
      "peggy",
      "peghs",
      "peins",
      "peise",
      "peize",
      "pekan",
      "pekes",
      "pekin",
      "pekoe",
      "pelas",
      "pelau",
      "peles",
      "pelfs",
      "pells",
      "pelma",
      "pelon",
      "pelta",
      "pelts",
      "pends",
      "pendu",
      "pened",
      "penes",
      "pengo",
      "penie",
      "penis",
      "penks",
      "penna",
      "penni",
      "pents",
      "peons",
      "peony",
      "pepla",
      "pepos",
      "peppy",
      "pepsi",
      "perai",
      "perce",
      "percs",
      "perdu",
      "perdy",
      "perea",
      "peres",
      "peris",
      "perks",
      "perms",
      "perns",
      "perog",
      "perps",
      "perry",
      "perse",
      "perst",
      "perts",
      "perve",
      "pervo",
      "pervs",
      "pervy",
      "pesos",
      "pests",
      "pesty",
      "petar",
      "peter",
      "petit",
      "petre",
      "petri",
      "petti",
      "petto",
      "pewee",
      "pewit",
      "peyse",
      "phage",
      "phang",
      "phare",
      "pharm",
      "pheer",
      "phene",
      "pheon",
      "phese",
      "phial",
      "phish",
      "phizz",
      "phlox",
      "phoca",
      "phono",
      "phons",
      "phots",
      "phpht",
      "phuts",
      "phyla",
      "phyle",
      "piani",
      "pians",
      "pibal",
      "pical",
      "picas",
      "piccy",
      "picks",
      "picot",
      "picra",
      "picul",
      "piend",
      "piers",
      "piert",
      "pieta",
      "piets",
      "piezo",
      "pight",
      "pigmy",
      "piing",
      "pikas",
      "pikau",
      "piked",
      "piker",
      "pikes",
      "pikey",
      "pikis",
      "pikul",
      "pilae",
      "pilaf",
      "pilao",
      "pilar",
      "pilau",
      "pilaw",
      "pilch",
      "pilea",
      "piled",
      "pilei",
      "piler",
      "piles",
      "pilis",
      "pills",
      "pilow",
      "pilum",
      "pilus",
      "pimas",
      "pimps",
      "pinas",
      "pined",
      "pines",
      "pingo",
      "pings",
      "pinko",
      "pinks",
      "pinna",
      "pinny",
      "pinon",
      "pinot",
      "pinta",
      "pints",
      "pinup",
      "pions",
      "piony",
      "pious",
      "pioye",
      "pioys",
      "pipal",
      "pipas",
      "piped",
      "pipes",
      "pipet",
      "pipis",
      "pipit",
      "pippy",
      "pipul",
      "pirai",
      "pirls",
      "pirns",
      "pirog",
      "pisco",
      "pises",
      "pisky",
      "pisos",
      "pissy",
      "piste",
      "pitas",
      "piths",
      "piton",
      "pitot",
      "pitta",
      "piums",
      "pixes",
      "pized",
      "pizes",
      "plaas",
      "plack",
      "plage",
      "plans",
      "plaps",
      "plash",
      "plasm",
      "plast",
      "plats",
      "platt",
      "platy",
      "playa",
      "plays",
      "pleas",
      "plebe",
      "plebs",
      "plena",
      "pleon",
      "plesh",
      "plews",
      "plica",
      "plies",
      "plims",
      "pling",
      "plink",
      "ploat",
      "plods",
      "plong",
      "plonk",
      "plook",
      "plops",
      "plots",
      "plotz",
      "plouk",
      "plows",
      "ploye",
      "ploys",
      "plues",
      "pluff",
      "plugs",
      "plums",
      "plumy",
      "pluot",
      "pluto",
      "plyer",
      "poach",
      "poaka",
      "poake",
      "poboy",
      "pocks",
      "pocky",
      "podal",
      "poddy",
      "podex",
      "podge",
      "podgy",
      "podia",
      "poems",
      "poeps",
      "poets",
      "pogey",
      "pogge",
      "pogos",
      "pohed",
      "poilu",
      "poind",
      "pokal",
      "poked",
      "pokes",
      "pokey",
      "pokie",
      "poled",
      "poler",
      "poles",
      "poley",
      "polio",
      "polis",
      "polje",
      "polks",
      "polls",
      "polly",
      "polos",
      "polts",
      "polys",
      "pombe",
      "pomes",
      "pommy",
      "pomos",
      "pomps",
      "ponce",
      "poncy",
      "ponds",
      "pones",
      "poney",
      "ponga",
      "pongo",
      "pongs",
      "pongy",
      "ponks",
      "ponts",
      "ponty",
      "ponzu",
      "poods",
      "pooed",
      "poofs",
      "poofy",
      "poohs",
      "pooja",
      "pooka",
      "pooks",
      "pools",
      "poons",
      "poops",
      "poopy",
      "poori",
      "poort",
      "poots",
      "poove",
      "poovy",
      "popes",
      "poppa",
      "popsy",
      "porae",
      "poral",
      "pored",
      "porer",
      "pores",
      "porge",
      "porgy",
      "porin",
      "porks",
      "porky",
      "porno",
      "porns",
      "porny",
      "porta",
      "ports",
      "porty",
      "posed",
      "poses",
      "posey",
      "posho",
      "posts",
      "potae",
      "potch",
      "poted",
      "potes",
      "potin",
      "potoo",
      "potsy",
      "potto",
      "potts",
      "potty",
      "pouff",
      "poufs",
      "pouke",
      "pouks",
      "poule",
      "poulp",
      "poult",
      "poupe",
      "poupt",
      "pours",
      "pouts",
      "powan",
      "powin",
      "pownd",
      "powns",
      "powny",
      "powre",
      "poxed",
      "poxes",
      "poynt",
      "poyou",
      "poyse",
      "pozzy",
      "praam",
      "prads",
      "prahu",
      "prams",
      "prana",
      "prang",
      "praos",
      "prase",
      "prate",
      "prats",
      "pratt",
      "praty",
      "praus",
      "prays",
      "predy",
      "preed",
      "prees",
      "preif",
      "prems",
      "premy",
      "prent",
      "preon",
      "preop",
      "preps",
      "presa",
      "prese",
      "prest",
      "preve",
      "prexy",
      "preys",
      "prial",
      "pricy",
      "prief",
      "prier",
      "pries",
      "prigs",
      "prill",
      "prima",
      "primi",
      "primp",
      "prims",
      "primy",
      "prink",
      "prion",
      "prise",
      "priss",
      "proas",
      "probs",
      "prods",
      "proem",
      "profs",
      "progs",
      "proin",
      "proke",
      "prole",
      "proll",
      "promo",
      "proms",
      "pronk",
      "props",
      "prore",
      "proso",
      "pross",
      "prost",
      "prosy",
      "proto",
      "proul",
      "prows",
      "proyn",
      "prunt",
      "pruta",
      "pryer",
      "pryse",
      "pseud",
      "pshaw",
      "psion",
      "psoae",
      "psoai",
      "psoas",
      "psora",
      "psych",
      "psyop",
      "pubco",
      "pubes",
      "pubis",
      "pucan",
      "pucer",
      "puces",
      "pucka",
      "pucks",
      "puddy",
      "pudge",
      "pudic",
      "pudor",
      "pudsy",
      "pudus",
      "puers",
      "puffa",
      "puffs",
      "puggy",
      "pugil",
      "puhas",
      "pujah",
      "pujas",
      "pukas",
      "puked",
      "puker",
      "pukes",
      "pukey",
      "pukka",
      "pukus",
      "pulao",
      "pulas",
      "puled",
      "puler",
      "pules",
      "pulik",
      "pulis",
      "pulka",
      "pulks",
      "pulli",
      "pulls",
      "pully",
      "pulmo",
      "pulps",
      "pulus",
      "pumas",
      "pumie",
      "pumps",
      "punas",
      "punce",
      "punga",
      "pungs",
      "punji",
      "punka",
      "punks",
      "punky",
      "punny",
      "punto",
      "punts",
      "punty",
      "pupae",
      "pupal",
      "pupas",
      "pupus",
      "purda",
      "pured",
      "pures",
      "purin",
      "puris",
      "purls",
      "purpy",
      "purrs",
      "pursy",
      "purty",
      "puses",
      "pusle",
      "pussy",
      "putid",
      "puton",
      "putti",
      "putto",
      "putts",
      "puzel",
      "pwned",
      "pyats",
      "pyets",
      "pygal",
      "pyins",
      "pylon",
      "pyned",
      "pynes",
      "pyoid",
      "pyots",
      "pyral",
      "pyran",
      "pyres",
      "pyrex",
      "pyric",
      "pyros",
      "pyxed",
      "pyxes",
      "pyxie",
      "pyxis",
      "pzazz",
      "qadis",
      "qaids",
      "qajaq",
      "qanat",
      "qapik",
      "qibla",
      "qophs",
      "qorma",
      "quads",
      "quaff",
      "quags",
      "quair",
      "quais",
      "quaky",
      "quale",
      "quant",
      "quare",
      "quass",
      "quate",
      "quats",
      "quayd",
      "quays",
      "qubit",
      "quean",
      "queme",
      "quena",
      "quern",
      "queyn",
      "queys",
      "quich",
      "quids",
      "quiff",
      "quims",
      "quina",
      "quine",
      "quino",
      "quins",
      "quint",
      "quipo",
      "quips",
      "quipu",
      "quire",
      "quirt",
      "quist",
      "quits",
      "quoad",
      "quods",
      "quoif",
      "quoin",
      "quoit",
      "quoll",
      "quonk",
      "quops",
      "quran",
      "qursh",
      "quyte",
      "rabat",
      "rabic",
      "rabis",
      "raced",
      "races",
      "rache",
      "racks",
      "racon",
      "radge",
      "radix",
      "radon",
      "raffs",
      "rafts",
      "ragas",
      "ragde",
      "raged",
      "ragee",
      "rager",
      "rages",
      "ragga",
      "raggs",
      "raggy",
      "ragis",
      "ragus",
      "rahed",
      "rahui",
      "raias",
      "raids",
      "raiks",
      "raile",
      "rails",
      "raine",
      "rains",
      "raird",
      "raita",
      "raits",
      "rajas",
      "rajes",
      "raked",
      "rakee",
      "raker",
      "rakes",
      "rakia",
      "rakis",
      "rakus",
      "rales",
      "ramal",
      "ramee",
      "ramet",
      "ramie",
      "ramin",
      "ramis",
      "rammy",
      "ramps",
      "ramus",
      "ranas",
      "rance",
      "rands",
      "ranee",
      "ranga",
      "rangi",
      "rangs",
      "rangy",
      "ranid",
      "ranis",
      "ranke",
      "ranks",
      "rants",
      "raped",
      "raper",
      "rapes",
      "raphe",
      "rappe",
      "rared",
      "raree",
      "rares",
      "rarks",
      "rased",
      "raser",
      "rases",
      "rasps",
      "rasse",
      "rasta",
      "ratal",
      "ratan",
      "ratas",
      "ratch",
      "rated",
      "ratel",
      "rater",
      "rates",
      "ratha",
      "rathe",
      "raths",
      "ratoo",
      "ratos",
      "ratus",
      "rauns",
      "raupo",
      "raved",
      "ravel",
      "raver",
      "raves",
      "ravey",
      "ravin",
      "rawer",
      "rawin",
      "rawly",
      "rawns",
      "raxed",
      "raxes",
      "rayah",
      "rayas",
      "rayed",
      "rayle",
      "rayne",
      "razed",
      "razee",
      "razer",
      "razes",
      "razoo",
      "readd",
      "reads",
      "reais",
      "reaks",
      "realo",
      "reals",
      "reame",
      "reams",
      "reamy",
      "reans",
      "reaps",
      "rears",
      "reast",
      "reata",
      "reate",
      "reave",
      "rebbe",
      "rebec",
      "rebid",
      "rebit",
      "rebop",
      "rebuy",
      "recal",
      "recce",
      "recco",
      "reccy",
      "recit",
      "recks",
      "recon",
      "recta",
      "recti",
      "recto",
      "redan",
      "redds",
      "reddy",
      "reded",
      "redes",
      "redia",
      "redid",
      "redip",
      "redly",
      "redon",
      "redos",
      "redox",
      "redry",
      "redub",
      "redux",
      "redye",
      "reech",
      "reede",
      "reeds",
      "reefs",
      "reefy",
      "reeks",
      "reeky",
      "reels",
      "reens",
      "reest",
      "reeve",
      "refed",
      "refel",
      "reffo",
      "refis",
      "refix",
      "refly",
      "refry",
      "regar",
      "reges",
      "reggo",
      "regie",
      "regma",
      "regna",
      "regos",
      "regur",
      "rehem",
      "reifs",
      "reify",
      "reiki",
      "reiks",
      "reink",
      "reins",
      "reird",
      "reist",
      "reive",
      "rejig",
      "rejon",
      "reked",
      "rekes",
      "rekey",
      "relet",
      "relie",
      "relit",
      "rello",
      "reman",
      "remap",
      "remen",
      "remet",
      "remex",
      "remix",
      "renay",
      "rends",
      "reney",
      "renga",
      "renig",
      "renin",
      "renne",
      "renos",
      "rente",
      "rents",
      "reoil",
      "reorg",
      "repeg",
      "repin",
      "repla",
      "repos",
      "repot",
      "repps",
      "repro",
      "reran",
      "rerig",
      "resat",
      "resaw",
      "resay",
      "resee",
      "reses",
      "resew",
      "resid",
      "resit",
      "resod",
      "resow",
      "resto",
      "rests",
      "resty",
      "resus",
      "retag",
      "retax",
      "retem",
      "retia",
      "retie",
      "retox",
      "revet",
      "revie",
      "rewan",
      "rewax",
      "rewed",
      "rewet",
      "rewin",
      "rewon",
      "rewth",
      "rexes",
      "rezes",
      "rheas",
      "rheme",
      "rheum",
      "rhies",
      "rhime",
      "rhine",
      "rhody",
      "rhomb",
      "rhone",
      "rhumb",
      "rhyne",
      "rhyta",
      "riads",
      "rials",
      "riant",
      "riata",
      "ribas",
      "ribby",
      "ribes",
      "riced",
      "ricer",
      "rices",
      "ricey",
      "richt",
      "ricin",
      "ricks",
      "rides",
      "ridgy",
      "ridic",
      "riels",
      "riems",
      "rieve",
      "rifer",
      "riffs",
      "rifte",
      "rifts",
      "rifty",
      "riggs",
      "rigol",
      "riled",
      "riles",
      "riley",
      "rille",
      "rills",
      "rimae",
      "rimed",
      "rimer",
      "rimes",
      "rimus",
      "rinds",
      "rindy",
      "rines",
      "rings",
      "rinks",
      "rioja",
      "riots",
      "riped",
      "ripes",
      "ripps",
      "rises",
      "rishi",
      "risks",
      "risps",
      "risus",
      "rites",
      "ritts",
      "ritzy",
      "rivas",
      "rived",
      "rivel",
      "riven",
      "rives",
      "riyal",
      "rizas",
      "roads",
      "roams",
      "roans",
      "roars",
      "roary",
      "roate",
      "robed",
      "robes",
      "roble",
      "rocks",
      "roded",
      "rodes",
      "roguy",
      "rohes",
      "roids",
      "roils",
      "roily",
      "roins",
      "roist",
      "rojak",
      "rojis",
      "roked",
      "roker",
      "rokes",
      "rolag",
      "roles",
      "rolfs",
      "rolls",
      "romal",
      "roman",
      "romeo",
      "romps",
      "ronde",
      "rondo",
      "roneo",
      "rones",
      "ronin",
      "ronne",
      "ronte",
      "ronts",
      "roods",
      "roofs",
      "roofy",
      "rooks",
      "rooky",
      "rooms",
      "roons",
      "roops",
      "roopy",
      "roosa",
      "roose",
      "roots",
      "rooty",
      "roped",
      "roper",
      "ropes",
      "ropey",
      "roque",
      "roral",
      "rores",
      "roric",
      "rorid",
      "rorie",
      "rorts",
      "rorty",
      "rosed",
      "roses",
      "roset",
      "roshi",
      "rosin",
      "rosit",
      "rosti",
      "rosts",
      "rotal",
      "rotan",
      "rotas",
      "rotch",
      "roted",
      "rotes",
      "rotis",
      "rotls",
      "roton",
      "rotos",
      "rotte",
      "rouen",
      "roues",
      "roule",
      "rouls",
      "roums",
      "roups",
      "roupy",
      "roust",
      "routh",
      "routs",
      "roved",
      "roven",
      "roves",
      "rowan",
      "rowed",
      "rowel",
      "rowen",
      "rowie",
      "rowme",
      "rownd",
      "rowth",
      "rowts",
      "royne",
      "royst",
      "rozet",
      "rozit",
      "ruana",
      "rubai",
      "rubby",
      "rubel",
      "rubes",
      "rubin",
      "ruble",
      "rubli",
      "rubus",
      "ruche",
      "rucks",
      "rudas",
      "rudds",
      "rudes",
      "rudie",
      "rudis",
      "rueda",
      "ruers",
      "ruffe",
      "ruffs",
      "rugae",
      "rugal",
      "ruggy",
      "ruing",
      "ruins",
      "rukhs",
      "ruled",
      "rules",
      "rumal",
      "rumbo",
      "rumen",
      "rumes",
      "rumly",
      "rummy",
      "rumpo",
      "rumps",
      "rumpy",
      "runch",
      "runds",
      "runed",
      "runes",
      "rungs",
      "runic",
      "runny",
      "runts",
      "runty",
      "rupia",
      "rurps",
      "rurus",
      "rusas",
      "ruses",
      "rushy",
      "rusks",
      "rusma",
      "russe",
      "rusts",
      "ruths",
      "rutin",
      "rutty",
      "ryals",
      "rybat",
      "ryked",
      "rykes",
      "rymme",
      "rynds",
      "ryots",
      "ryper",
      "saags",
      "sabal",
      "sabed",
      "saber",
      "sabes",
      "sabha",
      "sabin",
      "sabir",
      "sable",
      "sabot",
      "sabra",
      "sabre",
      "sacks",
      "sacra",
      "saddo",
      "sades",
      "sadhe",
      "sadhu",
      "sadis",
      "sados",
      "sadza",
      "safed",
      "safes",
      "sagas",
      "sager",
      "sages",
      "saggy",
      "sagos",
      "sagum",
      "saheb",
      "sahib",
      "saice",
      "saick",
      "saics",
      "saids",
      "saiga",
      "sails",
      "saims",
      "saine",
      "sains",
      "sairs",
      "saist",
      "saith",
      "sajou",
      "sakai",
      "saker",
      "sakes",
      "sakia",
      "sakis",
      "sakti",
      "salal",
      "salat",
      "salep",
      "sales",
      "salet",
      "salic",
      "salix",
      "salle",
      "salmi",
      "salol",
      "salop",
      "salpa",
      "salps",
      "salse",
      "salto",
      "salts",
      "salue",
      "salut",
      "saman",
      "samas",
      "samba",
      "sambo",
      "samek",
      "samel",
      "samen",
      "sames",
      "samey",
      "samfu",
      "sammy",
      "sampi",
      "samps",
      "sands",
      "saned",
      "sanes",
      "sanga",
      "sangh",
      "sango",
      "sangs",
      "sanko",
      "sansa",
      "santo",
      "sants",
      "saola",
      "sapan",
      "sapid",
      "sapor",
      "saran",
      "sards",
      "sared",
      "saree",
      "sarge",
      "sargo",
      "sarin",
      "saris",
      "sarks",
      "sarky",
      "sarod",
      "saros",
      "sarus",
      "saser",
      "sasin",
      "sasse",
      "satai",
      "satay",
      "sated",
      "satem",
      "sates",
      "satis",
      "sauba",
      "sauch",
      "saugh",
      "sauls",
      "sault",
      "saunt",
      "saury",
      "sauts",
      "saved",
      "saver",
      "saves",
      "savey",
      "savin",
      "sawah",
      "sawed",
      "sawer",
      "saxes",
      "sayed",
      "sayer",
      "sayid",
      "sayne",
      "sayon",
      "sayst",
      "sazes",
      "scabs",
      "scads",
      "scaff",
      "scags",
      "scail",
      "scala",
      "scall",
      "scams",
      "scand",
      "scans",
      "scapa",
      "scape",
      "scapi",
      "scarp",
      "scars",
      "scart",
      "scath",
      "scats",
      "scatt",
      "scaud",
      "scaup",
      "scaur",
      "scaws",
      "sceat",
      "scena",
      "scend",
      "schav",
      "schmo",
      "schul",
      "schwa",
      "sclim",
      "scody",
      "scogs",
      "scoog",
      "scoot",
      "scopa",
      "scops",
      "scots",
      "scoug",
      "scoup",
      "scowp",
      "scows",
      "scrab",
      "scrae",
      "scrag",
      "scran",
      "scrat",
      "scraw",
      "scray",
      "scrim",
      "scrip",
      "scrob",
      "scrod",
      "scrog",
      "scrow",
      "scudi",
      "scudo",
      "scuds",
      "scuff",
      "scuft",
      "scugs",
      "sculk",
      "scull",
      "sculp",
      "sculs",
      "scums",
      "scups",
      "scurf",
      "scurs",
      "scuse",
      "scuta",
      "scute",
      "scuts",
      "scuzz",
      "scyes",
      "sdayn",
      "sdein",
      "seals",
      "seame",
      "seams",
      "seamy",
      "seans",
      "seare",
      "sears",
      "sease",
      "seats",
      "seaze",
      "sebum",
      "secco",
      "sechs",
      "sects",
      "seder",
      "sedes",
      "sedge",
      "sedgy",
      "sedum",
      "seeds",
      "seeks",
      "seeld",
      "seels",
      "seely",
      "seems",
      "seeps",
      "seepy",
      "seers",
      "sefer",
      "segar",
      "segni",
      "segno",
      "segol",
      "segos",
      "sehri",
      "seifs",
      "seils",
      "seine",
      "seirs",
      "seise",
      "seism",
      "seity",
      "seiza",
      "sekos",
      "sekts",
      "selah",
      "seles",
      "selfs",
      "sella",
      "selle",
      "sells",
      "selva",
      "semee",
      "semes",
      "semie",
      "semis",
      "senas",
      "sends",
      "senes",
      "sengi",
      "senna",
      "senor",
      "sensa",
      "sensi",
      "sente",
      "senti",
      "sents",
      "senvy",
      "senza",
      "sepad",
      "sepal",
      "sepic",
      "sepoy",
      "septa",
      "septs",
      "serac",
      "serai",
      "seral",
      "sered",
      "serer",
      "seres",
      "serfs",
      "serge",
      "seric",
      "serin",
      "serks",
      "seron",
      "serow",
      "serra",
      "serre",
      "serrs",
      "serry",
      "servo",
      "sesey",
      "sessa",
      "setae",
      "setal",
      "seton",
      "setts",
      "sewan",
      "sewar",
      "sewed",
      "sewel",
      "sewen",
      "sewin",
      "sexed",
      "sexer",
      "sexes",
      "sexto",
      "sexts",
      "seyen",
      "shads",
      "shags",
      "shahs",
      "shako",
      "shakt",
      "shalm",
      "shaly",
      "shama",
      "shams",
      "shand",
      "shans",
      "shaps",
      "sharn",
      "shash",
      "shaul",
      "shawm",
      "shawn",
      "shaws",
      "shaya",
      "shays",
      "shchi",
      "sheaf",
      "sheal",
      "sheas",
      "sheds",
      "sheel",
      "shend",
      "shent",
      "sheol",
      "sherd",
      "shere",
      "shero",
      "shets",
      "sheva",
      "shewn",
      "shews",
      "shiai",
      "shiel",
      "shier",
      "shies",
      "shill",
      "shily",
      "shims",
      "shins",
      "ships",
      "shirr",
      "shirs",
      "shish",
      "shiso",
      "shist",
      "shite",
      "shits",
      "shiur",
      "shiva",
      "shive",
      "shivs",
      "shlep",
      "shlub",
      "shmek",
      "shmoe",
      "shoat",
      "shoed",
      "shoer",
      "shoes",
      "shogi",
      "shogs",
      "shoji",
      "shojo",
      "shola",
      "shool",
      "shoon",
      "shoos",
      "shope",
      "shops",
      "shorl",
      "shote",
      "shots",
      "shott",
      "showd",
      "shows",
      "shoyu",
      "shred",
      "shris",
      "shrow",
      "shtik",
      "shtum",
      "shtup",
      "shule",
      "shuln",
      "shuls",
      "shuns",
      "shura",
      "shute",
      "shuts",
      "shwas",
      "shyer",
      "sials",
      "sibbs",
      "sibyl",
      "sices",
      "sicht",
      "sicko",
      "sicks",
      "sicky",
      "sidas",
      "sided",
      "sider",
      "sides",
      "sidha",
      "sidhe",
      "sidle",
      "sield",
      "siens",
      "sient",
      "sieth",
      "sieur",
      "sifts",
      "sighs",
      "sigil",
      "sigla",
      "signa",
      "signs",
      "sijos",
      "sikas",
      "siker",
      "sikes",
      "silds",
      "siled",
      "silen",
      "siler",
      "siles",
      "silex",
      "silks",
      "sills",
      "silos",
      "silts",
      "silty",
      "silva",
      "simar",
      "simas",
      "simba",
      "simis",
      "simps",
      "simul",
      "sinds",
      "sined",
      "sines",
      "sings",
      "sinhs",
      "sinks",
      "sinky",
      "sinus",
      "siped",
      "sipes",
      "sippy",
      "sired",
      "siree",
      "sires",
      "sirih",
      "siris",
      "siroc",
      "sirra",
      "sirup",
      "sisal",
      "sises",
      "sista",
      "sists",
      "sitar",
      "sited",
      "sites",
      "sithe",
      "sitka",
      "situp",
      "situs",
      "siver",
      "sixer",
      "sixes",
      "sixmo",
      "sixte",
      "sizar",
      "sized",
      "sizel",
      "sizer",
      "sizes",
      "skags",
      "skail",
      "skald",
      "skank",
      "skart",
      "skats",
      "skatt",
      "skaws",
      "skean",
      "skear",
      "skeds",
      "skeed",
      "skeef",
      "skeen",
      "skeer",
      "skees",
      "skeet",
      "skegg",
      "skegs",
      "skein",
      "skelf",
      "skell",
      "skelm",
      "skelp",
      "skene",
      "skens",
      "skeos",
      "skeps",
      "skers",
      "skets",
      "skews",
      "skids",
      "skied",
      "skies",
      "skiey",
      "skimo",
      "skims",
      "skink",
      "skins",
      "skint",
      "skios",
      "skips",
      "skirl",
      "skirr",
      "skite",
      "skits",
      "skive",
      "skivy",
      "sklim",
      "skoal",
      "skody",
      "skoff",
      "skogs",
      "skols",
      "skool",
      "skort",
      "skosh",
      "skran",
      "skrik",
      "skuas",
      "skugs",
      "skyed",
      "skyer",
      "skyey",
      "skyfs",
      "skyre",
      "skyrs",
      "skyte",
      "slabs",
      "slade",
      "slaes",
      "slags",
      "slaid",
      "slake",
      "slams",
      "slane",
      "slank",
      "slaps",
      "slart",
      "slats",
      "slaty",
      "slave",
      "slaws",
      "slays",
      "slebs",
      "sleds",
      "sleer",
      "slews",
      "sleys",
      "slier",
      "slily",
      "slims",
      "slipe",
      "slips",
      "slipt",
      "slish",
      "slits",
      "slive",
      "sloan",
      "slobs",
      "sloes",
      "slogs",
      "sloid",
      "slojd",
      "slomo",
      "sloom",
      "sloot",
      "slops",
      "slopy",
      "slorm",
      "slots",
      "slove",
      "slows",
      "sloyd",
      "slubb",
      "slubs",
      "slued",
      "slues",
      "sluff",
      "slugs",
      "sluit",
      "slums",
      "slurb",
      "slurs",
      "sluse",
      "sluts",
      "slyer",
      "slype",
      "smaak",
      "smaik",
      "smalm",
      "smalt",
      "smarm",
      "smaze",
      "smeek",
      "smees",
      "smeik",
      "smeke",
      "smerk",
      "smews",
      "smirr",
      "smirs",
      "smits",
      "smogs",
      "smoko",
      "smolt",
      "smoor",
      "smoot",
      "smore",
      "smorg",
      "smout",
      "smowt",
      "smugs",
      "smurs",
      "smush",
      "smuts",
      "snabs",
      "snafu",
      "snags",
      "snaps",
      "snarf",
      "snark",
      "snars",
      "snary",
      "snash",
      "snath",
      "snaws",
      "snead",
      "sneap",
      "snebs",
      "sneck",
      "sneds",
      "sneed",
      "snees",
      "snell",
      "snibs",
      "snick",
      "snies",
      "snift",
      "snigs",
      "snips",
      "snipy",
      "snirt",
      "snits",
      "snobs",
      "snods",
      "snoek",
      "snoep",
      "snogs",
      "snoke",
      "snood",
      "snook",
      "snool",
      "snoot",
      "snots",
      "snowk",
      "snows",
      "snubs",
      "snugs",
      "snush",
      "snyes",
      "soaks",
      "soaps",
      "soare",
      "soars",
      "soave",
      "sobas",
      "socas",
      "soces",
      "socko",
      "socks",
      "socle",
      "sodas",
      "soddy",
      "sodic",
      "sodom",
      "sofar",
      "sofas",
      "softa",
      "softs",
      "softy",
      "soger",
      "sohur",
      "soils",
      "soily",
      "sojas",
      "sojus",
      "sokah",
      "soken",
      "sokes",
      "sokol",
      "solah",
      "solan",
      "solas",
      "solde",
      "soldi",
      "soldo",
      "solds",
      "soled",
      "solei",
      "soler",
      "soles",
      "solon",
      "solos",
      "solum",
      "solus",
      "soman",
      "somas",
      "sonce",
      "sonde",
      "sones",
      "songs",
      "sonly",
      "sonne",
      "sonny",
      "sonse",
      "sonsy",
      "sooey",
      "sooks",
      "sooky",
      "soole",
      "sools",
      "sooms",
      "soops",
      "soote",
      "soots",
      "sophs",
      "sophy",
      "sopor",
      "soppy",
      "sopra",
      "soral",
      "soras",
      "sorbo",
      "sorbs",
      "sorda",
      "sordo",
      "sords",
      "sored",
      "soree",
      "sorel",
      "sorer",
      "sores",
      "sorex",
      "sorgo",
      "sorns",
      "sorra",
      "sorta",
      "sorts",
      "sorus",
      "soths",
      "sotol",
      "souce",
      "souct",
      "sough",
      "souks",
      "souls",
      "soums",
      "soups",
      "soupy",
      "sours",
      "souse",
      "souts",
      "sowar",
      "sowce",
      "sowed",
      "sowff",
      "sowfs",
      "sowle",
      "sowls",
      "sowms",
      "sownd",
      "sowne",
      "sowps",
      "sowse",
      "sowth",
      "soyas",
      "soyle",
      "soyuz",
      "sozin",
      "spacy",
      "spado",
      "spaed",
      "spaer",
      "spaes",
      "spags",
      "spahi",
      "spail",
      "spain",
      "spait",
      "spake",
      "spald",
      "spale",
      "spall",
      "spalt",
      "spams",
      "spane",
      "spang",
      "spans",
      "spard",
      "spars",
      "spart",
      "spate",
      "spats",
      "spaul",
      "spawl",
      "spaws",
      "spayd",
      "spays",
      "spaza",
      "spazz",
      "speal",
      "spean",
      "speat",
      "specs",
      "spect",
      "speel",
      "speer",
      "speil",
      "speir",
      "speks",
      "speld",
      "spelk",
      "speos",
      "spets",
      "speug",
      "spews",
      "spewy",
      "spial",
      "spica",
      "spick",
      "spics",
      "spide",
      "spier",
      "spies",
      "spiff",
      "spifs",
      "spiks",
      "spile",
      "spims",
      "spina",
      "spink",
      "spins",
      "spirt",
      "spiry",
      "spits",
      "spitz",
      "spivs",
      "splay",
      "splog",
      "spode",
      "spods",
      "spoom",
      "spoor",
      "spoot",
      "spork",
      "sposh",
      "spots",
      "sprad",
      "sprag",
      "sprat",
      "spred",
      "sprew",
      "sprit",
      "sprod",
      "sprog",
      "sprue",
      "sprug",
      "spuds",
      "spued",
      "spuer",
      "spues",
      "spugs",
      "spule",
      "spume",
      "spumy",
      "spurs",
      "sputa",
      "spyal",
      "spyre",
      "squab",
      "squaw",
      "squeg",
      "squid",
      "squit",
      "squiz",
      "stabs",
      "stade",
      "stags",
      "stagy",
      "staig",
      "stane",
      "stang",
      "staph",
      "staps",
      "starn",
      "starr",
      "stars",
      "stats",
      "staun",
      "staws",
      "stays",
      "stean",
      "stear",
      "stedd",
      "stede",
      "steds",
      "steek",
      "steem",
      "steen",
      "steil",
      "stela",
      "stele",
      "stell",
      "steme",
      "stems",
      "stend",
      "steno",
      "stens",
      "stent",
      "steps",
      "stept",
      "stere",
      "stets",
      "stews",
      "stewy",
      "steys",
      "stich",
      "stied",
      "sties",
      "stilb",
      "stile",
      "stime",
      "stims",
      "stimy",
      "stipa",
      "stipe",
      "stire",
      "stirk",
      "stirp",
      "stirs",
      "stive",
      "stivy",
      "stoae",
      "stoai",
      "stoas",
      "stoat",
      "stobs",
      "stoep",
      "stogy",
      "stoit",
      "stoln",
      "stoma",
      "stond",
      "stong",
      "stonk",
      "stonn",
      "stook",
      "stoor",
      "stope",
      "stops",
      "stopt",
      "stoss",
      "stots",
      "stott",
      "stoun",
      "stoup",
      "stour",
      "stown",
      "stowp",
      "stows",
      "strad",
      "strae",
      "strag",
      "strak",
      "strep",
      "strew",
      "stria",
      "strig",
      "strim",
      "strop",
      "strow",
      "stroy",
      "strum",
      "stubs",
      "stude",
      "studs",
      "stull",
      "stulm",
      "stumm",
      "stums",
      "stuns",
      "stupa",
      "stupe",
      "sture",
      "sturt",
      "styed",
      "styes",
      "styli",
      "stylo",
      "styme",
      "stymy",
      "styre",
      "styte",
      "subah",
      "subas",
      "subby",
      "suber",
      "subha",
      "succi",
      "sucks",
      "sucky",
      "sucre",
      "sudds",
      "sudor",
      "sudsy",
      "suede",
      "suent",
      "suers",
      "suete",
      "suets",
      "suety",
      "sugan",
      "sughs",
      "sugos",
      "suhur",
      "suids",
      "suint",
      "suits",
      "sujee",
      "sukhs",
      "sukuk",
      "sulci",
      "sulfa",
      "sulfo",
      "sulks",
      "sulph",
      "sulus",
      "sumis",
      "summa",
      "sumos",
      "sumph",
      "sumps",
      "sunis",
      "sunks",
      "sunna",
      "sunns",
      "sunup",
      "supes",
      "supra",
      "surah",
      "sural",
      "suras",
      "surat",
      "surds",
      "sured",
      "sures",
      "surfs",
      "surfy",
      "surgy",
      "surra",
      "sused",
      "suses",
      "susus",
      "sutor",
      "sutra",
      "sutta",
      "swabs",
      "swack",
      "swads",
      "swage",
      "swags",
      "swail",
      "swain",
      "swale",
      "swaly",
      "swamy",
      "swang",
      "swank",
      "swans",
      "swaps",
      "swapt",
      "sward",
      "sware",
      "swarf",
      "swart",
      "swats",
      "swayl",
      "sways",
      "sweal",
      "swede",
      "sweed",
      "sweel",
      "sweer",
      "swees",
      "sweir",
      "swelt",
      "swerf",
      "sweys",
      "swies",
      "swigs",
      "swile",
      "swims",
      "swink",
      "swipe",
      "swire",
      "swiss",
      "swith",
      "swits",
      "swive",
      "swizz",
      "swobs",
      "swole",
      "swoln",
      "swops",
      "swopt",
      "swots",
      "swoun",
      "sybbe",
      "sybil",
      "syboe",
      "sybow",
      "sycee",
      "syces",
      "sycon",
      "syens",
      "syker",
      "sykes",
      "sylis",
      "sylph",
      "sylva",
      "symar",
      "synch",
      "syncs",
      "synds",
      "syned",
      "synes",
      "synth",
      "syped",
      "sypes",
      "syphs",
      "syrah",
      "syren",
      "sysop",
      "sythe",
      "syver",
      "taals",
      "taata",
      "taber",
      "tabes",
      "tabid",
      "tabis",
      "tabla",
      "tabor",
      "tabun",
      "tabus",
      "tacan",
      "taces",
      "tacet",
      "tache",
      "tacho",
      "tachs",
      "tacks",
      "tacos",
      "tacts",
      "taels",
      "tafia",
      "taggy",
      "tagma",
      "tahas",
      "tahrs",
      "taiga",
      "taigs",
      "taiko",
      "tails",
      "tains",
      "taira",
      "taish",
      "taits",
      "tajes",
      "takas",
      "takes",
      "takhi",
      "takin",
      "takis",
      "takky",
      "talak",
      "talaq",
      "talar",
      "talas",
      "talcs",
      "talcy",
      "talea",
      "taler",
      "tales",
      "talks",
      "talky",
      "talls",
      "talma",
      "talpa",
      "taluk",
      "talus",
      "tamal",
      "tamed",
      "tames",
      "tamin",
      "tamis",
      "tammy",
      "tamps",
      "tanas",
      "tanga",
      "tangi",
      "tangs",
      "tanhs",
      "tanka",
      "tanks",
      "tanky",
      "tanna",
      "tansy",
      "tanti",
      "tanto",
      "tanty",
      "tapas",
      "taped",
      "tapen",
      "tapes",
      "tapet",
      "tapis",
      "tappa",
      "tapus",
      "taras",
      "tardo",
      "tared",
      "tares",
      "targa",
      "targe",
      "tarns",
      "taroc",
      "tarok",
      "taros",
      "tarps",
      "tarre",
      "tarry",
      "tarsi",
      "tarts",
      "tarty",
      "tasar",
      "tased",
      "taser",
      "tases",
      "tasks",
      "tassa",
      "tasse",
      "tasso",
      "tatar",
      "tater",
      "tates",
      "taths",
      "tatie",
      "tatou",
      "tatts",
      "tatus",
      "taube",
      "tauld",
      "tauon",
      "taupe",
      "tauts",
      "tavah",
      "tavas",
      "taver",
      "tawai",
      "tawas",
      "tawed",
      "tawer",
      "tawie",
      "tawse",
      "tawts",
      "taxed",
      "taxer",
      "taxes",
      "taxis",
      "taxol",
      "taxon",
      "taxor",
      "taxus",
      "tayra",
      "tazza",
      "tazze",
      "teade",
      "teads",
      "teaed",
      "teaks",
      "teals",
      "teams",
      "tears",
      "teats",
      "teaze",
      "techs",
      "techy",
      "tecta",
      "teels",
      "teems",
      "teend",
      "teene",
      "teens",
      "teeny",
      "teers",
      "teffs",
      "teggs",
      "tegua",
      "tegus",
      "tehrs",
      "teiid",
      "teils",
      "teind",
      "teins",
      "telae",
      "telco",
      "teles",
      "telex",
      "telia",
      "telic",
      "tells",
      "telly",
      "teloi",
      "telos",
      "temed",
      "temes",
      "tempi",
      "temps",
      "tempt",
      "temse",
      "tench",
      "tends",
      "tendu",
      "tenes",
      "tenge",
      "tenia",
      "tenne",
      "tenno",
      "tenny",
      "tenon",
      "tents",
      "tenty",
      "tenue",
      "tepal",
      "tepas",
      "tepoy",
      "terai",
      "teras",
      "terce",
      "terek",
      "teres",
      "terfe",
      "terfs",
      "terga",
      "terms",
      "terne",
      "terns",
      "terry",
      "terts",
      "tesla",
      "testa",
      "teste",
      "tests",
      "tetes",
      "teths",
      "tetra",
      "tetri",
      "teuch",
      "teugh",
      "tewed",
      "tewel",
      "tewit",
      "texas",
      "texes",
      "texts",
      "thack",
      "thagi",
      "thaim",
      "thale",
      "thali",
      "thana",
      "thane",
      "thang",
      "thans",
      "thanx",
      "tharm",
      "thars",
      "thaws",
      "thawy",
      "thebe",
      "theca",
      "theed",
      "theek",
      "thees",
      "thegn",
      "theic",
      "thein",
      "thelf",
      "thema",
      "thens",
      "theow",
      "therm",
      "thesp",
      "thete",
      "thews",
      "thewy",
      "thigs",
      "thilk",
      "thill",
      "thine",
      "thins",
      "thiol",
      "thirl",
      "thoft",
      "thole",
      "tholi",
      "thoro",
      "thorp",
      "thous",
      "thowl",
      "thrae",
      "thraw",
      "thrid",
      "thrip",
      "throe",
      "thuds",
      "thugs",
      "thuja",
      "thunk",
      "thurl",
      "thuya",
      "thymi",
      "thymy",
      "tians",
      "tiars",
      "tical",
      "ticca",
      "ticed",
      "tices",
      "tichy",
      "ticks",
      "ticky",
      "tiddy",
      "tided",
      "tides",
      "tiers",
      "tiffs",
      "tifos",
      "tifts",
      "tiges",
      "tigon",
      "tikas",
      "tikes",
      "tikis",
      "tikka",
      "tilak",
      "tiled",
      "tiler",
      "tiles",
      "tills",
      "tilly",
      "tilth",
      "tilts",
      "timbo",
      "timed",
      "times",
      "timon",
      "timps",
      "tinas",
      "tinct",
      "tinds",
      "tinea",
      "tined",
      "tines",
      "tinge",
      "tings",
      "tinks",
      "tinny",
      "tints",
      "tinty",
      "tipis",
      "tippy",
      "tired",
      "tires",
      "tirls",
      "tiros",
      "tirrs",
      "titch",
      "titer",
      "titis",
      "titre",
      "titty",
      "titup",
      "tiyin",
      "tiyns",
      "tizes",
      "tizzy",
      "toads",
      "toady",
      "toaze",
      "tocks",
      "tocky",
      "tocos",
      "todde",
      "toeas",
      "toffs",
      "toffy",
      "tofts",
      "tofus",
      "togae",
      "togas",
      "toged",
      "toges",
      "togue",
      "tohos",
      "toile",
      "toils",
      "toing",
      "toise",
      "toits",
      "tokay",
      "toked",
      "toker",
      "tokes",
      "tokos",
      "tolan",
      "tolar",
      "tolas",
      "toled",
      "toles",
      "tolls",
      "tolly",
      "tolts",
      "tolus",
      "tolyl",
      "toman",
      "tombs",
      "tomes",
      "tomia",
      "tommy",
      "tomos",
      "tondi",
      "tondo",
      "toned",
      "toner",
      "tones",
      "toney",
      "tongs",
      "tonka",
      "tonks",
      "tonne",
      "tonus",
      "tools",
      "tooms",
      "toons",
      "toots",
      "toped",
      "topee",
      "topek",
      "toper",
      "topes",
      "tophe",
      "tophi",
      "tophs",
      "topis",
      "topoi",
      "topos",
      "toppy",
      "toque",
      "torah",
      "toran",
      "toras",
      "torcs",
      "tores",
      "toric",
      "torii",
      "toros",
      "torot",
      "torrs",
      "torse",
      "torsi",
      "torsk",
      "torta",
      "torte",
      "torts",
      "tosas",
      "tosed",
      "toses",
      "toshy",
      "tossy",
      "toted",
      "toter",
      "totes",
      "totty",
      "touks",
      "touns",
      "tours",
      "touse",
      "tousy",
      "touts",
      "touze",
      "touzy",
      "towed",
      "towie",
      "towns",
      "towny",
      "towse",
      "towsy",
      "towts",
      "towze",
      "towzy",
      "toyed",
      "toyer",
      "toyon",
      "toyos",
      "tozed",
      "tozes",
      "tozie",
      "trabs",
      "trads",
      "tragi",
      "traik",
      "trams",
      "trank",
      "tranq",
      "trans",
      "trant",
      "trape",
      "traps",
      "trapt",
      "trass",
      "trats",
      "tratt",
      "trave",
      "trayf",
      "trays",
      "treck",
      "treed",
      "treen",
      "trees",
      "trefa",
      "treif",
      "treks",
      "trema",
      "trems",
      "tress",
      "trest",
      "trets",
      "trews",
      "treyf",
      "treys",
      "triac",
      "tride",
      "trier",
      "tries",
      "triff",
      "trigo",
      "trigs",
      "trike",
      "trild",
      "trill",
      "trims",
      "trine",
      "trins",
      "triol",
      "trior",
      "trios",
      "trips",
      "tripy",
      "trist",
      "troad",
      "troak",
      "troat",
      "trock",
      "trode",
      "trods",
      "trogs",
      "trois",
      "troke",
      "tromp",
      "trona",
      "tronc",
      "trone",
      "tronk",
      "trons",
      "trooz",
      "troth",
      "trots",
      "trows",
      "troys",
      "trued",
      "trues",
      "trugo",
      "trugs",
      "trull",
      "tryer",
      "tryke",
      "tryma",
      "tryps",
      "tsade",
      "tsadi",
      "tsars",
      "tsked",
      "tsuba",
      "tsubo",
      "tuans",
      "tuart",
      "tuath",
      "tubae",
      "tubar",
      "tubas",
      "tubby",
      "tubed",
      "tubes",
      "tucks",
      "tufas",
      "tuffe",
      "tuffs",
      "tufts",
      "tufty",
      "tugra",
      "tuile",
      "tuina",
      "tuism",
      "tuktu",
      "tules",
      "tulpa",
      "tulsi",
      "tumid",
      "tummy",
      "tumps",
      "tumpy",
      "tunas",
      "tunds",
      "tuned",
      "tuner",
      "tunes",
      "tungs",
      "tunny",
      "tupek",
      "tupik",
      "tuple",
      "tuque",
      "turds",
      "turfs",
      "turfy",
      "turks",
      "turme",
      "turms",
      "turns",
      "turnt",
      "turps",
      "turrs",
      "tushy",
      "tusks",
      "tusky",
      "tutee",
      "tutti",
      "tutty",
      "tutus",
      "tuxes",
      "tuyer",
      "twaes",
      "twain",
      "twals",
      "twank",
      "twats",
      "tways",
      "tweel",
      "tween",
      "tweep",
      "tweer",
      "twerk",
      "twerp",
      "twier",
      "twigs",
      "twill",
      "twilt",
      "twink",
      "twins",
      "twiny",
      "twire",
      "twirp",
      "twite",
      "twits",
      "twoer",
      "twyer",
      "tyees",
      "tyers",
      "tyiyn",
      "tykes",
      "tyler",
      "tymps",
      "tynde",
      "tyned",
      "tynes",
      "typal",
      "typed",
      "types",
      "typey",
      "typic",
      "typos",
      "typps",
      "typto",
      "tyran",
      "tyred",
      "tyres",
      "tyros",
      "tythe",
      "tzars",
      "udals",
      "udons",
      "ugali",
      "ugged",
      "uhlan",
      "uhuru",
      "ukase",
      "ulama",
      "ulans",
      "ulema",
      "ulmin",
      "ulnad",
      "ulnae",
      "ulnar",
      "ulnas",
      "ulpan",
      "ulvas",
      "ulyie",
      "ulzie",
      "umami",
      "umbel",
      "umber",
      "umble",
      "umbos",
      "umbre",
      "umiac",
      "umiak",
      "umiaq",
      "ummah",
      "ummas",
      "ummed",
      "umped",
      "umphs",
      "umpie",
      "umpty",
      "umrah",
      "umras",
      "unais",
      "unapt",
      "unarm",
      "unary",
      "unaus",
      "unbag",
      "unban",
      "unbar",
      "unbed",
      "unbid",
      "unbox",
      "uncap",
      "unces",
      "uncia",
      "uncos",
      "uncoy",
      "uncus",
      "undam",
      "undee",
      "undos",
      "undug",
      "uneth",
      "unfix",
      "ungag",
      "unget",
      "ungod",
      "ungot",
      "ungum",
      "unhat",
      "unhip",
      "unica",
      "units",
      "unjam",
      "unked",
      "unket",
      "unkid",
      "unlaw",
      "unlay",
      "unled",
      "unlet",
      "unlid",
      "unman",
      "unmew",
      "unmix",
      "unpay",
      "unpeg",
      "unpen",
      "unpin",
      "unred",
      "unrid",
      "unrig",
      "unrip",
      "unsaw",
      "unsay",
      "unsee",
      "unsew",
      "unsex",
      "unsod",
      "untax",
      "untin",
      "unwet",
      "unwit",
      "unwon",
      "upbow",
      "upbye",
      "updos",
      "updry",
      "upend",
      "upjet",
      "uplay",
      "upled",
      "uplit",
      "upped",
      "upran",
      "uprun",
      "upsee",
      "upsey",
      "uptak",
      "upter",
      "uptie",
      "uraei",
      "urali",
      "uraos",
      "urare",
      "urari",
      "urase",
      "urate",
      "urbex",
      "urbia",
      "urdee",
      "ureal",
      "ureas",
      "uredo",
      "ureic",
      "urena",
      "urent",
      "urged",
      "urger",
      "urges",
      "urial",
      "urite",
      "urman",
      "urnal",
      "urned",
      "urped",
      "ursae",
      "ursid",
      "urson",
      "urubu",
      "urvas",
      "users",
      "usnea",
      "usque",
      "usure",
      "usury",
      "uteri",
      "uveal",
      "uveas",
      "uvula",
      "vacua",
      "vaded",
      "vades",
      "vagal",
      "vagus",
      "vails",
      "vaire",
      "vairs",
      "vairy",
      "vakas",
      "vakil",
      "vales",
      "valis",
      "valse",
      "vamps",
      "vampy",
      "vanda",
      "vaned",
      "vanes",
      "vangs",
      "vants",
      "vaped",
      "vaper",
      "vapes",
      "varan",
      "varas",
      "vardy",
      "varec",
      "vares",
      "varia",
      "varix",
      "varna",
      "varus",
      "varve",
      "vasal",
      "vases",
      "vasts",
      "vasty",
      "vatic",
      "vatus",
      "vauch",
      "vaute",
      "vauts",
      "vawte",
      "vaxes",
      "veale",
      "veals",
      "vealy",
      "veena",
      "veeps",
      "veers",
      "veery",
      "vegas",
      "veges",
      "vegie",
      "vegos",
      "vehme",
      "veils",
      "veily",
      "veins",
      "veiny",
      "velar",
      "velds",
      "veldt",
      "veles",
      "vells",
      "velum",
      "venae",
      "venal",
      "vends",
      "vendu",
      "veney",
      "venge",
      "venin",
      "vents",
      "venus",
      "verbs",
      "verra",
      "verry",
      "verst",
      "verts",
      "vertu",
      "vespa",
      "vesta",
      "vests",
      "vetch",
      "vexed",
      "vexer",
      "vexes",
      "vexil",
      "vezir",
      "vials",
      "viand",
      "vibes",
      "vibex",
      "vibey",
      "viced",
      "vices",
      "vichy",
      "viers",
      "views",
      "viewy",
      "vifda",
      "viffs",
      "vigas",
      "vigia",
      "vilde",
      "viler",
      "villi",
      "vills",
      "vimen",
      "vinal",
      "vinas",
      "vinca",
      "vined",
      "viner",
      "vines",
      "vinew",
      "vinic",
      "vinos",
      "vints",
      "viold",
      "viols",
      "vired",
      "vireo",
      "vires",
      "virga",
      "virge",
      "virid",
      "virls",
      "virtu",
      "visas",
      "vised",
      "vises",
      "visie",
      "visne",
      "vison",
      "visto",
      "vitae",
      "vitas",
      "vitex",
      "vitro",
      "vitta",
      "vivas",
      "vivat",
      "vivda",
      "viver",
      "vives",
      "vizir",
      "vizor",
      "vleis",
      "vlies",
      "vlogs",
      "voars",
      "vocab",
      "voces",
      "voddy",
      "vodou",
      "vodun",
      "voema",
      "vogie",
      "voids",
      "voile",
      "voips",
      "volae",
      "volar",
      "voled",
      "voles",
      "volet",
      "volks",
      "volta",
      "volte",
      "volti",
      "volts",
      "volva",
      "volve",
      "vomer",
      "voted",
      "votes",
      "vouge",
      "voulu",
      "vowed",
      "vower",
      "voxel",
      "vozhd",
      "vraic",
      "vrils",
      "vroom",
      "vrous",
      "vrouw",
      "vrows",
      "vuggs",
      "vuggy",
      "vughs",
      "vughy",
      "vulgo",
      "vulns",
      "vulva",
      "vutty",
      "waacs",
      "wacke",
      "wacko",
      "wacks",
      "wadds",
      "waddy",
      "waded",
      "wader",
      "wades",
      "wadge",
      "wadis",
      "wadts",
      "waffs",
      "wafts",
      "waged",
      "wages",
      "wagga",
      "wagyu",
      "wahoo",
      "waide",
      "waifs",
      "waift",
      "wails",
      "wains",
      "wairs",
      "waite",
      "waits",
      "wakas",
      "waked",
      "waken",
      "waker",
      "wakes",
      "wakfs",
      "waldo",
      "walds",
      "waled",
      "waler",
      "wales",
      "walie",
      "walis",
      "walks",
      "walla",
      "walls",
      "wally",
      "walty",
      "wamed",
      "wames",
      "wamus",
      "wands",
      "waned",
      "wanes",
      "waney",
      "wangs",
      "wanks",
      "wanky",
      "wanle",
      "wanly",
      "wanna",
      "wants",
      "wanty",
      "wanze",
      "waqfs",
      "warbs",
      "warby",
      "wards",
      "wared",
      "wares",
      "warez",
      "warks",
      "warms",
      "warns",
      "warps",
      "warre",
      "warst",
      "warts",
      "wases",
      "washy",
      "wasms",
      "wasps",
      "waspy",
      "wasts",
      "watap",
      "watts",
      "wauff",
      "waugh",
      "wauks",
      "waulk",
      "wauls",
      "waurs",
      "waved",
      "waves",
      "wavey",
      "wawas",
      "wawes",
      "wawls",
      "waxed",
      "waxer",
      "waxes",
      "wayed",
      "wazir",
      "wazoo",
      "weald",
      "weals",
      "weamb",
      "weans",
      "wears",
      "webby",
      "weber",
      "wecht",
      "wedel",
      "wedgy",
      "weeds",
      "weeke",
      "weeks",
      "weels",
      "weems",
      "weens",
      "weeny",
      "weeps",
      "weepy",
      "weest",
      "weete",
      "weets",
      "wefte",
      "wefts",
      "weids",
      "weils",
      "weirs",
      "weise",
      "weize",
      "wekas",
      "welds",
      "welke",
      "welks",
      "welkt",
      "wells",
      "welly",
      "welts",
      "wembs",
      "wench",
      "wends",
      "wenge",
      "wenny",
      "wents",
      "weros",
      "wersh",
      "wests",
      "wetas",
      "wetly",
      "wexed",
      "wexes",
      "whamo",
      "whams",
      "whang",
      "whaps",
      "whare",
      "whata",
      "whats",
      "whaup",
      "whaur",
      "wheal",
      "whear",
      "wheen",
      "wheep",
      "wheft",
      "whelk",
      "whelm",
      "whens",
      "whets",
      "whews",
      "wheys",
      "whids",
      "whift",
      "whigs",
      "whilk",
      "whims",
      "whins",
      "whios",
      "whips",
      "whipt",
      "whirr",
      "whirs",
      "whish",
      "whiss",
      "whist",
      "whits",
      "whity",
      "whizz",
      "whomp",
      "whoof",
      "whoot",
      "whops",
      "whore",
      "whorl",
      "whort",
      "whoso",
      "whows",
      "whump",
      "whups",
      "whyda",
      "wicca",
      "wicks",
      "wicky",
      "widdy",
      "wides",
      "wiels",
      "wifed",
      "wifes",
      "wifey",
      "wifie",
      "wifty",
      "wigan",
      "wigga",
      "wiggy",
      "wikis",
      "wilco",
      "wilds",
      "wiled",
      "wiles",
      "wilga",
      "wilis",
      "wilja",
      "wills",
      "wilts",
      "wimps",
      "winds",
      "wined",
      "wines",
      "winey",
      "winge",
      "wings",
      "wingy",
      "winks",
      "winna",
      "winns",
      "winos",
      "winze",
      "wiped",
      "wiper",
      "wipes",
      "wired",
      "wirer",
      "wires",
      "wirra",
      "wised",
      "wises",
      "wisha",
      "wisht",
      "wisps",
      "wists",
      "witan",
      "wited",
      "wites",
      "withe",
      "withs",
      "withy",
      "wived",
      "wiver",
      "wives",
      "wizen",
      "wizes",
      "woads",
      "woald",
      "wocks",
      "wodge",
      "woful",
      "wojus",
      "woker",
      "wokka",
      "wolds",
      "wolfs",
      "wolly",
      "wolve",
      "wombs",
      "womby",
      "womyn",
      "wonga",
      "wongi",
      "wonks",
      "wonky",
      "wonts",
      "woods",
      "wooed",
      "woofs",
      "woofy",
      "woold",
      "wools",
      "woons",
      "woops",
      "woopy",
      "woose",
      "woosh",
      "wootz",
      "words",
      "works",
      "worms",
      "wormy",
      "worts",
      "wowed",
      "wowee",
      "woxen",
      "wrang",
      "wraps",
      "wrapt",
      "wrast",
      "wrate",
      "wrawl",
      "wrens",
      "wrick",
      "wried",
      "wrier",
      "wries",
      "writs",
      "wroke",
      "wroot",
      "wroth",
      "wryer",
      "wuddy",
      "wudus",
      "wulls",
      "wurst",
      "wuses",
      "wushu",
      "wussy",
      "wuxia",
      "wyled",
      "wyles",
      "wynds",
      "wynns",
      "wyted",
      "wytes",
      "xebec",
      "xenia",
      "xenic",
      "xenon",
      "xeric",
      "xerox",
      "xerus",
      "xoana",
      "xrays",
      "xylan",
      "xylem",
      "xylic",
      "xylol",
      "xylyl",
      "xysti",
      "xysts",
      "yaars",
      "yabas",
      "yabba",
      "yabby",
      "yacca",
      "yacka",
      "yacks",
      "yaffs",
      "yager",
      "yages",
      "yagis",
      "yahoo",
      "yaird",
      "yakka",
      "yakow",
      "yales",
      "yamen",
      "yampy",
      "yamun",
      "yangs",
      "yanks",
      "yapok",
      "yapon",
      "yapps",
      "yappy",
      "yarak",
      "yarco",
      "yards",
      "yarer",
      "yarfa",
      "yarks",
      "yarns",
      "yarrs",
      "yarta",
      "yarto",
      "yates",
      "yauds",
      "yauld",
      "yaups",
      "yawed",
      "yawey",
      "yawls",
      "yawns",
      "yawny",
      "yawps",
      "ybore",
      "yclad",
      "ycled",
      "ycond",
      "ydrad",
      "ydred",
      "yeads",
      "yeahs",
      "yealm",
      "yeans",
      "yeard",
      "years",
      "yecch",
      "yechs",
      "yechy",
      "yedes",
      "yeeds",
      "yeesh",
      "yeggs",
      "yelks",
      "yells",
      "yelms",
      "yelps",
      "yelts",
      "yenta",
      "yente",
      "yerba",
      "yerds",
      "yerks",
      "yeses",
      "yesks",
      "yests",
      "yesty",
      "yetis",
      "yetts",
      "yeuks",
      "yeuky",
      "yeven",
      "yeves",
      "yewen",
      "yexed",
      "yexes",
      "yfere",
      "yiked",
      "yikes",
      "yills",
      "yince",
      "yipes",
      "yippy",
      "yirds",
      "yirks",
      "yirrs",
      "yirth",
      "yites",
      "yitie",
      "ylems",
      "ylike",
      "ylkes",
      "ymolt",
      "ympes",
      "yobbo",
      "yobby",
      "yocks",
      "yodel",
      "yodhs",
      "yodle",
      "yogas",
      "yogee",
      "yoghs",
      "yogic",
      "yogin",
      "yogis",
      "yoick",
      "yojan",
      "yoked",
      "yokel",
      "yoker",
      "yokes",
      "yokul",
      "yolks",
      "yolky",
      "yomim",
      "yomps",
      "yonic",
      "yonis",
      "yonks",
      "yoofs",
      "yoops",
      "yores",
      "yorks",
      "yorps",
      "youks",
      "yourn",
      "yours",
      "yourt",
      "youse",
      "yowed",
      "yowes",
      "yowie",
      "yowls",
      "yowza",
      "yrapt",
      "yrent",
      "yrivd",
      "yrneh",
      "ysame",
      "ytost",
      "yuans",
      "yucas",
      "yucca",
      "yucch",
      "yucko",
      "yucks",
      "yucky",
      "yufts",
      "yugas",
      "yuked",
      "yukes",
      "yukky",
      "yukos",
      "yulan",
      "yules",
      "yummo",
      "yummy",
      "yumps",
      "yupon",
      "yuppy",
      "yurta",
      "yurts",
      "yuzus",
      "zabra",
      "zacks",
      "zaida",
      "zaidy",
      "zaire",
      "zakat",
      "zaman",
      "zambo",
      "zamia",
      "zanja",
      "zante",
      "zanza",
      "zanze",
      "zappy",
      "zarfs",
      "zaris",
      "zatis",
      "zaxes",
      "zayin",
      "zazen",
      "zeals",
      "zebec",
      "zebub",
      "zebus",
      "zedas",
      "zeins",
      "zendo",
      "zerda",
      "zerks",
      "zeros",
      "zests",
      "zetas",
      "zexes",
      "zezes",
      "zhomo",
      "zibet",
      "ziffs",
      "zigan",
      "zilas",
      "zilch",
      "zilla",
      "zills",
      "zimbi",
      "zimbs",
      "zinco",
      "zincs",
      "zincy",
      "zineb",
      "zines",
      "zings",
      "zingy",
      "zinke",
      "zinky",
      "zippo",
      "zippy",
      "ziram",
      "zitis",
      "zizel",
      "zizit",
      "zlote",
      "zloty",
      "zoaea",
      "zobos",
      "zobus",
      "zocco",
      "zoeae",
      "zoeal",
      "zoeas",
      "zoism",
      "zoist",
      "zombi",
      "zonae",
      "zonda",
      "zoned",
      "zoner",
      "zones",
      "zonks",
      "zooea",
      "zooey",
      "zooid",
      "zooks",
      "zooms",
      "zoons",
      "zooty",
      "zoppa",
      "zoppo",
      "zoril",
      "zoris",
      "zorro",
      "zouks",
      "zowee",
      "zowie",
      "zulus",
      "zupan",
      "zupas",
      "zuppa",
      "zurfs",
      "zuzim",
      "zygal",
      "zygon",
      "zymes",
      "zymic",
    ];
  var N = { unknown: 0, absent: 1, present: 2, correct: 3 };
  var A = 864e5,
    C = new Date(2021, 5, 19, 0, 0, 0, 0);
  function I(e, a) {
    (e = new Date(e)),
      (e = new Date(a).setHours(0, 0, 0, 0) - e.setHours(0, 0, 0, 0));
    return Math.round(e / A);
  }
  function P(e) {
    if (null === e) return "";
    e %= z.length;
    return z[e];
  }
  var L = "abcdefghijklmnopqrstuvwxyz",
    T = function (e) {
      return e.persist.game;
    },
    M = t.createSelector(T, function (e) {
      return e.boardState;
    }),
    R = t.createSelector(T, function (e) {
      return e.status;
    }),
    D = t.createSelector(T, function (e) {
      return e.currentRowIndex;
    }),
    q = t.createSelector([M, D], function (e, a) {
      return e[a];
    }),
    H = t.createSelector(T, function (e) {
      return e.dayOffset;
    }),
    B = t.createSelector(T, function (e) {
      return e.timestamps.lastPlayed;
    }),
    F = t.createSelector(T, function (e) {
      return e.timestamps.lastCompleted;
    }),
    G = t.createSelector(H, P),
    W = t.createSelector([M, D, G], function (e, t, n) {
      return e.map(function (e, a) {
        return t <= a
          ? null
          : (function (e, a) {
              for (
                var t = Array(a.length).fill("absent"),
                  n = Array(a.length).fill(!0),
                  o = Array(a.length).fill(!0),
                  r = 0;
                r < e.length;
                r += 1
              )
                e[r] === a[r] &&
                  o[r] &&
                  ((t[r] = "correct"), (n[r] = !1), (o[r] = !1));
              for (var s = 0; s < e.length; s += 1) {
                var i = e[s];
                if (n[s])
                  for (var l = 0; l < a.length; l += 1) {
                    var u = a[l];
                    if (o[l] && i === u) {
                      (t[s] = "present"), (o[l] = !1);
                      break;
                    }
                  }
              }
              return t;
            })(e, n);
      });
    }),
    Y = 6,
    V = 5,
    U = ["Genius", "Magnificent", "Impressive", "Splendid", "Great", "Phew"];
  function Z(a, e) {
    var t,
      n = Object.keys(a);
    return (
      Object.getOwnPropertySymbols &&
        ((t = Object.getOwnPropertySymbols(a)),
        e &&
          (t = t.filter(function (e) {
            return Object.getOwnPropertyDescriptor(a, e).enumerable;
          })),
        n.push.apply(n, t)),
      n
    );
  }
  function K(n) {
    for (var e = 1; e < arguments.length; e++) {
      var o = null != arguments[e] ? arguments[e] : {};
      e % 2
        ? Z(Object(o), !0).forEach(function (e) {
            var a, t;
            (a = n),
              (e = o[(t = e)]),
              t in a
                ? Object.defineProperty(a, t, {
                    value: e,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                  })
                : (a[t] = e);
          })
        : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(n, Object.getOwnPropertyDescriptors(o))
        : Z(Object(o)).forEach(function (e) {
            Object.defineProperty(n, e, Object.getOwnPropertyDescriptor(o, e));
          });
    }
    return n;
  }
  function X(e) {
    return { type: re, payload: { error: e } };
  }
  function J(e, a, t, n) {
    return {
      type: le,
      payload: { name: e, label: a, useBeacon: t, context: n },
    };
  }
  function Q(e, a) {
    return { type: ce, payload: { text: e, timestamp: a } };
  }
  function $(r) {
    return function (e, a) {
      var t = a(),
        n = D(t),
        o = R(t),
        a = G(t),
        t = ve(t);
      if (r === n - 1 && (e({ type: Ee }), ["WIN", "FAIL"].includes(o))) {
        if (t) return e(de("stats"));
        "WIN" === o &&
          ((n = U[n - 1]), e(be({ text: n, duration: 2e3, win: !0 }))),
          "FAIL" === o && e(be({ text: a.toUpperCase(), duration: 1 / 0 })),
          setTimeout(function () {
            e(de("stats"));
          }, 2500);
      }
    };
  }
  var ee = "wordle/overlays/OPEN_MODAL",
    ae = "wordle/overlays/CLOSE_MODAL",
    te = "wordle/overlays/OPEN_PAGE",
    ne = "wordle/overlays/CLOSE_PAGE",
    oe = "wordle/overlays/WILL_CLOSE_PAGE",
    re = "wordle/overlays/OPEN_ERROR",
    se = "wordle/overlays/OPEN_NAV_MODAL",
    ie = "wordle/overlays/CLOSE_NAV_MODAL",
    le = "wordle/overlays/TRACK_NAV_MODAL_ITEM",
    ue = "wordle/overlays/ADD_TOAST",
    ce = "wordle/overlays/REMOVE_TOAST",
    de = function (e) {
      return {
        type: ee,
        payload: {
          modal: e,
          isClicked:
            1 < arguments.length && void 0 !== arguments[1] && arguments[1],
        },
      };
    },
    me = function (e) {
      return { type: te, payload: { page: e } };
    },
    pe = function () {
      return { type: ae };
    },
    ye = function () {
      return { type: ne };
    },
    ge = function () {
      return { type: oe };
    },
    he = function () {
      return { type: se };
    },
    fe = function () {
      return { type: ie };
    },
    be = function (e) {
      return { type: ue, payload: K(K({}, e), {}, { timestamp: Date.now() }) };
    },
    ke = function (e) {
      return e.transient;
    },
    we = t.createSelector(ke, function (e) {
      return e.isAnimatingRow;
    }),
    ve = t.createSelector(ke, function (e) {
      return e.isRestoringSession;
    }),
    _e = t.createSelector(ke, function (e) {
      return e.lastRowInvalid;
    }),
    xe = t.createSelector(ke, function (e) {
      return e.lastRowWin;
    }),
    Se = t.createSelector([R, we, D], function (e, a, t) {
      return "IN_PROGRESS" !== e || a || Y <= t;
    }),
    je = t.createSelector([M, W, D, we, ve], function (e, a, t, n, o) {
      if (o) return {};
      var i,
        l,
        t = a.slice(0, n ? t - 1 : t);
      return (
        (i = t),
        (l = {}),
        e.forEach(function (e, a) {
          var t = i[a];
          if (t)
            for (var n = 0; n < e.length; n += 1) {
              var o = e[n],
                r = t[n],
                s = l[o] || "unknown";
              N[s] < N[r] && (l[o] = r);
            }
        }),
        l
      );
    }),
    Ee = "wordle/transient/LAST_TILE_REVEAL",
    ze = "wordle/transient/REMOVE_INVALID",
    Oe = function () {
      return { type: ze };
    },
    Ne = function () {
      return a.useDispatch();
    },
    Ae = a.useSelector;
  function Ce(e, a) {
    var t,
      n = (a = void 0 === a ? {} : a).insertAt;
    e &&
      "undefined" != typeof document &&
      ((t = document.head || document.getElementsByTagName("head")[0]),
      ((a = document.createElement("style")).type = "text/css"),
      "top" === n && t.firstChild
        ? t.insertBefore(a, t.firstChild)
        : t.appendChild(a),
      a.styleSheet
        ? (a.styleSheet.cssText = e)
        : a.appendChild(document.createTextNode(e)));
  }
  var Ie = {
    tile: "Tile-module_tile__3ayIZ",
    PopIn: "Tile-module_PopIn__bu7hb",
    FlipIn: "Tile-module_FlipIn__scjpz",
    FlipOut: "Tile-module_FlipOut__e4DRI",
  };
  function Pe(e, a) {
    return (
      (function (e) {
        if (Array.isArray(e)) return e;
      })(e) ||
      (function (e, a) {
        var t =
          null == e
            ? null
            : ("undefined" != typeof Symbol && e[Symbol.iterator]) ||
              e["@@iterator"];
        if (null != t) {
          var n,
            o,
            r = [],
            s = !0,
            i = !1;
          try {
            for (
              t = t.call(e);
              !(s = (n = t.next()).done) &&
              (r.push(n.value), !a || r.length !== a);
              s = !0
            );
          } catch (e) {
            (i = !0), (o = e);
          } finally {
            try {
              s || null == t.return || t.return();
            } finally {
              if (i) throw o;
            }
          }
          return r;
        }
      })(e, a) ||
      (function (e, a) {
        if (e) {
          if ("string" == typeof e) return Le(e, a);
          var t = Object.prototype.toString.call(e).slice(8, -1);
          return "Map" ===
            (t = "Object" === t && e.constructor ? e.constructor.name : t) ||
            "Set" === t
            ? Array.from(e)
            : "Arguments" === t ||
              /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)
            ? Le(e, a)
            : void 0;
        }
      })(e, a) ||
      (function () {
        throw new TypeError(
          "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
        );
      })()
    );
  }
  function Le(e, a) {
    (null == a || a > e.length) && (a = e.length);
    for (var t = 0, n = new Array(a); t < a; t++) n[t] = e[t];
    return n;
  }
  function Te(e) {
    var a = e.rowIndex,
      t = e.last,
      n = e.letter,
      o = e.evaluation,
      r = Ne(),
      s = g.useRef(null),
      i = Pe(g.useState("idle"), 2),
      l = i[0],
      u = i[1],
      e = Pe(g.useState(!1), 2),
      i = e[0],
      c = e[1];
    g.useEffect(
      function () {
        u(n ? "pop" : "idle");
      },
      [n]
    ),
      g.useEffect(
        function () {
          o && u("flip-in");
        },
        [o]
      );
    e = "empty";
    return (
      i && o ? (e = o) : n && (e = "tbd"),
      g.createElement(
        "div",
        {
          className: Ie.tile,
          ref: s,
          onAnimationEnd: function (e) {
            e.animationName === Ie.PopIn && "pop" === l && u("idle"),
              e.animationName === Ie.FlipIn && (u("flip-out"), c(!0)),
              e.animationName === Ie.FlipOut &&
                (u("idle"), t && s.current && void 0 !== a && r($(a)));
          },
          "data-state": e,
          "data-animation": l || "idle",
          "data-testid": "tile",
        },
        n
      )
    );
  }
  Ce(
    '.Tile-module_tile__3ayIZ {\n  width: 100%;\n  display: inline-flex;\n  justify-content: center;\n  align-items: center;\n  font-size: 2rem;\n  line-height: 2rem;\n  font-weight: bold;\n  vertical-align: middle;\n  box-sizing: border-box;\n  color: var(--tile-text-color);\n  text-transform: uppercase;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n}\n\n.Tile-module_tile__3ayIZ::before {\n  content: "";\n  display: inline-block;\n  padding-bottom: 100%;\n}\n\n/* Allow tiles to be smaller on small screens */\n@media (max-height: 600px) {\n  .Tile-module_tile__3ayIZ {\n    font-size: 1em;\n    line-height: 1em;\n  }\n}\n.Tile-module_tile__3ayIZ[data-state=empty] {\n  border: 2px solid var(--color-tone-4);\n}\n\n.Tile-module_tile__3ayIZ[data-state=tbd] {\n  background-color: var(--color-tone-7);\n  border: 2px solid var(--color-tone-3);\n  color: var(--color-tone-1);\n}\n\n.Tile-module_tile__3ayIZ[data-state=correct] {\n  background-color: var(--color-correct);\n}\n\n.Tile-module_tile__3ayIZ[data-state=present] {\n  background-color: var(--color-present);\n}\n\n.Tile-module_tile__3ayIZ[data-state=absent] {\n  background-color: var(--color-absent);\n}\n\n.Tile-module_tile__3ayIZ[data-animation=pop] {\n  -webkit-animation-name: Tile-module_PopIn__bu7hb;\n          animation-name: Tile-module_PopIn__bu7hb;\n  -webkit-animation-duration: 100ms;\n          animation-duration: 100ms;\n}\n\n@-webkit-keyframes Tile-module_PopIn__bu7hb {\n  from {\n    transform: scale(0.8);\n    opacity: 0;\n  }\n  40% {\n    transform: scale(1.1);\n    opacity: 1;\n  }\n}\n\n@keyframes Tile-module_PopIn__bu7hb {\n  from {\n    transform: scale(0.8);\n    opacity: 0;\n  }\n  40% {\n    transform: scale(1.1);\n    opacity: 1;\n  }\n}\n.Tile-module_tile__3ayIZ[data-animation=flip-in] {\n  -webkit-animation-name: Tile-module_FlipIn__scjpz;\n          animation-name: Tile-module_FlipIn__scjpz;\n  -webkit-animation-duration: 250ms;\n          animation-duration: 250ms;\n  -webkit-animation-timing-function: ease-in;\n          animation-timing-function: ease-in;\n}\n\n@-webkit-keyframes Tile-module_FlipIn__scjpz {\n  0% {\n    transform: rotateX(0);\n  }\n  100% {\n    transform: rotateX(-90deg);\n  }\n}\n\n@keyframes Tile-module_FlipIn__scjpz {\n  0% {\n    transform: rotateX(0);\n  }\n  100% {\n    transform: rotateX(-90deg);\n  }\n}\n.Tile-module_tile__3ayIZ[data-animation=flip-out] {\n  -webkit-animation-name: Tile-module_FlipOut__e4DRI;\n          animation-name: Tile-module_FlipOut__e4DRI;\n  -webkit-animation-duration: 250ms;\n          animation-duration: 250ms;\n  -webkit-animation-timing-function: ease-in;\n          animation-timing-function: ease-in;\n}\n\n@-webkit-keyframes Tile-module_FlipOut__e4DRI {\n  0% {\n    transform: rotateX(-90deg);\n  }\n  100% {\n    transform: rotateX(0);\n  }\n}\n\n@keyframes Tile-module_FlipOut__e4DRI {\n  0% {\n    transform: rotateX(-90deg);\n  }\n  100% {\n    transform: rotateX(0);\n  }\n}'
  );
  var Me =
      (null === (Ke = window.env) || void 0 === Ke ? void 0 : Ke.name) || "dev",
    T = function (e) {
      return e[Me] || e.dev;
    },
    ke = T({
      prod: "https://myaccount.nytimes.com",
      stg: "https://myaccount.stg.nytimes.com",
      dev: "https://myaccount.stg.nytimes.com",
    }),
    Re = T({
      prod: "https://www.nytimes.com/subscription/games?campaignId=8RRFW",
      stg: "https://www.stg.nytimes.com/subscription/games?campaignId=8RRFW",
      dev: "https://www.stg.nytimes.com/subscription/games?campaignId=8RRFW",
    }),
    De = "".concat(ke, "/svc/auth/v1/profileinfo"),
    we = T({
      prod: "https%3A%2F%2Fwww.nytimes.com%2Fgames%2Fwordle%2Findex.html%3Fwordle_version%3D1_phoenix%26abra-overrides%3DGAMES_wordleAuth_0427%253D1_EnableAuth%252CGAMES_wordleMoogle_0422%253D1_EnableMoogle%26moogle%3Dtrue%26success%3Dtrue",
      stg: "https%3A%2F%2Fwww.stg.nytimes.com%2Fgames%2Fwordle%2Findex.html%3Fwordle_version%3D1_phoenix%26abra-overrides%3DGAMES_wordleAuth_0427%253D1_EnableAuth%252CGAMES_wordleMoogle_0422%253D1_EnableMoogle%26moogle%3Dtrue%26success%3Dtrue",
      dev: "https%3A%2F%2Flocal.nytimes.com%2Fgames%2Fwordle%2Findex.html%3Fwordle_version%3D1_phoenix%26abra-overrides%3DGAMES_wordleAuth_0427%253D1_EnableAuth%252CGAMES_wordleMoogle_0422%253D1_EnableMoogle%26moogle%3Dtrue%26success%3Dtrue",
    }),
    qe = T({
      prod: "".concat(
        ke,
        "/auth/enter-email?response_type=cookie&client_id=games&application=nyt-lire&asset=wordle&redirect_uri=https%3A%2F%2Fwww.nytimes.com/games/wordle/index.html?wordle_version=1_phoenix"
      ),
      stg: ""
        .concat(
          ke,
          "/auth/enter-email?response_type=cookie&client_id=games&application=nyt-lire&asset=wordle&redirect_uri="
        )
        .concat(we),
      dev: ""
        .concat(
          ke,
          "/auth/enter-email?response_type=cookie&client_id=games&application=nyt-lire&asset=wordle&redirect_uri="
        )
        .concat(we),
    }),
    He = T({
      prod: "".concat(
        ke,
        "/gst/signout?redirect_uri=https%3A%2F%2Fwww.nytimes.com/games/wordle/index.html?wordle_version=1_phoenix"
      ),
      stg: "".concat(ke, "/gst/signout?redirect_uri=").concat(we),
      dev: "".concat(ke, "/gst/signout?redirect_uri=").concat(we),
    }),
    Be = {
      instructions: "Help-module_instructions__54IDr",
      examples: "Help-module_examples__eeiMV",
      example: "Help-module_example__3UNrs",
      tileContainer: "Help-module_tileContainer__WmMQw",
      page: "Help-module_page__uQ7Xi",
      statsLogin: "Help-module_statsLogin__j0k72",
      loginArrow: "Help-module_loginArrow__H-3mD",
      loginText: "Help-module_loginText__Osqyn",
      statsIcon: "Help-module_statsIcon__pQSyR",
      rule: "Help-module_rule__wlOx-",
    };
  Ce(
    ".Help-module_instructions__54IDr {\n  font-size: 14px;\n  color: var(--color-tone-1);\n}\n\n.Help-module_examples__eeiMV {\n  border-bottom: 1px solid var(--color-tone-4);\n  border-top: 1px solid var(--color-tone-4);\n}\n\n.Help-module_example__3UNrs {\n  margin-top: 24px;\n  margin-bottom: 24px;\n}\n\n.Help-module_tileContainer__WmMQw {\n  display: inline-block;\n  width: 40px;\n  height: 40px;\n  margin-right: 4px;\n}\n\n.Help-module_page__uQ7Xi {\n  padding: 16px;\n  padding-top: 0px;\n}\n\n/*---auth---*/\n.Help-module_statsLogin__j0k72 {\n  color: var(--color-tone-1);\n  font-size: 14px;\n  display: flex;\n  width: 100%;\n  align-items: center;\n  justify-content: flex-start;\n  text-decoration: none;\n  padding-top: 24px;\n}\n.Help-module_statsLogin__j0k72 a {\n  font-weight: 700;\n  color: var(--color-tone-1);\n}\n.Help-module_statsLogin__j0k72 .Help-module_loginArrow__H-3mD {\n  text-decoration: none;\n  justify-self: flex-end;\n}\n.Help-module_statsLogin__j0k72 .Help-module_loginText__Osqyn {\n  flex-grow: 2;\n}\n.Help-module_statsLogin__j0k72 .Help-module_statsIcon__pQSyR {\n  margin-right: 16px;\n}\n.Help-module_statsLogin__j0k72 .Help-module_rule__wlOx- {\n  margin-left: -16px;\n  height: 1px;\n  position: absolute;\n  width: 100%;\n  background-color: var(--color-tone-1);\n  margin-bottom: 70px;\n  box-shadow: 0px 0px 2px rgba(50, 50, 50, 0.75);\n}"
  );
  function Fe(e) {
    var n = e.helpWord,
      e = e.letters;
    return g.createElement(
      g.Fragment,
      null,
      e.map(function (e, a) {
        var t = e.letter,
          e = e.evaluation;
        return g.createElement(
          "div",
          {
            "data-testid": "".concat(n, "-letter"),
            className: Be.tileContainer,
            key: "".concat(n, "-").concat(t, "-").concat(a),
          },
          g.createElement(Te, { letter: t, evaluation: e })
        );
      })
    );
  }
  var Ge = [
    {
      helpWord: "weary",
      letters: [
        { letter: "w", evaluation: "correct" },
        { letter: "e" },
        { letter: "a" },
        { letter: "r" },
        { letter: "y" },
      ],
    },
    {
      helpWord: "pills",
      letters: [
        { letter: "p" },
        { letter: "i", evaluation: "present" },
        { letter: "l" },
        { letter: "l" },
        { letter: "s" },
      ],
    },
    {
      helpWord: "vague",
      letters: [
        { letter: "v" },
        { letter: "a" },
        { letter: "g" },
        { letter: "u", evaluation: "absent" },
        { letter: "e" },
      ],
    },
  ];
  function We(e) {
    var a = e.isPage,
      t = e.enableAuth,
      n = e.isLoggedIn,
      e = t && !(void 0 !== n && n);
    return g.createElement(
      "section",
      {
        className: y(
          ((t = {}),
          (n = Be.page),
          (a = a),
          n in t
            ? Object.defineProperty(t, n, {
                value: a,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (t[n] = a),
          t)
        ),
      },
      g.createElement(
        "div",
        { className: Be.instructions },
        g.createElement(
          "p",
          null,
          "Guess the ",
          g.createElement("strong", null, "WORDLE"),
          " in six tries."
        ),
        g.createElement(
          "p",
          null,
          "Each guess must be a valid five-letter word. Hit the enter button to submit."
        ),
        g.createElement(
          "p",
          null,
          "After each guess, the color of the tiles will change to show how close your guess was to the word."
        ),
        g.createElement(
          "div",
          { className: Be.examples },
          g.createElement(
            "p",
            null,
            g.createElement("strong", null, "Examples")
          ),
          g.createElement(
            "div",
            { "aria-label": Ge[0].helpWord, className: Be.example },
            Fe(Ge[0]),
            g.createElement(
              "p",
              null,
              "The letter ",
              g.createElement("strong", null, "W"),
              " is in the word and in the correct spot."
            )
          ),
          g.createElement(
            "div",
            { "aria-label": Ge[1].helpWord, className: Be.example },
            Fe(Ge[1]),
            g.createElement(
              "p",
              null,
              "The letter ",
              g.createElement("strong", null, "I"),
              " is in the word but in the wrong spot."
            )
          ),
          g.createElement(
            "div",
            { "aria-label": Ge[2].helpWord, className: Be.example },
            Fe(Ge[2]),
            g.createElement(
              "p",
              null,
              "The letter ",
              g.createElement("strong", null, "U"),
              " is not in the word in any spot."
            )
          )
        ),
        g.createElement(
          "p",
          null,
          g.createElement(
            "strong",
            null,
            "A new WORDLE will be available each day!"
          )
        )
      ),
      e &&
        g.createElement(
          "div",
          { className: Be.statsLogin },
          g.createElement("div", { className: Be.rule }),
          g.createElement(
            "div",
            { className: Be.statsIcon },
            g.createElement("img", {
              alt: "Green Bar Graph",
              style: { content: "var(--wordle-stats-mini)" },
            })
          ),
          g.createElement(
            "div",
            { className: Be.loginText },
            "Looking to load your saved stats?",
            g.createElement("br", null),
            g.createElement("a", { href: qe }, "Log in here.")
          ),
          g.createElement(
            "a",
            { className: Be.loginArrow, href: "/" },
            g.createElement(
              "svg",
              {
                width: "24",
                height: "24",
                viewBox: "0 0 24 24",
                fill: "none",
                xmlns: "http://www.w3.org/2000/svg",
              },
              g.createElement("circle", {
                cx: "12",
                cy: "12",
                r: "12",
                fill: "var(--svg-arrow-fill)",
              }),
              g.createElement("path", {
                d: "M10.4038 6L15.8076 11.4038L10.4038 16.8076",
                stroke: "var(--svg-arrow-stroke)",
                strokeWidth: "1.5",
                strokeLinecap: "round",
              })
            )
          )
        )
    );
  }
  function Ye(e) {
    return e.persist.stats;
  }
  function Ve(e) {
    return { type: ra, payload: { isGameComplete: e } };
  }
  function Ue() {
    return { type: sa };
  }
  function Ze() {
    return p.useContext(i);
  }
  var Ke = function (e) {
      return e.persist.settings;
    },
    Xe = t.createSelector(Ke, function (e) {
      return e.hardMode;
    }),
    Je = t.createSelector(Ke, function (e) {
      return e.darkMode;
    }),
    Qe = t.createSelector(Ke, function (e) {
      return e.colorblindMode;
    }),
    $e = t.createSelector(Ye, function (e) {
      return e.gamesPlayed;
    }),
    ea = t.createSelector(Ye, function (e) {
      return e.gamesWon;
    }),
    aa = t.createSelector(Ye, function (e) {
      return e.maxStreak;
    }),
    ta = t.createSelector(Ye, function (e) {
      return e.currentStreak;
    }),
    na = t.createSelector(Ye, function (e) {
      return e.guesses;
    }),
    oa = t.createSelector(
      [W, H, D, Xe, R, Je, Qe],
      function (e, a, t, n, o, r, s) {
        a = "Wordle ".concat(a);
        (a += " ".concat("WIN" === o ? t : "X", "/").concat(Y)),
          n && (a += "*");
        var i = "";
        return (
          e.forEach(function (e) {
            e &&
              (e.forEach(function (e) {
                if (e) {
                  var a = "";
                  switch (e) {
                    case "correct":
                      a = s ? "🟧" : "🟩";
                      break;
                    case "present":
                      a = s ? "🟦" : "🟨";
                      break;
                    case "absent":
                      a = r ? "⬛" : "⬜";
                  }
                  i += a;
                }
              }),
              (i += "\n"));
          }),
          { text: "".concat(a, "\n\n").concat(i.trim()) }
        );
      }
    ),
    ra = "wordle/stats/TRACK_STATS_IMPRESSION",
    sa = "wordle/stats/SHARE_STATS";
  function ia(e, a) {
    return (
      (function (e) {
        if (Array.isArray(e)) return e;
      })(e) ||
      (function (e, a) {
        var t =
          null == e
            ? null
            : ("undefined" != typeof Symbol && e[Symbol.iterator]) ||
              e["@@iterator"];
        if (null != t) {
          var n,
            o,
            r = [],
            s = !0,
            i = !1;
          try {
            for (
              t = t.call(e);
              !(s = (n = t.next()).done) &&
              (r.push(n.value), !a || r.length !== a);
              s = !0
            );
          } catch (e) {
            (i = !0), (o = e);
          } finally {
            try {
              s || null == t.return || t.return();
            } finally {
              if (i) throw o;
            }
          }
          return r;
        }
      })(e, a) ||
      (function (e, a) {
        if (e) {
          if ("string" == typeof e) return la(e, a);
          var t = Object.prototype.toString.call(e).slice(8, -1);
          return "Map" ===
            (t = "Object" === t && e.constructor ? e.constructor.name : t) ||
            "Set" === t
            ? Array.from(e)
            : "Arguments" === t ||
              /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)
            ? la(e, a)
            : void 0;
        }
      })(e, a) ||
      (function () {
        throw new TypeError(
          "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
        );
      })()
    );
  }
  function la(e, a) {
    (null == a || a > e.length) && (a = e.length);
    for (var t = 0, n = new Array(a); t < a; t++) n[t] = e[t];
    return n;
  }
  function ua(o) {
    return ca.reduce(function (e, a) {
      var t, n;
      return (
        o
          ? ((t = (n = da[a]).testName),
            (n = n.activeVariant),
            (e[a] = o(t) === n))
          : (e[a] = !1),
        e
      );
    }, {});
  }
  var ca = ["moogle", "auth", "ccpa"],
    da = {
      moogle: {
        testName: "GAMES_wordleMoogle_0422",
        activeVariant: "1_EnableMoogle",
      },
      auth: {
        testName: "GAMES_wordleAuth_0427",
        activeVariant: "1_EnableAuth",
      },
      ccpa: {
        testName: "GAMES_wordleCCPA_0427",
        activeVariant: "1_EnableCCPA",
      },
    },
    ma = g.createContext(ua()),
    T = function (e) {
      var a = e.children,
        e = Ze().getVariant,
        n = ua(e),
        e = ia(g.useState(n), 2),
        o = e[0],
        r = e[1];
      return (
        g.useEffect(
          function () {
            var a, t;
            (a = n),
              (t = o),
              ca.some(function (e) {
                return a[e] !== t[e];
              }) && r(n);
          },
          [n]
        ),
        g.createElement(ma.Provider, { value: o }, a)
      );
    },
    pa = function (e) {
      return g.useContext(ma)[e];
    },
    ke = function (e) {
      return e.api;
    },
    we = t.createSelector(ke, function (e) {
      return e.moogleGet;
    }),
    ya = t.createSelector(we, function (e) {
      return e.optedIn;
    }),
    Ke =
      (t.createSelector(ke, function (e) {
        return e.solution;
      }),
      t.createSelector(ke, function (e) {
        return e.moogleGet.error;
      }),
      t.createSelector(ke, function (e) {
        return e.moogleGet.isLoading;
      }),
      t.createSelector(ke, function (e) {
        return e.moogleGet.data;
      })),
    ga = t.createSelector(Ke, function (e) {
      return null == e ? void 0 : e.game_data;
    }),
    ha = t.createSelector(Ke, function (e) {
      return null == e ? void 0 : e.timestamp;
    }),
    fa = t.createSelector(Ke, function (e) {
      return null == e ? void 0 : e.user_id;
    }),
    ba = t.createSelector([ya, fa, ha], function (e, a, t) {
      return e && !!a && !t;
    }),
    ka =
      (t.createSelector(ke, function (e) {
        return e.solution.error;
      }),
      t.createSelector(ke, function (e) {
        return e.solution.isLoading;
      }),
      t.createSelector(ke, function (e) {
        return e.solution.data;
      }),
      t.createSelector(ke, function (e) {
        return e.profileInfo.data;
      })),
    wa = t.createSelector(ke, function (e) {
      return e.profileInfo.isLoading;
    }),
    va =
      (t.createSelector(ke, function (e) {
        return e.profileInfo.error;
      }),
      t.createSelector(ke, function (e) {
        return e.mooglePost.isLoading;
      })),
    _a = t.createSelector(ke, function (e) {
      return e.mooglePost.error;
    }),
    xa = {
      gameStats: "Stats-module_gameStats__ZP1aW",
      statistics: "Stats-module_statistics__Hke7Z",
      statisticContainer: "Stats-module_statisticContainer__XORTW",
      statistic: "Stats-module_statistic__fr8JZ",
      timer: "Stats-module_timer__xn2mu",
      label: "Stats-module_label__pLAui",
      guessDistribution: "Stats-module_guessDistribution__J8Int",
      graphContainer: "Stats-module_graphContainer__BlVFU",
      graph: "Stats-module_graph__l2LGn",
      graphBar: "Stats-module_graphBar__TvsIP",
      highlight: "Stats-module_highlight__fBBiL",
      alignRight: "Stats-module_alignRight__29Xhl",
      numGuesses: "Stats-module_numGuesses__aB7UF",
      footer: "Stats-module_footer__IY-Bt",
      countdown: "Stats-module_countdown__a-cWu",
      share: "Stats-module_share__kfJ-m",
      noData: "Stats-module_noData__D3wkv",
      shareButton: "Stats-module_shareButton__eNFFD",
      shareIconContainer: "Stats-module_shareIconContainer__j2o6K",
      statsBtnLeft: "Stats-module_statsBtnLeft__q1PQ8",
      statsBtnCenter: "Stats-module_statsBtnCenter__Kgi5x",
      statsInfoBtn: "Stats-module_statsInfoBtn__WUPls",
      promoButton: "Stats-module_promoButton__8dcY3",
      promoIcon: "Stats-module_promoIcon__1c9qr",
      promoButtonContainer: "Stats-module_promoButtonContainer__xUFtx",
    };
  Ce(
    ".Stats-module_gameStats__ZP1aW {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding-top: 16px;\n}\n.Stats-module_gameStats__ZP1aW h1 {\n  font-weight: 700;\n  font-size: 16px;\n  letter-spacing: 0.5px;\n  text-transform: uppercase;\n  text-align: center;\n  margin-bottom: 10px;\n}\n\n.Stats-module_statistics__Hke7Z {\n  display: flex;\n}\n\n.Stats-module_statisticContainer__XORTW {\n  flex: 1;\n}\n\n.Stats-module_statisticContainer__XORTW .Stats-module_statistic__fr8JZ {\n  font-size: 36px;\n  font-weight: 400;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  text-align: center;\n  letter-spacing: 0.05em;\n  font-variant-numeric: proportional-nums;\n}\n\n.Stats-module_statistic__fr8JZ.Stats-module_timer__xn2mu {\n  font-variant-numeric: initial;\n}\n\n.Stats-module_statisticContainer__XORTW .Stats-module_label__pLAui {\n  font-size: 12px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  text-align: center;\n}\n\n.Stats-module_guessDistribution__J8Int {\n  width: 80%;\n}\n\n.Stats-module_graphContainer__BlVFU {\n  width: 100%;\n  height: 20px;\n  display: flex;\n  align-items: center;\n  padding-bottom: 4px;\n  font-size: 14px;\n  line-height: 20px;\n}\n\n.Stats-module_graphContainer__BlVFU .Stats-module_graph__l2LGn {\n  width: 100%;\n  height: 100%;\n  padding-left: 4px;\n}\n\n.Stats-module_graphContainer__BlVFU .Stats-module_graph__l2LGn .Stats-module_graphBar__TvsIP {\n  height: 100%;\n  /* Assume no wins */\n  width: 0%;\n  position: relative;\n  background-color: var(--color-absent);\n  display: flex;\n  justify-content: center;\n}\n\n.Stats-module_graphContainer__BlVFU .Stats-module_graph__l2LGn .Stats-module_graphBar__TvsIP.Stats-module_highlight__fBBiL {\n  background-color: var(--color-correct);\n}\n\n.Stats-module_graphContainer__BlVFU .Stats-module_graph__l2LGn .Stats-module_graphBar__TvsIP.Stats-module_alignRight__29Xhl {\n  justify-content: flex-end;\n  padding-right: 8px;\n}\n\n.Stats-module_graphContainer__BlVFU .Stats-module_graph__l2LGn .Stats-module_numGuesses__aB7UF {\n  font-weight: bold;\n  color: var(--tile-text-color);\n}\n\n.Stats-module_statistics__Hke7Z,\n.Stats-module_guessDistribution__J8Int {\n  padding-bottom: 10px;\n}\n\n.Stats-module_footer__IY-Bt {\n  display: flex;\n  width: 100%;\n}\n\n.Stats-module_countdown__a-cWu {\n  border-right: 1px solid var(--color-tone-1);\n  padding-right: 12px;\n  width: 50%;\n}\n\n.Stats-module_share__kfJ-m {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  padding-left: 12px;\n  width: 50%;\n}\n\n.Stats-module_noData__D3wkv {\n  text-align: center;\n  margin-bottom: 10px;\n}\n\n.Stats-module_shareButton__eNFFD {\n  background-color: var(--key-bg-correct);\n  color: var(--key-evaluated-text-color);\n  font-family: inherit;\n  font-weight: bold;\n  border-radius: 4px;\n  cursor: pointer;\n  border: none;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  flex-direction: row;\n  text-transform: uppercase;\n  -webkit-tap-highlight-color: rgba(0, 0, 0, 0.3);\n  width: 80%;\n  font-size: 20px;\n  height: 52px;\n  filter: brightness(100%);\n}\n\n@media (max-width: 444px) {\n  .Stats-module_shareButton__eNFFD {\n    font-size: 16px;\n  }\n}\n.Stats-module_shareButton__eNFFD:hover {\n  opacity: 0.9;\n}\n\n.Stats-module_shareIconContainer__j2o6K {\n  width: 24px;\n  height: 24px;\n  padding-left: 8px;\n}\n\n.Stats-module_statsBtnLeft__q1PQ8 {\n  justify-content: unset;\n  width: 80%;\n  margin: 10px 0px 15px 15px;\n}\n\n.Stats-module_statsBtnCenter__Kgi5x {\n  margin: 10px;\n}\n\n.Stats-module_statsInfoBtn__WUPls {\n  all: unset;\n  text-decoration: underline;\n  font-size: 14px;\n  font-weight: 400;\n  line-height: 16px;\n  color: var(--color-tone-1);\n}\n\n.Stats-module_promoButton__8dcY3 {\n  border: 1px solid var(--color-tone-1);\n  padding: 10px;\n  border-radius: 105px;\n  background: var(--color-tone-7);\n  font-weight: 700;\n  font-size: 14px;\n  line-height: 16px;\n  color: inherit;\n  text-decoration: none;\n  width: 150px;\n  display: flex;\n  width: 66%;\n  align-items: center;\n  margin-right: 5px;\n  vertical-align: middle;\n  justify-content: center;\n}\n\n.Stats-module_promoIcon__1c9qr {\n  width: 25px;\n  height: 25px;\n  background-image: var(--spelling-bee-promo);\n  background-size: 25px;\n  background-position: center;\n  margin-left: 5px;\n}\n\n.Stats-module_promoButtonContainer__xUFtx {\n  border-top: 1px solid var(--color-tone-6);\n  width: 100%;\n  justify-content: center;\n  display: flex;\n  padding-top: 20px;\n}"
  );
  var Sa = {
      currentStreak: "Current Streak",
      maxStreak: "Max Streak",
      winPercentage: "Win %",
      gamesPlayed: "Played",
      gamesWon: "Won",
      averageGuesses: "Av. Guesses",
    },
    ja = ["gamesPlayed", "winPercentage", "currentStreak", "maxStreak"];
  function Ea(e) {
    var t = e.stats;
    return g.createElement(
      "div",
      { className: xa.statistics },
      ja.map(function (e) {
        var a = t[e];
        return g.createElement(
          "div",
          { className: xa.statisticContainer, key: e },
          g.createElement("div", { className: xa.statistic }, a),
          g.createElement("div", { className: xa.label }, Sa[e])
        );
      })
    );
  }
  function za(e) {
    return (
      (function (e) {
        if (Array.isArray(e)) return Oa(e);
      })(e) ||
      (function (e) {
        if (
          ("undefined" != typeof Symbol && null != e[Symbol.iterator]) ||
          null != e["@@iterator"]
        )
          return Array.from(e);
      })(e) ||
      (function (e, a) {
        if (e) {
          if ("string" == typeof e) return Oa(e, a);
          var t = Object.prototype.toString.call(e).slice(8, -1);
          return "Map" ===
            (t = "Object" === t && e.constructor ? e.constructor.name : t) ||
            "Set" === t
            ? Array.from(e)
            : "Arguments" === t ||
              /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)
            ? Oa(e, a)
            : void 0;
        }
      })(e) ||
      (function () {
        throw new TypeError(
          "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
        );
      })()
    );
  }
  function Oa(e, a) {
    (null == a || a > e.length) && (a = e.length);
    for (var t = 0, n = new Array(a); t < a; t++) n[t] = e[t];
    return n;
  }
  function Na(e, a, t) {
    return (
      a in e
        ? Object.defineProperty(e, a, {
            value: t,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[a] = t),
      e
    );
  }
  function Aa(e) {
    var a = e.guesses,
      t = e.rowIndex,
      n = e.gameStatus,
      o = [],
      r = Math.max.apply(Math, za(Object.values(a)));
    if (
      Object.values(a).every(function (e) {
        return 0 === e;
      })
    )
      return g.createElement(
        g.Fragment,
        null,
        g.createElement("h1", null, "Guess Distribution"),
        g.createElement("div", { className: xa.noData }, "No Data")
      );
    for (var s, i, l = 1; l < Object.keys(a).length; l += 1) {
      var u = l,
        c = a[l],
        d = {
          rowGuess: u,
          percentGuesses: Math.max(7, Math.round((c / r) * 100)),
          numGuesses: c,
          addHighlight: "WIN" === n && l === t,
          index: l,
        },
        m =
          ((u = m = i = s = void 0),
          (s = (c = d).rowGuess),
          (i = d.percentGuesses),
          (m = d.numGuesses),
          (u = d.addHighlight),
          (c = d.index),
          g.createElement(
            "div",
            { className: xa.graphContainer, key: c },
            g.createElement("div", { className: xa.guess }, s),
            g.createElement(
              "div",
              { className: xa.graph },
              g.createElement(
                "div",
                {
                  style: { width: "".concat(i, "%") },
                  className: y(
                    xa.graphBar,
                    (Na((i = {}), xa.alignRight, 0 < m),
                    Na(i, xa.highlight, u),
                    i)
                  ),
                },
                g.createElement("div", { className: xa.numGuesses }, m)
              )
            )
          ));
      o.push(m);
    }
    return g.createElement(
      g.Fragment,
      null,
      g.createElement("h1", null, "Guess Distribution"),
      g.createElement("div", { className: xa.guessDistribution }, o)
    );
  }
  function Ca(e, a) {
    return (
      (function (e) {
        if (Array.isArray(e)) return e;
      })(e) ||
      (function (e, a) {
        var t =
          null == e
            ? null
            : ("undefined" != typeof Symbol && e[Symbol.iterator]) ||
              e["@@iterator"];
        if (null != t) {
          var n,
            o,
            r = [],
            s = !0,
            i = !1;
          try {
            for (
              t = t.call(e);
              !(s = (n = t.next()).done) &&
              (r.push(n.value), !a || r.length !== a);
              s = !0
            );
          } catch (e) {
            (i = !0), (o = e);
          } finally {
            try {
              s || null == t.return || t.return();
            } finally {
              if (i) throw o;
            }
          }
          return r;
        }
      })(e, a) ||
      (function (e, a) {
        if (e) {
          if ("string" == typeof e) return Ia(e, a);
          var t = Object.prototype.toString.call(e).slice(8, -1);
          return "Map" ===
            (t = "Object" === t && e.constructor ? e.constructor.name : t) ||
            "Set" === t
            ? Array.from(e)
            : "Arguments" === t ||
              /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)
            ? Ia(e, a)
            : void 0;
        }
      })(e, a) ||
      (function () {
        throw new TypeError(
          "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
        );
      })()
    );
  }
  function Ia(e, a) {
    (null == a || a > e.length) && (a = e.length);
    for (var t = 0, n = new Array(a); t < a; t++) n[t] = e[t];
    return n;
  }
  var Pa = 1e3,
    La = 60 * Pa,
    Ta = 60 * La,
    Ma = 24 * Ta,
    Ra = function (e) {
      return e.toString().padStart(2, "0");
    };
  function Da() {
    var e = Ca(p.useState(""), 2),
      a = e[0],
      n = e[1];
    return (
      p.useEffect(function () {
        var e = new Date();
        e.setDate(e.getDate() + 1), e.setHours(0, 0, 0, 0);
        var a = e.getTime(),
          e = function () {
            return n(
              (function (e) {
                var a = new Date().getTime(),
                  t = Math.floor(e - a);
                if (t <= 0) return "00:00:00";
                (e = Math.floor((t % Ma) / Ta)),
                  (a = Math.floor((t % Ta) / La)),
                  (t = Math.floor((t % La) / Pa));
                return "".concat(Ra(e), ":").concat(Ra(a), ":").concat(Ra(t));
              })(a)
            );
          },
          t = setInterval(e, 200);
        return (
          e(),
          function () {
            return clearInterval(t);
          }
        );
      }, []),
      g.createElement(
        "div",
        { className: xa.statisticContainer },
        g.createElement(
          "div",
          { className: y(xa.statistic, xa.timer) },
          g.createElement("div", { id: "timer", "data-testid": "timer" }, a)
        )
      )
    );
  }
  var qa = {
    promo: "Promo-module_promo__OjSS6",
    promoLink: "Promo-module_promoLink__9Rsas",
    promoCta: "Promo-module_promoCta__J70IK",
    promoText: "Promo-module_promoText__wg6Vu",
    promoTitle: "Promo-module_promoTitle__TgBo2",
    promoTextPrimary: "Promo-module_promoTextPrimary__chnyc",
    promoTextSecondary: "Promo-module_promoTextSecondary__mjI5B",
    promoIcon: "Promo-module_promoIcon__GIqUm",
    promoArrow: "Promo-module_promoArrow__iqw6N",
    rule: "Promo-module_rule__Yn4Pk",
  };
  function Ha() {
    return g.createElement(
      "div",
      { className: qa.promo },
      g.createElement("div", { className: qa.rule }),
      g.createElement(
        "a",
        {
          href: "https://www.nytimes.com/puzzles/spelling-bee",
          className: qa.promoLink,
          onClick: function (e) {
            return e.stopPropagation();
          },
        },
        g.createElement(
          "div",
          { className: qa.promoIcon },
          g.createElement(
            "svg",
            {
              width: "42",
              height: "44",
              viewBox: "0 0 42 44",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
            },
            g.createElement("path", {
              d: "M24.9528 14.8924L28.952 21.8171L24.9528 28.7417H16.9628L12.9636 21.8171L16.9628 14.8924H24.9528Z",
              fill: "#F7DA21",
              stroke: "#F7DA21",
              strokeWidth: "0.495011",
            }),
            g.createElement("path", {
              d: "M12.9892 21.7667L16.9884 28.6914L12.9892 35.616H4.99921L1 28.6914L4.99921 21.7667H12.9892Z",
              fill: "white",
              stroke: "#121212",
              strokeWidth: "1.5",
            }),
            g.createElement("path", {
              d: "M17.0056 14.8493L13.0064 7.92463L17.0056 1L24.9955 1L28.9948 7.92463L24.9955 14.8493L17.0056 14.8493Z",
              fill: "white",
              stroke: "#121212",
              strokeWidth: "1.5",
            }),
            g.createElement("path", {
              d: "M37.0008 7.96736L41 14.892L37.0008 21.8166H29.0108L25.0116 14.892L29.0108 7.96736H37.0008Z",
              fill: "white",
              stroke: "#121212",
              strokeWidth: "1.5",
            }),
            g.createElement("path", {
              d: "M12.9972 7.96736L16.9964 14.892L12.9972 21.8166H5.00727L1.00806 14.892L5.00727 7.96736H12.9972Z",
              fill: "white",
              stroke: "#121212",
              strokeWidth: "1.5",
            }),
            g.createElement("path", {
              d: "M37.0008 21.8089L41 28.7335L37.0008 35.6582H29.0108L25.0116 28.7335L29.0108 21.8089H37.0008Z",
              fill: "white",
              stroke: "#121212",
              strokeWidth: "1.5",
            }),
            g.createElement("path", {
              d: "M24.9947 28.7333L28.9939 35.658L24.9947 42.5826H17.0047L13.0055 35.658L17.0047 28.7333H24.9947Z",
              fill: "white",
              stroke: "#121212",
              strokeWidth: "1.5",
            })
          )
        ),
        g.createElement(
          "div",
          { className: qa.promoText },
          g.createElement(
            "span",
            { className: qa.promoTextPrimary },
            "How many words can you find",
            " "
          ),
          g.createElement(
            "span",
            { className: qa.promoTextsecondary },
            "using 7 letters?"
          ),
          g.createElement(
            "span",
            { className: qa.promoCta },
            "Play Spelling Bee"
          )
        ),
        g.createElement(
          "div",
          { className: qa.promoArrow },
          g.createElement(
            "svg",
            {
              width: "24",
              height: "24",
              viewBox: "0 0 24 24",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
            },
            g.createElement("circle", {
              cx: "12",
              cy: "12",
              r: "12",
              fill: "var(--svg-arrow-fill)",
            }),
            g.createElement("path", {
              d: "M10.4038 6L15.8076 11.4038L10.4038 16.8076",
              stroke: "var(--svg-arrow-stroke)",
              strokeWidth: "1.5",
              strokeLinecap: "round",
            })
          )
        )
      )
    );
  }
  function Ba(e, s, i, l) {
    return new (i = i || Promise)(function (t, a) {
      function n(e) {
        try {
          r(l.next(e));
        } catch (e) {
          a(e);
        }
      }
      function o(e) {
        try {
          r(l.throw(e));
        } catch (e) {
          a(e);
        }
      }
      function r(e) {
        var a;
        e.done
          ? t(e.value)
          : ((a = e.value) instanceof i
              ? a
              : new i(function (e) {
                  e(a);
                })
            ).then(n, o);
      }
      r((l = l.apply(e, s || [])).next());
    });
  }
  function Fa(t, n) {
    var o,
      r,
      s,
      i = {
        label: 0,
        sent: function () {
          if (1 & s[0]) throw s[1];
          return s[1];
        },
        trys: [],
        ops: [],
      },
      e = { next: a(0), throw: a(1), return: a(2) };
    return (
      "function" == typeof Symbol &&
        (e[Symbol.iterator] = function () {
          return this;
        }),
      e
    );
    function a(a) {
      return function (e) {
        return (function (a) {
          if (o) throw new TypeError("Generator is already executing.");
          for (; i; )
            try {
              if (
                ((o = 1),
                r &&
                  (s =
                    2 & a[0]
                      ? r.return
                      : a[0]
                      ? r.throw || ((s = r.return) && s.call(r), 0)
                      : r.next) &&
                  !(s = s.call(r, a[1])).done)
              )
                return s;
              switch (((r = 0), (a = s ? [2 & a[0], s.value] : a)[0])) {
                case 0:
                case 1:
                  s = a;
                  break;
                case 4:
                  return i.label++, { value: a[1], done: !1 };
                case 5:
                  i.label++, (r = a[1]), (a = [0]);
                  continue;
                case 7:
                  (a = i.ops.pop()), i.trys.pop();
                  continue;
                default:
                  if (
                    !(
                      (s = 0 < (s = i.trys).length && s[s.length - 1]) ||
                      (6 !== a[0] && 2 !== a[0])
                    )
                  ) {
                    i = 0;
                    continue;
                  }
                  if (3 === a[0] && (!s || (a[1] > s[0] && a[1] < s[3]))) {
                    i.label = a[1];
                    break;
                  }
                  if (6 === a[0] && i.label < s[1]) {
                    (i.label = s[1]), (s = a);
                    break;
                  }
                  if (s && i.label < s[2]) {
                    (i.label = s[2]), i.ops.push(a);
                    break;
                  }
                  s[2] && i.ops.pop(), i.trys.pop();
                  continue;
              }
              a = n.call(t, i);
            } catch (e) {
              (a = [6, e]), (r = 0);
            } finally {
              o = s = 0;
            }
          if (5 & a[0]) throw a[1];
          return { value: a[0] ? a[1] : void 0, done: !0 };
        })([a, e]);
      };
    }
  }
  Ce(
    '.Promo-module_promo__OjSS6 {\n  margin-top: 12px;\n  width: 100%;\n}\n\n.Promo-module_promoLink__9Rsas {\n  display: flex;\n  width: 100%;\n  align-items: center;\n  justify-content: flex-start;\n  text-decoration: none;\n  padding-top: 16px;\n}\n.Promo-module_promoLink__9Rsas:hover {\n  --svg-arrow-fill: var(--svg-arrow-fill-hover);\n  --svg-arrow-stroke: var(--svg-arrow-stroke-hover);\n}\n.Promo-module_promoLink__9Rsas:hover .Promo-module_promoCta__J70IK {\n  text-decoration: underline;\n}\n\n.Promo-module_promoText__wg6Vu {\n  font-family: "nyt-franklin-500";\n  font-size: 14px;\n  color: var(--color-tone-1);\n  flex-grow: 2;\n  line-height: 16px;\n}\n\n.Promo-module_promoTitle__TgBo2 {\n  font-family: "nyt-franklin";\n  font-weight: 700;\n}\n\n.Promo-module_promoCta__J70IK {\n  display: block;\n  font-family: "nyt-franklin";\n  font-weight: 700;\n  margin-top: 4px;\n}\n\n/* Text balancing */\n.Promo-module_promoTextPrimary__chnyc {\n  display: inline;\n}\n\n/* Text balancing */\n.Promo-module_promoTextSecondary__mjI5B {\n  display: inline;\n}\n\n/* Text balancing */\n@media (max-width: 500px) {\n  .Promo-module_promoTextPrimary__chnyc {\n    display: block;\n  }\n\n  .Promo-module_promoTextSecondary__mjI5B {\n    display: block;\n  }\n}\n.Promo-module_promoIcon__GIqUm {\n  width: var(--promo-icon-width);\n  height: var(--promo-icon-height);\n  margin-right: 16px;\n  padding: var(--promo-icon-padding);\n}\n\n.Promo-module_promoArrow__iqw6N {\n  justify-self: flex-end;\n}\n\n.Promo-module_rule__Yn4Pk {\n  margin-left: -16px;\n  height: 1px;\n  position: absolute;\n  width: 100%;\n  background-color: var(--color-tone-4);\n}'
  ),
    function () {
      (console.warn || console.log).apply(console, arguments);
    }.bind("[clipboard-polyfill]");
  var we = "undefined" == typeof navigator ? void 0 : navigator,
    Ke = null == we ? void 0 : we.clipboard,
    Ga =
      (null === (ke = null == Ke ? void 0 : Ke.read) ||
        void 0 === ke ||
        ke.bind(Ke),
      null === (we = null == Ke ? void 0 : Ke.readText) ||
        void 0 === we ||
        we.bind(Ke),
      null === (ke = null == Ke ? void 0 : Ke.write) ||
        void 0 === ke ||
        ke.bind(Ke),
      null === (we = null == Ke ? void 0 : Ke.writeText) || void 0 === we
        ? void 0
        : we.bind(Ke)),
    ke = "undefined" == typeof window ? void 0 : window,
    Wa = (null == ke || ke.ClipboardItem, ke);
  function Ya() {
    this.success = !1;
  }
  function Va(e) {
    var a = new Ya(),
      e = function (e, a, t) {
        for (var n in ((e.success = !0), a)) {
          var o = a[n],
            r = t.clipboardData;
          r.setData(n, o),
            "text/plain" === n && r.getData(n) !== o && (e.success = !1);
        }
        t.preventDefault();
      }.bind(this, a, e);
    document.addEventListener("copy", e);
    try {
      document.execCommand("copy");
    } finally {
      document.removeEventListener("copy", e);
    }
    return a.success;
  }
  function Ua(e, a) {
    Za(e);
    a = Va(a);
    return Ka(), a;
  }
  function Za(e) {
    var a,
      t = document.getSelection();
    t &&
      ((a = document.createRange()).selectNodeContents(e),
      t.removeAllRanges(),
      t.addRange(a));
  }
  function Ka() {
    var e = document.getSelection();
    e && e.removeAllRanges();
  }
  function Xa(n) {
    return Ba(this, void 0, void 0, function () {
      var t;
      return Fa(this, function (e) {
        if (
          ((t = "text/plain" in n),
          "undefined" != typeof ClipboardEvent ||
            void 0 === Wa.clipboardData ||
            void 0 === Wa.clipboardData.setData)
        )
          return Va(n) ||
            -1 < navigator.userAgent.indexOf("Edge") ||
            Ua(document.body, n) ||
            (function (e) {
              var a = document.createElement("div");
              a.setAttribute("style", "-webkit-user-select: text !important"),
                (a.textContent = "temporary element"),
                document.body.appendChild(a);
              e = Ua(a, e);
              return document.body.removeChild(a), e;
            })(n) ||
            (function (e) {
              var a = document.createElement("div");
              a.setAttribute("style", "-webkit-user-select: text !important");
              var t = a;
              a.attachShadow && (t = a.attachShadow({ mode: "open" }));
              var n = document.createElement("span");
              (n.innerText = e),
                t.appendChild(n),
                document.body.appendChild(a),
                Za(n);
              n = document.execCommand("copy");
              return Ka(), document.body.removeChild(a), n;
            })(n["text/plain"])
            ? [2, !0]
            : [2, !1];
        var a;
        if (!t) throw new Error("No `text/plain` value was specified.");
        if (((a = n["text/plain"]), Wa.clipboardData.setData("Text", a)))
          return [2, !0];
        throw new Error(
          "Copying failed, possibly because the user rejected it."
        );
      });
    });
  }
  function Ja(t) {
    return Ba(this, void 0, void 0, function () {
      return Fa(this, function (e) {
        if (Ga) return [2, Ga(t)];
        if (!Xa((((a = {})["text/plain"] = t), a)))
          throw new Error("writeText() failed");
        var a;
        return [2];
      });
    });
  }
  function Qa() {
    var e = navigator.userAgent || navigator.vendor || window.opera;
    return (
      /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
        e
      ) ||
      /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
        e.substr(0, 4)
      )
    );
  }
  function $a(e, a, t) {
    try {
      Qa() &&
      !(-1 < navigator.userAgent.toLowerCase().indexOf("firefox")) &&
      void 0 !== navigator.share &&
      navigator.canShare &&
      navigator.canShare(e)
        ? navigator.share(e).catch(function () {})
        : Ja(e.text).then(a, t);
    } catch (e) {
      t(), console.warn("Share failed", e);
    }
  }
  var et = "AuthCTA-module_container__mFg-m",
    at = "AuthCTA-module_icon__fZT88",
    tt = "AuthCTA-module_promoIcon__2-SRz",
    nt = "AuthCTA-module_textContainer__kIjDX",
    ot = "AuthCTA-module_bold__ThmkP",
    rt = "AuthCTA-module_subText__2Qsw5",
    st = "AuthCTA-module_title__iBYtq",
    it = "AuthCTA-module_buttonsContainer__y0b1J",
    lt = "AuthCTA-module_moreLink__pAJHo",
    ut = "AuthCTA-module_loginButton__0FcEr",
    ct = "AuthCTA-module_footer__9-hGG",
    dt = "AuthCTA-module_footerContainer__j9w3x",
    mt = "AuthCTA-module_promoButton__i3iNK",
    pt = "AuthCTA-module_shareButton__SsNA6",
    yt = "AuthCTA-module_shareIcon__x5WtP",
    gt = "AuthCTA-module_shareText__o7WL-";
  function ht(e) {
    var a = e.loggedIn,
      e = e.moogleOptedIn,
      t = Ne();
    return e
      ? null
      : g.createElement(
          g.Fragment,
          null,
          g.createElement(
            "div",
            { className: et },
            g.createElement(
              "div",
              null,
              g.createElement("img", {
                className: at,
                alt: "Statistics Graph Bar in Green with Check Mark",
                style: { content: "var(--stats-auth)" },
              })
            ),
            g.createElement(
              "div",
              { className: nt },
              g.createElement("p", { className: st }, "New"),
              g.createElement(
                "p",
                { className: ot },
                "You can now easily link your stats to a free New York Times account."
              ),
              g.createElement(
                "p",
                { className: rt },
                "Your stats will save wherever you play and you'll never lose a streak again."
              )
            )
          ),
          g.createElement(
            "div",
            { className: it },
            !a &&
              g.createElement(
                "a",
                {
                  type: "link",
                  className: ut,
                  "aria-label":
                    "Log in or create a free account link. Click to sign in.",
                  tabIndex: -1,
                  href: qe,
                },
                "Log in or create a free account"
              ),
            a &&
              !e &&
              g.createElement(
                "button",
                {
                  type: "button",
                  className: ut,
                  "aria-label": "Link stats to my account",
                  onClick: function () {
                    return t(me("statsLink"));
                  },
                },
                "Link stats to my account"
              ),
            g.createElement("br", null),
            g.createElement(
              "button",
              {
                className: lt,
                type: "button",
                onClick: function () {
                  return t(me("linkInfo"));
                },
              },
              "Tell me more >"
            )
          )
        );
  }
  function ft(e) {
    e = e.handleShare;
    return g.createElement(
      "div",
      { className: ct },
      g.createElement("p", null, "NEXT WORDLE"),
      g.createElement(Da, null),
      g.createElement(
        "div",
        { className: dt },
        g.createElement(
          "a",
          {
            type: "button",
            id: "promo-button",
            className: mt,
            href: "https://www.nytimes.com/puzzles/spelling-bee",
          },
          g.createElement("span", null, "Play Spelling Bee"),
          g.createElement("span", { className: tt })
        ),
        g.createElement(
          "button",
          { type: "button", id: "share-button", className: pt, onClick: e },
          g.createElement("span", { className: gt }, "Share"),
          g.createElement(E, { id: yt, icon: "share" })
        )
      )
    );
  }
  function bt() {
    var a = Ne(),
      e = Ae(Ye),
      t = Ae(R),
      n = Ae(D),
      o = Ae(oa),
      r = "IN_PROGRESS" !== t,
      s = pa("auth"),
      i = Ae(ya),
      l = !!Ae(fa);
    p.useEffect(function () {
      a(Ve(r));
    }, []);
    function u(e) {
      e.preventDefault(),
        e.stopPropagation(),
        $a(
          o,
          function () {
            a(Ue()),
              a(
                be({
                  text: "Copied results to clipboard",
                  duration: 2e3,
                  isSystem: !0,
                })
              );
          },
          function () {
            a(be({ text: "Share failed", duration: 2e3, isSystem: !0 }));
          }
        );
    }
    if (s) {
      s = 0 === e.gamesPlayed ? xa.statsBtnCenter : xa.statsBtnLeft;
      return g.createElement(
        "div",
        { "data-testid": "authContainer", className: xa.gameStats },
        g.createElement("h1", null, "Statistics"),
        g.createElement(Ea, { stats: e }),
        g.createElement(Aa, { guesses: e.guesses, rowIndex: n, gameStatus: t }),
        g.createElement(
          "div",
          { className: s },
          g.createElement(
            "button",
            {
              type: "button",
              className: xa.statsInfoBtn,
              onClick: function () {
                return a(me("statsProblem"));
              },
            },
            "My stats don't look right >"
          )
        ),
        g.createElement(ht, { loggedIn: l, moogleOptedIn: i }),
        r
          ? g.createElement(ft, { handleShare: u })
          : g.createElement(
              "div",
              { className: xa.promoButtonContainer },
              g.createElement(
                "a",
                {
                  type: "button",
                  id: "promo-button",
                  className: xa.promoButton,
                  href: "https://www.nytimes.com/puzzles/spelling-bee",
                },
                g.createElement("span", null, "Play Spelling Bee"),
                g.createElement("span", { className: xa.promoIcon })
              )
            )
      );
    }
    return g.createElement(
      "div",
      { className: xa.gameStats },
      g.createElement("h1", null, "Statistics"),
      g.createElement(Ea, { stats: e }),
      g.createElement(Aa, { guesses: e.guesses, rowIndex: n, gameStatus: t }),
      r &&
        g.createElement(
          "div",
          { className: xa.footer },
          g.createElement(
            "div",
            { className: xa.countdown },
            g.createElement("h1", null, "Next WORDLE"),
            g.createElement(Da, null)
          ),
          g.createElement(
            "div",
            { className: xa.share },
            g.createElement(
              "button",
              {
                type: "button",
                id: "share-button",
                className: xa.shareButton,
                onClick: u,
              },
              "Share",
              g.createElement(
                "span",
                { className: xa.shareIconContainer },
                g.createElement(E, { icon: "share" })
              )
            )
          )
        ),
      g.createElement(Ha, null)
    );
  }
  Ce(
    ".AuthCTA-module_container__mFg-m {\n  border-top: 1px solid var(--color-tone-4);\n  width: 100%;\n  text-align: left;\n  display: flex;\n  padding: 10px;\n}\n\n.AuthCTA-module_icon__fZT88 {\n  padding: 10px 10px 0px 0px;\n}\n\n.AuthCTA-module_promoIcon__2-SRz {\n  width: 25px;\n  height: 25px;\n  background-image: var(--spelling-bee-promo);\n  background-size: 25px;\n  background-position: center;\n  margin-left: 5px;\n}\n\n.AuthCTA-module_textContainer__kIjDX > p {\n  margin: 5px;\n}\n.AuthCTA-module_textContainer__kIjDX .AuthCTA-module_bold__ThmkP {\n  color: var(--color-tone-1);\n  font-weight: 700;\n  font-size: 16px;\n  line-height: 20px;\n}\n.AuthCTA-module_textContainer__kIjDX .AuthCTA-module_subText__2Qsw5 {\n  color: var(--color-tone-2);\n  font-weight: 400;\n  font-size: 14px;\n  line-height: 16px;\n}\n.AuthCTA-module_textContainer__kIjDX .AuthCTA-module_title__iBYtq {\n  color: #2671dc;\n  font-weight: 700;\n  font-size: 11px;\n  line-height: 12px;\n  letter-spacing: 0.1em;\n  text-transform: uppercase;\n}\n\n.AuthCTA-module_buttonsContainer__y0b1J {\n  text-align: center;\n  margin-top: 10px;\n}\n.AuthCTA-module_buttonsContainer__y0b1J .AuthCTA-module_moreLink__pAJHo {\n  all: unset;\n  text-decoration: underline;\n  font-size: 14px;\n  font-weight: 400;\n  line-height: 16px;\n  color: var(--color-tone-2);\n  margin: 20px;\n}\n.AuthCTA-module_buttonsContainer__y0b1J .AuthCTA-module_loginButton__0FcEr {\n  background-color: var(--color-tone-7);\n  color: var(--color-tone-1);\n  font-weight: 700;\n  font-size: 14px;\n  line-height: 12px;\n  border: 1px solid var(--color-tone-1);\n  border-radius: 55px;\n  align-items: center;\n  text-align: center;\n  letter-spacing: 0.04em;\n  text-decoration: none;\n  padding: 10px 40px;\n}\n\n.AuthCTA-module_footer__9-hGG {\n  text-align: center;\n  width: 100%;\n  border-top: 1px solid var(--color-tone-4);\n}\n.AuthCTA-module_footer__9-hGG p {\n  font-weight: 700;\n  font-size: 14px;\n  line-height: 20px;\n  align-items: center;\n  letter-spacing: 0.07em;\n}\n\n.AuthCTA-module_footerContainer__j9w3x {\n  width: 100%;\n  display: flex;\n  justify-content: center;\n  margin-top: 10px;\n}\n\n.AuthCTA-module_promoButton__i3iNK {\n  border: 1px solid var(--color-tone-1);\n  padding: 10px;\n  border-radius: 105px;\n  background: var(--color-tone-7);\n  font-weight: 700;\n  font-size: 14px;\n  line-height: 16px;\n  color: inherit;\n  text-decoration: none;\n  width: 150px;\n  display: flex;\n  width: 80%;\n  align-items: center;\n  margin-right: 5px;\n  vertical-align: middle;\n  justify-content: center;\n}\n\n.AuthCTA-module_shareButton__SsNA6 {\n  background-color: var(--green);\n  color: var(--color-tone-7);\n  border-radius: 104px;\n  border: none;\n  font-weight: 700;\n  font-size: 14px;\n  line-height: 16px;\n  width: 100%;\n  vertical-align: middle;\n}\n\n#AuthCTA-module_shareIcon__x5WtP {\n  vertical-align: middle;\n  margin-left: 10px;\n}\n\n.AuthCTA-module_shareText__o7WL- {\n  color: var(--white);\n}"
  );
  function kt() {
    var e,
      a,
      t,
      n =
        0 < arguments.length && void 0 !== arguments[0]
          ? arguments[0]
          : "Wordle Feedback",
      o = new Date().getTimezoneOffset(),
      o = "\r\n\r\n\n--\nDevice summary:\nPage: /games/wordle\nPlatform: "
        .concat(Qa() ? "Web (Mobile)" : "Web (Desktop)", " \nBrowser: ")
        .concat(
          (e = e =
            (e = navigator.userAgent).match(/chrome|chromium|crios/i)
              ? "chrome"
              : e.match(/firefox|fxios/i)
              ? "firefox"
              : e.match(/safari/i)
              ? "safari"
              : e.match(/opr\//i)
              ? "opera"
              : e.match(/edg/i)
              ? "edge"
              : "No browser detection")
            .charAt(0)
            .toUpperCase() + e.slice(1),
          "\nScreen Resolution: "
        )
        .concat(window.screen.width, " x ")
        .concat(window.screen.height, "\nViewport Size: ")
        .concat(document.documentElement.clientWidth, " x ")
        .concat(
          document.documentElement.clientHeight,
          "\nTimezone: ",
          "UTC".concat(0 < o ? "" : "+").concat(o / -60),
          "\nBuild: "
        )
        .concat(
          null === (o = window.sentryConfig) || void 0 === o
            ? void 0
            : o.release,
          "\n  "
        );
    return (
      "mailto:nytgames@nytimes.com" +
      ((a = { subject: n, body: o }),
      (t = []),
      Object.keys(a).forEach(function (e) {
        t.push(
          "".concat(encodeURIComponent(e), "=").concat(encodeURIComponent(a[e]))
        );
      }),
      "?".concat(t.join("&")))
    );
  }
  function wt(e, a) {
    return { type: vt, payload: { name: e, value: a } };
  }
  var vt = "wordle/settings/CHANGE_SETTING",
    _t = "Switch-module_container__DiBse",
    xt = "Switch-module_switch__LLcMj",
    St = "Switch-module_knob__oRTpP",
    jt = "Switch-module_checked__81fA3",
    Et = "Switch-module_disabled__6ofuZ";
  function zt(e, a, t) {
    return (
      a in e
        ? Object.defineProperty(e, a, {
            value: t,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[a] = t),
      e
    );
  }
  Ce(
    ".Switch-module_container__DiBse {\n  display: flex;\n  justify-content: space-between;\n}\n\n.Switch-module_switch__LLcMj {\n  height: 20px;\n  width: 32px;\n  background: var(--color-tone-3);\n  border: none;\n  border-radius: 999px;\n  display: block;\n  position: relative;\n}\n\n.Switch-module_knob__oRTpP {\n  display: block;\n  position: absolute;\n  left: 2px;\n  top: 2px;\n  height: calc(100% - 4px);\n  width: 50%;\n  border-radius: 8px;\n  background: var(--white);\n  transform: translateX(0);\n  transition: transform 0.3s;\n}\n\n.Switch-module_checked__81fA3 .Switch-module_switch__LLcMj {\n  background: var(--color-correct);\n}\n.Switch-module_checked__81fA3 .Switch-module_knob__oRTpP {\n  transform: translateX(calc(100% - 4px));\n}\n\n.Switch-module_container__DiBse.Switch-module_disabled__6ofuZ .Switch-module_switch__LLcMj {\n  opacity: 0.5;\n}"
  );
  function Ot(e) {
    var a = e.disabled,
      t = e.name,
      n = e.onClick,
      o = e.selected;
    return g.createElement(
      "div",
      { id: t, className: y(_t, (zt((e = {}), jt, o), zt(e, Et, a), e)) },
      g.createElement(
        "button",
        {
          "aria-checked": o,
          "aria-label": t,
          className: xt,
          onClick: n,
          role: "switch",
          type: "button",
        },
        g.createElement("span", { className: St })
      )
    );
  }
  var Nt = "Settings-module_setting__IdN-T",
    At = "Settings-module_title__f-cFy",
    Ct = "Settings-module_text__o3woy",
    It = "Settings-module_description__rTo9u",
    Pt = "Settings-module_footnote__UtMtH",
    Lt = "Settings-module_enableAuth__TOxGg";
  Ce(
    ".Settings-module_setting__IdN-T {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  border-bottom: 1px solid var(--color-tone-4);\n  padding: 16px 0;\n}\n.Settings-module_setting__IdN-T a,\n.Settings-module_setting__IdN-T a:visited {\n  color: var(--color-tone-2);\n}\n\n.Settings-module_title__f-cFy {\n  font-size: 18px;\n}\n\n.Settings-module_text__o3woy {\n  padding-right: 8px;\n}\n\n.Settings-module_description__rTo9u {\n  font-size: 12px;\n  color: var(--color-tone-2);\n}\n\n.Settings-module_footnote__UtMtH {\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  padding: 16px;\n  color: var(--color-tone-2);\n  font-size: 12px;\n  text-align: right;\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-end;\n}\n\n@media (min-width: 501px) {\n  .Settings-module_footnote__UtMtH.Settings-module_enableAuth__TOxGg {\n    position: initial;\n    padding-left: 0;\n    padding-right: 0;\n  }\n}\n@media only screen and (min-device-width: 320px) and (max-device-width: 480px) {\n  .Settings-module_setting__IdN-T {\n    padding: 16px;\n  }\n}"
  );
  var Tt = function () {
      var e = Ne(),
        a = Ae(H),
        t = Ae(R),
        n = Ae(D),
        o = Ae(Qe),
        r = Ae(Je),
        s = Ae(Xe),
        i = !s && "IN_PROGRESS" === t && 0 !== n,
        l = pa("auth");
      return g.createElement(
        g.Fragment,
        null,
        g.createElement(
          "div",
          null,
          g.createElement(
            "section",
            null,
            g.createElement(
              "div",
              { className: Nt },
              g.createElement(
                "div",
                { className: Ct },
                g.createElement("div", { className: At }, "Hard Mode"),
                g.createElement(
                  "div",
                  { className: It },
                  "Any revealed hints must be used in subsequent guesses"
                )
              ),
              g.createElement(
                "div",
                null,
                g.createElement(Ot, {
                  disabled: i,
                  name: "hardMode",
                  onClick: function () {
                    e(
                      i
                        ? be({
                            text: "Hard mode can only be enabled at the start of a round",
                            duration: 1500,
                            isSystem: !0,
                          })
                        : wt("hardMode", !s)
                    );
                  },
                  selected: s,
                })
              )
            ),
            g.createElement(
              "div",
              { className: Nt },
              g.createElement(
                "div",
                { className: Ct },
                g.createElement("div", { className: At }, "Dark Theme")
              ),
              g.createElement(
                "div",
                null,
                g.createElement(Ot, {
                  name: "darkMode",
                  onClick: function () {
                    return e(wt("darkMode", !r));
                  },
                  selected: r,
                })
              )
            ),
            g.createElement(
              "div",
              { className: Nt },
              g.createElement(
                "div",
                { className: Ct },
                g.createElement("div", { className: At }, "High Contrast Mode"),
                g.createElement(
                  "div",
                  { className: It },
                  "For improved color vision"
                )
              ),
              g.createElement(
                "div",
                null,
                g.createElement(Ot, {
                  name: "colorblindMode",
                  onClick: function () {
                    return e(wt("colorblindMode", !o));
                  },
                  selected: o,
                })
              )
            )
          ),
          g.createElement(
            "section",
            null,
            g.createElement(
              "div",
              { className: Nt },
              g.createElement(
                "div",
                { className: Ct },
                g.createElement("div", { className: At }, "Feedback")
              ),
              g.createElement(
                "div",
                null,
                g.createElement(
                  "a",
                  { href: kt(), title: "nytgames@nytimes.com" },
                  "Email"
                )
              )
            ),
            g.createElement(
              "div",
              { className: Nt },
              g.createElement(
                "div",
                { className: Ct },
                g.createElement("div", { className: At }, "Community")
              ),
              g.createElement(
                "div",
                null,
                g.createElement(
                  "a",
                  {
                    href: "https://twitter.com/NYTGames",
                    target: "blank",
                    title: "@NYTGames",
                  },
                  "Twitter"
                )
              )
            ),
            g.createElement(
              "div",
              { className: Nt },
              g.createElement(
                "div",
                { className: Ct },
                g.createElement("div", { className: At }, "Questions?")
              ),
              g.createElement(
                "div",
                null,
                g.createElement(
                  "a",
                  {
                    href: "https://help.nytimes.com/hc/en-us/articles/360029050872-Word-Games-and-Logic-Puzzles#h_01FVGCB2Z00ZQMDMCYWBPWJNXB",
                    target: "blank",
                  },
                  "FAQ"
                )
              )
            )
          )
        ),
        g.createElement(
          "div",
          {
            className: y(
              Pt,
              ((t = l),
              (n = Lt) in (l = {})
                ? Object.defineProperty(l, n, {
                    value: t,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                  })
                : (l[n] = t),
              l)
            ),
          },
          g.createElement(
            "div",
            { id: "copyright" },
            "© ",
            new Date().getFullYear(),
            " The New York Times Company"
          ),
          g.createElement("div", null, g.createElement("div", null, "#", a))
        )
      );
    },
    we = function (e) {
      return e.overlays;
    },
    Mt = t.createSelector(we, function (e) {
      return e.modal;
    }),
    Rt = t.createSelector(we, function (e) {
      return e.error;
    }),
    Dt = t.createSelector(we, function (e) {
      return e.page;
    }),
    qt = t.createSelector(we, function (e) {
      return e.isNavModalOpen;
    }),
    Ht = t.createSelector(we, function (e) {
      return e.toasts;
    }),
    Bt = t.createSelector(we, function (e) {
      return e.isPageClosing;
    }),
    Ft = {
      modalOverlay: "Modal-module_modalOverlay__81ZCi",
      content: "Modal-module_content__s8qUZ",
      SlideIn: "Modal-module_SlideIn__g77Ik",
      closing: "Modal-module_closing__pgA2s",
      SlideOut: "Modal-module_SlideOut__Ev3zj",
      closeIcon: "Modal-module_closeIcon__b4z74",
      heading: "Modal-module_heading__oD1Ps",
      enableAuth: "Modal-module_enableAuth__SR682",
    };
  function Gt() {
    return (Gt =
      Object.assign ||
      function (e) {
        for (var a = 1; a < arguments.length; a++) {
          var t,
            n = arguments[a];
          for (t in n)
            Object.prototype.hasOwnProperty.call(n, t) && (e[t] = n[t]);
        }
        return e;
      }).apply(this, arguments);
  }
  function Wt(e, a, t) {
    return (
      a in e
        ? Object.defineProperty(e, a, {
            value: t,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[a] = t),
      e
    );
  }
  function Yt(e, a) {
    return (
      (function (e) {
        if (Array.isArray(e)) return e;
      })(e) ||
      (function (e, a) {
        var t =
          null == e
            ? null
            : ("undefined" != typeof Symbol && e[Symbol.iterator]) ||
              e["@@iterator"];
        if (null != t) {
          var n,
            o,
            r = [],
            s = !0,
            i = !1;
          try {
            for (
              t = t.call(e);
              !(s = (n = t.next()).done) &&
              (r.push(n.value), !a || r.length !== a);
              s = !0
            );
          } catch (e) {
            (i = !0), (o = e);
          } finally {
            try {
              s || null == t.return || t.return();
            } finally {
              if (i) throw o;
            }
          }
          return r;
        }
      })(e, a) ||
      (function (e, a) {
        if (e) {
          if ("string" == typeof e) return Vt(e, a);
          var t = Object.prototype.toString.call(e).slice(8, -1);
          return "Map" ===
            (t = "Object" === t && e.constructor ? e.constructor.name : t) ||
            "Set" === t
            ? Array.from(e)
            : "Arguments" === t ||
              /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)
            ? Vt(e, a)
            : void 0;
        }
      })(e, a) ||
      (function () {
        throw new TypeError(
          "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
        );
      })()
    );
  }
  function Vt(e, a) {
    (null == a || a > e.length) && (a = e.length);
    for (var t = 0, n = new Array(a); t < a; t++) n[t] = e[t];
    return n;
  }
  function Ut() {
    var a = Ne(),
      e = Ae(Mt),
      t = Yt(p.useState(!1), 2),
      n = t[0],
      o = t[1],
      r = pa("auth"),
      s = !!Ae(fa);
    if (!e) return null;
    function i() {
      o(!0);
    }
    var l = r
        ? function (e) {
            e.currentTarget === e.target && o(!0);
          }
        : i,
      t = {
        help: g.createElement(We, { isPage: !1, enableAuth: r, isLoggedIn: s }),
        stats: g.createElement(bt, null),
        settings: g.createElement(Tt, null),
      }[e],
      s = { help: "how to play", stats: !1, settings: "settings" }[e],
      e = r && s;
    return g.createElement(
      "div",
      {
        className: y(Ft.modalOverlay, Wt({}, Ft.enableAuth, r)),
        onClick: l,
        onAnimationEnd: function (e) {
          e.animationName === Ft.SlideOut && (o(!1), a(pe()));
        },
        role: "button",
      },
      g.createElement(
        "div",
        {
          className: y(
            Ft.content,
            (Wt((l = {}), Ft.closing, n), Wt(l, Ft.enableAuth, r), l)
          ),
        },
        e
          ? g.createElement(
              "h1",
              { className: y(Ft.heading, Wt({}, Ft.enableAuth, r)) },
              s
            )
          : null,
        t,
        g.createElement(
          "div",
          { className: Ft.closeIcon },
          g.createElement(E, Gt({ icon: "close" }, r && { onClick: i }))
        )
      )
    );
  }
  function Zt() {
    var e = Ne();
    return g.createElement(
      "a",
      {
        href: "https://www.nytimes.com/crosswords",
        onClick: function () {
          return e(J("wordle", "games-logo-nav", !0, null));
        },
      },
      g.createElement(
        "svg",
        {
          className: "pz-nav__logo",
          width: "95",
          height: "18",
          viewBox: "0 0 138 25",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg",
          "aria-label": "New York Times Games Logo. Click for more puzzles",
        },
        g.createElement("rect", { width: "138", height: "25", fill: "none" }),
        g.createElement("path", {
          d: "M42.4599 1.03519C44.219 1.00558 45.9577 1.41634 47.5176 2.23008V1.45245H53.4162V8.80515H47.5239C47.1067 7.03494 46.3607 6.2257 44.5904 6.2257C42.365 6.23834 41.0058 7.86947 41.0058 12.4151C41.0058 17.3148 42.2386 18.8827 45.0077 18.8827C45.7187 18.8975 46.4203 18.7183 47.0371 18.3643V16.2211H45.2037V11.9283H53.4225V24.0543H48.3648V22.9289C46.902 24.0012 45.1195 24.5471 43.307 24.4778C36.9216 24.4778 32.4392 20.2546 32.4392 12.4214C32.4708 5.2584 36.9849 1.03519 42.4599 1.03519Z",
          fill: "var(--color-tone-1)",
        }),
        g.createElement("path", {
          d: "M59.8645 24.3471C56.3494 24.3471 54.2883 22.4505 54.2883 19.2198C54.2883 15.9892 56.7097 13.9345 60.541 13.9345C61.9923 13.9222 63.4232 14.2767 64.701 14.965C64.6377 13.2264 63.3164 12.0947 60.8634 12.0947C59.0925 12.1015 57.3477 12.5215 55.7677 13.3212V9.25608C58.149 8.58084 60.6136 8.24457 63.0888 8.25718C69.7966 8.25718 72.0853 11.1907 72.0853 13.7701V19.8647H73.4382V24.0563H64.7705V22.5074C63.544 23.8603 61.7359 24.3471 59.8645 24.3471ZM64.859 18.8658C64.888 18.6431 64.8655 18.4166 64.7931 18.204C64.7207 17.9914 64.6005 17.7982 64.4417 17.6394C64.2829 17.4805 64.0897 17.3603 63.877 17.288C63.6644 17.2156 63.438 17.193 63.2153 17.222C62.1215 17.222 61.3755 17.7721 61.3755 18.8974C61.3755 20.0228 62.0077 20.478 63.1836 20.478C64.3596 20.478 64.8653 19.9911 64.8653 18.8848L64.859 18.8658Z",
          fill: "var(--color-tone-1)",
        }),
        g.createElement("path", {
          d: "M75.8371 19.8644V12.7709H74.5726V8.57927H83.1455V10.2546C85.1433 8.73732 86.2055 8.25684 87.786 8.25684C89.7206 8.25684 90.8839 8.80687 92.3949 10.3874C94.3611 8.83848 95.7456 8.25684 97.4526 8.25684C100.614 8.25684 102.801 10.419 102.801 13.2197V19.858H104.066V24.0496H95.5054V14.6739C95.5054 13.4473 95.0249 12.7772 94.1841 12.7772C93.3432 12.7772 92.9576 13.4094 92.9576 14.6739V19.8644H94.0513V24.056H85.6681V14.6106C85.6681 13.5169 85.1497 12.7709 84.4036 12.7709C83.6576 12.7709 83.1392 13.479 83.1392 14.6106V19.8644H84.2646V24.056H74.5474V19.8644H75.8371Z",
          fill: "var(--color-tone-1)",
        }),
        g.createElement("path", {
          d: "M113.781 24.3784C111.46 24.3784 108.881 23.8979 107.073 22.2858C106.216 21.5344 105.534 20.6058 105.072 19.5643C104.61 18.5229 104.38 17.3935 104.398 16.2544C104.398 11.1967 108.432 8.25684 113.25 8.25684C118.453 8.25684 121.924 11.93 121.924 16.3555C121.924 16.874 121.892 17.3545 121.86 17.8729H111.745C111.941 19.681 112.908 20.4839 114.387 20.4839C114.871 20.4803 115.347 20.3544 115.769 20.1178C116.191 19.8813 116.547 19.5418 116.803 19.131H121.86C120.773 22.6777 117.498 24.3784 113.781 24.3784ZM111.688 15.5273H115.481V15.1417C115.481 13.8204 115.159 12.4674 113.585 12.4674C113.201 12.4558 112.824 12.5691 112.51 12.7903C112.197 13.0115 111.964 13.3286 111.846 13.6939C111.68 14.2856 111.624 14.9028 111.682 15.5147L111.688 15.5273Z",
          fill: "var(--color-tone-1)",
        }),
        g.createElement("path", {
          d: "M126.195 24.059H122.712V18.8875H126.164C126.581 20.2404 127.131 20.9485 128.452 20.9485C129.451 20.9485 130.064 20.5313 130.064 19.7536C130.064 19.2036 129.71 18.7863 129.034 18.4892L125.683 17.073C124.909 16.7631 124.246 16.2281 123.779 15.5371C123.313 14.8462 123.064 14.0312 123.066 13.1975C123.066 10.5549 125.677 8.23462 128.964 8.23462C130.352 8.25084 131.718 8.58156 132.96 9.20191V8.5697H136.469V13.4062H133.244C132.954 11.9584 132.372 11.244 131.215 11.244C130.374 11.244 129.729 11.6612 129.729 12.3377C129.729 12.9194 130.115 13.3998 130.924 13.7223L134.212 14.9867C136.374 15.8276 137.373 17.2121 137.373 19.0835C137.373 22.0486 134.844 24.3372 131.215 24.3372C129.603 24.3372 128.477 24.078 126.157 23.2435L126.195 24.059Z",
          fill: "var(--color-tone-1)",
        }),
        g.createElement("path", {
          d: "M25.9544 1.46704H25.3601V24.0372H25.9544V1.46704Z",
          fill: "var(--color-tone-1)",
        }),
        g.createElement("path", {
          d: "M19.2574 15.4535C18.8889 16.497 18.3042 17.4509 17.5416 18.2527C16.7789 19.0546 15.8555 19.6863 14.8318 20.1066V15.4535L17.3607 13.1586L14.8318 10.8952V7.69619C15.8763 7.67489 16.8715 7.24792 17.6067 6.50567C18.3419 5.76342 18.7593 4.76418 18.7706 3.71953C18.7706 0.975708 16.1532 0.00209168 14.6675 0.00209168C14.2653 -0.0102783 13.8633 0.0322617 13.4726 0.128535V0.261301C13.6686 0.261301 13.9594 0.22969 14.0542 0.22969C15.0847 0.22969 15.8624 0.716498 15.8624 1.65218C15.8562 1.85411 15.809 2.05266 15.7235 2.23571C15.638 2.41875 15.5161 2.58244 15.3652 2.71677C15.2143 2.85109 15.0376 2.95323 14.8459 3.01695C14.6542 3.08066 14.4515 3.1046 14.2502 3.08732C11.7213 3.08732 8.693 1.01996 5.43075 1.01996C2.52255 1.00732 0.537385 3.17583 0.537385 5.36962C0.537385 7.56342 1.80182 8.24622 3.12316 8.7267L3.15477 8.60026C2.91743 8.45028 2.72511 8.23886 2.59822 7.98842C2.47133 7.73797 2.41459 7.45785 2.43404 7.17777C2.4493 6.92796 2.51386 6.68363 2.62398 6.45888C2.73411 6.23414 2.88763 6.03341 3.07569 5.86826C3.26375 5.70312 3.48264 5.57683 3.71973 5.49668C3.95683 5.41652 4.20745 5.38408 4.45714 5.40124C7.20096 5.40124 11.6265 7.69619 14.3766 7.69619H14.6359V10.9268L12.107 13.1586L14.6359 15.4535V20.1572C13.5788 20.533 12.4638 20.7192 11.342 20.7072C7.07452 20.7072 4.38759 18.1215 4.38759 13.8287C4.37897 12.8127 4.51955 11.8009 4.80486 10.8257L6.93543 9.88999V19.3733L11.2661 17.4766V7.75941L4.88072 10.6044C5.17861 9.73458 5.646 8.93247 6.25588 8.24446C6.86575 7.55645 7.606 6.99621 8.43379 6.59613L8.40218 6.5013C4.13471 7.43698 0 10.6739 0 15.5167C0 21.1055 4.71635 25 10.2103 25C16.0267 25 19.3206 21.1245 19.3522 15.4725L19.2574 15.4535Z",
          fill: "var(--color-tone-1)",
        })
      )
    );
  }
  Ce(
    ".Modal-module_modalOverlay__81ZCi {\n  display: flex;\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  top: 0;\n  left: 0;\n  justify-content: center;\n  align-items: center;\n  background-color: var(--opacity-50);\n  z-index: var(--modal-z-index);\n}\n\n.Modal-module_content__s8qUZ {\n  position: relative;\n  border-radius: 8px;\n  border: 1px solid var(--color-tone-6);\n  background-color: var(--modal-content-bg);\n  color: var(--color-tone-1);\n  box-shadow: 0 4px 23px 0 rgba(0, 0, 0, 0.2);\n  width: 90%;\n  max-height: 90%;\n  overflow-y: auto;\n  -webkit-animation: Modal-module_SlideIn__g77Ik 200ms;\n          animation: Modal-module_SlideIn__g77Ik 200ms;\n  max-width: var(--game-max-width);\n  padding: 16px;\n  box-sizing: border-box;\n}\n\n.Modal-module_content__s8qUZ.Modal-module_closing__pgA2s {\n  -webkit-animation: Modal-module_SlideOut__Ev3zj 200ms;\n          animation: Modal-module_SlideOut__Ev3zj 200ms;\n}\n\n.Modal-module_closeIcon__b4z74 {\n  width: 24px;\n  height: 24px;\n  position: absolute;\n  top: 16px;\n  right: 16px;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  cursor: pointer;\n}\n\n.Modal-module_heading__oD1Ps.Modal-module_enableAuth__SR682 {\n  font-weight: 700;\n  font-size: 16px;\n  letter-spacing: 0.5px;\n  text-transform: uppercase;\n  text-align: center;\n  margin-bottom: 15px;\n  margin-top: 0px;\n  display: block;\n}\n\n@media (max-width: 500px) {\n  .Modal-module_modalOverlay__81ZCi.Modal-module_enableAuth__SR682 {\n    align-items: flex-end;\n  }\n\n  .Modal-module_content__s8qUZ.Modal-module_enableAuth__SR682 {\n    min-height: 70%;\n    width: 100%;\n  }\n}\n@-webkit-keyframes Modal-module_SlideIn__g77Ik {\n  0% {\n    transform: translateY(30px);\n    opacity: 0;\n  }\n  100% {\n    transform: translateY(0px);\n    opacity: 1;\n  }\n}\n@keyframes Modal-module_SlideIn__g77Ik {\n  0% {\n    transform: translateY(30px);\n    opacity: 0;\n  }\n  100% {\n    transform: translateY(0px);\n    opacity: 1;\n  }\n}\n@-webkit-keyframes Modal-module_SlideOut__Ev3zj {\n  0% {\n    transform: translateY(0px);\n    opacity: 1;\n  }\n  90% {\n    opacity: 0;\n  }\n  100% {\n    opacity: 0;\n    transform: translateY(60px);\n  }\n}\n@keyframes Modal-module_SlideOut__Ev3zj {\n  0% {\n    transform: translateY(0px);\n    opacity: 1;\n  }\n  90% {\n    opacity: 0;\n  }\n  100% {\n    opacity: 0;\n    transform: translateY(60px);\n  }\n}"
  );
  var Kt = {
    container: "Nav-module_container__pzbhW",
    navLink: "Nav-module_navLink__7jXMp",
    gameList: "Nav-module_gameList__izZcv",
    nytList: "Nav-module_nytList__Nrzcc",
    navItem: "Nav-module_navItem__Kfeh3",
    navIcon: "Nav-module_navIcon__mgXpj",
    navHeader: "Nav-module_navHeader__KJ4Rd",
    moreText: "Nav-module_moreText__-hcDZ",
    privacy: "Nav-module_privacy__H6Jto",
    privacyStatic: "Nav-module_privacyStatic__f2hFM",
    privacyItem: "Nav-module_privacyItem__F1mag",
  };
  Ce(
    '.Nav-module_container__pzbhW {\n  display: flex;\n  flex-direction: column;\n  align-items: left;\n  justify-content: center;\n}\n.Nav-module_container__pzbhW a.Nav-module_navLink__7jXMp {\n  text-decoration: none;\n  color: inherit;\n}\n\n.Nav-module_gameList__izZcv,\n.Nav-module_nytList__Nrzcc {\n  list-style: none;\n  color: var(--color-tone-1);\n  padding: unset;\n  margin: unset;\n}\n\n.Nav-module_nytList__Nrzcc {\n  margin-top: 5px;\n  padding: 12px 0px;\n  border-top: 1px solid #dcdcdc;\n}\n\n.Nav-module_navItem__Kfeh3 {\n  display: flex;\n  justify-content: left;\n  align-items: center;\n  height: 40px;\n  font-family: "nyt-franklin-500";\n  font-size: 16px;\n  line-height: 16px;\n  padding-left: 18px;\n  --hover-color: var(--color-nav-hover);\n}\n\n.Nav-module_navItem__Kfeh3:hover {\n  background-color: var(--hover-color);\n}\n\n.Nav-module_navIcon__mgXpj {\n  padding-bottom: 2px;\n  content: "";\n  height: 20px;\n  width: 28px;\n  padding-right: 8px;\n  display: inline-block;\n  vertical-align: middle;\n  background-repeat: no-repeat;\n  background-size: "20px";\n}\n\n.Nav-module_navHeader__KJ4Rd {\n  padding-top: 18px;\n  padding-left: 18px;\n}\n\n.Nav-module_moreText__-hcDZ {\n  font-family: "nyt-franklin";\n  font-weight: 700;\n  text-transform: uppercase;\n  font-size: 12px;\n  line-height: 12px;\n  margin: 32px 0px 24px 0px;\n  padding-left: 18px;\n}\n\n.Nav-module_privacy__H6Jto, .Nav-module_privacyStatic__f2hFM {\n  letter-spacing: 0.5px;\n  font-family: "nyt-franklin-500";\n  margin: 0px 25px 0px 17px;\n  padding: 12px 0px;\n  border-top: 1px solid #dcdcdc;\n  color: var(--color-tone-1);\n  text-align: left;\n  display: flex;\n  flex-direction: column;\n  align-items: left;\n  justify-content: center;\n  font-size: 12px;\n}\n\n.Nav-module_privacyItem__F1mag {\n  height: 40px;\n  display: flex;\n  justify-content: left;\n  align-items: center;\n  color: var(--color-tone-1);\n}\n\n.Nav-module_privacyStatic__f2hFM {\n  position: static;\n}'
  );
  var Xt = "NavAccount-module_navLoggedIn__QNQGf",
    Jt = "NavAccount-module_navLoggedOut__yVhCA",
    Qt = "NavAccount-module_navDrawerHeading__KRAqm",
    $t = "NavAccount-module_navDrawerAccount__WqYWH",
    en = "NavAccount-module_navProfileAccount__sqIxG",
    an = "NavAccount-module_logoutButton__rHSrz",
    tn = "NavAccount-module_subscribeButton__9oHNa",
    nn = "NavAccount-module_loginButton__ANAQ0",
    on = "NavAccount-module_navDrawerLink__YqJIR";
  function rn(e) {
    var a = e.loggedIn,
      t = g.createElement(
        "a",
        { href: Re, role: "button", tabIndex: -1, className: tn },
        "Subscribe"
      ),
      n = g.createElement(
        "a",
        { href: qe, role: "button", tabIndex: -1, className: nn },
        "Log In"
      ),
      e = g.createElement(
        "a",
        { href: He, role: "button", tabIndex: -1, className: an },
        "Log Out"
      );
    return g.createElement(
      "div",
      { className: $t },
      a
        ? g.createElement(
            "div",
            { className: en },
            g.createElement("h4", { className: Qt }, "Profile"),
            g.createElement(
              "a",
              { href: window.navigationLinks.account, className: on },
              "Account details"
            ),
            g.createElement("div", { className: Xt }, e)
          )
        : g.createElement("div", { className: Jt }, t, n)
    );
  }
  function sn() {
    p.useEffect(function () {
      w.ccpa();
    }, []);
    function a() {
      return {
        backgroundImage:
          0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : "",
        backgroundSize: "20px",
      };
    }
    var e = w.parsePurrCookieValue(),
      t = pa("auth"),
      n = pa("ccpa"),
      o = pa("moogle"),
      r = "true" === new URLSearchParams(window.location.search).get("moogle"),
      r = !!(t && o && r) && !!Ae(fa),
      s = Ne();
    return g.createElement(
      "div",
      { className: Kt.container },
      g.createElement(
        "span",
        { className: Kt.navHeader },
        g.createElement(Zt, null)
      ),
      g.createElement(
        "span",
        { className: Kt.moreText },
        "More From New York Times Games"
      ),
      g.createElement(
        "div",
        { className: Kt.gameList },
        [
          {
            id: "spelling-bee",
            name: "Spelling Bee",
            url: "/puzzles/spelling-bee?utm_source=wordle&utm_medium=referral&utm_campaign=wordle_nav",
            backgroundImage: "var(--spelling-bee)",
            dataTrackLabel: "spelling-bee-nav",
          },
          {
            id: "crossword",
            name: "The Crossword",
            url: "/crosswords/game/daily?utm_source=wordle&utm_medium=referral&utm_campaign=wordle_nav",
            backgroundImage: "var(--daily)",
            dataTrackLabel: "daily-page-nav",
          },
          {
            id: "mini",
            name: "The Mini",
            url: "/crosswords/game/mini?utm_source=wordle&utm_medium=referral&utm_campaign=wordle_nav",
            backgroundImage: "var(--mini)",
            dataTrackLabel: "mini-page-nav",
          },
          {
            id: "wordlebot",
            name: "WordleBot: Your Daily Wordle Companion",
            url: "/interactive/2022/upshot/wordle-bot.html?utm_source=wordle&utm_medium=referral&utm_campaign=wordle_nav",
            backgroundImage: "var(--wordlebot)",
            dataTrackLabel: "wordle-bot-nav",
          },
          {
            id: "chess",
            name: "Chess",
            url: "/spotlight/chess-puzzles?utm_source=wordle&utm_medium=referral&utm_campaign=wordle_nav",
            backgroundImage: "var(--chess)",
            dataTrackLabel: "chess-nav",
          },
          {
            id: "gameplay-stories",
            name: "Gameplay Stories",
            url: "/column/wordplay?utm_source=wordle&utm_medium=referral&utm_campaign=wordle_nav",
            dataTrackLabel: "gameplay-stories-nav",
          },
          {
            id: "more-games",
            name: "More Games",
            url: "/puzzles?utm_source=wordle&utm_medium=referral&utm_campaign=wordle_nav",
            dataTrackLabel: "all-games-nav",
          },
        ].map(function (e) {
          return g.createElement(
            "a",
            {
              "aria-label": e.name,
              key: e.id,
              className: Kt.navLink,
              href: e.url,
              onClick: function () {
                return s(J("wordle", e.dataTrackLabel, !0, null));
              },
            },
            g.createElement(
              "div",
              { className: Kt.navItem },
              g.createElement("span", {
                style: a(e.backgroundImage),
                className: Kt.navIcon,
              }),
              e.name
            )
          );
        })
      ),
      g.createElement(
        "div",
        { className: Kt.nytList },
        [
          {
            id: "nyt",
            name: "The New York Times",
            url: "https://www.nytimes.com/?utm_source=wordle&utm_medium=referral&utm_campaign=wordle_nav",
            backgroundImage: "var(--nyt)",
            dataTrackLabel: "nyt-nav",
          },
          {
            id: "cooking",
            name: "New York Times Cooking",
            url: "https://cooking.nytimes.com",
            backgroundImage: "var(--cooking)",
            dataTrackLabel: "cooking-nav",
          },
          {
            id: "wirecutter",
            name: "New York Times Wirecutter",
            url: "https://www.nytimes.com/wirecutter/?utm_source=wordle&utm_medium=referral&utm_campaign=wordle_nav",
            backgroundImage: "var(--wirecutter)",
            dataTrackLabel: "wirecutter-nav",
          },
          {
            id: "athletic",
            name: "The Athletic",
            url: "https://theathletic.com/?utm_source=wordle&utm_medium=referral&utm_campaign=wordle_nav",
            backgroundImage: "var(--athletic)",
            dataTrackLabel: "athletic-nav",
          },
        ].map(function (e) {
          return g.createElement(
            "a",
            {
              "aria-label": e.name,
              href: e.url,
              className: Kt.navLink,
              onClick: function () {
                return s(J("wordle", e.dataTrackLabel, !0, null));
              },
              id: e.id,
              key: e.id,
              "data-track-label": e.dataTrackLabel,
            },
            g.createElement(
              "div",
              { className: Kt.navItem },
              g.createElement("span", {
                style: a(e.backgroundImage),
                className: Kt.navIcon,
              }),
              e.name
            )
          );
        })
      ),
      g.createElement(
        "div",
        { className: t ? Kt.privacyStatic : Kt.privacy },
        g.createElement(
          "a",
          {
            className: Kt.privacyItem,
            href: "https://www.nytimes.com/privacy/privacy-policy",
            "data-track-label": "privacy-policy-nav",
            onClick: function () {
              return s(J("wordle", "privacy-policy-nav", !0, null));
            },
          },
          "Privacy Policy"
        ),
        n &&
          g.createElement(
            g.Fragment,
            null,
            "show" === e.PURR_DataSaleOptOutUI_v2 &&
              g.createElement(
                "div",
                { className: "ccpa-opt-out" },
                g.createElement(
                  "a",
                  {
                    href: "#ccpa-hamburger",
                    "data-region": "menu",
                    "data-track": "linkOptOut",
                    className: y(
                      Kt.privacyItem,
                      "ccpa-link ccpa-opt-out-link ccpa-impression"
                    ),
                  },
                  "Do Not Sell My Personal Information"
                )
              ),
            "show-opted-out" === e.PURR_DataSaleOptOutUI_v2 &&
              g.createElement(
                "div",
                null,
                g.createElement(
                  "span",
                  {
                    "data-region": "menu",
                    "data-track": "optedOut",
                    className: y(
                      Kt.privacyItem,
                      "ccpa-user-opted-out ccpa-impression"
                    ),
                  },
                  "We No Longer Sell Your Personal Information"
                )
              ),
            "show" === e.PURR_CaliforniaNoticesUI &&
              g.createElement(
                "div",
                null,
                g.createElement(
                  "a",
                  {
                    target: "_blank",
                    rel: "noopener noreferrer",
                    href: "https://www.nytimes.com/privacy/california-notice",
                    "data-region": "menu",
                    "data-track": "linkCANotice",
                    className: y(
                      Kt.privacyItem,
                      "ccpa-link ccpa-california-notice-link ccpa-impression"
                    ),
                  },
                  "California Notices"
                )
              )
          )
      ),
      t && g.createElement(rn, { loggedIn: r })
    );
  }
  Ce(
    '.NavAccount-module_navLoggedIn__QNQGf, .NavAccount-module_navLoggedOut__yVhCA {\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  justify-content: space-evenly;\n  flex-wrap: nowrap;\n  padding: 8px;\n}\n\n.NavAccount-module_navLoggedOut__yVhCA {\n  padding: 16px;\n}\n\n.NavAccount-module_navDrawerHeading__KRAqm {\n  font-family: "nyt-franklin";\n  font-size: 12px;\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: 0.75px;\n  line-height: 14px;\n  display: block;\n  padding: 0px 10px;\n}\n\n.NavAccount-module_navDrawerAccount__WqYWH {\n  border-top: 1px solid #000;\n  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);\n  position: absolute;\n  bottom: 0;\n  width: 100%;\n  background-color: var(--color-tone-7);\n  margin-top: 3px;\n}\n\n.NavAccount-module_navProfileAccount__sqIxG {\n  padding: 5px;\n}\n\n.NavAccount-module_navButton__KTP0f, .NavAccount-module_logoutButton__rHSrz, .NavAccount-module_subscribeButton__9oHNa, .NavAccount-module_loginButton__ANAQ0 {\n  display: flex;\n  flex-direction: column;\n  flex: 1;\n  align-items: center;\n  justify-content: center;\n  flex-wrap: nowrap;\n  font-family: "nyt-franklin";\n  font-size: 12px;\n  font-weight: 700;\n  letter-spacing: 0.047em;\n  text-transform: uppercase;\n  height: 36px;\n  border: 1px solid #f4f4f4;\n  border-radius: 3px;\n  color: #fff;\n  border-color: #000;\n  background-color: #000;\n  padding: 1px 33px 0;\n  cursor: pointer;\n  text-decoration: none;\n}\n\n.NavAccount-module_navDrawerLink__YqJIR {\n  display: block;\n  height: 40px;\n  line-height: 40px;\n  font-size: 15px;\n  letter-spacing: 0.5px;\n  border-left: 4px solid transparent;\n  padding: 0 16px 0 8px;\n  text-decoration: none;\n  color: inherit;\n}\n\n.NavAccount-module_navDrawerLink__YqJIR:hover {\n  background-color: var(--color-nav-hover);\n}\n\n.NavAccount-module_loginButton__ANAQ0 {\n  color: #000;\n  border-color: #000;\n  background-color: #fff;\n  margin-left: 8px;\n}\n\n.NavAccount-module_loginButton__ANAQ0:hover {\n  color: #fff;\n  background-color: #000;\n}\n\n.NavAccount-module_subscribeButton__9oHNa {\n  color: #fff;\n  background-color: #000;\n}\n\n.NavAccount-module_subscribeButton__9oHNa:hover {\n  background-color: #797987;\n  border: none;\n}\n\n.NavAccount-module_logoutButton__rHSrz {\n  color: var(--color-tone-1);\n  background-color: var(--color-tone-7);\n  border: 1px solid var(--color-tone-1);\n  border-radius: 3px;\n}\n\n.NavAccount-module_logoutButton__rHSrz:hover {\n  background-color: #ebebeb;\n}'
  );
  var ln = {
    overlayNav: "NavModal-module_overlayNav__3y8p3",
    contentNav: "NavModal-module_contentNav__wMSAL",
    SlideRight: "NavModal-module_SlideRight__DNLx-",
    closingNav: "NavModal-module_closingNav__OIIRY",
    SlideLeft: "NavModal-module_SlideLeft__7Veo2",
    closeIconNav: "NavModal-module_closeIconNav__2gqUi",
  };
  function un(e, a) {
    return (
      (function (e) {
        if (Array.isArray(e)) return e;
      })(e) ||
      (function (e, a) {
        var t =
          null == e
            ? null
            : ("undefined" != typeof Symbol && e[Symbol.iterator]) ||
              e["@@iterator"];
        if (null != t) {
          var n,
            o,
            r = [],
            s = !0,
            i = !1;
          try {
            for (
              t = t.call(e);
              !(s = (n = t.next()).done) &&
              (r.push(n.value), !a || r.length !== a);
              s = !0
            );
          } catch (e) {
            (i = !0), (o = e);
          } finally {
            try {
              s || null == t.return || t.return();
            } finally {
              if (i) throw o;
            }
          }
          return r;
        }
      })(e, a) ||
      (function (e, a) {
        if (e) {
          if ("string" == typeof e) return cn(e, a);
          var t = Object.prototype.toString.call(e).slice(8, -1);
          return "Map" ===
            (t = "Object" === t && e.constructor ? e.constructor.name : t) ||
            "Set" === t
            ? Array.from(e)
            : "Arguments" === t ||
              /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)
            ? cn(e, a)
            : void 0;
        }
      })(e, a) ||
      (function () {
        throw new TypeError(
          "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
        );
      })()
    );
  }
  function cn(e, a) {
    (null == a || a > e.length) && (a = e.length);
    for (var t = 0, n = new Array(a); t < a; t++) n[t] = e[t];
    return n;
  }
  function dn() {
    var a = Ne(),
      e = Ae(qt),
      t = un(p.useState(!1), 2),
      n = t[0],
      o = t[1];
    if (!e) return null;
    return g.createElement(
      "div",
      {
        className: ln.overlayNav,
        onClick: function () {
          o(!0);
        },
        onAnimationEnd: function (e) {
          e.animationName === ln.SlideLeft && (o(!1), a(fe()));
        },
        role: "button",
      },
      g.createElement(
        "div",
        {
          className: y(
            ln.contentNav,
            ((t = {}),
            (e = ln.closingNav),
            (n = n),
            e in t
              ? Object.defineProperty(t, e, {
                  value: n,
                  enumerable: !0,
                  configurable: !0,
                  writable: !0,
                })
              : (t[e] = n),
            t)
          ),
          id: "content-nav",
        },
        g.createElement(sn, null),
        g.createElement(
          "div",
          { className: ln.closeIconNav },
          g.createElement(E, { icon: "close" })
        )
      )
    );
  }
  Ce(
    ".NavModal-module_overlayNav__3y8p3 {\n  display: flex;\n  justify-content: left;\n  align-items: unset;\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  top: 0;\n  left: 0;\n  z-index: var(--modal-z-index);\n  background-color: transparent;\n}\n\n.NavModal-module_contentNav__wMSAL {\n  position: relative;\n  border: 1px solid var(--color-tone-6);\n  background-color: var(--modal-content-bg);\n  color: var(--color-tone-1);\n  overflow-y: auto;\n  -webkit-animation: NavModal-module_SlideRight__DNLx- 200ms;\n          animation: NavModal-module_SlideRight__DNLx- 200ms;\n  max-width: var(--game-max-width);\n  box-sizing: border-box;\n  width: 100%;\n  border-radius: 0px;\n  box-shadow: 3px 5px 5px rgba(0, 0, 0, 0.15);\n  max-height: calc(100% - var(--header-height) - 1px);\n  margin-top: calc(var(--header-height) + 1px);\n  padding: 0px;\n}\n\n@media (min-width: 415px) {\n  .NavModal-module_contentNav__wMSAL {\n    width: 375px;\n  }\n}\n.NavModal-module_contentNav__wMSAL.NavModal-module_closingNav__OIIRY {\n  -webkit-animation: NavModal-module_SlideLeft__7Veo2 200ms;\n          animation: NavModal-module_SlideLeft__7Veo2 200ms;\n}\n\n.NavModal-module_closeIconNav__2gqUi {\n  width: 24px;\n  height: 24px;\n  position: absolute;\n  top: 16px;\n  right: 16px;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  cursor: pointer;\n}\n\n@-webkit-keyframes NavModal-module_SlideRight__DNLx- {\n  0% {\n    transform: translateX(-100px);\n    opacity: 0;\n  }\n  100% {\n    transform: translateX(0px);\n    opacity: 1;\n  }\n}\n\n@keyframes NavModal-module_SlideRight__DNLx- {\n  0% {\n    transform: translateX(-100px);\n    opacity: 0;\n  }\n  100% {\n    transform: translateX(0px);\n    opacity: 1;\n  }\n}\n@-webkit-keyframes NavModal-module_SlideLeft__7Veo2 {\n  0% {\n    transform: translateX(0px);\n    opacity: 1;\n  }\n  90% {\n    opacity: 0;\n  }\n  100% {\n    opacity: 0;\n    transform: translateX(-200px);\n  }\n}\n@keyframes NavModal-module_SlideLeft__7Veo2 {\n  0% {\n    transform: translateX(0px);\n    opacity: 1;\n  }\n  90% {\n    opacity: 0;\n  }\n  100% {\n    opacity: 0;\n    transform: translateX(-200px);\n  }\n}"
  );
  var mn = {
      linkInfo: {
        title:
          "You can now easily link your Wordle stats to your New York Times account.",
        text: [
          "Wordle stats are currently saved locally in the browser where you play, which means different device, different stats.",
          "If anything forces your browser to clear its memory, your stats will be lost.",
          "Linking your stats to your account means no more lost streaks and you'll see your stats anywhere you're logged in.",
        ],
        icon: "var(--link-info)",
        alt: "Wordle Icon with NYT Logo",
      },
      statsProblem: {
        title: "These don’t look like my Wordle stats?",
        text: [
          "Wordle only saves your stats to the device or browser you play on. <b>If this is not where you regularly play, go to that device or browser and see if your stats are correct. You can save to an account from there.</b>",
          'If this is the device and browser where you regularly play, but your stats aren’t updating, it might be a storage issue, and you <a href="/">can try our reset link before saving.</a>',
          "If your stats are completely missing, your progress may have been deleted if your cache was cleared. We recommend logging in or creating a free account to store your stats so they never go missing again.",
        ],
        icon: "var(--stats-problem)",
        alt: "Wordle Icon with Question Mark",
      },
    },
    pn = {
      title: "Explainer-module_title__-DKFu",
      containerLink: "Explainer-module_containerLink__CFd3e",
      containerProblems: "Explainer-module_containerProblems__8fCRH",
      text: "Explainer-module_text__keVaW",
      statsLinkContainer: "Explainer-module_statsLinkContainer__1PALX",
      loginButton: "Explainer-module_loginButton__XupvV",
      gamesIcon: "Explainer-module_gamesIcon__spKfI",
      headerNew: "Explainer-module_headerNew__SaqiR",
      close: "Explainer-module_close__F3zLu",
    };
  function yn(e) {
    var a = e.type,
      t = e.loggedIn,
      n = void 0 !== t && t,
      o = e.optedIn,
      r = e.onClose,
      s = e.dispatchAction,
      i = n && !(void 0 !== o && o),
      l = mn[a],
      t = l.text,
      e = l.title,
      o = l.icon,
      l = l.alt,
      a = "linkInfo" === a ? pn.containerLink : pn.containerProblems;
    return g.createElement(
      g.Fragment,
      null,
      g.createElement(
        "div",
        { className: pn.headerNew },
        g.createElement(
          "p",
          null,
          g.createElement("img", {
            className: pn.gamesIcon,
            alt: "NYT Games Logo",
            style: { content: "var(--gameslogo)" },
          })
        ),
        g.createElement(
          "button",
          {
            type: "button",
            className: pn.close,
            "data-testid": "close",
            onClick: r,
          },
          g.createElement(E, { icon: "close" })
        )
      ),
      g.createElement(
        "div",
        { className: a },
        g.createElement("img", { alt: l, style: { content: o } }),
        g.createElement("h1", { className: pn.title }, e),
        g.createElement(
          "div",
          null,
          t.map(function (e) {
            return g.createElement("p", {
              key: e,
              className: pn.text,
              dangerouslySetInnerHTML: { __html: e },
            });
          })
        ),
        g.createElement(
          "div",
          { className: pn.statsLinkContainer },
          !n &&
            g.createElement(
              "a",
              {
                type: "link",
                className: pn.loginButton,
                "aria-label":
                  "Log in or create a free account link. Click to sign in.",
                tabIndex: -1,
                href: qe,
              },
              "Log in or create a free account"
            ),
          i &&
            g.createElement(
              "button",
              {
                type: "button",
                tabIndex: -1,
                className: pn.loginButton,
                "aria-label": "Button to link stats to my account",
                onClick: function () {
                  return s();
                },
              },
              "Link stats to my account"
            )
        )
      )
    );
  }
  function gn(a, e) {
    var t,
      n = Object.keys(a);
    return (
      Object.getOwnPropertySymbols &&
        ((t = Object.getOwnPropertySymbols(a)),
        e &&
          (t = t.filter(function (e) {
            return Object.getOwnPropertyDescriptor(a, e).enumerable;
          })),
        n.push.apply(n, t)),
      n
    );
  }
  function hn(n) {
    for (var e = 1; e < arguments.length; e++) {
      var o = null != arguments[e] ? arguments[e] : {};
      e % 2
        ? gn(Object(o), !0).forEach(function (e) {
            var a, t;
            (a = n),
              (e = o[(t = e)]),
              t in a
                ? Object.defineProperty(a, t, {
                    value: e,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                  })
                : (a[t] = e);
          })
        : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(n, Object.getOwnPropertyDescriptors(o))
        : gn(Object(o)).forEach(function (e) {
            Object.defineProperty(n, e, Object.getOwnPropertyDescriptor(o, e));
          });
    }
    return n;
  }
  Ce(
    '.Explainer-module_title__-DKFu {\n  font-family: "nyt-franklin";\n  font-size: 24px;\n  font-weight: 700;\n  line-height: 28px;\n  letter-spacing: 0em;\n  text-align: left;\n  margin-left: 10px;\n  color: var(--color-tone-1);\n}\n\n.Explainer-module_containerLink__CFd3e {\n  padding: 30px;\n}\n.Explainer-module_containerLink__CFd3e p:last-child {\n  font-weight: 700;\n}\n\n.Explainer-module_containerProblems__8fCRH {\n  padding: 30px;\n}\n\n.Explainer-module_text__keVaW {\n  font-size: 18px;\n  line-height: 23px;\n  letter-spacing: 0em;\n  text-align: left;\n  margin-left: 10px;\n  color: var(--color-tone-1);\n}\n.Explainer-module_text__keVaW > a {\n  color: inherit;\n}\n\n.Explainer-module_statsLinkContainer__1PALX {\n  margin-top: 50px;\n}\n\n.Explainer-module_loginButton__XupvV {\n  padding-top: 50px;\n  height: 44px;\n  width: 289px;\n  background: var(--color-tone-1);\n  border-radius: 104px;\n  padding: 10px;\n  text-decoration: none;\n  color: var(--color-tone-7);\n  font-weight: 700;\n  line-height: 14px;\n  font-size: 14px;\n  text-align: center;\n  padding: 10px 40px;\n  margin-top: 20px;\n  border: none;\n}\n\n.Explainer-module_gamesIcon__spKfI {\n  width: 95px;\n  height: 18px;\n}\n\n.Explainer-module_headerNew__SaqiR {\n  padding: 15px 0px;\n}\n.Explainer-module_headerNew__SaqiR > p {\n  text-align: center;\n  margin: 10px 0px;\n}\n\n.Explainer-module_close__F3zLu {\n  background: none;\n  color: inherit;\n  border: none;\n  padding: 0;\n  font: inherit;\n  cursor: pointer;\n  outline: inherit;\n  position: absolute;\n  right: 0;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  cursor: pointer;\n  margin: 0;\n  margin-right: 30px;\n}'
  );
  var fn =
      "prod" === w.env.name
        ? "https://www.nytimes.com"
        : "https://www.stg.nytimes.com",
    bn = "wordle/api/MOOGLE_OPT_IN",
    kn = "wordle/api/LOAD_MOOGLE_GET",
    wn = "wordle/api/MOOGLE_GET_SUCCESS",
    vn = "wordle/api/MOOGLE_GET_ERROR",
    _n = "wordle/api/LOAD_MOOGLE_POST",
    xn = "wordle/api/MOOGLE_POST_SUCCESS",
    Sn = "wordle/api/MOOGLE_POST_ERROR",
    jn = "wordle/api/MOOGLE_POST_RESET",
    En = "wordle/api/LOAD_PROFILE_INFO",
    zn = "wordle/api/PROFILE_INFO_SUCCESS",
    On = "wordle/api/PROFILE_INFO_ERROR",
    Nn = "wordle/api/START_SYNC",
    An = function (a) {
      return function (e) {
        e(pe()),
          e(ye()),
          e(fe()),
          "malformed Moogle response data" === a.message &&
            w.captureSentryError(a, { api: "moogle", category: "game_state" }),
          a.message && "No internet" === a.message
            ? e(X("offline"))
            : a.message && "profile" === a.message
            ? e(X("profile"))
            : e(X("default"));
      };
    },
    Cn = function (e) {
      var n = e.timestamp,
        o = e.enableAuth;
      return function (a, e) {
        var t = e(),
          e = t.api.moogleGet.data,
          t = t.persist;
        return e && e.user_id
          ? (a({ type: _n }),
            w.xhr
              .post(
                "".concat(fn, "/svc/games/state"),
                {
                  game: "wordle",
                  game_data: hn({}, t),
                  puzzle_id: "1",
                  schema_version: "0.0.0",
                  timestamp: n,
                  user_id: e.user_id,
                },
                { withCookie: !1 }
              )
              .then(function (e) {
                if (!e.version)
                  throw new Error("malformed Moogle response data");
                a({ type: xn, payload: { data: e, enableAuth: !!o } });
              })
              .catch(function (e) {
                a({ type: Sn }),
                  o ||
                    a(
                      be({
                        text: "There was an error while saving. Please refresh the page and try again",
                        duration: 3e3,
                        isSystem: !0,
                      })
                    ),
                  "malformed Moogle response data" === e.message &&
                    w.captureSentryError(e, {
                      api: "moogle",
                      category: "game_state",
                    });
              }))
          : Promise.resolve();
      };
    },
    In = "StatsLink-module_container__G4oYM",
    Pn = "StatsLink-module_header__8CPRA",
    Ln = "StatsLink-module_logo__Kx2s-",
    Tn = "StatsLink-module_content__7z9K3",
    Mn = "StatsLink-module_statsIconWrapper__lzf6R",
    Rn = "StatsLink-module_statsFailureBadge__qQmvE",
    Dn = "StatsLink-module_statsIcon__-nU--",
    qn = "StatsLink-module_headingWrapper__DV4V8",
    Hn = "StatsLink-module_heading__8G3Jk",
    Bn = "StatsLink-module_paragraphWrapper__5sxeO",
    Fn = "StatsLink-module_paragraph__Q-baL",
    Gn = "StatsLink-module_button__F7k0J",
    Wn = "StatsLink-module_footer__Qxrmi",
    Yn = "StatsLink-module_buttonAsLink__kErTh",
    Vn = "StatsLink-module_link__YBHY7";
  function Un(e, a) {
    return (
      (function (e) {
        if (Array.isArray(e)) return e;
      })(e) ||
      (function (e, a) {
        var t =
          null == e
            ? null
            : ("undefined" != typeof Symbol && e[Symbol.iterator]) ||
              e["@@iterator"];
        if (null != t) {
          var n,
            o,
            r = [],
            s = !0,
            i = !1;
          try {
            for (
              t = t.call(e);
              !(s = (n = t.next()).done) &&
              (r.push(n.value), !a || r.length !== a);
              s = !0
            );
          } catch (e) {
            (i = !0), (o = e);
          } finally {
            try {
              s || null == t.return || t.return();
            } finally {
              if (i) throw o;
            }
          }
          return r;
        }
      })(e, a) ||
      (function (e, a) {
        if (e) {
          if ("string" == typeof e) return Zn(e, a);
          var t = Object.prototype.toString.call(e).slice(8, -1);
          return "Map" ===
            (t = "Object" === t && e.constructor ? e.constructor.name : t) ||
            "Set" === t
            ? Array.from(e)
            : "Arguments" === t ||
              /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)
            ? Zn(e, a)
            : void 0;
        }
      })(e, a) ||
      (function () {
        throw new TypeError(
          "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
        );
      })()
    );
  }
  function Zn(e, a) {
    (null == a || a > e.length) && (a = e.length);
    for (var t = 0, n = new Array(a); t < a; t++) n[t] = e[t];
    return n;
  }
  Ce(
    ".StatsLink-module_container__G4oYM {\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n}\n\n.StatsLink-module_header__8CPRA {\n  align-items: center;\n  border-bottom: 1px solid var(--gray-2);\n  display: flex;\n  height: 3em;\n  justify-content: center;\n}\n\n.StatsLink-module_logo__Kx2s- {\n  position: relative;\n  top: 5px;\n}\n\n.StatsLink-module_content__7z9K3 {\n  align-items: center;\n  display: flex;\n  flex: 1;\n  flex-direction: column;\n  padding-left: 1.25em;\n  padding-right: 1.25em;\n  padding-top: 6em;\n}\n\n.StatsLink-module_statsIconWrapper__lzf6R {\n  position: relative;\n  height: 12em;\n  width: 12em;\n  margin-bottom: 2em;\n}\n\n.StatsLink-module_statsFailureBadge__qQmvE {\n  position: absolute;\n  height: 2.75em;\n  width: 2.75em;\n  top: -0.75em;\n  right: -0.75em;\n}\n\n.StatsLink-module_statsIcon__-nU-- {\n  height: 12em;\n  width: 12em;\n}\n\n.StatsLink-module_headingWrapper__DV4V8 {\n  text-align: center;\n  margin-bottom: 1em;\n}\n\n.StatsLink-module_heading__8G3Jk {\n  font-family: nyt-cheltenham;\n  font-size: 1.5em;\n  font-style: normal;\n  font-weight: 400;\n  margin: 0;\n}\n\n.StatsLink-module_paragraphWrapper__5sxeO {\n  text-align: center;\n  margin-bottom: 1.25em;\n}\n\n.StatsLink-module_paragraph__Q-baL {\n  font-family: nyt-franklin;\n  font-size: 1em;\n  margin: 0;\n}\n\n.StatsLink-module_button__F7k0J {\n  background: var(--black-2);\n  border: none;\n  border-radius: 3px;\n  color: var(--white);\n  font-family: nyt-franklin;\n  font-weight: 600;\n  font-size: 1em;\n  height: 3em;\n  width: 100%;\n}\n\n.StatsLink-module_footer__Qxrmi {\n  padding-top: 2.5em;\n  text-align: center;\n}\n\n.StatsLink-module_buttonAsLink__kErTh {\n  all: unset;\n  text-decoration: underline;\n  cursor: pointer;\n  color: var(--black-3);\n  font-family: nyt-franklin;\n}\n\n.StatsLink-module_link__YBHY7 {\n  font-family: nyt-franklin;\n  font-size: 1em;\n  color: var(--black-3);\n}"
  );
  var Kn = {
      line1: "Your stats will be linked to this",
      line2: "New York Times account",
    },
    Xn = { line1: "We failed to link to stats to", line2: "your account." },
    Jn = function (e) {
      var a = e.onClose,
        t = Un(p.useState(!0), 2),
        n = t[0],
        o = t[1],
        r = Ne(),
        s = Ae(wa),
        i = Ae(ka),
        e = Ae(_a),
        l = Ae(va);
      p.useEffect(function () {
        r({ type: jn }),
          r(function (a) {
            return (
              a({ type: En }),
              console.log("load"),
              w.xhr
                .get(De, { withCookie: !1, headers: { client_id: "games" } })
                .then(function (e) {
                  e.email
                    ? a({ type: zn, payload: { data: { email: e.email } } })
                    : (a({ type: On }), (e = new Error("profile")), a(An(e)));
                })
                .catch(function (e) {
                  console.log("err", e), a({ type: On });
                  e = new Error("profile");
                  a(An(e));
                })
            );
          });
      }, []),
        p.useEffect(
          function () {
            o(!(!s && !l));
          },
          [s, l]
        );
      t = e ? Xn : Kn;
      return n
        ? null
        : g.createElement(
            "div",
            { className: In },
            g.createElement(
              "header",
              { className: Pn },
              g.createElement("img", {
                alt: "New York Times logo",
                className: Ln,
                style: { content: "var(--nyt-logo)" },
              })
            ),
            g.createElement(
              "div",
              { className: Tn },
              g.createElement(
                "div",
                { className: Mn },
                e &&
                  g.createElement(
                    "svg",
                    {
                      className: Rn,
                      width: "44",
                      height: "44",
                      viewBox: "0 0 44 44",
                      fill: "none",
                      xmlns: "http://www.w3.org/2000/svg",
                    },
                    g.createElement("path", {
                      d: "M13.7145 41.3977C16.2788 42.4691 19.0443 43 22 43C24.9241 43 27.6726 42.4685 30.2355 41.3977C32.7847 40.3326 35.0117 38.8526 36.9071 36.9571C38.8013 35.0629 40.2889 32.8377 41.3704 30.2909C42.46 27.7252 43 24.9579 43 22C43 19.0738 42.4593 16.3233 41.3704 13.7591C40.2889 11.2123 38.8013 8.98713 36.9071 7.09289C35.0129 5.19865 32.7877 3.71108 30.2409 2.62956C27.6767 1.54066 24.9262 1 22 1C19.0421 1 16.2748 1.54004 13.7091 2.62956C11.1623 3.71108 8.93713 5.19865 7.04289 7.09289C5.14744 8.98834 3.66735 11.2153 2.6023 13.7645C1.53151 16.3274 1 19.0759 1 22C1 24.9557 1.53091 27.7212 2.6023 30.2855C3.66735 32.8347 5.14744 35.0617 7.04289 36.9571C8.93834 38.8526 11.1653 40.3326 13.7145 41.3977ZM22.65 12.7V23.35H21.65V12.7H22.65ZM22.4679 30.8179C22.3474 30.9384 22.2139 31 22 31C21.7861 31 21.6526 30.9384 21.5321 30.8179C21.4116 30.6974 21.35 30.5639 21.35 30.35C21.35 30.1361 21.4116 30.0026 21.5321 29.8821C21.6526 29.7616 21.7861 29.7 22 29.7C22.2139 29.7 22.3474 29.7616 22.4679 29.8821C22.5884 30.0026 22.65 30.1361 22.65 30.35C22.65 30.5639 22.5884 30.6974 22.4679 30.8179Z",
                      fill: "#E33D26",
                      stroke: "white",
                      strokeWidth: "2",
                    })
                  ),
                g.createElement("img", {
                  alt: "Large sized wordle stats icon",
                  className: Dn,
                  style: { content: "var(--large-stats)" },
                })
              ),
              g.createElement(
                "div",
                { className: qn },
                g.createElement("h1", { className: Hn }, t.line1),
                g.createElement("h1", { className: Hn }, t.line2)
              ),
              g.createElement(
                "div",
                { className: Bn },
                g.createElement("p", { className: Fn }, "You are logged in as"),
                g.createElement(
                  "p",
                  { className: Fn, style: { fontWeight: "bold" } },
                  i && i.email
                )
              ),
              g.createElement(
                "button",
                {
                  className: Gn,
                  onClick: function () {
                    r({ type: bn }),
                      r({ type: Nn, payload: { enableAuth: !0 } });
                  },
                  type: "button",
                },
                e ? "Try again" : "Confirm and save"
              ),
              g.createElement(
                "footer",
                { className: Wn },
                e
                  ? g.createElement(
                      "button",
                      { className: Yn, onClick: a, type: "button" },
                      "Go back to stats ›"
                    )
                  : g.createElement(
                      g.Fragment,
                      null,
                      g.createElement(
                        "p",
                        { className: Fn },
                        "Not the right account?"
                      ),
                      g.createElement(
                        "a",
                        { className: Vn, href: qe },
                        "Click here to log in or create an account ›"
                      )
                    )
              )
            )
          );
    },
    Qn = {
      page: "Page-module_page__YqrWy",
      SlideIn: "Page-module_SlideIn__T-Lu3",
      closing: "Page-module_closing__uVg4f",
      SlideOut: "Page-module_SlideOut__U2w2g",
      pageNew: "Page-module_pageNew__YeTYy",
      gamesIcon: "Page-module_gamesIcon__VFFP9",
      close: "Page-module_close__D3gaa",
      headerNew: "Page-module_headerNew__7DIpY",
      content: "Page-module_content__hwN4l",
      contentContainer: "Page-module_contentContainer__KZJPh",
    };
  function $n(e, a, t) {
    return (
      a in e
        ? Object.defineProperty(e, a, {
            value: t,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[a] = t),
      e
    );
  }
  function eo(e, a) {
    return (
      (function (e) {
        if (Array.isArray(e)) return e;
      })(e) ||
      (function (e, a) {
        var t =
          null == e
            ? null
            : ("undefined" != typeof Symbol && e[Symbol.iterator]) ||
              e["@@iterator"];
        if (null != t) {
          var n,
            o,
            r = [],
            s = !0,
            i = !1;
          try {
            for (
              t = t.call(e);
              !(s = (n = t.next()).done) &&
              (r.push(n.value), !a || r.length !== a);
              s = !0
            );
          } catch (e) {
            (i = !0), (o = e);
          } finally {
            try {
              s || null == t.return || t.return();
            } finally {
              if (i) throw o;
            }
          }
          return r;
        }
      })(e, a) ||
      (function (e, a) {
        if (e) {
          if ("string" == typeof e) return ao(e, a);
          var t = Object.prototype.toString.call(e).slice(8, -1);
          return "Map" ===
            (t = "Object" === t && e.constructor ? e.constructor.name : t) ||
            "Set" === t
            ? Array.from(e)
            : "Arguments" === t ||
              /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)
            ? ao(e, a)
            : void 0;
        }
      })(e, a) ||
      (function () {
        throw new TypeError(
          "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
        );
      })()
    );
  }
  function ao(e, a) {
    (null == a || a > e.length) && (a = e.length);
    for (var t = 0, n = new Array(a); t < a; t++) n[t] = e[t];
    return n;
  }
  function to() {
    var a = Ne(),
      e = Ae(Dt),
      t = eo(p.useState(!1), 2),
      n = t[0],
      o = t[1],
      r = pa("auth"),
      s = !!Ae(fa),
      i = Ae(ya),
      l = Ae(Bt);
    if (
      (p.useEffect(
        function () {
          l && o(!0);
        },
        [l]
      ),
      !e)
    )
      return null;
    (t = function (e) {
      e.animationName === Qn.SlideOut && (o(!1), a(ye()));
    }),
      (i = {
        settings: { content: g.createElement(Tt, null), title: "Settings" },
        help: {
          content: g.createElement(We, { isPage: !0 }),
          title: "How to play",
        },
        linkInfo: {
          content: g.createElement(yn, {
            onClose: function () {
              return o(!0);
            },
            type: "linkInfo",
            loggedIn: s,
            optedIn: i,
            dispatchAction: function () {
              return a(me("statsLink"));
            },
          }),
          title: "",
        },
        statsProblem: {
          content: g.createElement(yn, {
            onClose: function () {
              return o(!0);
            },
            loggedIn: s,
            optedIn: i,
            type: "statsProblem",
            dispatchAction: function () {
              return a(me("statsLink"));
            },
          }),
          title: "",
        },
        statsLink: {
          content: g.createElement(Jn, {
            onClose: function () {
              return o(!0);
            },
          }),
          title: "",
        },
      }[e]),
      (e = i.content),
      (i = i.title);
    return r
      ? g.createElement(
          "div",
          {
            "data-testid": "pageNew",
            className: y(Qn.pageNew, $n({}, Qn.closing, n)),
            onAnimationEnd: t,
          },
          g.createElement("div", { className: Qn.content }, e)
        )
      : g.createElement(
          "div",
          {
            role: "dialog",
            className: y(Qn.page, $n({}, Qn.closing, n)),
            onAnimationEnd: t,
          },
          g.createElement(
            "div",
            { className: Qn.content },
            g.createElement(
              "header",
              null,
              g.createElement("h1", null, i),
              g.createElement(
                "button",
                {
                  type: "button",
                  className: Qn.close,
                  "data-testid": "close",
                  onClick: function () {
                    o(!0);
                  },
                },
                g.createElement(E, { icon: "close" })
              )
            ),
            g.createElement("div", { className: Qn.contentContainer }, e)
          )
        );
  }
  Ce(
    ".Page-module_page__YqrWy {\n  display: flex;\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  top: 0;\n  left: 0;\n  justify-content: center;\n  background-color: var(--color-background);\n  -webkit-animation: Page-module_SlideIn__T-Lu3 100ms linear;\n          animation: Page-module_SlideIn__T-Lu3 100ms linear;\n  z-index: var(--page-z-index);\n}\n.Page-module_page__YqrWy.Page-module_closing__uVg4f {\n  -webkit-animation: Page-module_SlideOut__U2w2g 150ms linear;\n          animation: Page-module_SlideOut__U2w2g 150ms linear;\n}\n.Page-module_page__YqrWy header {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  position: relative;\n}\n.Page-module_page__YqrWy h1 {\n  font-weight: 700;\n  font-size: 16px;\n  letter-spacing: 0.5px;\n  text-transform: uppercase;\n  text-align: center;\n  margin-bottom: 10px;\n}\n\n.Page-module_pageNew__YeTYy {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  top: 0;\n  left: 0;\n  justify-content: center;\n  background-color: var(--color-background);\n  -webkit-animation: Page-module_SlideIn__T-Lu3 100ms linear;\n          animation: Page-module_SlideIn__T-Lu3 100ms linear;\n  z-index: var(--page-z-index);\n  overflow-y: scroll;\n  display: flex;\n}\n.Page-module_pageNew__YeTYy .Page-module_gamesIcon__VFFP9 {\n  width: 95px;\n  height: 18px;\n}\n.Page-module_pageNew__YeTYy .Page-module_close__D3gaa {\n  margin-right: 30px;\n}\n.Page-module_pageNew__YeTYy.Page-module_closing__uVg4f {\n  -webkit-animation: Page-module_SlideOut__U2w2g 150ms linear;\n          animation: Page-module_SlideOut__U2w2g 150ms linear;\n}\n\n.Page-module_headerNew__7DIpY {\n  padding: 15px 0px;\n}\n.Page-module_headerNew__7DIpY > p {\n  text-align: center;\n  margin: 10px 0px;\n}\n\n.Page-module_content__hwN4l {\n  position: relative;\n  color: var(--color-tone-1);\n  padding: 0 32px;\n  max-width: var(--game-max-width);\n  width: 100%;\n  overflow-y: auto;\n  height: 100%;\n  display: flex;\n  flex-direction: column;\n}\n\n.Page-module_contentContainer__KZJPh {\n  height: 100%;\n}\n\n.Page-module_close__D3gaa {\n  background: none;\n  color: inherit;\n  border: none;\n  padding: 0;\n  font: inherit;\n  cursor: pointer;\n  outline: inherit;\n  position: absolute;\n  right: 0;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  cursor: pointer;\n  margin: 0;\n}\n\n@media only screen and (min-device-width: 320px) and (max-device-width: 480px) {\n  .Page-module_content__hwN4l {\n    max-width: 100%;\n    padding: 0;\n  }\n\n  .Page-module_close__D3gaa {\n    padding: 0 16px;\n  }\n}\n@-webkit-keyframes Page-module_SlideIn__T-Lu3 {\n  0% {\n    transform: translateY(30px);\n    opacity: 0;\n  }\n  100% {\n    transform: translateY(0px);\n    opacity: 1;\n  }\n}\n@keyframes Page-module_SlideIn__T-Lu3 {\n  0% {\n    transform: translateY(30px);\n    opacity: 0;\n  }\n  100% {\n    transform: translateY(0px);\n    opacity: 1;\n  }\n}\n@-webkit-keyframes Page-module_SlideOut__U2w2g {\n  0% {\n    transform: translateY(0px);\n    opacity: 1;\n  }\n  90% {\n    opacity: 0;\n  }\n  100% {\n    opacity: 0;\n    transform: translateY(60px);\n  }\n}\n@keyframes Page-module_SlideOut__U2w2g {\n  0% {\n    transform: translateY(0px);\n    opacity: 1;\n  }\n  90% {\n    opacity: 0;\n  }\n  100% {\n    opacity: 0;\n    transform: translateY(60px);\n  }\n}"
  );
  var no = {
    toaster: "ToastContainer-module_toaster__QDad3",
    gameToaster: "ToastContainer-module_gameToaster__yjzPn",
    systemToaster: "ToastContainer-module_systemToaster__fIZdf",
  };
  Ce(
    ".ToastContainer-module_toaster__QDad3 {\n  position: absolute;\n  top: 10%;\n  left: 50%;\n  transform: translate(-50%, 0);\n  pointer-events: none;\n  width: -webkit-fit-content;\n  width: -moz-fit-content;\n  width: fit-content;\n}\n\n#ToastContainer-module_gameToaster__yjzPn {\n  z-index: var(--toast-z-index);\n}\n\n#ToastContainer-module_systemToaster__fIZdf {\n  z-index: var(--system-toast-z-index);\n}"
  );
  var oo = {
    toast: "Toast-module_toast__Woeb-",
    win: "Toast-module_win__7-aZX",
    fade: "Toast-module_fade__uPhAg",
  };
  function ro(e, a) {
    return (
      (function (e) {
        if (Array.isArray(e)) return e;
      })(e) ||
      (function (e, a) {
        var t =
          null == e
            ? null
            : ("undefined" != typeof Symbol && e[Symbol.iterator]) ||
              e["@@iterator"];
        if (null != t) {
          var n,
            o,
            r = [],
            s = !0,
            i = !1;
          try {
            for (
              t = t.call(e);
              !(s = (n = t.next()).done) &&
              (r.push(n.value), !a || r.length !== a);
              s = !0
            );
          } catch (e) {
            (i = !0), (o = e);
          } finally {
            try {
              s || null == t.return || t.return();
            } finally {
              if (i) throw o;
            }
          }
          return r;
        }
      })(e, a) ||
      (function (e, a) {
        if (e) {
          if ("string" == typeof e) return so(e, a);
          var t = Object.prototype.toString.call(e).slice(8, -1);
          return "Map" ===
            (t = "Object" === t && e.constructor ? e.constructor.name : t) ||
            "Set" === t
            ? Array.from(e)
            : "Arguments" === t ||
              /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)
            ? so(e, a)
            : void 0;
        }
      })(e, a) ||
      (function () {
        throw new TypeError(
          "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
        );
      })()
    );
  }
  function so(e, a) {
    (null == a || a > e.length) && (a = e.length);
    for (var t = 0, n = new Array(a); t < a; t++) n[t] = e[t];
    return n;
  }
  function io(e) {
    var a = e.toast,
      t = a.text,
      n = a.duration,
      o = a.timestamp,
      r = Ne(),
      e = ro(p.useState(!1), 2),
      a = e[0],
      s = e[1];
    return (
      h(
        function () {
          return s(!0);
        },
        n === 1 / 0 ? null : n
      ),
      g.createElement(
        "div",
        {
          className: y(
            oo.toast,
            ((e = {}),
            (n = oo.fade),
            (a = a),
            n in e
              ? Object.defineProperty(e, n, {
                  value: a,
                  enumerable: !0,
                  configurable: !0,
                  writable: !0,
                })
              : (e[n] = a),
            e)
          ),
          onTransitionEnd: function () {
            r(Q(t, o));
          },
        },
        t
      )
    );
  }
  function lo() {
    var e = Ae(Ht),
      a = e.filter(function (e) {
        return e.isSystem;
      }),
      t = e.filter(function (e) {
        return !e.isSystem;
      }),
      e = function (e, a) {
        return g.createElement(
          "div",
          { className: no.toaster, id: a },
          e.map(function (e) {
            return g.createElement(io, {
              key: "".concat(e.text, "-").concat(e.timestamp),
              toast: e,
            });
          })
        );
      };
    return g.createElement(
      g.Fragment,
      null,
      e(t, no.gameToaster),
      e(a, no.systemToaster)
    );
  }
  Ce(
    ".Toast-module_toast__Woeb- {\n  position: relative;\n  margin: 16px;\n  background-color: var(--color-tone-1);\n  color: var(--color-tone-7);\n  padding: 16px;\n  border: none;\n  border-radius: 4px;\n  opacity: 1;\n  transition: opacity 300ms cubic-bezier(0.645, 0.045, 0.355, 1);\n  font-weight: 700;\n}\n\n.Toast-module_win__7-aZX {\n  background-color: var(--color-correct);\n  color: var(--tile-text-color);\n}\n\n.Toast-module_fade__uPhAg {\n  opacity: 0;\n}"
  );
  var uo = function () {
      var e;
      return (
        window.isHybridWebView && window.NativeBridge
          ? window.NativeBridge.gamesBackToHub()
          : window.isPlayTab
          ? (((e = document.createElement("a")).href = "nytimes://play"),
            e.click())
          : (window.location.href = "/crosswords"),
        null
      );
    },
    co = {
      container: "Error-module_container__BMcmT",
      SlideIn: "Error-module_SlideIn__9w2wl",
      errorContainer: "Error-module_errorContainer__5f0-O",
      errorText: "Error-module_errorText__aINs5",
      errorTilesContainer: "Error-module_errorTilesContainer__7SZD5",
      errorTiles: "Error-module_errorTiles__miCkr",
      backButton: "Error-module_backButton__qhfix",
      SlideOut: "Error-module_SlideOut__uVOvc",
    };
  Ce(
    '.Error-module_container__BMcmT {\n  display: flex;\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  max-height: calc(100% - var(--header-height) - 1px);\n  left: 0;\n  justify-content: center;\n  background-color: var(--error-background);\n  -webkit-animation: Error-module_SlideIn__9w2wl 100ms linear;\n          animation: Error-module_SlideIn__9w2wl 100ms linear;\n  z-index: var(--error-z-index);\n}\n\n.Error-module_errorContainer__5f0-O {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  height: 200px;\n  position: relative;\n  top: 166px;\n  font-family: "nyt-franklin";\n}\n\n.Error-module_errorText__aINs5 {\n  font-family: "nyt-franklin-400";\n  text-align: center;\n  margin-top: 40px;\n  font-size: 20px;\n  line-height: 24px;\n  color: var(--color-tone-1);\n}\n\n.Error-module_errorTilesContainer__7SZD5 {\n  width: 208px;\n  display: inline-flex;\n  justify-content: space-between;\n}\n\n.Error-module_errorTiles__miCkr {\n  font-weight: 700;\n  font-size: 20px;\n  line-height: 20px;\n  text-align: center;\n  text-transform: uppercase;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  background-color: var(--white);\n  border: 1.27px solid var(--lightGray);\n  width: 40px;\n  height: 40px;\n  box-sizing: border-box;\n}\n\n.Error-module_backButton__qhfix {\n  margin-top: 24px;\n  border-radius: 24px;\n  width: 150px;\n  height: 48px;\n  font-family: "nyt-franklin-600";\n  font-size: 16px;\n  line-height: 20px;\n  text-align: center;\n  background-color: var(--color-tone-1);\n  box-shadow: none;\n  border: none;\n  color: var(--color-tone-7);\n}\n\n@-webkit-keyframes Error-module_SlideIn__9w2wl {\n  0% {\n    transform: translateY(30px);\n    opacity: 0;\n  }\n  100% {\n    transform: translateY(0px);\n    opacity: 1;\n  }\n}\n\n@keyframes Error-module_SlideIn__9w2wl {\n  0% {\n    transform: translateY(30px);\n    opacity: 0;\n  }\n  100% {\n    transform: translateY(0px);\n    opacity: 1;\n  }\n}\n@-webkit-keyframes Error-module_SlideOut__uVOvc {\n  0% {\n    transform: translateY(0px);\n    opacity: 1;\n  }\n  90% {\n    opacity: 0;\n  }\n  100% {\n    opacity: 0;\n    transform: translateY(60px);\n  }\n}\n@keyframes Error-module_SlideOut__uVOvc {\n  0% {\n    transform: translateY(0px);\n    opacity: 1;\n  }\n  90% {\n    opacity: 0;\n  }\n  100% {\n    opacity: 0;\n    transform: translateY(60px);\n  }\n}'
  );
  var mo = function (e) {
      (e = e.text), (e = void 0 === e ? "error" : e);
      return g.createElement(
        "div",
        { className: co.errorTilesContainer },
        e.split("").map(function (e, a) {
          return g.createElement(
            "div",
            { className: co.errorTiles, key: "".concat(a, "-").concat(e) },
            e
          );
        })
      );
    },
    po = function () {
      return g.createElement(
        "div",
        { className: co.errorText },
        "You’re offline.",
        g.createElement("br", null),
        "Find a connection and come back."
      );
    },
    yo = function () {
      return g.createElement(
        "div",
        { className: co.errorText },
        "Oops, something went wrong.",
        g.createElement("br", null),
        "Please try again later."
      );
    };
  function go() {
    var e = Ae(Rt),
      a = "profile" === e,
      t = document.referrer.includes("nytimes") && !a;
    if (!e) return null;
    var n = {
        offline: {
          tiles: g.createElement(mo, { text: "yikes" }),
          content: g.createElement(po, null),
        },
        default: {
          tiles: g.createElement(mo, null),
          content: g.createElement(yo, null),
        },
        profile: {
          tiles: g.createElement(mo, null),
          content: g.createElement(yo, null),
        },
      }[e],
      e = n.tiles,
      n = n.content;
    return g.createElement(
      "div",
      { className: co.container, role: "dialog" },
      g.createElement(
        "div",
        { className: co.errorContainer },
        e,
        n,
        t &&
          g.createElement(
            "button",
            {
              className: co.backButton,
              type: "button",
              "data-testid": "back",
              onClick: uo,
            },
            "Back"
          ),
        a &&
          g.createElement(
            "button",
            {
              className: co.backButton,
              type: "button",
              "data-testid": "reload",
              onClick: function () {
                return window.location.reload();
              },
            },
            "Reload"
          )
      )
    );
  }
  function ho() {
    return function (e, a) {
      var t = new Date(),
        n = B(a()),
        o = D(a());
      if (
        !(
          "prod" !==
            (null === (a = window.env) || void 0 === a ? void 0 : a.name) &&
          window.location.search.includes("reset")
        ) &&
        n &&
        I(new Date(n), t) < 1
      )
        return e({ type: bo, payload: { currentRowIndex: o } });
      e({ type: fo, payload: { dayOffset: I(C, t), numRows: Y } });
    };
  }
  var fo = "wordle/game/START_GAME",
    bo = "wordle/game/CONTINUE_GAME",
    ko = "wordle/game/ADD_LETTER",
    wo = "wordle/game/BACKSPACE",
    vo = "wordle/game/EVALUATE_ROW",
    _o = function (n) {
      return function (e, a) {
        var t = Se(a()),
          a = q(a());
        t || a.length >= V || e({ type: ko, payload: { letter: n } });
      };
    },
    xo = function () {
      return function (e, a) {
        Se(a()) || e({ type: wo });
      };
    },
    So = function () {
      return function (e, a) {
        var t = a(),
          n = Se(t),
          o = q(t),
          r = G(t),
          s = M(t),
          i = W(t),
          l = D(t),
          a = Xe(t),
          t = F(t);
        if (!n) {
          if (o.length !== V)
            return e(be({ text: "Not enough letters", invalidate: !0 }));
          if (((n = o), !O.includes(n) && !z.includes(n)))
            return e(be({ text: "Not in word list", invalidate: !0 }));
          if (a) {
            var u = (function (e, a, t) {
                if (!e || !a || !t) return { validGuess: !0 };
                for (var n, o, r, s = 0; s < t.length; s += 1)
                  if ("correct" === t[s] && e[s] !== a[s])
                    return {
                      validGuess: !1,
                      errorMessage: ""
                        .concat(
                          ((r = o = void 0),
                          (n = s + 1) +
                            ((o = ["th", "st", "nd", "rd"])[
                              ((r = n % 100) - 20) % 10
                            ] ||
                              o[r] ||
                              o[0])),
                          " letter must be "
                        )
                        .concat(a[s].toUpperCase()),
                    };
                for (var i = {}, l = 0; l < t.length; l += 1)
                  ["correct", "present"].includes(t[l]) &&
                    (i[a[l]] ? (i[a[l]] += 1) : (i[a[l]] = 1));
                for (
                  var u = e.split("").reduce(function (e, a) {
                      return e[a] ? (e[a] += 1) : (e[a] = 1), e;
                    }, {}),
                    c = Object.keys(i),
                    d = 0;
                  d < c.length;
                  d += 1
                ) {
                  var m = c[d];
                  if ((u[m] || 0) < i[m])
                    return {
                      validGuess: !1,
                      errorMessage: "Guess must contain ".concat(
                        m.toUpperCase()
                      ),
                    };
                }
                return { validGuess: !0 };
              })(o, s[l - 1], i[l - 1]),
              c = u.validGuess,
              u = u.errorMessage;
            if (!c)
              return e(
                be({ text: u || "Not valid in hard mode", invalidate: !0 })
              );
          }
          (c = l + 1),
            (u = o === r),
            (l = !u && Y <= c),
            (r = u && !!t && 1 === I(new Date(t), new Date())),
            (t = "IN_PROGRESS");
          u ? (t = "WIN") : l && (t = "FAIL"),
            "IN_PROGRESS" !== t && f.setItem(m, !0),
            e({
              type: vo,
              payload: {
                now: Date.now(),
                status: t,
                isStreak: r,
                numGuesses: c,
                guess: o,
              },
            });
        }
      };
    },
    jo = {
      key: "Key-module_key__Rv-Vp",
      fade: "Key-module_fade__37Hk8",
      half: "Key-module_half__ljsj8",
      one: "Key-module_one__HBOou",
      oneAndAHalf: "Key-module_oneAndAHalf__K6JBY",
    };
  function Eo(e, a, t) {
    return (
      a in e
        ? Object.defineProperty(e, a, {
            value: t,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[a] = t),
      e
    );
  }
  function zo(e, a) {
    return (
      (function (e) {
        if (Array.isArray(e)) return e;
      })(e) ||
      (function (e, a) {
        var t =
          null == e
            ? null
            : ("undefined" != typeof Symbol && e[Symbol.iterator]) ||
              e["@@iterator"];
        if (null != t) {
          var n,
            o,
            r = [],
            s = !0,
            i = !1;
          try {
            for (
              t = t.call(e);
              !(s = (n = t.next()).done) &&
              (r.push(n.value), !a || r.length !== a);
              s = !0
            );
          } catch (e) {
            (i = !0), (o = e);
          } finally {
            try {
              s || null == t.return || t.return();
            } finally {
              if (i) throw o;
            }
          }
          return r;
        }
      })(e, a) ||
      (function (e, a) {
        if (e) {
          if ("string" == typeof e) return Oo(e, a);
          var t = Object.prototype.toString.call(e).slice(8, -1);
          return "Map" ===
            (t = "Object" === t && e.constructor ? e.constructor.name : t) ||
            "Set" === t
            ? Array.from(e)
            : "Arguments" === t ||
              /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)
            ? Oo(e, a)
            : void 0;
        }
      })(e, a) ||
      (function () {
        throw new TypeError(
          "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
        );
      })()
    );
  }
  function Oo(e, a) {
    (null == a || a > e.length) && (a = e.length);
    for (var t = 0, n = new Array(a); t < a; t++) n[t] = e[t];
    return n;
  }
  Ce(
    ".Key-module_key__Rv-Vp {\n  font-family: inherit;\n  font-weight: bold;\n  border: 0;\n  padding: 0;\n  margin: 0 6px 0 0;\n  height: 58px;\n  border-radius: 4px;\n  cursor: pointer;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  background-color: var(--key-bg);\n  color: var(--key-text-color);\n  flex: 1;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  text-transform: uppercase;\n  -webkit-tap-highlight-color: rgba(0, 0, 0, 0.3);\n}\n.Key-module_key__Rv-Vp:focus {\n  outline: none;\n}\n.Key-module_key__Rv-Vp:last-of-type {\n  margin: 0;\n}\n.Key-module_key__Rv-Vp[data-state=correct] {\n  background-color: var(--key-bg-correct);\n  color: var(--key-evaluated-text-color);\n}\n.Key-module_key__Rv-Vp[data-state=present] {\n  background-color: var(--key-bg-present);\n  color: var(--key-evaluated-text-color);\n}\n.Key-module_key__Rv-Vp[data-state=absent] {\n  background-color: var(--key-bg-absent);\n  color: var(--key-evaluated-text-color);\n}\n.Key-module_key__Rv-Vp.Key-module_fade__37Hk8 {\n  transition: background-color 0.1s ease, color 0.1s ease;\n}\n\n.Key-module_half__ljsj8 {\n  flex: 0.5;\n}\n\n.Key-module_one__HBOou {\n  flex: 1;\n}\n\n.Key-module_oneAndAHalf__K6JBY {\n  flex: 1.5;\n  font-size: 12px;\n}"
  );
  function No(e) {
    return "←" === e
      ? g.createElement(E, { icon: "backspace" })
      : "↵" === e
      ? "enter"
      : "a" <= e && e <= "z"
      ? e
      : void 0;
  }
  function Ao(e) {
    var a = e.value,
      t = e.evaluation,
      n = zo(g.useState(!1), 2),
      o = n[0],
      r = n[1],
      e = No(a);
    return (
      g.useEffect(
        function () {
          t && r(!0);
        },
        [t]
      ),
      e
        ? g.createElement(
            "button",
            {
              type: "button",
              "data-key": a,
              "data-state": t,
              className: y(
                jo.key,
                (Eo((n = {}), jo.oneAndAHalf, "←" === a || "↵" === a),
                Eo(n, jo.fade, o),
                n)
              ),
              onTransitionEnd: function () {
                return r(!1);
              },
            },
            e
          )
        : g.createElement("div", {
            "data-testid": "spacer",
            className: 1 === a.length ? jo.half : jo.one,
          })
    );
  }
  var Co = {
    keyboard: "Keyboard-module_keyboard__1HSnn",
    row: "Keyboard-module_row__YWe5w",
  };
  Ce(
    ".Keyboard-module_keyboard__1HSnn {\n  height: var(--keyboard-height);\n  margin: 0 8px;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n}\n\n.Keyboard-module_row__YWe5w {\n  display: flex;\n  width: 100%;\n  margin: 0 auto 8px;\n  /* https://stackoverflow.com/questions/46167604/ios-html-disable-double-tap-to-zoom */\n  touch-action: manipulation;\n}"
  );
  var Io = [
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    ["-", "a", "s", "d", "f", "g", "h", "j", "k", "l", "-"],
    ["↵", "z", "x", "c", "v", "b", "n", "m", "←"],
  ];
  function Po() {
    function n(e) {
      "←" === e || "Backspace" === e
        ? t(xo())
        : "↵" === e || "Enter" === e
        ? t(So())
        : L.includes(e.toLowerCase()) && t(_o(e.toLowerCase()));
    }
    var a = p.useRef(null),
      t = Ne(),
      o = Ae(je);
    return (
      p.useEffect(function () {
        function e(e) {
          var a, t;
          !0 !== e.repeat &&
            ((a = e.key),
            (t = e.metaKey),
            (e = e.ctrlKey),
            t ||
              e ||
              (!L.includes(a.toLowerCase()) &&
                "Backspace" !== a &&
                "Enter" !== a) ||
              n(a));
        }
        return (
          window.addEventListener("keydown", e),
          function () {
            return window.removeEventListener("keydown", e);
          }
        );
      }, []),
      g.createElement(
        "div",
        {
          className: Co.keyboard,
          ref: a,
          onClick: function (e) {
            e = e.target.closest("button");
            e &&
              a.current &&
              a.current.contains(e) &&
              void 0 !== e.dataset.key &&
              n(e.dataset.key);
          },
        },
        Io.map(function (e, t) {
          return g.createElement(
            "div",
            { className: Co.row, key: t },
            e.map(function (e, a) {
              return g.createElement(Ao, {
                key: "".concat(e, "-").concat(t, "-").concat(a),
                value: e,
                evaluation: o[e],
              });
            })
          );
        })
      )
    );
  }
  var Lo = {
    row: "Row-module_row__dEHfN",
    invalid: "Row-module_invalid__16kR1",
    Shake: "Row-module_Shake__4i0T3",
    win: "Row-module_win__NF7uy",
    Bounce: "Row-module_Bounce__7NO2t",
  };
  function To(e, a) {
    return (
      (function (e) {
        if (Array.isArray(e)) return e;
      })(e) ||
      (function (e, a) {
        var t =
          null == e
            ? null
            : ("undefined" != typeof Symbol && e[Symbol.iterator]) ||
              e["@@iterator"];
        if (null != t) {
          var n,
            o,
            r = [],
            s = !0,
            i = !1;
          try {
            for (
              t = t.call(e);
              !(s = (n = t.next()).done) &&
              (r.push(n.value), !a || r.length !== a);
              s = !0
            );
          } catch (e) {
            (i = !0), (o = e);
          } finally {
            try {
              s || null == t.return || t.return();
            } finally {
              if (i) throw o;
            }
          }
          return r;
        }
      })(e, a) ||
      (function (e, a) {
        if (e) {
          if ("string" == typeof e) return Mo(e, a);
          var t = Object.prototype.toString.call(e).slice(8, -1);
          return "Map" ===
            (t = "Object" === t && e.constructor ? e.constructor.name : t) ||
            "Set" === t
            ? Array.from(e)
            : "Arguments" === t ||
              /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)
            ? Mo(e, a)
            : void 0;
        }
      })(e, a) ||
      (function () {
        throw new TypeError(
          "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
        );
      })()
    );
  }
  function Mo(e, a) {
    (null == a || a > e.length) && (a = e.length);
    for (var t = 0, n = new Array(a); t < a; t++) n[t] = e[t];
    return n;
  }
  function Ro(e) {
    var t = e.index,
      n = e.letters,
      a = e.evaluation,
      o = e.length,
      r = e.invalid,
      s = e.win,
      i = e.removeInvalid,
      l = To(g.useState(0), 2),
      u = l[0],
      c = l[1],
      e = g.useRef(null),
      d = g.useRef(!1),
      m = null == a ? void 0 : a.slice(0, u);
    return (
      g.useEffect(
        function () {
          a &&
            (function (e) {
              for (var a = 0; a < o; a += 1)
                setTimeout(function () {
                  c(function (e) {
                    return e + 1;
                  });
                }, e * a);
            })(d.current ? 300 : 100),
            (d.current = !0);
        },
        [a]
      ),
      g.createElement(
        "div",
        {
          className: y(
            Lo.row,
            ((l = {}),
            (u = Lo.invalid),
            (r = r),
            u in l
              ? Object.defineProperty(l, u, {
                  value: r,
                  enumerable: !0,
                  configurable: !0,
                  writable: !0,
                })
              : (l[u] = r),
            l)
          ),
          ref: e,
          onAnimationEnd: function (e) {
            e.animationName === Lo.Shake && i();
          },
        },
        Array(o)
          .fill(!0)
          .map(function (e, a) {
            return g.createElement(
              "div",
              {
                key: a,
                className: s ? Lo.win : "",
                style: { animationDelay: "".concat(100 * a, "ms") },
              },
              g.createElement(Te, {
                rowIndex: t,
                letter: n[a] || "",
                evaluation: m && m[a],
                last: a === o - 1,
              })
            );
          })
      )
    );
  }
  Ce(
    ".Row-module_row__dEHfN {\n  display: grid;\n  grid-template-columns: repeat(5, 1fr);\n  grid-gap: 5px;\n}\n.Row-module_row__dEHfN.Row-module_invalid__16kR1 {\n  -webkit-animation-name: Row-module_Shake__4i0T3;\n          animation-name: Row-module_Shake__4i0T3;\n  -webkit-animation-duration: 600ms;\n          animation-duration: 600ms;\n}\n\n.Row-module_win__NF7uy {\n  -webkit-animation-name: Row-module_Bounce__7NO2t;\n          animation-name: Row-module_Bounce__7NO2t;\n  -webkit-animation-duration: 1000ms;\n          animation-duration: 1000ms;\n}\n\n@-webkit-keyframes Row-module_Bounce__7NO2t {\n  0%, 20% {\n    transform: translateY(0);\n  }\n  40% {\n    transform: translateY(-30px);\n  }\n  50% {\n    transform: translateY(5px);\n  }\n  60% {\n    transform: translateY(-15px);\n  }\n  80% {\n    transform: translateY(2px);\n  }\n  100% {\n    transform: translateY(0);\n  }\n}\n\n@keyframes Row-module_Bounce__7NO2t {\n  0%, 20% {\n    transform: translateY(0);\n  }\n  40% {\n    transform: translateY(-30px);\n  }\n  50% {\n    transform: translateY(5px);\n  }\n  60% {\n    transform: translateY(-15px);\n  }\n  80% {\n    transform: translateY(2px);\n  }\n  100% {\n    transform: translateY(0);\n  }\n}\n@-webkit-keyframes Row-module_Shake__4i0T3 {\n  10%, 90% {\n    transform: translateX(-1px);\n  }\n  20%, 80% {\n    transform: translateX(2px);\n  }\n  30%, 50%, 70% {\n    transform: translateX(-4px);\n  }\n  40%, 60% {\n    transform: translateX(4px);\n  }\n}\n@keyframes Row-module_Shake__4i0T3 {\n  10%, 90% {\n    transform: translateX(-1px);\n  }\n  20%, 80% {\n    transform: translateX(2px);\n  }\n  30%, 50%, 70% {\n    transform: translateX(-4px);\n  }\n  40%, 60% {\n    transform: translateX(4px);\n  }\n}"
  );
  var Do = {
    boardContainer: "Board-module_boardContainer__cKb-C",
    board: "Board-module_board__lbzlf",
  };
  Ce(
    ".Board-module_boardContainer__cKb-C {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  flex-grow: 1;\n  overflow: hidden;\n}\n\n.Board-module_board__lbzlf {\n  display: grid;\n  grid-template-rows: repeat(6, 1fr);\n  grid-gap: 5px;\n  padding: 10px;\n  box-sizing: border-box;\n}"
  );
  var qo = 350;
  function Ho() {
    var t = Ae(M),
      n = Ae(W),
      o = Ae(D),
      r = Ae(_e),
      s = Ae(xe),
      i = Ne(),
      l = g.useRef(null),
      u = g.useRef(null);
    return (
      g.useEffect(function () {
        function e() {
          var e,
            a = l.current,
            t = u.current;
          a &&
            t &&
            ((e = Math.min(Math.floor(a.clientHeight * (V / Y)), qo)),
            (a = Math.floor(e / V) * Y),
            (t.style.width = "".concat(e, "px")),
            (t.style.height = "".concat(a, "px")));
        }
        return (
          e(),
          window.addEventListener("resize", e),
          function () {
            return window.removeEventListener("resize", e);
          }
        );
      }, []),
      g.createElement(
        "div",
        { className: Do.boardContainer, ref: l },
        g.createElement(
          "div",
          { className: Do.board, ref: u },
          Array(Y)
            .fill(!0)
            .map(function (e, a) {
              return g.createElement(Ro, {
                key: a,
                index: a,
                letters: t[a] || "",
                length: V,
                evaluation: n[a],
                invalid: a === o && r,
                win: a === o - 1 && s,
                removeInvalid: function () {
                  return i(Oe());
                },
              });
            })
        )
      )
    );
  }
  var Bo = "nyt-wordle-statistics",
    Fo = {
      currentStreak: 0,
      maxStreak: 0,
      guesses: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, fail: 0 },
      winPercentage: 0,
      gamesPlayed: 0,
      gamesWon: 0,
      averageGuesses: 0,
    };
  function Go(e, a) {
    return e === a || (e != e && a != a);
  }
  function Wo(e, a) {
    for (var t = e.length; t--; ) if (Go(e[t][0], a)) return t;
    return -1;
  }
  var Yo = Array.prototype.splice;
  function Vo(e) {
    var a = -1,
      t = null == e ? 0 : e.length;
    for (this.clear(); ++a < t; ) {
      var n = e[a];
      this.set(n[0], n[1]);
    }
  }
  function Uo(e) {
    return (Uo =
      "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
        ? function (e) {
            return typeof e;
          }
        : function (e) {
            return e &&
              "function" == typeof Symbol &&
              e.constructor === Symbol &&
              e !== Symbol.prototype
              ? "symbol"
              : typeof e;
          })(e);
  }
  (Vo.prototype.clear = function () {
    (this.__data__ = []), (this.size = 0);
  }),
    (Vo.prototype.delete = function (e) {
      var a = this.__data__;
      return (
        !((e = Wo(a, e)) < 0) &&
        (e == a.length - 1 ? a.pop() : Yo.call(a, e, 1), --this.size, !0)
      );
    }),
    (Vo.prototype.get = function (e) {
      var a = this.__data__;
      return (e = Wo(a, e)) < 0 ? void 0 : a[e][1];
    }),
    (Vo.prototype.has = function (e) {
      return -1 < Wo(this.__data__, e);
    }),
    (Vo.prototype.set = function (e, a) {
      var t = this.__data__,
        n = Wo(t, e);
      return n < 0 ? (++this.size, t.push([e, a])) : (t[n][1] = a), this;
    });
  Ke =
    "object" == ("undefined" == typeof global ? "undefined" : Uo(global)) &&
    global &&
    global.Object === Object &&
    global;
  function Zo(e) {
    return (Zo =
      "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
        ? function (e) {
            return typeof e;
          }
        : function (e) {
            return e &&
              "function" == typeof Symbol &&
              e.constructor === Symbol &&
              e !== Symbol.prototype
              ? "symbol"
              : typeof e;
          })(e);
  }
  var ke =
      "object" == ("undefined" == typeof self ? "undefined" : Zo(self)) &&
      self &&
      self.Object === Object &&
      self,
    t = Ke || ke || Function("return this")(),
    we = t.Symbol,
    ke = Object.prototype,
    Ko = ke.hasOwnProperty,
    Xo = ke.toString,
    Jo = we ? we.toStringTag : void 0;
  var Qo = Object.prototype.toString;
  var $o = "[object Null]",
    er = "[object Undefined]",
    ar = we ? we.toStringTag : void 0;
  function tr(e) {
    return null == e
      ? void 0 === e
        ? er
        : $o
      : ar && ar in Object(e)
      ? (function (e) {
          var a = Ko.call(e, Jo),
            t = e[Jo];
          try {
            var n = !(e[Jo] = void 0);
          } catch (e) {}
          var o = Xo.call(e);
          return n && (a ? (e[Jo] = t) : delete e[Jo]), o;
        })(e)
      : Qo.call(e);
  }
  function nr(e) {
    return (nr =
      "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
        ? function (e) {
            return typeof e;
          }
        : function (e) {
            return e &&
              "function" == typeof Symbol &&
              e.constructor === Symbol &&
              e !== Symbol.prototype
              ? "symbol"
              : typeof e;
          })(e);
  }
  function or(e) {
    var a = nr(e);
    return null != e && ("object" == a || "function" == a);
  }
  var rr = "[object AsyncFunction]",
    sr = "[object Function]",
    ir = "[object GeneratorFunction]",
    lr = "[object Proxy]";
  function ur(e) {
    if (or(e)) {
      e = tr(e);
      return e == sr || e == ir || e == rr || e == lr;
    }
  }
  var ke = t["__core-js_shared__"],
    cr = (we = /[^.]+$/.exec((ke && ke.keys && ke.keys.IE_PROTO) || ""))
      ? "Symbol(src)_1." + we
      : "";
  var dr = Function.prototype.toString;
  var mr = /^\[object .+?Constructor\]$/,
    ke = Function.prototype,
    we = Object.prototype,
    ke = ke.toString,
    we = we.hasOwnProperty,
    pr = RegExp(
      "^" +
        ke
          .call(we)
          .replace(/[\\^$.*+?()[\]{}|]/g, "\\$&")
          .replace(
            /hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,
            "$1.*?"
          ) +
        "$"
    );
  function yr(e) {
    var a;
    return (
      or(e) &&
      ((a = e), !(cr && cr in a)) &&
      (ur(e) ? pr : mr).test(
        (function (e) {
          if (null != e) {
            try {
              return dr.call(e);
            } catch (e) {}
            try {
              return e + "";
            } catch (e) {}
          }
          return "";
        })(e)
      )
    );
  }
  function gr(e, a) {
    (a = a), (a = null == (e = e) ? void 0 : e[a]);
    return yr(a) ? a : void 0;
  }
  var hr = gr(t, "Map"),
    fr = gr(Object, "create");
  var br = Object.prototype.hasOwnProperty;
  var kr = Object.prototype.hasOwnProperty;
  function wr(e) {
    var a = -1,
      t = null == e ? 0 : e.length;
    for (this.clear(); ++a < t; ) {
      var n = e[a];
      this.set(n[0], n[1]);
    }
  }
  function vr(e) {
    return (vr =
      "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
        ? function (e) {
            return typeof e;
          }
        : function (e) {
            return e &&
              "function" == typeof Symbol &&
              e.constructor === Symbol &&
              e !== Symbol.prototype
              ? "symbol"
              : typeof e;
          })(e);
  }
  function _r(e, a) {
    var t,
      n = e.__data__;
    return (
      "string" == (e = vr((t = a))) ||
      "number" == e ||
      "symbol" == e ||
      "boolean" == e
        ? "__proto__" !== t
        : null === t
    )
      ? n["string" == typeof a ? "string" : "hash"]
      : n.map;
  }
  function xr(e) {
    var a = -1,
      t = null == e ? 0 : e.length;
    for (this.clear(); ++a < t; ) {
      var n = e[a];
      this.set(n[0], n[1]);
    }
  }
  (wr.prototype.clear = function () {
    (this.__data__ = fr ? fr(null) : {}), (this.size = 0);
  }),
    (wr.prototype.delete = function (e) {
      return (
        (e = this.has(e) && delete this.__data__[e]),
        (this.size -= e ? 1 : 0),
        e
      );
    }),
    (wr.prototype.get = function (e) {
      var a = this.__data__;
      if (fr) {
        var t = a[e];
        return "__lodash_hash_undefined__" === t ? void 0 : t;
      }
      return br.call(a, e) ? a[e] : void 0;
    }),
    (wr.prototype.has = function (e) {
      var a = this.__data__;
      return fr ? void 0 !== a[e] : kr.call(a, e);
    }),
    (wr.prototype.set = function (e, a) {
      var t = this.__data__;
      return (
        (this.size += this.has(e) ? 0 : 1),
        (t[e] = fr && void 0 === a ? "__lodash_hash_undefined__" : a),
        this
      );
    }),
    (xr.prototype.clear = function () {
      (this.size = 0),
        (this.__data__ = {
          hash: new wr(),
          map: new (hr || Vo)(),
          string: new wr(),
        });
    }),
    (xr.prototype.delete = function (e) {
      return (e = _r(this, e).delete(e)), (this.size -= e ? 1 : 0), e;
    }),
    (xr.prototype.get = function (e) {
      return _r(this, e).get(e);
    }),
    (xr.prototype.has = function (e) {
      return _r(this, e).has(e);
    }),
    (xr.prototype.set = function (e, a) {
      var t = _r(this, e),
        n = t.size;
      return t.set(e, a), (this.size += t.size == n ? 0 : 1), this;
    });
  function Sr(e) {
    e = this.__data__ = new Vo(e);
    this.size = e.size;
  }
  (Sr.prototype.clear = function () {
    (this.__data__ = new Vo()), (this.size = 0);
  }),
    (Sr.prototype.delete = function (e) {
      var a = this.__data__,
        e = a.delete(e);
      return (this.size = a.size), e;
    }),
    (Sr.prototype.get = function (e) {
      return this.__data__.get(e);
    }),
    (Sr.prototype.has = function (e) {
      return this.__data__.has(e);
    }),
    (Sr.prototype.set = function (e, a) {
      var t = this.__data__;
      if (t instanceof Vo) {
        var n = t.__data__;
        if (!hr || n.length < 199)
          return n.push([e, a]), (this.size = ++t.size), this;
        t = this.__data__ = new xr(n);
      }
      return t.set(e, a), (this.size = t.size), this;
    });
  var jr = (function () {
    try {
      var e = gr(Object, "defineProperty");
      return e({}, "", {}), e;
    } catch (e) {}
  })();
  function Er(e, a, t) {
    "__proto__" == a && jr
      ? jr(e, a, { configurable: !0, enumerable: !0, value: t, writable: !0 })
      : (e[a] = t);
  }
  function zr(e, a, t) {
    ((void 0 === t || Go(e[a], t)) && (void 0 !== t || a in e)) || Er(e, a, t);
  }
  var Or,
    Nr = function (e, a, t) {
      for (var n = -1, o = Object(e), r = t(e), s = r.length; s--; ) {
        var i = r[Or ? s : ++n];
        if (!1 === a(o[i], i, o)) break;
      }
      return e;
    };
  function Ar(e) {
    return (Ar =
      "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
        ? function (e) {
            return typeof e;
          }
        : function (e) {
            return e &&
              "function" == typeof Symbol &&
              e.constructor === Symbol &&
              e !== Symbol.prototype
              ? "symbol"
              : typeof e;
          })(e);
  }
  var ke =
      "object" == ("undefined" == typeof exports ? "undefined" : Ar(exports)) &&
      exports &&
      !exports.nodeType &&
      exports,
    we =
      ke &&
      "object" == ("undefined" == typeof module ? "undefined" : Ar(module)) &&
      module &&
      !module.nodeType &&
      module,
    we = we && we.exports === ke ? t.Buffer : void 0,
    Cr = we ? we.allocUnsafe : void 0;
  var Ir = t.Uint8Array;
  function Pr(e, a) {
    var t,
      t = a
        ? ((a = e.buffer),
          (t = new a.constructor(a.byteLength)),
          new Ir(t).set(new Ir(a)),
          t)
        : e.buffer;
    return new e.constructor(t, e.byteOffset, e.length);
  }
  var Lr = Object.create,
    Tr = function (e) {
      if (!or(e)) return {};
      if (Lr) return Lr(e);
      Mr.prototype = e;
      e = new Mr();
      return (Mr.prototype = void 0), e;
    };
  function Mr() {}
  var Rr,
    Dr,
    qr =
      ((Rr = Object.getPrototypeOf),
      (Dr = Object),
      function (e) {
        return Rr(Dr(e));
      }),
    Hr = Object.prototype;
  function Br(e) {
    var a = e && e.constructor;
    return e === (("function" == typeof a && a.prototype) || Hr);
  }
  function Fr(e) {
    return (Fr =
      "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
        ? function (e) {
            return typeof e;
          }
        : function (e) {
            return e &&
              "function" == typeof Symbol &&
              e.constructor === Symbol &&
              e !== Symbol.prototype
              ? "symbol"
              : typeof e;
          })(e);
  }
  function Gr(e) {
    return null != e && "object" == Fr(e);
  }
  function Wr(e) {
    return Gr(e) && "[object Arguments]" == tr(e);
  }
  var ke = Object.prototype,
    Yr = ke.hasOwnProperty,
    Vr = ke.propertyIsEnumerable,
    Ur = Wr(
      (function () {
        return arguments;
      })()
    )
      ? Wr
      : function (e) {
          return Gr(e) && Yr.call(e, "callee") && !Vr.call(e, "callee");
        },
    Zr = Array.isArray,
    Kr = 9007199254740991;
  function Xr(e) {
    return "number" == typeof e && -1 < e && e % 1 == 0 && e <= Kr;
  }
  function Jr(e) {
    return null != e && Xr(e.length) && !ur(e);
  }
  function Qr(e) {
    return (Qr =
      "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
        ? function (e) {
            return typeof e;
          }
        : function (e) {
            return e &&
              "function" == typeof Symbol &&
              e.constructor === Symbol &&
              e !== Symbol.prototype
              ? "symbol"
              : typeof e;
          })(e);
  }
  var we =
      "object" == ("undefined" == typeof exports ? "undefined" : Qr(exports)) &&
      exports &&
      !exports.nodeType &&
      exports,
    ke =
      we &&
      "object" == ("undefined" == typeof module ? "undefined" : Qr(module)) &&
      module &&
      !module.nodeType &&
      module,
    we = ke && ke.exports === we ? t.Buffer : void 0,
    $r =
      (we ? we.isBuffer : void 0) ||
      function () {
        return !1;
      },
    es = "[object Object]",
    t = Function.prototype,
    we = Object.prototype,
    as = t.toString,
    ts = we.hasOwnProperty,
    ns = as.call(Object);
  var os = {};
  function rs(e) {
    return (rs =
      "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
        ? function (e) {
            return typeof e;
          }
        : function (e) {
            return e &&
              "function" == typeof Symbol &&
              e.constructor === Symbol &&
              e !== Symbol.prototype
              ? "symbol"
              : typeof e;
          })(e);
  }
  (os["[object Float32Array]"] =
    os["[object Float64Array]"] =
    os["[object Int8Array]"] =
    os["[object Int16Array]"] =
    os["[object Int32Array]"] =
    os["[object Uint8Array]"] =
    os["[object Uint8ClampedArray]"] =
    os["[object Uint16Array]"] =
    os["[object Uint32Array]"] =
      !0),
    (os["[object Arguments]"] =
      os["[object Array]"] =
      os["[object ArrayBuffer]"] =
      os["[object Boolean]"] =
      os["[object DataView]"] =
      os["[object Date]"] =
      os["[object Error]"] =
      os["[object Function]"] =
      os["[object Map]"] =
      os["[object Number]"] =
      os["[object Object]"] =
      os["[object RegExp]"] =
      os["[object Set]"] =
      os["[object String]"] =
      os["[object WeakMap]"] =
        !1);
  var ss,
    we =
      "object" == ("undefined" == typeof exports ? "undefined" : rs(exports)) &&
      exports &&
      !exports.nodeType &&
      exports,
    is =
      we &&
      "object" == ("undefined" == typeof module ? "undefined" : rs(module)) &&
      module &&
      !module.nodeType &&
      module,
    ls = is && is.exports === we && Ke.process,
    Ke = (function () {
      try {
        var e = is && is.require && is.require("util").types;
        return e ? e : ls && ls.binding && ls.binding("util");
      } catch (e) {}
    })(),
    Ke = Ke && Ke.isTypedArray,
    us = Ke
      ? ((ss = Ke),
        function (e) {
          return ss(e);
        })
      : function (e) {
          return Gr(e) && Xr(e.length) && !!os[tr(e)];
        };
  function cs(e, a) {
    if (("constructor" !== a || "function" != typeof e[a]) && "__proto__" != a)
      return e[a];
  }
  var ds = Object.prototype.hasOwnProperty;
  function ms(e, a, t, n) {
    var o = !t;
    t = t || {};
    for (var r, s, i = -1, l = a.length; ++i < l; ) {
      var u = a[i],
        c = n ? n(t[u], e[u], u, t, e) : void 0;
      void 0 === c && (c = e[u]),
        o
          ? Er(t, u, c)
          : ((r = c),
            (s = void 0),
            (s = (c = t)[(u = u)]),
            (ds.call(c, u) && Go(s, r) && (void 0 !== r || u in c)) ||
              Er(c, u, r));
    }
    return t;
  }
  function ps(e) {
    return (ps =
      "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
        ? function (e) {
            return typeof e;
          }
        : function (e) {
            return e &&
              "function" == typeof Symbol &&
              e.constructor === Symbol &&
              e !== Symbol.prototype
              ? "symbol"
              : typeof e;
          })(e);
  }
  var ys = 9007199254740991,
    gs = /^(?:0|[1-9]\d*)$/;
  function hs(e, a) {
    var t = ps(e);
    return (
      (a = null == a ? ys : a) &&
      ("number" == t || ("symbol" != t && gs.test(e))) &&
      -1 < e &&
      e % 1 == 0 &&
      e < a
    );
  }
  var fs = Object.prototype.hasOwnProperty;
  function bs(e, a) {
    var t,
      n = Zr(e),
      o = !n && Ur(e),
      r = !n && !o && $r(e),
      s = !n && !o && !r && us(e),
      i = n || o || r || s,
      l = i
        ? (function (e, a) {
            for (var t = -1, n = Array(e); ++t < e; ) n[t] = a(t);
            return n;
          })(e.length, String)
        : [],
      u = l.length;
    for (t in e)
      (!a && !fs.call(e, t)) ||
        (i &&
          ("length" == t ||
            (r && ("offset" == t || "parent" == t)) ||
            (s && ("buffer" == t || "byteLength" == t || "byteOffset" == t)) ||
            hs(t, u))) ||
        l.push(t);
    return l;
  }
  var ks = Object.prototype.hasOwnProperty;
  function ws(e) {
    if (!or(e))
      return (function (e) {
        var a = [];
        if (null != e) for (var t in Object(e)) a.push(t);
        return a;
      })(e);
    var a,
      t = Br(e),
      n = [];
    for (a in e) ("constructor" != a || (!t && ks.call(e, a))) && n.push(a);
    return n;
  }
  function vs(e) {
    return Jr(e) ? bs(e, !0) : ws(e);
  }
  function _s(e, a, t, n, o, r, s) {
    var i,
      l,
      u,
      c = cs(e, t),
      d = cs(a, t),
      m = s.get(d);
    m
      ? zr(e, t, m)
      : ((i = void 0 === (l = r ? r(c, d, t + "", e, a, s) : void 0)) &&
          ((m = !(u = Zr(d)) && $r(d)),
          (a = !u && !m && us(d)),
          (l = d),
          u || m || a
            ? (l = Zr(c)
                ? c
                : Gr((u = c)) && Jr(u)
                ? (function (e, a) {
                    var t = -1,
                      n = e.length;
                    for (a = a || Array(n); ++t < n; ) a[t] = e[t];
                    return a;
                  })(c)
                : m
                ? ((u = d),
                  (m = !(i = !1))
                    ? u.slice()
                    : ((m = u.length),
                      (m = Cr ? Cr(m) : new u.constructor(m)),
                      u.copy(m),
                      m))
                : a
                ? Pr(d, !(i = !1))
                : [])
            : (function (e) {
                if (Gr(e) && tr(e) == es) {
                  e = qr(e);
                  if (null === e) return 1;
                  e = ts.call(e, "constructor") && e.constructor;
                  return (
                    "function" == typeof e && e instanceof e && as.call(e) == ns
                  );
                }
              })(d) || Ur(d)
            ? Ur((l = c))
              ? (l = ms(c, vs(c)))
              : (or(c) && !ur(c)) ||
                (l =
                  "function" != typeof (c = d).constructor || Br(c)
                    ? {}
                    : Tr(qr(c)))
            : (i = !1)),
        i && (s.set(d, l), o(l, d, n, r, s), s.delete(d)),
        zr(e, t, l));
  }
  function xs(n, o, r, s, i) {
    n !== o &&
      Nr(
        o,
        function (e, a) {
          var t;
          (i = i || new Sr()),
            or(e)
              ? _s(n, o, a, r, xs, s, i)
              : ((t = s ? s(cs(n, a), e, a + "", n, o, i) : void 0),
                zr(n, a, (t = void 0 === t ? e : t)));
        },
        vs
      );
  }
  function Ss(e) {
    return e;
  }
  var js = Math.max;
  function Es(r, s, i) {
    return (
      (s = js(void 0 === s ? r.length - 1 : s, 0)),
      function () {
        for (
          var e = arguments, a = -1, t = js(e.length - s, 0), n = Array(t);
          ++a < t;

        )
          n[a] = e[s + a];
        for (var a = -1, o = Array(s + 1); ++a < s; ) o[a] = e[a];
        return (
          (o[s] = i(n)),
          (function (e, a, t) {
            switch (t.length) {
              case 0:
                return e.call(a);
              case 1:
                return e.call(a, t[0]);
              case 2:
                return e.call(a, t[0], t[1]);
              case 3:
                return e.call(a, t[0], t[1], t[2]);
            }
            return e.apply(a, t);
          })(r, this, o)
        );
      }
    );
  }
  var zs = Date.now;
  var Os,
    Ns,
    As,
    Cs =
      ((Os = jr
        ? function (e, a) {
            return jr(e, "toString", {
              configurable: !0,
              enumerable: !1,
              value:
                ((t = a),
                function () {
                  return t;
                }),
              writable: !0,
            });
            var t;
          }
        : Ss),
      (As = Ns = 0),
      function () {
        var e = zs(),
          a = 16 - (e - As);
        if (((As = e), 0 < a)) {
          if (800 <= ++Ns) return arguments[0];
        } else Ns = 0;
        return Os.apply(void 0, arguments);
      });
  function Is(e) {
    return (Is =
      "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
        ? function (e) {
            return typeof e;
          }
        : function (e) {
            return e &&
              "function" == typeof Symbol &&
              e.constructor === Symbol &&
              e !== Symbol.prototype
              ? "symbol"
              : typeof e;
          })(e);
  }
  var Ps,
    Ls,
    Ts,
    Ms =
      ((Ps = function (e, a, t) {
        xs(e, a, t);
      }),
      Cs(
        Es(
          (Ls = function (e, a) {
            var t = -1,
              n = a.length,
              o = 1 < n ? a[n - 1] : void 0,
              r = 2 < n ? a[2] : void 0,
              o = 3 < Ps.length && "function" == typeof o ? (n--, o) : void 0;
            for (
              r &&
                (function (e, a, t) {
                  if (or(t)) {
                    var n = Is(a);
                    return (
                      ("number" == n
                        ? Jr(t) && hs(a, t.length)
                        : "string" == n && (a in t)) && Go(t[a], e)
                    );
                  }
                })(a[0], a[1], r) &&
                ((o = n < 3 ? void 0 : o), (n = 1)),
                e = Object(e);
              ++t < n;

            ) {
              var s = a[t];
              s && Ps(e, s, t, o);
            }
            return e;
          }),
          Ts,
          Ss
        ),
        Ls + ""
      )),
    Rs = "nyt-wordle-state",
    Ds = {
      boardState: null,
      evaluations: null,
      rowIndex: null,
      solution: null,
      gameStatus: null,
      lastPlayedTs: null,
      lastCompletedTs: null,
      restoringFromLocalStorage: null,
      hardMode: !1,
    };
  function qs(e) {
    var a,
      a =
        ((a = window.localStorage.getItem(Rs) || JSON.stringify(Ds)),
        JSON.parse(a)),
      e = Ms(a, e);
    window.localStorage.setItem(Rs, JSON.stringify(e));
  }
  function Hs(e) {
    var a =
      1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : null;
    try {
      var t = window.localStorage.getItem(e);
      return t ? JSON.parse(t) : a;
    } catch (e) {
      return console.error(e), w.captureSentryError(e), a;
    }
  }
  var Bs = "nyt-wordle-darkmode",
    Fs = "nyt-wordle-cbmode",
    Gs = function (e) {
      return "".concat("nyt-wordle-moogle", "/").concat(e || "ANON");
    },
    Ws = function (e, a) {
      try {
        return window.localStorage.setItem(e, JSON.stringify(a)), !0;
      } catch (e) {
        return console.error(e), w.captureSentryError(e), !1;
      }
    },
    Ys = function (e) {
      try {
        var a = Gs(e);
        return Hs(a);
      } catch (e) {
        return null;
      }
    },
    Vs = function () {
      var e = Hs(Rs, Ds),
        a = (function () {
          try {
            var e = window.localStorage.getItem(Bo) || JSON.stringify(Fo);
            return JSON.parse(e);
          } catch (e) {
            return (
              console.error("error retrieving stats", e),
              JSON.parse(JSON.stringify(Fo))
            );
          }
        })(),
        t =
          !!window.matchMedia &&
          window.matchMedia("(prefers-color-scheme: dark)").matches,
        n = Hs(Bs, t),
        o = Hs(Fs, !1),
        t = null != e && e.solution ? z.indexOf(e.solution) : null;
      return {
        game: {
          id: t,
          dayOffset: t,
          boardState: (null == e ? void 0 : e.boardState) || Array(Y).fill(""),
          currentRowIndex: (null == e ? void 0 : e.rowIndex) || 0,
          status: (null == e ? void 0 : e.gameStatus) || "IN_PROGRESS",
          timestamps: {
            lastPlayed: (null == e ? void 0 : e.lastPlayedTs) || null,
            lastCompleted: (null == e ? void 0 : e.lastCompletedTs) || null,
          },
        },
        settings: {
          hardMode: (null == e ? void 0 : e.hardMode) || !1,
          darkMode: n || !1,
          colorblindMode: o || !1,
        },
        stats: a,
      };
    },
    Us = function (e) {
      return {
        boardState: e.persist.game.boardState,
        evaluations: W(e),
        rowIndex: e.persist.game.currentRowIndex,
        solution: P(e.persist.game.dayOffset),
        gameStatus: e.persist.game.status,
        lastPlayedTs: e.persist.game.timestamps.lastPlayed,
        lastCompletedTs: e.persist.game.timestamps.lastCompleted,
      };
    },
    Zs = "wordle/moogle/SET_INITIAL_STATE",
    Ks = function (e) {
      return { type: Zs, payload: e };
    };
  function Xs() {
    return g.createElement(
      "svg",
      {
        width: "24",
        height: "17",
        viewBox: "0 0 24 17",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
      },
      g.createElement("rect", {
        x: "0.172974",
        width: "20",
        height: "3",
        rx: "1.5",
        fill: "var(--color-tone-1)",
      }),
      g.createElement("rect", {
        x: "0.172974",
        y: "7",
        width: "20",
        height: "3",
        rx: "1.5",
        fill: "var(--color-tone-1)",
      }),
      g.createElement("rect", {
        x: "0.172974",
        y: "14",
        width: "20",
        height: "3",
        rx: "1.5",
        fill: "var(--color-tone-1)",
      })
    );
  }
  var Js = {
    appHeader: "AppHeader-module_appHeader__1Ehyv",
    icon: "AppHeader-module_icon__x7b46",
    title: "AppHeader-module_title__6sqs-",
    superscript: "AppHeader-module_superscript__Q2Wde",
    menuLeft: "AppHeader-module_menuLeft__iErDO",
    menuRight: "AppHeader-module_menuRight__jUeYn",
    navButton: "AppHeader-module_navButton__fB5nf",
  };
  function Qs() {
    var e = Ne(),
      a = pa("auth"),
      t = Ae(Rt),
      n = Ae(ya);
    return g.createElement(
      "header",
      { className: y(Js.appHeader, "wordle-app-header") },
      g.createElement(
        "div",
        { className: Js.menuLeft },
        g.createElement(
          "button",
          {
            type: "button",
            id: Js.navButton,
            className: Js.icon,
            "aria-label":
              "Navigation menu. Click for links to other NYT Games and our Privacy Policy.",
            tabIndex: -1,
            onClick: function () {
              return e(he());
            },
          },
          g.createElement(Xs, null)
        ),
        g.createElement(
          "button",
          {
            type: "button",
            id: "help-button",
            className: Js.icon,
            "aria-label": "Help",
            tabIndex: -1,
            onClick: function () {
              return e((a ? de : me)("help"));
            },
          },
          g.createElement(E, { icon: "help" })
        )
      ),
      g.createElement(
        "div",
        { className: Js.title },
        "Wordle",
        n && g.createElement("span", { className: Js.superscript }, "BETA")
      ),
      g.createElement(
        "div",
        { className: Js.menuRight },
        g.createElement(
          "button",
          {
            type: "button",
            id: "statistics-button",
            className: Js.icon,
            "aria-label": "Statistics",
            tabIndex: -1,
            onClick: function () {
              return e(de("stats", !0));
            },
            disabled: !!t,
          },
          g.createElement(E, { icon: "statistics", disabled: !!t })
        ),
        g.createElement(
          "button",
          {
            type: "button",
            id: "settings-button",
            className: Js.icon,
            "aria-label": "Settings",
            tabIndex: -1,
            onClick: function () {
              return e((a ? de : me)("settings"));
            },
            disabled: !!t,
          },
          g.createElement(E, { icon: "settings", disabled: !!t })
        )
      )
    );
  }
  Ce(
    '.AppHeader-module_appHeader__1Ehyv {\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  justify-content: space-between;\n  flex-wrap: nowrap;\n  padding: 0 16px;\n  height: var(--header-height);\n  color: var(--color-tone-1);\n  border-bottom: 1px solid var(--color-tone-4);\n}\n.AppHeader-module_appHeader__1Ehyv button.AppHeader-module_icon__x7b46 {\n  background: none;\n  border: none;\n  cursor: pointer;\n  padding: 0 4px;\n}\n\n.AppHeader-module_appHeader__1Ehyv .AppHeader-module_title__6sqs- {\n  font-family: "nyt-karnakcondensed";\n  font-weight: 700;\n  font-size: 37px;\n  line-height: 100%;\n  letter-spacing: 0.01em;\n  text-align: center;\n  left: 0;\n  right: 0;\n  pointer-events: none;\n  position: relative;\n}\n.AppHeader-module_appHeader__1Ehyv .AppHeader-module_title__6sqs- .AppHeader-module_superscript__Q2Wde {\n  position: absolute;\n  top: -0.8em;\n  font-size: 40%;\n}\n\n.AppHeader-module_menuLeft__iErDO {\n  display: flex;\n  margin: 0;\n  padding: 0;\n  align-items: center;\n  width: 70px;\n  justify-content: flex-start;\n}\n\n.AppHeader-module_menuRight__jUeYn {\n  display: flex;\n  width: 70px;\n  justify-content: flex-end;\n}\n\n#AppHeader-module_navButton__fB5nf {\n  padding-top: 2px;\n}\n\n@media (min-width: 415px) {\n  .AppHeader-module_appHeader__1Ehyv {\n    padding: 0px 16px;\n  }\n}\n@media (max-width: 360px) {\n  .AppHeader-module_appHeader__1Ehyv .AppHeader-module_title__6sqs- {\n    font-size: 22px;\n    letter-spacing: 0.1rem;\n  }\n}'
  );
  var $s = "App-module_game__NSc-J";
  function ei(e, a) {
    return (
      (function (e) {
        if (Array.isArray(e)) return e;
      })(e) ||
      (function (e, a) {
        var t =
          null == e
            ? null
            : ("undefined" != typeof Symbol && e[Symbol.iterator]) ||
              e["@@iterator"];
        if (null != t) {
          var n,
            o,
            r = [],
            s = !0,
            i = !1;
          try {
            for (
              t = t.call(e);
              !(s = (n = t.next()).done) &&
              (r.push(n.value), !a || r.length !== a);
              s = !0
            );
          } catch (e) {
            (i = !0), (o = e);
          } finally {
            try {
              s || null == t.return || t.return();
            } finally {
              if (i) throw o;
            }
          }
          return r;
        }
      })(e, a) ||
      (function (e, a) {
        if (e) {
          if ("string" == typeof e) return ai(e, a);
          var t = Object.prototype.toString.call(e).slice(8, -1);
          return "Map" ===
            (t = "Object" === t && e.constructor ? e.constructor.name : t) ||
            "Set" === t
            ? Array.from(e)
            : "Arguments" === t ||
              /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)
            ? ai(e, a)
            : void 0;
        }
      })(e, a) ||
      (function () {
        throw new TypeError(
          "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
        );
      })()
    );
  }
  function ai(e, a) {
    (null == a || a > e.length) && (a = e.length);
    for (var t = 0, n = new Array(a); t < a; t++) n[t] = e[t];
    return n;
  }
  function ti() {
    var a,
      t,
      e = Ae(B),
      n = Ae(Rt),
      o = !!Ae(fa),
      r = Ae(ya),
      s = ei(g.useState(!1), 2),
      i = s[0],
      l = s[1],
      u = Ne(),
      s = Ze(),
      c = s.hasAbraLoaded,
      s = s.getVariant,
      d = "1_EnableMoogle" === s("GAMES_wordleMoogle_0422"),
      m = "1_EnableAuth" === s("GAMES_wordleAuth_0427");
    return (
      g.useEffect(function () {
        var e = k();
        return function () {
          return clearInterval(e);
        };
      }, []),
      g.useEffect(
        function () {
          var e, a, t, n, o;
          !i &&
            c &&
            ((e =
              "true" ===
              (a = new URLSearchParams(window.location.search)).get("moogle")),
            (t = "true" === a.get("success")),
            (a = (e && d) || m),
            (t = (!m && e && d) || t) && u({ type: bn }),
            Promise.all([
              u(
                ((n = (t = { fetchFromMoogle: a, optIn: t }).fetchFromMoogle),
                (t = t.optIn),
                (o = void 0 !== t && t),
                function (a) {
                  return n
                    ? (a({ type: kn }),
                      w.xhr
                        .get("".concat(fn, "/svc/games/state/wordle/latest"), {
                          withCookie: !1,
                        })
                        .then(function (e) {
                          if ("forbidden" === e.error)
                            throw new Error("no user");
                          if (!e.timestamp && !e.user_id)
                            throw new Error("malformed Moogle response data");
                          a({ type: wn, payload: { data: e, optIn: o } });
                        })
                        .catch(function (e) {
                          a({ type: vn, payload: { message: e.message } }),
                            "no user" !== e.message && a(An(e));
                        }))
                    : Promise.resolve();
                })
              ),
            ])
              .then(function () {
                u(function (e, a) {
                  var t = a(),
                    a = ba(t),
                    t = fa(t);
                  a && ((a = Ys() || Vs()), (t = Gs(t)), Ws(t, a));
                });
              })
              .then(function () {
                u(function (e, a) {
                  var t = a(),
                    n = ga(t),
                    o = fa(t),
                    a = ha(t) || 0,
                    t = Ys(o),
                    o = (null == t ? void 0 : t.timestamp) || 0;
                  return e(Ks(a && o <= a ? n : t || Vs()));
                }),
                  u(ho()),
                  l(!0);
              }));
        },
        [i, c]
      ),
      h(
        function () {
          return u(de("help"));
        },
        i && !e && !n ? 100 : null
      ),
      g.useEffect(function () {
        S();
      }, []),
      g.useEffect(
        function () {
          m &&
            o &&
            !r &&
            u(
              be({
                text: "You are now logged in to your New York Times Account.",
                duration: 2e3,
                isSystem: !0,
              })
            );
        },
        [m, o, r]
      ),
      (a = Ae(Je)),
      (t = Ae(Qe)),
      p.useEffect(
        function () {
          var e = document.querySelector("body");
          e &&
            (a && !e.classList.contains("dark")
              ? e.classList.add("dark")
              : a || e.classList.remove("dark"));
        },
        [a]
      ),
      p.useEffect(
        function () {
          var e = document.querySelector("body");
          e &&
            (t && !e.classList.contains("colorblind")
              ? e.classList.add("colorblind")
              : t || e.classList.remove("colorblind"));
        },
        [t]
      ),
      i
        ? g.createElement(
            g.Fragment,
            null,
            g.createElement(Qs, null),
            g.createElement(
              "div",
              { className: $s, id: "wordle-app-game" },
              g.createElement(Ho, null),
              g.createElement(Po, null),
              g.createElement(dn, null),
              g.createElement(Ut, null),
              g.createElement(to, null),
              g.createElement(lo, null),
              g.createElement(go, null)
            )
          )
        : null
    );
  }
  function ni(a, e) {
    var t,
      n = Object.keys(a);
    return (
      Object.getOwnPropertySymbols &&
        ((t = Object.getOwnPropertySymbols(a)),
        e &&
          (t = t.filter(function (e) {
            return Object.getOwnPropertyDescriptor(a, e).enumerable;
          })),
        n.push.apply(n, t)),
      n
    );
  }
  function oi(n) {
    for (var e = 1; e < arguments.length; e++) {
      var o = null != arguments[e] ? arguments[e] : {};
      e % 2
        ? ni(Object(o), !0).forEach(function (e) {
            var a, t;
            (a = n),
              (e = o[(t = e)]),
              t in a
                ? Object.defineProperty(a, t, {
                    value: e,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                  })
                : (a[t] = e);
          })
        : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(n, Object.getOwnPropertyDescriptors(o))
        : ni(Object(o)).forEach(function (e) {
            Object.defineProperty(n, e, Object.getOwnPropertyDescriptor(o, e));
          });
    }
    return n;
  }
  Ce(
    ".App-module_game__NSc-J {\n  width: 100%;\n  max-width: var(--game-max-width);\n  margin: 0 auto;\n  height: calc(100% - var(--header-height));\n  display: flex;\n  flex-direction: column;\n}"
  );
  var ri = {
    id: null,
    boardState: [],
    dayOffset: null,
    currentRowIndex: 0,
    timestamps: { lastPlayed: null, lastCompleted: null },
    status: "IN_PROGRESS",
  };
  function si(a, e) {
    var t,
      n = Object.keys(a);
    return (
      Object.getOwnPropertySymbols &&
        ((t = Object.getOwnPropertySymbols(a)),
        e &&
          (t = t.filter(function (e) {
            return Object.getOwnPropertyDescriptor(a, e).enumerable;
          })),
        n.push.apply(n, t)),
      n
    );
  }
  function ii(a) {
    for (var e = 1; e < arguments.length; e++) {
      var t = null != arguments[e] ? arguments[e] : {};
      e % 2
        ? si(Object(t), !0).forEach(function (e) {
            li(a, e, t[e]);
          })
        : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(a, Object.getOwnPropertyDescriptors(t))
        : si(Object(t)).forEach(function (e) {
            Object.defineProperty(a, e, Object.getOwnPropertyDescriptor(t, e));
          });
    }
    return a;
  }
  function li(e, a, t) {
    return (
      a in e
        ? Object.defineProperty(e, a, {
            value: t,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[a] = t),
      e
    );
  }
  var ui,
    ci,
    di = {
      hardMode: !1,
      darkMode:
        (null === (ui = document.body) ||
        void 0 === ui ||
        null === (ci = ui.className) ||
        void 0 === ci
          ? void 0
          : ci.includes("dark")) || !1,
      colorblindMode: !1,
    };
  function mi(e, a) {
    return (
      (function (e) {
        if (Array.isArray(e)) return e;
      })(e) ||
      (function (e, a) {
        var t =
          null == e
            ? null
            : ("undefined" != typeof Symbol && e[Symbol.iterator]) ||
              e["@@iterator"];
        if (null != t) {
          var n,
            o,
            r = [],
            s = !0,
            i = !1;
          try {
            for (
              t = t.call(e);
              !(s = (n = t.next()).done) &&
              (r.push(n.value), !a || r.length !== a);
              s = !0
            );
          } catch (e) {
            (i = !0), (o = e);
          } finally {
            try {
              s || null == t.return || t.return();
            } finally {
              if (i) throw o;
            }
          }
          return r;
        }
      })(e, a) ||
      (function (e, a) {
        if (e) {
          if ("string" == typeof e) return pi(e, a);
          var t = Object.prototype.toString.call(e).slice(8, -1);
          return "Map" ===
            (t = "Object" === t && e.constructor ? e.constructor.name : t) ||
            "Set" === t
            ? Array.from(e)
            : "Arguments" === t ||
              /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)
            ? pi(e, a)
            : void 0;
        }
      })(e, a) ||
      (function () {
        throw new TypeError(
          "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
        );
      })()
    );
  }
  function pi(e, a) {
    (null == a || a > e.length) && (a = e.length);
    for (var t = 0, n = new Array(a); t < a; t++) n[t] = e[t];
    return n;
  }
  function yi(a, e) {
    var t,
      n = Object.keys(a);
    return (
      Object.getOwnPropertySymbols &&
        ((t = Object.getOwnPropertySymbols(a)),
        e &&
          (t = t.filter(function (e) {
            return Object.getOwnPropertyDescriptor(a, e).enumerable;
          })),
        n.push.apply(n, t)),
      n
    );
  }
  function gi(n) {
    for (var e = 1; e < arguments.length; e++) {
      var o = null != arguments[e] ? arguments[e] : {};
      e % 2
        ? yi(Object(o), !0).forEach(function (e) {
            var a, t;
            (a = n),
              (e = o[(t = e)]),
              t in a
                ? Object.defineProperty(a, t, {
                    value: e,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                  })
                : (a[t] = e);
          })
        : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(n, Object.getOwnPropertyDescriptors(o))
        : yi(Object(o)).forEach(function (e) {
            Object.defineProperty(n, e, Object.getOwnPropertyDescriptor(o, e));
          });
    }
    return n;
  }
  var hi = Fo;
  function fi(e) {
    return (
      (function (e) {
        if (Array.isArray(e)) return bi(e);
      })(e) ||
      (function (e) {
        if (
          ("undefined" != typeof Symbol && null != e[Symbol.iterator]) ||
          null != e["@@iterator"]
        )
          return Array.from(e);
      })(e) ||
      (function (e, a) {
        if (e) {
          if ("string" == typeof e) return bi(e, a);
          var t = Object.prototype.toString.call(e).slice(8, -1);
          return "Map" ===
            (t = "Object" === t && e.constructor ? e.constructor.name : t) ||
            "Set" === t
            ? Array.from(e)
            : "Arguments" === t ||
              /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)
            ? bi(e, a)
            : void 0;
        }
      })(e) ||
      (function () {
        throw new TypeError(
          "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
        );
      })()
    );
  }
  function bi(e, a) {
    (null == a || a > e.length) && (a = e.length);
    for (var t = 0, n = new Array(a); t < a; t++) n[t] = e[t];
    return n;
  }
  function ki(a, e) {
    var t,
      n = Object.keys(a);
    return (
      Object.getOwnPropertySymbols &&
        ((t = Object.getOwnPropertySymbols(a)),
        e &&
          (t = t.filter(function (e) {
            return Object.getOwnPropertyDescriptor(a, e).enumerable;
          })),
        n.push.apply(n, t)),
      n
    );
  }
  function wi(n) {
    for (var e = 1; e < arguments.length; e++) {
      var o = null != arguments[e] ? arguments[e] : {};
      e % 2
        ? ki(Object(o), !0).forEach(function (e) {
            var a, t;
            (a = n),
              (e = o[(t = e)]),
              t in a
                ? Object.defineProperty(a, t, {
                    value: e,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                  })
                : (a[t] = e);
          })
        : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(n, Object.getOwnPropertyDescriptors(o))
        : ki(Object(o)).forEach(function (e) {
            Object.defineProperty(n, e, Object.getOwnPropertyDescriptor(o, e));
          });
    }
    return n;
  }
  var vi = {
    modal: null,
    page: null,
    error: null,
    isNavModalOpen: !1,
    toasts: [],
    isPageClosing: !1,
  };
  function _i(a, e) {
    var t,
      n = Object.keys(a);
    return (
      Object.getOwnPropertySymbols &&
        ((t = Object.getOwnPropertySymbols(a)),
        e &&
          (t = t.filter(function (e) {
            return Object.getOwnPropertyDescriptor(a, e).enumerable;
          })),
        n.push.apply(n, t)),
      n
    );
  }
  function xi(n) {
    for (var e = 1; e < arguments.length; e++) {
      var o = null != arguments[e] ? arguments[e] : {};
      e % 2
        ? _i(Object(o), !0).forEach(function (e) {
            var a, t;
            (a = n),
              (e = o[(t = e)]),
              t in a
                ? Object.defineProperty(a, t, {
                    value: e,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                  })
                : (a[t] = e);
          })
        : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(n, Object.getOwnPropertyDescriptors(o))
        : _i(Object(o)).forEach(function (e) {
            Object.defineProperty(n, e, Object.getOwnPropertyDescriptor(o, e));
          });
    }
    return n;
  }
  var Si = {
    isAnimatingRow: !1,
    lastRowInvalid: !1,
    lastRowWin: !1,
    isRestoringSession: !1,
  };
  function ji(a, e) {
    var t,
      n = Object.keys(a);
    return (
      Object.getOwnPropertySymbols &&
        ((t = Object.getOwnPropertySymbols(a)),
        e &&
          (t = t.filter(function (e) {
            return Object.getOwnPropertyDescriptor(a, e).enumerable;
          })),
        n.push.apply(n, t)),
      n
    );
  }
  function Ei(n) {
    for (var e = 1; e < arguments.length; e++) {
      var o = null != arguments[e] ? arguments[e] : {};
      e % 2
        ? ji(Object(o), !0).forEach(function (e) {
            var a, t;
            (a = n),
              (e = o[(t = e)]),
              t in a
                ? Object.defineProperty(a, t, {
                    value: e,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                  })
                : (a[t] = e);
          })
        : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(n, Object.getOwnPropertyDescriptors(o))
        : ji(Object(o)).forEach(function (e) {
            Object.defineProperty(n, e, Object.getOwnPropertyDescriptor(o, e));
          });
    }
    return n;
  }
  var zi = {
      moogleGet: {
        isLoading: !1,
        error: !1,
        errorMessage: null,
        data: null,
        optedIn: !1,
      },
      mooglePost: { isLoading: !1, error: !1, data: null },
      solution: { isLoading: !1, error: !1, data: null },
      profileInfo: { isLoading: !1, error: !1, data: null },
    },
    Oi = n.combineReducers({
      persist: n.combineReducers({
        game: function () {
          var t =
              0 < arguments.length && void 0 !== arguments[0]
                ? arguments[0]
                : ri,
            n = 1 < arguments.length ? arguments[1] : void 0;
          switch (n.type) {
            case Zs:
              return n.payload.game;
            case fo:
              var e = n.payload,
                a = e.dayOffset,
                e = e.numRows;
              return oi(
                oi({}, t),
                {},
                {
                  dayOffset: a,
                  boardState: Array(e).fill(""),
                  currentRowIndex: 0,
                  status: "IN_PROGRESS",
                }
              );
            case ko:
              return oi(
                oi({}, t),
                {},
                {
                  boardState: t.boardState.map(function (e, a) {
                    return a === t.currentRowIndex
                      ? "".concat(e).concat(n.payload.letter)
                      : e;
                  }),
                }
              );
            case wo:
              return oi(
                oi({}, t),
                {},
                {
                  boardState: t.boardState.map(function (e, a) {
                    return a === t.currentRowIndex
                      ? e.slice(0, e.length - 1)
                      : e;
                  }),
                }
              );
            case vo:
              (a = n.payload), (e = a.now), (a = a.status);
              return oi(
                oi({}, t),
                {},
                {
                  currentRowIndex: t.currentRowIndex + 1,
                  timestamps: oi(
                    oi({}, t.timestamps),
                    {},
                    {
                      lastCompleted:
                        "IN_PROGRESS" === a ? t.timestamps.lastCompleted : e,
                      lastPlayed: e,
                    }
                  ),
                  status: a,
                }
              );
            default:
              return t;
          }
        },
        settings: function () {
          var e =
              0 < arguments.length && void 0 !== arguments[0]
                ? arguments[0]
                : di,
            a = 1 < arguments.length ? arguments[1] : void 0;
          switch (a.type) {
            case Zs:
              return a.payload.settings;
            case vt:
              var t = a.payload,
                n = t.name,
                t = t.value;
              return ii(ii({}, e), {}, li({}, n, t));
            default:
              return e;
          }
        },
        stats: function () {
          var e =
              0 < arguments.length && void 0 !== arguments[0]
                ? arguments[0]
                : hi,
            a = 1 < arguments.length ? arguments[1] : void 0;
          switch (a.type) {
            case Zs:
              return a.payload.stats || e;
            case vo:
              var t = a.payload,
                n = t.status,
                o = t.isStreak,
                r = t.numGuesses;
              return "IN_PROGRESS" === n
                ? e
                : ((t = e),
                  (o = (n = { isWin: "WIN" === n, isStreak: o, numGuesses: r })
                    .isWin),
                  (r = n.isStreak),
                  (n = n.numGuesses),
                  (t = gi(gi({}, t), {}, { guesses: gi({}, t.guesses) })),
                  o
                    ? ((t.guesses[n] += 1),
                      r ? (t.currentStreak += 1) : (t.currentStreak = 1))
                    : ((t.currentStreak = 0), (t.guesses.fail += 1)),
                  (t.maxStreak = Math.max(t.currentStreak, t.maxStreak)),
                  (t.gamesPlayed += 1),
                  (t.gamesWon += o ? 1 : 0),
                  (t.winPercentage = Math.round(
                    (t.gamesWon / t.gamesPlayed) * 100
                  )),
                  (t.averageGuesses = Math.round(
                    Object.entries(t.guesses).reduce(function (e, a) {
                      var t = mi(a, 2),
                        a = t[0],
                        t = t[1],
                        t = e + parseInt(a, 10) * t;
                      return "fail" !== a ? t : e;
                    }, 0) / t.gamesWon
                  )),
                  t);
            default:
              return e;
          }
        },
      }),
      overlays: function () {
        var e =
            0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : vi,
          a = 1 < arguments.length ? arguments[1] : void 0;
        switch (a.type) {
          case ee:
            return wi(wi({}, e), {}, { modal: a.payload.modal });
          case ae:
            return wi(wi({}, e), {}, { modal: null });
          case te:
            return wi(wi({}, e), {}, { page: a.payload.page });
          case ne:
            return wi(wi({}, e), {}, { page: null, isPageClosing: !1 });
          case re:
            return wi(wi({}, e), {}, { error: a.payload.error });
          case "wordle/overlays/CLOSE_ERROR":
            return wi(wi({}, e), {}, { error: null });
          case se:
            return wi(wi({}, e), {}, { isNavModalOpen: !0 });
          case ie:
            return wi(wi({}, e), {}, { isNavModalOpen: !1 });
          case ue:
            var t = a.payload,
              n = {
                text: t.text,
                duration: t.duration || 1e3,
                isSystem: t.isSystem,
                timestamp: t.timestamp,
              },
              t = e.toasts;
            return wi(wi({}, e), {}, { toasts: [n].concat(fi(t)) });
          case ce:
            var t = a.payload,
              o = t.text,
              r = t.timestamp,
              t = e.toasts.filter(function (e) {
                return e.text !== o || e.timestamp !== r;
              });
            return wi(wi({}, e), {}, { toasts: t });
          case oe:
            return wi(wi({}, e), {}, { isPageClosing: !0 });
          default:
            return e;
        }
      },
      transient: function () {
        var e =
            0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : Si,
          a = 1 < arguments.length ? arguments[1] : void 0;
        switch (a.type) {
          case wo:
            return xi(xi({}, e), {}, { lastRowInvalid: !1 });
          case ue:
            var t = a.payload,
              n = t.invalidate,
              t = t.win;
            return n
              ? xi(xi({}, e), {}, { lastRowInvalid: !0 })
              : t
              ? xi(xi({}, e), {}, { lastRowWin: !0 })
              : e;
          case ze:
            return xi(xi({}, e), {}, { lastRowInvalid: !1 });
          case bo:
            return 0 === a.payload.currentRowIndex
              ? e
              : xi(
                  xi({}, e),
                  {},
                  { isAnimatingRow: !0, isRestoringSession: !0 }
                );
          case vo:
            return xi(xi({}, e), {}, { isAnimatingRow: !0 });
          case Ee:
            return xi(
              xi({}, e),
              {},
              { isAnimatingRow: !1, isRestoringSession: !1 }
            );
          default:
            return e;
        }
      },
      api: function () {
        var e =
            0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : zi,
          a = 1 < arguments.length ? arguments[1] : void 0;
        switch (a.type) {
          case bn:
            return Ei(
              Ei({}, e),
              {},
              { moogleGet: Ei(Ei({}, e.moogleGet), {}, { optedIn: !0 }) }
            );
          case kn:
            return Ei(
              Ei({}, e),
              {},
              { moogleGet: Ei(Ei({}, e.moogleGet), {}, { isLoading: !0 }) }
            );
          case "wordle/api/LOAD_SOLUTION":
            return Ei(
              Ei({}, e),
              {},
              { solution: Ei(Ei({}, e.solution), {}, { isLoading: !0 }) }
            );
          case wn:
            return Ei(
              Ei({}, e),
              {},
              {
                moogleGet: Ei(
                  Ei({}, e.moogleGet),
                  {},
                  {
                    data: a.payload.data,
                    isLoading: !1,
                    error: !1,
                    optedIn: !!a.payload.optIn || !!a.payload.data.version,
                  }
                ),
              }
            );
          case "wordle/api/SOLUTION_SUCCESS":
            return Ei(
              Ei({}, e),
              {},
              {
                solution: Ei(
                  Ei({}, e.solution),
                  {},
                  { data: a.payload.data, isLoading: !1, error: !1 }
                ),
              }
            );
          case vn:
            return Ei(
              Ei({}, e),
              {},
              {
                moogleGet: Ei(
                  Ei({}, e.moogleGet),
                  {},
                  { isLoading: !1, error: !0, errorMessage: a.payload.message }
                ),
              }
            );
          case "wordle/api/SOLUTION_ERROR":
            return Ei(
              Ei({}, e),
              {},
              {
                solution: Ei(
                  Ei({}, e.solution),
                  {},
                  { isLoading: !1, error: !0 }
                ),
              }
            );
          case En:
            return Ei(
              Ei({}, e),
              {},
              { profileInfo: { isLoading: !0, data: null, error: !1 } }
            );
          case zn:
            return Ei(
              Ei({}, e),
              {},
              {
                profileInfo: { isLoading: !1, data: a.payload.data, error: !1 },
              }
            );
          case On:
            return Ei(
              Ei({}, e),
              {},
              { profileInfo: { isLoading: !1, data: null, error: !0 } }
            );
          case _n:
            return Ei(
              Ei({}, e),
              {},
              { mooglePost: { isLoading: !0, error: !1, data: null } }
            );
          case xn:
            return Ei(
              Ei({}, e),
              {},
              { mooglePost: { isLoading: !1, error: !1, data: null } }
            );
          case Sn:
            return Ei(
              Ei({}, e),
              {},
              { mooglePost: { isLoading: !1, error: !0, data: null } }
            );
          case jn:
            return Ei(
              Ei({}, e),
              {},
              { mooglePost: { isLoading: !1, error: !1, data: null } }
            );
          default:
            return e;
        }
      },
    });
  function Ni(a, e) {
    var t,
      n = Object.keys(a);
    return (
      Object.getOwnPropertySymbols &&
        ((t = Object.getOwnPropertySymbols(a)),
        e &&
          (t = t.filter(function (e) {
            return Object.getOwnPropertyDescriptor(a, e).enumerable;
          })),
        n.push.apply(n, t)),
      n
    );
  }
  function Ai(n) {
    for (var e = 1; e < arguments.length; e++) {
      var o = null != arguments[e] ? arguments[e] : {};
      e % 2
        ? Ni(Object(o), !0).forEach(function (e) {
            var a, t;
            (a = n),
              (e = o[(t = e)]),
              t in a
                ? Object.defineProperty(a, t, {
                    value: e,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                  })
                : (a[t] = e);
          })
        : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(n, Object.getOwnPropertyDescriptors(o))
        : Ni(Object(o)).forEach(function (e) {
            Object.defineProperty(n, e, Object.getOwnPropertyDescriptor(o, e));
          });
    }
    return n;
  }
  function Ci(c) {
    return function (u) {
      return function (e) {
        var a,
          t = u(e),
          n = c.getState(),
          o = fa(n),
          r = ya(n),
          s = ba(n),
          i = Math.floor(Date.now() / 1e3),
          l = Ai(Ai({}, n.persist), {}, { timestamp: i }),
          o = Gs(o);
        return (
          [vt, vo, fo, Nn].includes(e.type) &&
            r &&
            (e.type === Nn
              ? c.dispatch(
                  Cn({ timestamp: i, enableAuth: e.payload.enableAuth })
                )
              : c.dispatch(Cn({ timestamp: i }))),
          s && e.type === bo && c.dispatch(Cn({ timestamp: i })),
          e.type === vt &&
            (Ws(o, l),
            (s = (a = n.persist.settings).hardMode),
            (i = a.darkMode),
            (a = a.colorblindMode),
            "hardMode" === e.payload.name && qs({ hardMode: s }),
            "darkMode" === e.payload.name && Ws(Bs, i),
            "colorblindMode" === e.payload.name && Ws(Fs, a)),
          e.type === vo &&
            (Ws(o, l),
            qs(Us(n)),
            (a = n.persist.stats),
            window.localStorage.setItem(Bo, JSON.stringify(a))),
          e.type === fo && (Ws(o, l), qs(Us(n))),
          t
        );
      };
    };
  }
  function Ii(k) {
    return function (b) {
      return function (e) {
        var a = b(e),
          t = k.getState(),
          n = Qe(t),
          o = Je(t),
          r = "".concat(H(t)),
          s = Xe(t);
        switch (e.type) {
          case ee:
            var i = e.payload,
              l = i.modal,
              i = i.isClicked;
            "stats" === l &&
              i &&
              w.trackModuleInteraction("click", r, "wordle", l);
            break;
          case te:
            var u = e.payload.page;
            u && w.trackModuleInteraction("click", r, "wordle", u);
            break;
          case se:
            w.trackClick({
              name: "wordle",
              label: "click-nav",
              useBeacon: !0,
              context: null,
            });
            break;
          case le:
            var c = e.payload,
              l = c.name,
              u = c.label,
              d = c.useBeacon,
              c = c.context;
            w.trackClick({ name: l, label: u, useBeacon: d, context: c });
            break;
          case vt:
            (d = e.payload), (c = d.name), (d = d.value);
            w.trackModuleInteraction(
              "click",
              r,
              "wordle",
              {
                darkMode: "dark-mode",
                colorblindMode: "high-contrast",
                hardMode: "hard-mode",
              }[c],
              d ? "turn-on" : "turn-off"
            );
            break;
          case vo:
            var m = o ? "1" : "0",
              p = s ? "h" : "e",
              y = e.payload,
              g = y.numGuesses,
              h = y.status,
              f = y.guess;
            1 === g &&
              w.trackModuleInteraction(
                "click",
                r,
                "wordle",
                "start-game",
                "CB=".concat(n ? "1" : "0", " DM=").concat(m)
              ),
              w.trackModuleInteraction(
                "click",
                r,
                "wordle",
                "solve-attempt",
                "".concat(g.toString(), "-").concat(f)
              ),
              "IN_PROGRESS" !== h &&
                w.trackModuleInteraction(
                  "click",
                  r,
                  "wordle",
                  "100%-complete",
                  "".concat(p, "-").concat("WIN" === h ? g : 0)
                );
            break;
          case ra:
            (y = e.payload.isGameComplete ? "congrats-modal" : "stats"),
              (m = $e(t)),
              (f = aa(t)),
              (p = ta(t)),
              (h = na(t)),
              (g = ea(t));
            w.trackImpression(
              "wordle",
              y,
              [
                "p: ".concat(m),
                "w: ".concat(g),
                "cs: ".concat(p),
                "ms: ".concat(f),
                "1: ".concat(h[1]),
                "2: ".concat(h[2]),
                "3: ".concat(h[3]),
                "4: ".concat(h[4]),
                "5: ".concat(h[5]),
                "6: ".concat(h[6]),
              ],
              r
            );
            break;
          case sa:
            w.trackModuleInteraction("click", r, "wordle", "share");
        }
        return a;
      };
    };
  }
  var Pi,
    Li,
    Ke = document.body;
  e.render(
    g.createElement(
      a.Provider,
      {
        store:
          ((Pi = void 0 !== window.__REDUX_DEVTOOLS_EXTENSION__),
          (Li = [
            n.applyMiddleware(
              o,
              Ci,
              function (r) {
                return function (o) {
                  return function (e) {
                    var a,
                      t = r.getState(),
                      n = o(e);
                    return (
                      ba(t) &&
                        e.type === xn &&
                        null !== (a = e.payload) &&
                        void 0 !== a &&
                        a.enableAuth &&
                        (r.dispatch(
                          be({
                            duration: 3e3,
                            text: "Your stats have been linked to your account.",
                            isSystem: !0,
                          })
                        ),
                        r.dispatch(ge())),
                      n
                    );
                  };
                };
              },
              Ii
            ),
          ]),
          Pi && Li.push(window.__REDUX_DEVTOOLS_EXTENSION__()),
          n.createStore(Oi, n.compose.apply(void 0, Li))),
      },
      g.createElement(
        c,
        null,
        g.createElement(T, null, g.createElement(ti, null))
      )
    ),
    Ke
  );
});
//# sourceMappingURL=wordle.5faa77ea6af29ff3b988d32f255a2c440dc92079.js.map
