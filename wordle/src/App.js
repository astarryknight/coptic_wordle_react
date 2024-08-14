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

function addLetter({ l, guess, setGuess }) {
  alert(guess)
  if (guess.length <= 4) { setGuess(guess.concat(l)); };
  alert("he")
}

function removeLetter({ guess }) {
  guess = guess.substring(0, guess.length - 2)
}

function submitGuess() {

}

function Row({ rowNum, guess }) {
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

function App() {

  const [guess, setGuess] = React.useState("h")

  return (
    <Stack direction="column" justifyContent="center" alignItems="center" spacing={3} sx={{ height: "100%" }}>
      <Typography>Hi</Typography>
      <Stack direction="column" spacing={.75}>
        <Row rowNum="0" guess={guess} />
        <Stack direction="row" spacing={.75}>
          <Box className="box"></Box>
          <Box className="box"></Box>
          <Box className="box"></Box>
          <Box className="box"></Box>
          <Box className="box"></Box>
        </Stack>
        <Stack direction="row" spacing={.75}>
          <Box className="box"></Box>
          <Box className="box"></Box>
          <Box className="box"></Box>
          <Box className="box"></Box>
          <Box className="box"></Box>
        </Stack>
        <Stack direction="row" spacing={.75}>
          <Box className="box"></Box>
          <Box className="box"></Box>
          <Box className="box"></Box>
          <Box className="box"></Box>
          <Box className="box"></Box>
        </Stack>
        <Stack direction="row" spacing={.75}>
          <Box className="box"></Box>
          <Box className="box"></Box>
          <Box className="box"></Box>
          <Box className="box"></Box>
          <Box className="box"></Box>
        </Stack>
        <Stack direction="row" spacing={.75}>
          <Box className="box"></Box>
          <Box className="box"></Box>
          <Box className="box"></Box>
          <Box className="box"></Box>
          <Box className="box"></Box>
        </Stack>
      </Stack>
      <Stack direction="column" alignItems="center" spacing={.7}>
        <Stack direction="row" spacing={.7} sx={{ height: "3.5em" }}>
          <Button sx={{ backgroundColor: "#d3d6da", color: "black", fontWeight: "bold" }} onClick={() => { console.log({ guess }.guess) }}>Q</Button>
          <Button sx={{ backgroundColor: "#d3d6da", color: "black", fontWeight: "bold" }} onClick={function () { addLetter("w") }}>W</Button>
          <Button sx={{ backgroundColor: "#d3d6da", color: "black", fontWeight: "bold" }} onClick={function () { addLetter("e") }}>E</Button>
          <Button sx={{ backgroundColor: "#d3d6da", color: "black", fontWeight: "bold" }} onClick={function () { addLetter("r") }}>R</Button>
          <Button sx={{ backgroundColor: "#d3d6da", color: "black", fontWeight: "bold" }} onClick={function () { addLetter("t") }}>T</Button>
          <Button sx={{ backgroundColor: "#d3d6da", color: "black", fontWeight: "bold" }} onClick={function () { addLetter("y") }}>Y</Button>
          <Button sx={{ backgroundColor: "#d3d6da", color: "black", fontWeight: "bold" }} onClick={function () { addLetter("u") }}>U</Button>
          <Button sx={{ backgroundColor: "#d3d6da", color: "black", fontWeight: "bold" }} onClick={function () { addLetter("i") }}>I</Button>
          <Button sx={{ backgroundColor: "#d3d6da", color: "black", fontWeight: "bold" }} onClick={function () { addLetter("o") }}>O</Button>
          <Button sx={{ backgroundColor: "#d3d6da", color: "black", fontWeight: "bold" }} onClick={function () { addLetter("p") }}>P</Button>
        </Stack>
        <Stack direction="row" spacing={.7} sx={{ height: "3.5em" }}>
          <Button sx={{ backgroundColor: "#d3d6da", color: "black", fontWeight: "bold" }} onClick={function () { addLetter("a") }}>A</Button>
          <Button sx={{ backgroundColor: "#d3d6da", color: "black", fontWeight: "bold" }} onClick={function () { addLetter("s") }}>S</Button>
          <Button sx={{ backgroundColor: "#d3d6da", color: "black", fontWeight: "bold" }} onClick={function () { addLetter("d") }}>D</Button>
          <Button sx={{ backgroundColor: "#d3d6da", color: "black", fontWeight: "bold" }} onClick={function () { addLetter("f") }}>F</Button>
          <Button sx={{ backgroundColor: "#d3d6da", color: "black", fontWeight: "bold" }} onClick={function () { addLetter("g") }}>G</Button>
          <Button sx={{ backgroundColor: "#d3d6da", color: "black", fontWeight: "bold" }} onClick={function () { addLetter("h") }}>H</Button>
          <Button sx={{ backgroundColor: "#d3d6da", color: "black", fontWeight: "bold" }} onClick={function () { addLetter("j") }}>J</Button>
          <Button sx={{ backgroundColor: "#d3d6da", color: "black", fontWeight: "bold" }} onClick={function () { addLetter("k") }}>K</Button>
          <Button sx={{ backgroundColor: "#d3d6da", color: "black", fontWeight: "bold" }} onClick={function () { addLetter("l") }}>L</Button>
        </Stack>
        <Stack direction="row" spacing={.7} sx={{ height: "3.5em" }}>
          <Button sx={{ backgroundColor: "#d3d6da", color: "black", fontWeight: "bold" }} onClick={function () { submitGuess() }}>Enter</Button>
          <Button sx={{ backgroundColor: "#d3d6da", color: "black", fontWeight: "bold" }} onClick={function () { addLetter("z") }}>Z</Button>
          <Button sx={{ backgroundColor: "#d3d6da", color: "black", fontWeight: "bold" }} onClick={function () { addLetter("x") }}>X</Button>
          <Button sx={{ backgroundColor: "#d3d6da", color: "black", fontWeight: "bold" }} onClick={function () { addLetter("c") }}>C</Button>
          <Button sx={{ backgroundColor: "#d3d6da", color: "black", fontWeight: "bold" }} onClick={function () { addLetter("v") }}>V</Button>
          <Button sx={{ backgroundColor: "#d3d6da", color: "black", fontWeight: "bold" }} onClick={function () { addLetter("b") }}>B</Button>
          <Button sx={{ backgroundColor: "#d3d6da", color: "black", fontWeight: "bold" }} onClick={function () { addLetter("n") }}>N</Button>
          <Button sx={{ backgroundColor: "#d3d6da", color: "black", fontWeight: "bold" }} onClick={function () { addLetter("m") }}>M</Button>
          <Button sx={{ backgroundColor: "#d3d6da", color: "black", fontWeight: "bold" }} onClick={function () { removeLetter({ guess }) }}>Bksp</Button>
        </Stack>
      </Stack>
    </Stack >
  );
}

export default App;
