let generatedOTP;
let timerId;
const OTPExpire = document.querySelector(".otp-expire");

// OTP expire time functionality
function OTPExpireTime() {
  let timeLeft = 30;
  let interval = 1000;

  timerId = setInterval(() => {
    if (timeLeft <= 0) {
      clearInterval(timerId);
      OTPExpire.textContent = "OTP expired";
      generateOTP();
    } else {
      OTPExpire.textContent = `OTP Expire in ${timeLeft} seconds`;
    }
    timeLeft -= 1;
  }, interval);
}

// OTP boxes functionality
function OTPBoxes() {
  const boxes = document.querySelector("#otp-box-list");
  boxes.addEventListener("input", (e) => {
    const target = e.target;

    if (isNaN(target.value)) {
      target.value = "";
      return;
    }

    if (target.nextElementSibling && target.value) {
      target.nextElementSibling.focus();
    }

    OTPValidation();
  });
}

// OTP generation functionality
function generateOTP() {
  generatedOTP = Math.floor(Math.random() * 9000) + 1000;
  const OTPElement = document.querySelector(".generate-otp");
  OTPElement.textContent = `Your OTP : ${generatedOTP}`;
  OTPExpireTime();
}

// OTP validation functionality
function OTPValidation() {
  const OTPBoxes = document.querySelectorAll(".otp-box");
  const typedOTP = Array.from(OTPBoxes)
    .map((box) => box.value)
    .join("");

  const OTPValidationMessage = document.querySelector(".otp-validate-message");

  if (generatedOTP === Number(typedOTP)) {
    clearInterval(timerId);
    OTPValidationMessage.textContent = "OTP has been validated successfully";
    OTPValidationMessage.style.color = "green";
  } else {
    OTPValidationMessage.textContent = "OTP is invalid";
    OTPValidationMessage.style.color = "red";
  }
}

// OTP initialization
function init() {
  OTPBoxes();
  setTimeout(generateOTP, 1000);
}

init();
