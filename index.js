const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3000;

// Helper functions
const isPrime = (num) => {
  if (num < 2) return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return true;
};

const isPerfect = (num) => {
  let sum = 1;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) {
      sum += i;
      if (i !== num / i) sum += num / i;
    }
  }
  return sum === num && num !== 1;
};

const isArmstrong = (num) => {
  const digits = Math.abs(num).toString().split("").map(Number);
  const power = digits.length;
  const sum = digits.reduce((acc, d) => acc + Math.pow(d, power), 0);
  return sum === Math.abs(num); // Armstrong check ignores negative sign
};

const getDigitSum = (num) => {
  return Math.abs(num)
    .toString()
    .split("")
    .reduce((acc, d) => acc + Number(d), 0);
};

app.get("/api/classify-number", async (req, res) => {
  const { number } = req.query;

  // ✅ If number is empty, return null response
  if (!number || number.trim() === "") {
    return res.status(400).json({ number: null, error: true });
  }

  // ✅ Check if input is a valid integer
  if (!/^-?\d+$/.test(number)) {
    return res.status(400).json({ number: "alphabet", error: true });
  }

  const num = parseInt(number, 10);

  const properties = [];
  if (isArmstrong(num)) properties.push("armstrong");
  properties.push(num % 2 === 0 ? "even" : "odd");

  try {
    const funFactResponse = await axios.get(`http://numbersapi.com/${num}/math?json`);
    const funFact = funFactResponse.data.text;

    res.json({
      number: num,
      is_prime: isPrime(num),
      is_perfect: isPerfect(num),
      properties,
      digit_sum: getDigitSum(num),
      fun_fact: funFact,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch fun fact" });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
