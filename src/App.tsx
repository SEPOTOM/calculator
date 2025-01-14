const App = () => (
  <>
    <input role="alert" type="text" readOnly aria-label="Calculator display" />
    <button type="button">0</button>
    <button type="button">1</button>
    <button type="button">2</button>
    <button type="button">3</button>
    <button type="button">4</button>
    <button type="button">5</button>
    <button type="button">6</button>
    <button type="button">7</button>
    <button type="button">8</button>
    <button type="button">9</button>
    <button type="button" aria-label="plus">
      +
    </button>
    <button type="button" aria-label="minus">
      -
    </button>
    <button type="button" aria-label="divide">
      /
    </button>
    <button type="button" aria-label="multiply">
      *
    </button>
    <button type="button" aria-label="equal">
      =
    </button>
    <button type="button" aria-label="clear">
      C
    </button>
    <button type="button" aria-label="clear all">
      AC
    </button>
  </>
);

export default App;
