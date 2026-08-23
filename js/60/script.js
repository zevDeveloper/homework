"use strict";
function trackDosage(medicationName, initialDosage) {
  const prescription = {
    //obj
    name: medicationName,
    dosage: initialDosage,
  };

  function getInstructions() {
    return `take ${prescription.dosage} of ${prescription.name}`;
  }
  function adjustDosage(doctorPin, newDosage) {
    if (doctorPin === "1122") {
      prescription.dosage = newDosage;
    }
  }
  return { getInstructions, adjustDosage };
}
const chaim = trackDosage("aspirin", "100mg");
const attempt1 = chaim.getInstructions();
console.log(attempt1);
chaim.adjustDosage("1122", "50mg");
const attempt2 = chaim.getInstructions();
console.log(attempt2);
//fail
chaim.prescription.name = "heroin";
const attempt3 = chaim.getInstructions();
console.log(attempt3);
