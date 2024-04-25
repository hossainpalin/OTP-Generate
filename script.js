let generatedOTP;
const OTPExpire = document.querySelector(".otp-expire");

function OTPExpireTime() {
  let timeLeft = 30;
  let interval = 1000;

  const timerId = setInterval(() => {
    if (timeLeft <= 0) {
      clearInterval(timerId);
      OTPExpire.textContent = "OTP expired";
      OTPExpire.style.color = "red";
      generateOTP();
    } else {
      OTPExpire.textContent = `OTP will expire in ${timeLeft} seconds`;
      OTPExpire.style.color = "white";
    }
    timeLeft -= 1;
  }, interval);
}

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

function generateOTP() {
  generatedOTP = Math.floor(Math.random() * 9000) + 1000;
  const OTPElement = document.querySelector(".generate-otp");
  OTPElement.textContent = `Your OTP : ${generatedOTP}`;
  OTPExpireTime();
}

function OTPValidation() {
  const OTPBoxes = document.querySelectorAll(".otp-box");
  const typedOTP = Array.from(OTPBoxes)
    .map((box) => box.value)
    .join("");

  const OTPValidationMessage = document.querySelector(".otp-validate-message");

  if (generatedOTP === Number(typedOTP)) {
    OTPValidationMessage.textContent = "OTP has been validated successfully";
    OTPValidationMessage.style.color = "green";
  } else {
    OTPValidationMessage.textContent = "OTP is invalid";
    OTPValidationMessage.style.color = "red";
  }
}

function init() {
  OTPBoxes();
  setTimeout(generateOTP, 1000);
}

init();
