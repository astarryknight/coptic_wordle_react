import logo from './logo.svg';
import './App.css';
import React from 'react';
import { useState } from 'react';
import Stack from '@mui/joy/Stack';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Typography from '@mui/joy/Typography';

var target = "happy"
var currentRow = 0;

function Row({ rowNum, guess, guesses }) {
  var n = parseInt(rowNum)
  if (n == currentRow) {
    return (
      <Stack direction="row" spacing={.75}>
        <Box className="box">{guess[0]}</Box>
        <Box className="box">{guess[1]}</Box>
        <Box className="box">{guess[2]}</Box>
        <Box className="box">{guess[3]}</Box>
        <Box className="box">{guess[4]}</Box>
      </Stack>
    )
  } else if (n < currentRow) {
    return (
      <Stack direction="row" spacing={.75}>
        <Box className="box">{guesses[n][0]}</Box>
        <Box className="box">{guesses[n][1]}</Box>
        <Box className="box">{guesses[n][2]}</Box>
        <Box className="box">{guesses[n][3]}</Box>
        <Box className="box">{guesses[n][4]}</Box>
      </Stack>
    )
  } else {
    return (
      <Stack direction="row" spacing={.75}>
        <Box className="box"></Box>
        <Box className="box"></Box>
        <Box className="box"></Box>
        <Box className="box"></Box>
        <Box className="box"></Box>
      </Stack>
    )
  }
}

function Key({ l, guess, setGuess }) {
  return (
    <Button sx={{ backgroundColor: "#d3d6da", color: "black", fontWeight: "bold" }} onClick={() => { ({ guess }.guess.length <= 4 && setGuess({ guess }.guess + l)) }}>{l.toUpperCase()}</Button>
  )
}

function gameOver() {
  //the game ends...
}


function App() {

  const [guess, setGuess] = React.useState("")
  const [guesses, setGuesses] = React.useState([]);

  return (
    <Stack direction="column" justifyContent="center" alignItems="center" spacing={3} sx={{ height: "100%" }}>
      <Typography>Hi</Typography>
      <Stack direction="column" spacing={.75}>
        <Row rowNum="0" guess={guess} guesses={guesses} />
        <Row rowNum="1" guess={guess} guesses={guesses} />
        <Row rowNum="2" guess={guess} guesses={guesses} />
        <Row rowNum="3" guess={guess} guesses={guesses} />
        <Row rowNum="4" guess={guess} guesses={guesses} />
        <Row rowNum="5" guess={guess} guesses={guesses} />
      </Stack>
      <Stack direction="column" alignItems="center" spacing={.7}>
        <Stack direction="row" spacing={.7} sx={{ height: "3.5em" }}>
          <Key l="q" guess={guess} setGuess={setGuess} />
          <Key l="w" guess={guess} setGuess={setGuess} />
          <Key l="e" guess={guess} setGuess={setGuess} />
          <Key l="r" guess={guess} setGuess={setGuess} />
          <Key l="t" guess={guess} setGuess={setGuess} />
          <Key l="y" guess={guess} setGuess={setGuess} />
          <Key l="u" guess={guess} setGuess={setGuess} />
          <Key l="i" guess={guess} setGuess={setGuess} />
          <Key l="o" guess={guess} setGuess={setGuess} />
          <Key l="p" guess={guess} setGuess={setGuess} />
        </Stack>
        <Stack direction="row" spacing={.7} sx={{ height: "3.5em" }}>
          <Key l="a" guess={guess} setGuess={setGuess} />
          <Key l="s" guess={guess} setGuess={setGuess} />
          <Key l="d" guess={guess} setGuess={setGuess} />
          <Key l="f" guess={guess} setGuess={setGuess} />
          <Key l="g" guess={guess} setGuess={setGuess} />
          <Key l="h" guess={guess} setGuess={setGuess} />
          <Key l="j" guess={guess} setGuess={setGuess} />
          <Key l="k" guess={guess} setGuess={setGuess} />
          <Key l="l" guess={guess} setGuess={setGuess} />
        </Stack>
        <Stack direction="row" spacing={.7} sx={{ height: "3.5em" }}>
          <Button sx={{ backgroundColor: "#d3d6da", color: "black", fontWeight: "bold" }} onClick={function () {
            if ({ guess }.guess.length < 5) {
              return;
            }
            else if (guess == target || currentRow == 5) {
              gameOver();
            } else {
              currentRow++;
              var temp = [...guesses, guess];
              setGuesses(temp);
              setGuess("")
            }
          }}>Enter</Button>
          <Key l="z" guess={guess} setGuess={setGuess} />
          <Key l="x" guess={guess} setGuess={setGuess} />
          <Key l="c" guess={guess} setGuess={setGuess} />
          <Key l="v" guess={guess} setGuess={setGuess} />
          <Key l="b" guess={guess} setGuess={setGuess} />
          <Key l="n" guess={guess} setGuess={setGuess} />
          <Key l="m" guess={guess} setGuess={setGuess} />
          <Button sx={{ backgroundColor: "#d3d6da", color: "black", fontWeight: "bold" }} onClick={function () { ({ guess }.guess.length >= 0 && setGuess({ guess }.guess.substring(0, { guess }.guess.length - 1))) }}>Bksp</Button>
        </Stack>
      </Stack>
    </Stack >
  );
}

export default App;
