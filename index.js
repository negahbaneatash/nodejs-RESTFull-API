const updateIntp = require("./updateCourse");
const express = require("express");
const Joi = require("joi"); // capital J since it returns a class and Pascal naming by convension
const cors = require("cors");

const app = express();
app.use(cors());

const interpreters = [
  { id: 1, name: "Elnaz", group: "persian", email: "elnaz@gmail.com" },
  { id: 2, name: "Salim", group: "Rohingya", email: "salim@gmail.com" },
  { id: 3, name: "tomas", group: "Myanmar", email: "tomas@gmail.com" },
  { id: 4, name: "Abbas", group: "Germany", email: "abbas@gmail.com" },
];

app.get("/api/intp/leave/:year/:month", (req, res) => {
  // res.send('Hello Express')
  res.send(req.query);
});

app.get("/api/interpreters", (req, res) => {
  //   res.header("access-control-allow-origin", "*");
  res.send(interpreters);
});

app.get("/api/interpreters/:id", (req, res) => {
  //intp.id ===parseInt(req.params.id)
  const theInterpreter = interpreters.find(
    (intp) => intp.id.toString() === req.params.id
  );
  console.log("the intp", theInterpreter);
  if (!theInterpreter) {
    res.status(404).send("Interpreter with this ID was not found.");
    return;
  }
  res.send(theInterpreter);
});

app.use(express.json());

app.post("/api/interpreters", (req, res) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    group: Joi.string().max(10).required(),
    email: Joi.string().required().email(),
  });

  const result = schema.validate(req.body);

  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }

  console.log("resutl of Joi validate is :", result.error);

  const newInterpreter = {
    id: interpreters.length + 1,
    name: req.body.name,
    group: req.body.group,
  };
  interpreters.push(newInterpreter);

  res.send(result);
});

console.log("updateIntp is : ", updateIntp);

const port = 9001;
app.listen(port, () => {
  console.log(`listening to port ${port} ...`);
});
