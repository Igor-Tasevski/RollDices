import React, { useState, useEffect } from 'react';
import Die from './Die';

const Main = () => {
  const [dice, setDice] = useState([]);
  const [gameWon, setGameWon] = useState(false);

  // Function to generate random dice values
  const generateRandomValue = () => Math.floor(Math.random() * 6) + 1;

  // Function to generate the 10 dice values with "held" status
  const generateAllNewDice = () => {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push({ value: generateRandomValue(), held: false });
    }
    setDice(newDice);
    setGameWon(false); // Reset game status
  };

  // Use useEffect to generate dice when the component mounts
  useEffect(() => {
    generateAllNewDice();
  }, []);

  // Function to check if all held dice have the same value
  const checkIfGameWon = () => {
    const heldDice = dice.filter(die => die.held);
    if (heldDice.length === 10 && heldDice.every(die => die.value === heldDice[0].value)) {
      setGameWon(true);
    }
  };

  // Toggle the "held" state when a die is clicked
  const toggleHold = (index) => {
    const newDice = [...dice];
    newDice[index].held = !newDice[index].held;
    setDice(newDice);
    checkIfGameWon(); // Check if the game is won after each toggle
  };

  // Function to roll the dice, excluding held dice
  const rollDice = () => {
    if (gameWon) {
      // If the game is won, reset the dice
      generateAllNewDice();
    } else {
      const newDice = dice.map(die =>
        die.held ? die : { value: generateRandomValue(), held: false }
      );
      setDice(newDice);
      checkIfGameWon(); // Check if the game is won after each roll
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-800">
      <div className="bg-white p-5 sm:p-16 md:p-32 lg:p-48 xl:p-64 rounded-lg shadow-lg mt-4 mb-4 ml-25 mr-25">
        {/* Grid layout for 5 columns */}
        <div className="grid grid-cols-5 gap-4">
          {dice.map((die, index) => (
            <Die
              key={index}
              value={die.value}
              isHeld={die.held}
              onClick={() => toggleHold(index)}
            />
          ))}
        </div>
        {/* Button to generate new dice */}
        <button
          onClick={rollDice}
          className="mt-4 p-2 bg-blue-500 text-white rounded-md"
        >
          {gameWon ? 'Game Won! Click to Restart' : 'Roll Dice'}
        </button>
      </div>
    </div>
  );
};

export default Main;
