import logo from './logo.svg';
import './App.css';
import React from 'react';

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

//icons
import Moon from '@mui/icons-material/DarkMode';
import Sun from '@mui/icons-material/LightMode';
import HowToPlayIcon from '@mui/icons-material/HelpOutline';
import LeaderBoardIcon from '@mui/icons-material/Leaderboard';
import Share from '@mui/icons-material/Share';

//Theme toggle support
import { CssVarsProvider, useColorScheme } from '@mui/joy/styles';
import { extendTheme } from '@mui/joy/styles';

//Data import
import wordData from "./words.json"

//    MAIN JS    //

//Variables
var target = "ϢⲞⲨⲢⲎ" //default ig?
var currentRow = 0;
var board = []//🟩🟨⬛
var win = false;
var lower = "ⲁⲃⲅⲇⲉⲍⲏⲑⲓⲕⲗⲙⲛⲝⲟⲡⲣⲥⲧⲩⲫⲭⲯⲱϣϥϧϩϫϭϯ";
var upper = "ⲀⲂⲄⲆⲈⲌⲎⲐⲒⲔⲖⲘⲚⲜⲞⲠⲢⲤⲦⲨⲪⲬⲮϢϤϦϨϪϬϮ";

var wordObj = wordData.words[getCurrentDay() - 1]; //error handling if the word is out of bounds?
target = copticToUpper(wordObj.word);

//React text variables
var word = "?????";
var definition = wordObj.definition;
var pronunciation = wordObj.pronunciation;

//React Components
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
    <Button className="key" id={l} sx={{ backgroundColor: "neutral.50", color: "black", fontWeight: "bold" }} onClick={() => { !win && addLetter(l, guess, setGuess) }}>{l.toUpperCase()}</Button>
  )
}

function Enter({ guess, guesses, setGuess, setGuesses, setLeaderboard }) {
  return (
    <Button id="enter" className="key" sx={{ backgroundColor: "neutral.50", color: "black", fontWeight: "bold" }} onClick={function () {
      // var guess = guess.toLowerCase();
      if (guess.length < 5 && !win) {
        for (i = 0; i < 5; i++) {
          document.getElementById(i + String(currentRow)).style.borderColor = "#fa3939";
          console.log(document.getElementById(i + String(currentRow)))
        }
      } else if (!win) {
        var boardRow = ["⬛", "⬛", "⬛", "⬛", "⬛"]
        if (!loading) {
          wordleData.guesses = [...wordleData.guesses, guess]
          saveData();
        }
        var tempTarget = [...target];
        var t = []
        //iterating through each letter of the guess

        for (var i = 0; i < 5; i++) {
          if (guess[i] == target[i]) {
            document.getElementById(i + String(currentRow)).style.backgroundColor = "#6aaa64";
            document.getElementById(i + String(currentRow)).style.borderColor = "#6aaa64";
            document.getElementById(guess[i]).style.backgroundColor = "#6aaa64";
            boardRow[i] = "🟩"
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
              if (target[j] == guess[i] && document.getElementById(i + String(currentRow)).style.backgroundColor != "rgb(106, 170, 100)" && !y) {
                console.log(document.getElementById(i + String(currentRow)).style.backgroundColor);
                document.getElementById(i + String(currentRow)).style.backgroundColor = "#c9b458";
                document.getElementById(i + String(currentRow)).style.borderColor = "#c9b458";
                //document.getElementById(guess[i]).style.backgroundColor != "rgb(106, 170, 100)" && (document.getElementById(guess[i]).style.backgroundColor = "#c9b458");
                changeKeyColor("#c9b458", guess[i]);
                tempTarget.splice(j, 1);// check this out
                boardRow[i] = "🟨"
                //break;
                y = true;
              }
            }
          }
          if (document.getElementById(i + String(currentRow)).style.backgroundColor == "") {
            document.getElementById(i + String(currentRow)).style.backgroundColor = "var(--joy-palette-neutral-150)";
            document.getElementById(i + String(currentRow)).style.borderColor = "var(--joy-palette-neutral-150)";
            //document.getElementById(guess[i]).style.backgroundColor = "var(--joy-palette-neutral-150)";
            changeKeyColor("var(--joy-palette-neutral-150)", guess[i]);
            console.log(document.getElementById(guess[i]).style.backgroundColor);
          }
          document.getElementById(i + String(currentRow)).style.color = "white";
        }

        board[currentRow] = boardRow;
        currentRow++;
        var temp = [...guesses, guess];
        setGuesses(temp);
        setGuess("")
      }
      if (guess == target) {
        win = true;
        if (!wordleData.won) {
          wordleData.won = true;
          wordleData.wins = wordleData.wins + 1;
          if (wordleData.lastWon + 1 == getCurrentDay()) { //increase the streak! nice job!
            wordleData.currentStreak = wordleData.currentStreak + 1;
            wordleData.currentStreak > wordleData.maxStreak && (wordleData.maxStreak = wordleData.currentStreak);
          } else if (wordleData.currentStreak == 0) {
            wordleData.currentStreak = 1;
            wordleData.maxStreak = wordleData.currentStreak;
          }
          wordleData.lastWon = getCurrentDay(); //set the last time you won to today - AFTER WE CHECK YOUR STREAK
        }
        saveData();
        word = target;
        setLeaderboard(true);
      }
      if (currentRow == 6) {
        wordleData.currentStreak = 0;
        word = target;
        setLeaderboard(true);
      }
    }}>Enter</Button>
  )
}

function ThemeToggle() {
  const { mode, setMode } = useColorScheme();
  mode === 'light' ? metaTag.setAttribute("content", "#fff") : metaTag.setAttribute("content", "#121213"); //maybe this'll work?
  return (
    <IconButton
      onClick={() => {
        setMode(mode === 'light' ? 'dark' : 'light');
      }}
      sx={{ backgroundColor: 'background.body' }}
    >
      {mode === 'light' ? <Sun /> : <Moon />}
    </IconButton>
  );
}


//Helper Functions
function addLetter(l, guess, setGuess) {
  guess.length <= 4 && setGuess(guess + l)
}

function changeKeyColor(color, id) {
  var el = document.getElementById(id);
  const g = "rgb(106, 170, 100)";
  const y = "rgb(201, 180, 88)";
  if (el.style.backgroundColor != g && el.style.backgroundColor != y) {
    el.style.backgroundColor = color;
  }
}

function getCurrentDay() {
  var d = Date.now();
  var day = 24 * 60 * 60 * 1000;
  return Math.floor(d / day) - 19962; //have to tune this later
}

function copticToUpper(string) {
  var returnString = ""
  for (var i = 0; i < string.length; i++) {
    returnString += upper[lower.indexOf(string[i])];
  }
  return returnString;
}


//Data Storage and Handling
var wordleData = {
  currentStreak: 0,
  maxStreak: 0,
  lastPlayed: 0,
  lastWon: 0,
  plays: 0,
  wins: 0,
  won: false,
  guesses: []
}

//Save/Load data - TODO - figure out to encode Coptic unicdoe (UTF-8?)
function saveData() {
  localStorage.setItem("data", JSON.stringify(wordleData)); //btoa
}

function loadData() {
  if (localStorage.getItem("data") == null) {
    //base initialization
    wordleData.plays = 1;
    wordleData.lastPlayed = getCurrentDay();
    saveData();
  }
  wordleData = JSON.parse(localStorage.getItem("data")); //atob
}

//delay funcion
const delay = ms => new Promise(res => setTimeout(res, ms));
var loading = false;

async function load() {
  loadData();
  if (!(wordleData.lastWon == getCurrentDay() || wordleData.lastWon + 1 == getCurrentDay())) {
    wordleData.currentStreak = 0;
  }
  if (wordleData.lastPlayed == getCurrentDay()) {
    //you already played today, huh?
    //autoloading previous words
    var pastGuesses = wordleData.guesses;
    loading = true;
    for (var i = 0; i < pastGuesses.length; i++) {
      for (var j = 0; j < pastGuesses[i].length; j++) {
        document.getElementById(pastGuesses[i][j]).click();
        await (delay(.001));
      }
      document.getElementById("enter").click();
      await (delay(.001));
    }
    loading = false;
  } else if (wordleData.lastPlayed + 1 == getCurrentDay()) {
    //its tomorrow!
    //get a new word!
    wordleData.lastPlayed = getCurrentDay();
    wordleData.guesses = [];
    wordleData.plays = wordleData.plays + 1;
    wordleData.won = false;
    saveData();
  } else {
    //you haven't played in a while :(
    wordleData.lastPlayed = getCurrentDay();
    wordleData.guesses = [];
    wordleData.plays = wordleData.plays + 1;
    wordleData.won = false;
    saveData();
  }
}

window.onload = load;


//Theme definitions
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

//set colors for safari's top section
const metaTag = document.querySelector('meta[name="theme-color"]');

function App() {

  const [guess, setGuess] = React.useState("")
  const [guesses, setGuesses] = React.useState([]);

  //modal states
  const [leaderboard, setLeaderboard] = React.useState(false);
  const [howToPlay, setHowToPlay] = React.useState(false);

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
              <Typography level="h2" sx={{ color: "primary.50", marginTop: "2em" }}><span style={{ fontFamily: "Coptic" }}>Ⲟⲩⲣⲇⲉⲗ</span> #{getCurrentDay()}</Typography>
            </Sheet>
            <Sheet sx={{ display: "flex", alignItems: "flex-start", width: "85%", maxWidth: "30rem" }}>
              <Typography level="body-md" sx={{ color: "primary.50", marginTop: "1em", fontWeight: "bold" }}>Statistics:</Typography>
              <Sheet sx={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", width: "100%" }}>
                <Sheet sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <Typography level="h2" className="lbText">{wordleData.plays}</Typography>
                  <Typography level="body-sm" className="lbText">played</Typography>
                </Sheet>
                <Sheet sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <Typography level="h2" className="lbText">{Math.floor((wordleData.wins / wordleData.plays) * 100)}</Typography>
                  <Typography level="body-sm" className="lbText">win %</Typography>
                </Sheet>
                <Sheet sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <Typography level="h2" className="lbText">{wordleData.currentStreak}</Typography>
                  <Typography level="body-sm" className="lbText" sx={{ display: "ruby" }}>current streak</Typography>
                </Sheet>
                <Sheet sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <Typography level="h2" className="lbText">{wordleData.maxStreak}</Typography>
                  <Typography level="body-sm" className="lbText">max streak</Typography>
                </Sheet>
              </Sheet>
              <Typography level="body-md" sx={{ color: "primary.50", marginTop: "2em", fontWeight: "bold" }}>Today's word is:</Typography>
              <Sheet sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
                <Typography level="h1" sx={{ color: "primary.50", marginTop: ".25em", fontWeight: "bold", fontFamily: "Coptic" }}>{word}</Typography>
              </Sheet>
              <Typography level="body-md" sx={{ color: "primary.50", marginTop: "1rem", fontWeight: "bold" }}>Definition: <span style={{ fontWeight: "normal" }}>{definition}</span></Typography>
              <Typography level="body-md" sx={{ color: "primary.50", fontWeight: "bold" }}>Pronunciation: <span style={{ fontWeight: "normal" }}>"{wordleData.won || currentRow == 6 ? pronunciation : "?????"}"</span></Typography>
              <Sheet sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%", marginTop: "2rem" }}>
                <Button variant="solid" disabled={wordleData.won || currentRow == 6 ? false : true} startDecorator={<Share />} onClick={() => {
                  var title = 'Coptic Wordle #' + (getCurrentDay()) + ' - ' + (currentRow + '/6');
                  var text = title + '\n';
                  for (var i = 0; i < board.length; i++) {
                    for (var j = 0; j < 5; j++) {
                      text += board[i][j]
                    }
                    text += "\n"
                  }
                  navigator.share({
                    title: title,
                    text: text
                  })
                  // url: '',
                }}>Share</Button>
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
                <Typography level="body-md" sx={{ color: "primary.50", marginTop: "1em", fontWeight: "bold" }}>Examples:</Typography>
                <Sheet sx={{ display: "flex", flexDirection: "column" }}>
                  <Sheet sx={{ display: "flex", flexDirection: "row", marginTop: ".5rem" }}>
                    <Box className="box htp" sx={{ backgroundColor: "#6aaa64" }}>ⲛ</Box>
                    <Box className="box htp" >ⲟ</Box>
                    <Box className="box htp" >ϥ</Box>
                    <Box className="box htp" >ⲣ</Box>
                    <Box className="box htp" >ⲓ</Box>
                  </Sheet>
                  <Typography><span style={{ fontWeight: "bold", fontFamily: "Coptic" }}>Ⲛ</span> is in the word and in the right spot.</Typography>
                </Sheet>
                <Sheet sx={{ display: "flex", flexDirection: "column", marginTop: ".5rem" }}>
                  <Sheet sx={{ display: "flex", flexDirection: "row", marginTop: ".5rem" }}>
                    <Box className="box htp" >ⲉ</Box>
                    <Box className="box htp" sx={{ backgroundColor: "#c9b458" }}>ϩ</Box>
                    <Box className="box htp" >ⲟ</Box>
                    <Box className="box htp" >ⲟ</Box>
                    <Box className="box htp" >ⲩ</Box>
                  </Sheet>
                  <Typography><span style={{ fontWeight: "bold", fontFamily: "Coptic" }}>Ϩ</span> is in the word but in the wrong spot.</Typography>
                </Sheet>
                <Sheet sx={{ display: "flex", flexDirection: "column", marginTop: ".5rem" }}>
                  <Sheet sx={{ display: "flex", flexDirection: "row", marginTop: ".5rem" }}>
                    <Box className="box htp" >ⲡ</Box>
                    <Box className="box htp" >ⲟ</Box>
                    <Box className="box htp" sx={{ backgroundColor: "var(--joy-palette-neutral-150)" }}>ⲩ</Box>
                    <Box className="box htp" >ⲣ</Box>
                    <Box className="box htp" >ⲟ</Box>
                  </Sheet>
                  <Typography><span style={{ fontWeight: "bold", fontFamily: "Coptic" }}>Ⲩ</span> is not in the word.</Typography>
                </Sheet>
              </Sheet>
              <Typography level="body-md" sx={{ color: "primary.50", marginTop: "2rem" }}>A new word is released every day.</Typography>
            </Sheet>
            <Sheet sx={{ width: "100%", borderTop: "1px solid", borderColor: "var(--joy-palette-neutral-100)", display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
              <Typography level="body-sm" sx={{ marginLeft: ".25rem" }}>© 2024 The Coptic Language Initiative</Typography>
              <Typography level="body-sm" sx={{ marginRight: ".25rem" }}>#{getCurrentDay()}</Typography>
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
            <Enter guess={guess} guesses={guesses} setGuess={setGuess} setGuesses={setGuesses} setLeaderboard={setLeaderboard} />
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