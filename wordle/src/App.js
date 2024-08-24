import logo from './logo.svg';
import './App.css';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import Stack from '@mui/joy/Stack';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Typography from '@mui/joy/Typography';
import Input from '@mui/joy/Input';
import ReturnIcon from '@mui/icons-material/KeyboardReturn';

var target = "happy"
var currentRow = 0;

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//keyboard stuff! - not needed right now
// const keyboardEventListener = (e) => {
//   if (e.key === "Enter") { alert("entered!") }
//   if (e.key === 'Backspace') { /*guess.length >= 0 && setGuess(guess.substring(0, guess.length - 1))*/console.log('') }
//   if (alphabet.includes(e.key)) {
//     //addLetter(e.key, guess, setGuess)
//   } else {
//     return;
//   }
// }

// document.body.addEventListener('keydown', keyboardEventListener);

function Row({ rowNum, guess, guesses }) {
  var n = parseInt(rowNum)
  if (n == currentRow) {
    return (
      <Stack direction="row" spacing={.75}>
        <Box id={"0" + n} className="box">{guess[0]}</Box>
        <Box id={"1" + n} className="box">{guess[1]}</Box>
        <Box id={"2" + n} className="box">{guess[2]}</Box>
        <Box id={"3" + n} className="box">{guess[3]}</Box>
        <Box id={"4" + n} className="box">{guess[4]}</Box>
      </Stack >
    )
  } else if (n < currentRow) {
    return (
      <Stack direction="row" spacing={.75}>
        <Box id={"0" + n} className="box">{guesses[n][0]}</Box>
        <Box id={"1" + n} className="box">{guesses[n][1]}</Box>
        <Box id={"2" + n} className="box">{guesses[n][2]}</Box>
        <Box id={"3" + n} className="box">{guesses[n][3]}</Box>
        <Box id={"4" + n} className="box">{guesses[n][4]}</Box>
      </Stack>
    )
  } else {
    return (
      <Stack direction="row" spacing={.75}>
        <Box id={"0" + n} className="box"></Box>
        <Box id={"1" + n} className="box"></Box>
        <Box id={"2" + n} className="box"></Box>
        <Box id={"3" + n} className="box"></Box>
        <Box id={"4" + n} className="box"></Box>
      </Stack>
    )
  }
}

function Key({ l, guess, setGuess }) {

  // //keyboard stuff!
  // const keyboardEventListener = (e) => {
  //   //if (e.key === "Enter") { alert("entered!") }
  //   if (e.key === 'Backspace') { guess.length >= 0 && setGuess(guess.substring(0, guess.length - 1)) }
  //   if (alphabet.includes(e.key)) {
  //     addLetter(e.key, guess, setGuess)
  //   } else {
  //     return;
  //   }
  // }

  // useEffect(() => {
  //   document.body.addEventListener('keydown', keyboardEventListener);
  //   return () => {
  //     document.body.removeEventListener('keydown', keyboardEventListener);
  //   }
  // }, [])
  //https://stackoverflow.com/questions/66395683/keydown-event-listener-causes-lagging-hanging-dom-thrashing-in-reactjs

  return (
    <Button className="key" id={l} sx={{ backgroundColor: "#d3d6da", color: "black", fontWeight: "bold" }} onClick={() => { addLetter(l, guess, setGuess) }}>{l.toUpperCase()}</Button>
  )
}
//({ guess }.guess.length <= 4 && setGuess({ guess }.guess + l))

function addLetter(l, guess, setGuess) {
  console.warn(guess)
  setGuess(guess + l)
  guess.length <= 4 && setGuess(guess + l)
}

function resetColors() {
  var l = document.getElementsByClassName("box");
  for (var i = 0; i < l.length; i++) {
    l[i].style.backgroundColor = "white"
  }

  var l = document.getElementsByClassName("key");
  for (var i = 0; i < l.length; i++) {
    l[i].style.backgroundColor = "#d3d6da"
  }

}

const alphabet = [...'abcdefghijklmnopqrstuvwxyz'];

function App() {

  const [guess, setGuess] = React.useState("")
  const [guesses, setGuesses] = React.useState([]);

  return (
    <Stack direction="column" justifyContent="center" alignItems="center" spacing={3} sx={{ height: "100%" }}>
      <Typography level="h1" >Wordle! INFINITE</Typography>
      <Stack direction="column" spacing={.75}>
        <Row rowNum="0" guess={guess} guesses={guesses} />
        <Row rowNum="1" guess={guess} guesses={guesses} />
        <Row rowNum="2" guess={guess} guesses={guesses} />
        <Row rowNum="3" guess={guess} guesses={guesses} />
        <Row rowNum="4" guess={guess} guesses={guesses} />
        <Row rowNum="5" guess={guess} guesses={guesses} />
      </Stack>
      <Stack direction="column" alignItems="center" spacing={.7} id="keyboard">
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
          <Button id="enter" className="key" sx={{ backgroundColor: "#d3d6da", color: "black", fontWeight: "bold" }} onClick={function () {
            if (guess.length < 5) {
              alert("too short!")
              return;
            }
            // else if (!words.includes(guess)) {
            //   alert("not a real word!")
            //   return;
            // } check if its a real word or not
            else if (guess == target) {
              alert("You win!");

              currentRow = 0;
              setGuesses([]);
              setGuess("");

              resetColors();
            }
            else if (currentRow == 5) {
              alert("Nice try! The word was " + target + ".");

              currentRow = 0;
              setGuesses([]);
              setGuess("");
              resetColors();
            } else {
              var tempTarget = [...target];
              var t = []
              //iterating through each letter of the guess

              for (var i = 0; i < 5; i++) {
                if (guess[i] == target[i]) {
                  document.getElementById(i + String(currentRow)).style.backgroundColor = "#6aaa64";
                  document.getElementById(guess[i]).style.backgroundColor = "#6aaa64";
                  //tempTarget.splice(i, 1)
                  t.push(i)
                }
              }

              //probably use filter here instead...

              for (var i = 0; i < t.length; i++) {
                tempTarget.splice(t[i] - i, 1);
              }
              console.log(tempTarget)

              for (var i = 0; i < 5; i++) {
                if (tempTarget.includes(guess[i])) {
                  var y = false;
                  for (var j = 0; j < 5; j++) {
                    if (target[j] == guess[i]) {
                      document.getElementById(i + String(currentRow)).style.backgroundColor = "#c9b458";
                      document.getElementById(guess[i]).style.backgroundColor = "#c9b458";
                      //break;
                      y = true;
                    }
                  }
                }
                if (document.getElementById(i + String(currentRow)).style.backgroundColor == "") {
                  document.getElementById(i + String(currentRow)).style.backgroundColor = "#787c7e";
                  document.getElementById(guess[i]).style.backgroundColor = "#787c7e";
                }
                document.getElementById(i + String(currentRow)).style.color = "white";
              }

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
          <Button id="backspace" className="key" sx={{ backgroundColor: "#d3d6da", color: "black", fontWeight: "bold" }} onClick={function () { ({ guess }.guess.length >= 0 && setGuess({ guess }.guess.substring(0, { guess }.guess.length - 1))) }}>Bksp</Button>
        </Stack>
      </Stack>
    </Stack >
  );
}

export default App;
