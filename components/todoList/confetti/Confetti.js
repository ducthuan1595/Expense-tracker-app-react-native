import { View, StyleSheet } from "react-native";

let count = 200;
let points = [];

function Confetti({ open= true }) {
  let confetti = generatePoints();

  function generatePoints() {
    points = [];

    for (let i = 0; i < count; i++) {
      points.push(<p style={`${open ? "animated" : ""}`} key={i} />);
    }
    return points;
  }

  return (
    <View>
      <div style={`confetti ${open ? "animated" : ""}`}>
        {confetti.map(c => c)}
      </div>
    </View>
  );
}

export default Confetti;

const styles = StyleSheet.create({
  confetti: {
    width: 440,
    margin: '500px auto 0',
    textAlign: 'center',
    padding: '10px 0',
    cursor: 'pointer',
    position: 'absolute',
    bottom: '4em',
    left: '50%',
    transform: [{ translateX: '-50%' }],
  },
  confettiP: {
    position: 'absolute',
    display: 'block',
    left: '50%',
    bottom: 0,
    width: 5,
    height: 8,
    opacity: 0.8,
  },
  animatedConfettiP: {
    animationDuration: '2s',
    animationName: 'bang',
    animationIterationCount: 'infinite',
  },
})
