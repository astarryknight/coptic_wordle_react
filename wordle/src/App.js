import logo from './logo.svg';
import './App.css';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

//components
import Stack from '@mui/joy/Stack';
import Sheet from '@mui/joy/Stack';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import Alert from '@mui/material/Alert';

//icons
import Moon from '@mui/icons-material/DarkMode';
import Sun from '@mui/icons-material/LightMode';
import ReturnIcon from '@mui/icons-material/KeyboardReturn';
import SettingsIcon from '@mui/icons-material/Settings';
import HowToPlayIcon from '@mui/icons-material/HelpOutline';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import LeaderBoardIcon from '@mui/icons-material/Leaderboard';

//Theme toggle support
import { CssVarsProvider, useColorScheme } from '@mui/joy/styles';

import { extendTheme } from '@mui/joy/styles';


//main js
var target = "ⲢⲞⲘⲠⲒ"
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
  return (
    <Button className="key" id={l} sx={{ backgroundColor: "neutral.50", color: "black", fontWeight: "bold" }} onClick={() => { addLetter(l, guess, setGuess) }}>{l.toUpperCase()}</Button>
  )
}
//({ guess }.guess.length <= 4 && setGuess({ guess }.guess + l))

function addLetter(l, guess, setGuess) {
  guess.length <= 4 && setGuess(guess + l)
}

function ThemeToggle() {
  const { mode, setMode } = useColorScheme();
  mode === 'light' ? metaTag.setAttribute("content", "#121213") : metaTag.setAttribute("content", "#fff"); //maybe this'll work?
  return (
    <IconButton
      onClick={() => {
        mode === 'light' ? metaTag.setAttribute("content", "#121213") : metaTag.setAttribute("content", "#fff");
        setMode(mode === 'light' ? 'dark' : 'light');
      }}
      sx={{ backgroundColor: 'background.body' }}
    >
      {mode === 'light' ? <Sun /> : <Moon />}
    </IconButton>
  );
}

const theme = extendTheme({
  colorSchemes: {
    dark: {
      palette: {
        background: {
          body: '#121213',
          backdrop: '#121213'
        },
        neutral: {
          50: '#818384',
          100: '#3a3a3c',
          150: '#3a3a3c'
        },
        primary: {
          50: "#fff"
        }
      },
    },
    light: {
      palette: {
        background: {
          backdrop: '#fff',
        },
        neutral: {
          50: '#d3d6da',
          100: '#d3d6da',
          150: '#787c7e'
        },
        primary: {
          50: "#000"
        }
      },
    },
  },
});

//color palette:
//green: #6aaa64
//yellow: #c9b458

const metaTag = document.querySelector('meta[name="theme-color"]');

function App() {

  const [guess, setGuess] = React.useState("")
  const [guesses, setGuesses] = React.useState([]);

  // the alert is displayed by default
  const [alert, setAlert] = useState(true);

  //modal states
  const [leaderboard, setLeaderboard] = React.useState(false);
  const [howToPlay, setHowToPlay] = React.useState(false);
  const [settings, setSettings] = React.useState(false);

  return (
    <CssVarsProvider theme={theme}>
      <meta name="theme-color" content="var(--joy-palette-background-body)"></meta>
      <Sheet id="canvas" sx={{
        display: "flex", height: "100dvh", justifyContent: "space-between",
        alignItems: "center", backgroundColor: 'background.body'
      }}>
        <Modal className="modal" open={leaderboard} onClose={() => setLeaderboard(false)} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'background.body' }}>
          <Sheet sx={{ width: "100%", height: "100%", display: "flex", alignItems: "center" }}>
            <ModalClose />
            <Sheet sx={{ display: "flex", alignItems: "center" }}>
              <Typography level="h2" sx={{ color: "primary.50", marginTop: "2em" }}>Wordle #123</Typography>
            </Sheet>
            <Sheet sx={{ display: "flex", alignItems: "flex-start", width: "85%", maxWidth: "30rem" }}>
              <Typography level="h4" sx={{ color: "primary.50", marginTop: "1em" }}>Statistics</Typography>
              <Sheet sx={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", width: "100%" }}>
                <Sheet sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <Typography level="h2" className="lbText">55</Typography>
                  <Typography level="body-sm" className="lbText">played</Typography>
                </Sheet>
                <Sheet sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <Typography level="h2" className="lbText">55</Typography>
                  <Typography level="body-sm" className="lbText">win %</Typography>
                </Sheet>
                <Sheet sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <Typography level="h2" className="lbText">23</Typography>
                  <Typography level="body-sm" className="lbText">current</Typography>
                </Sheet>
                <Sheet sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <Typography level="h2" className="lbText">60</Typography>
                  <Typography level="body-sm" className="lbText">max streak</Typography>
                </Sheet>
              </Sheet>
            </Sheet>
          </Sheet>
        </Modal>
        <Modal className="modal" open={howToPlay} onClose={() => setHowToPlay(false)} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Sheet className="modal" sx={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <ModalClose />
            <Sheet sx={{ display: "flex", alignItems: "flex-start", width: "85%", maxWidth: "30rem" }}>
              <Typography level="h3" sx={{ color: "primary.50", marginTop: "2rem", fontWeight: "bold" }}>How To Play</Typography>
              <Typography level="body-lg" sx={{ color: "primary.50" }}>Guess the Coptic word in 6 tries.</Typography>
              <List sx={{ listStyleType: 'disc' }}>
                <ListItem sx={{ display: 'list-item' }}>Each guess must contain exactly 5 Coptic letters.</ListItem>
                <ListItem sx={{ display: 'list-item' }}>Guesses can be <span style={{ textDecorationLine: "spelling-error" }}>invalid</span> words.</ListItem>
                <ListItem sx={{ display: 'list-item' }}>The box colors will tell you information about your guesses.</ListItem>
              </List>
              <Sheet sx={{ display: "flex", alignItems: "flex-start", width: "100%" }}>
                <Typography level="body-md" sx={{ color: "primary.50", marginTop: "1em", fontWeight: "bold" }}>Examples</Typography>
                <Sheet sx={{ display: "flex", flexDirection: "column" }}>
                  <Sheet sx={{ display: "flex", flexDirection: "row", marginTop: ".5rem" }}>
                    <Box className="box htp" sx={{ backgroundColor: "#6aaa64" }}>a</Box>
                    <Box className="box htp" >a</Box>
                    <Box className="box htp" >a</Box>
                    <Box className="box htp" >a</Box>
                    <Box className="box htp" >a</Box>
                  </Sheet>
                  <Typography><span style={{ fontWeight: "bold" }}>A</span> is in the word and in the right spot.</Typography>
                </Sheet>
                <Sheet sx={{ display: "flex", flexDirection: "column", marginTop: ".5rem" }}>
                  <Sheet sx={{ display: "flex", flexDirection: "row", marginTop: ".5rem" }}>
                    <Box className="box htp" >a</Box>
                    <Box className="box htp" sx={{ backgroundColor: "#c9b458" }}>a</Box>
                    <Box className="box htp" >a</Box>
                    <Box className="box htp" >a</Box>
                    <Box className="box htp" >a</Box>
                  </Sheet>
                  <Typography><span style={{ fontWeight: "bold" }}>A</span> is in the word but in the wrong spot.</Typography>
                </Sheet>
                <Sheet sx={{ display: "flex", flexDirection: "column", marginTop: ".5rem" }}>
                  <Sheet sx={{ display: "flex", flexDirection: "row", marginTop: ".5rem" }}>
                    <Box className="box htp" >a</Box>
                    <Box className="box htp" >a</Box>
                    <Box className="box htp" sx={{ backgroundColor: "var(--joy-palette-neutral-150)" }}>a</Box>
                    <Box className="box htp" >a</Box>
                    <Box className="box htp" >a</Box>
                  </Sheet>
                  <Typography><span style={{ fontWeight: "bold" }}>A</span> is not in the word.</Typography>
                </Sheet>
              </Sheet>
              <Typography level="body-md" sx={{ color: "primary.50", marginTop: "2rem" }}>A new word is released every day.</Typography>
            </Sheet>
            <Sheet sx={{ width: "100%", borderTop: "1px solid", borderColor: "var(--joy-palette-neutral-100)", display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
              <Typography level="body-sm" sx={{ marginLeft: ".25rem" }}>© 2024 The Coptic Language Initiative</Typography>
              <Typography level="body-sm" sx={{ marginRight: ".25rem" }}>#1</Typography>
            </Sheet>
          </Sheet>
        </Modal>
        <Stack direction="row" id="toolbar">
          <Sheet id="toolbar-buttons">
            {/*<IconButton><LightbulbIcon /></IconButton>*/}
            <IconButton onClick={() => setLeaderboard(true)}><LeaderBoardIcon /></IconButton>
            <IconButton onClick={() => setHowToPlay(true)}><HowToPlayIcon /></IconButton>
            {/* <IconButton><SettingsIcon /></IconButton> */}
            <ThemeToggle />
          </Sheet>
        </Stack>
        <Stack direction="column" spacing={.75}>
          <Row rowNum="0" guess={guess} guesses={guesses} />
          <Row rowNum="1" guess={guess} guesses={guesses} />
          <Row rowNum="2" guess={guess} guesses={guesses} />
          <Row rowNum="3" guess={guess} guesses={guesses} />
          <Row rowNum="4" guess={guess} guesses={guesses} />
          <Row rowNum="5" guess={guess} guesses={guesses} />
        </Stack>
        <Sheet sx={{ display: "flex", flexDirection: "column", alignItems: "center", }} id="keyboard">
          <Stack direction="row" spacing={.7} sx={{ marginBottom: "0.5rem" }}>
            <Key l="Ⲑ" guess={guess} setGuess={setGuess} />
            <Key l="Ⲱ" guess={guess} setGuess={setGuess} />
            <Key l="Ⲉ" guess={guess} setGuess={setGuess} />
            <Key l="Ⲣ" guess={guess} setGuess={setGuess} />
            <Key l="Ⲧ" guess={guess} setGuess={setGuess} />
            <Key l="Ⲯ" guess={guess} setGuess={setGuess} />
            <Key l="Ⲩ" guess={guess} setGuess={setGuess} />
            <Key l="Ⲓ" guess={guess} setGuess={setGuess} />
            <Key l="Ⲟ" guess={guess} setGuess={setGuess} />
          </Stack>
          <Stack direction="row" spacing={.7} sx={{ marginBottom: "0.5rem" }}>
            <Key l="Ⲡ" guess={guess} setGuess={setGuess} />
            <Key l="Ϥ" guess={guess} setGuess={setGuess} />
            <Key l="Ⲁ" guess={guess} setGuess={setGuess} />
            <Key l="Ⲥ" guess={guess} setGuess={setGuess} />
            <Key l="Ⲇ" guess={guess} setGuess={setGuess} />
            <Key l="Ⲫ" guess={guess} setGuess={setGuess} />
            <Key l="Ⲅ" guess={guess} setGuess={setGuess} />
            <Key l="Ⲏ" guess={guess} setGuess={setGuess} />
          </Stack>
          <Stack direction="row" spacing={.7} sx={{ marginBottom: "0.5rem" }}>
            <Key l="Ϫ" guess={guess} setGuess={setGuess} />
            <Key l="Ⲕ" guess={guess} setGuess={setGuess} />
            <Key l="Ⲗ" guess={guess} setGuess={setGuess} />
            <Key l="Ϩ" guess={guess} setGuess={setGuess} />
            <Key l="Ϭ" guess={guess} setGuess={setGuess} />
            <Key l="Ⲍ" guess={guess} setGuess={setGuess} />
            <Key l="Ⲝ" guess={guess} setGuess={setGuess} />
            <Key l="Ⲭ" guess={guess} setGuess={setGuess} />
            <Key l="Ϣ" guess={guess} setGuess={setGuess} />
          </Stack>
          <Stack direction="row" spacing={.7}>
            <Button id="enter" className="key" sx={{ backgroundColor: "neutral.50", color: "black", fontWeight: "bold" }} onClick={function () {
              // var guess = guess.toLowerCase();
              if (guess.length < 5) {
                for (i = 0; i < 5; i++) {
                  document.getElementById(i + String(currentRow)).style.borderColor = "#fa3939";
                  console.log(document.getElementById(i + String(currentRow)))
                }
              } else {
                var tempTarget = [...target];
                var t = []
                //iterating through each letter of the guess

                for (var i = 0; i < 5; i++) {
                  if (guess[i] == target[i]) {
                    document.getElementById(i + String(currentRow)).style.backgroundColor = "#6aaa64";
                    document.getElementById(i + String(currentRow)).style.borderColor = "#6aaa64";
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
                      if (target[j] == guess[i] && document.getElementById(i + String(currentRow)).style.backgroundColor != "rgb(106, 170, 100)") {
                        console.log(document.getElementById(i + String(currentRow)).style.backgroundColor);
                        document.getElementById(i + String(currentRow)).style.backgroundColor = "#c9b458";
                        document.getElementById(i + String(currentRow)).style.borderColor = "#c9b458";
                        document.getElementById(guess[i]).style.backgroundColor != "rgb(106, 170, 100)" && (document.getElementById(guess[i]).style.backgroundColor = "#c9b458");
                        //tempTarget.splice(j, 1); check this out
                        //break;
                        y = true;
                      }
                    }
                  }
                  if (document.getElementById(i + String(currentRow)).style.backgroundColor == "") {
                    document.getElementById(i + String(currentRow)).style.backgroundColor = "var(--joy-palette-neutral-150)";
                    document.getElementById(i + String(currentRow)).style.borderColor = "var(--joy-palette-neutral-150)";
                    document.getElementById(guess[i]).style.backgroundColor = "var(--joy-palette-neutral-150)";
                    console.log(document.getElementById(guess[i]).style.backgroundColor);
                  }
                  document.getElementById(i + String(currentRow)).style.color = "white";
                }

                currentRow++;
                var temp = [...guesses, guess];
                setGuesses(temp);
                setGuess("")
              }
              if (guess == target || currentRow == 5) {
                setLeaderboard(true);
              }
            }}>Enter</Button>
            <Key l="Ⲃ" guess={guess} setGuess={setGuess} />
            <Key l="Ⲛ" guess={guess} setGuess={setGuess} />
            <Key l="Ⲙ" guess={guess} setGuess={setGuess} />
            <Key l="Ϯ" guess={guess} setGuess={setGuess} />
            <Key l="Ϧ" guess={guess} setGuess={setGuess} />
            <Button id="backspace" className="key" sx={{ backgroundColor: "neutral.50", color: "black", fontWeight: "bold" }} onClick={function () { ({ guess }.guess.length >= 0 && setGuess({ guess }.guess.substring(0, { guess }.guess.length - 1))) }}>Bksp</Button>
          </Stack>
        </Sheet>
      </Sheet >
    </CssVarsProvider >
  );
}

export default App;
