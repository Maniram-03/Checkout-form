let currentStep = 1;

function showStep(step) {

  document.querySelectorAll(".step").forEach(s => s.classList.remove("active"));
  document.getElementById("step" + step).classList.add("active");


  document.querySelectorAll(".stepper-item").forEach((node, index) => {
    node.classList.remove("active", "completed");
    if (index + 1 < step) node.classList.add("completed");
    if (index + 1 === step) node.classList.add("active");
  });
}

function prevStep() {
  if(currentStep > 1) {
    currentStep--;
    showStep(currentStep);
  }
}

function validateStep1() {
  const nameInput = document.getElementById("name").value;
  const country = document.getElementById("country").value;
  const postal = document.getElementById("postal").value;
  const phone = document.getElementById("phone").value;
  if (nameInput === "") {
    alert("Please enter your Full Name before proceeding.");
    document.getElementById("name").focus(); 
    return; 
  }

  if(!country) { alert("Please select a country"); return; }

  let postalRegex = country === "IND" ? /^[0-9]{6}$/ : /^[0-9]{5}$/;
  let phoneRegex = country === "IND" ? /^[6-9][0-9]{9}$/ : /^[0-9]{10}$/;

  if (!postalRegex.test(postal)) { alert("Invalid Postal Code"); return; }
  if (!phoneRegex.test(phone)) { alert("Invalid Phone Number"); return; }

  updateSummary();
  currentStep = 2;
  showStep(currentStep);
}

function validateStep2() {
  const address = document.getElementById("address").value;
  const city = document.getElementById("city").value;
  if (!address || !city) { alert("Fill all billing fields"); return; }
  updateSummary();
  currentStep = 3;
  showStep(currentStep);
}


function validateStep3() {
  const card = document.getElementById("card").value.replace(/\s/g, "");
  const expiry = document.getElementById("expiry").value;

 
  if (!luhnCheck(card)) {
    alert("Invalid Credit Card Number");
    return;
  }


  const today = new Date();
  const expDate = new Date(expiry);

  if (!expiry || expDate < today) {
    alert("Card Expired or Invalid Date");
    return;
  }

 
  alert("Payment Successful!");

  
  location.reload(); 
  
 
}



function validateStep3() {
  const card = document.getElementById("card").value.replace(/\s/g, "");
  const expiry = document.getElementById("expiry").value;

  
  if (!luhnCheck(card)) {
    alert("Invalid Credit Card Number");
    return;
  }

  const today = new Date();
  const expDate = new Date(expiry);
  if (!expiry || expDate < today) {
    alert("Card Expired");
    return;
  }

  
  document.getElementById("successOverlay").style.display = "block";
}



function luhnCheck(num) {
  let sum = 0; let double = false;
  for (let i = num.length - 1; i >= 0; i--) {
    let digit = parseInt(num[i]);
    if (double) { digit *= 2; if (digit > 9) digit -= 9; }
    sum += digit; double = !double;
  }
  return sum % 10 === 0;
}

function updateSummary() {
  document.getElementById("sName").innerText = document.getElementById("name").value || "-";
  document.getElementById("sCountry").innerText = document.getElementById("country").value || "-";
  document.getElementById("sPhone").innerText = document.getElementById("phone").value || "-";
  document.getElementById("sAddress").innerText = document.getElementById("address").value || "-";
}