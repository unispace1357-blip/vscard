const profileImage = document.getElementById("profileImage");
const card = document.querySelector(".card");
const emailLink = document.querySelector('a[href^="mailto:"]');

if (profileImage) {
  profileImage.addEventListener("error", function () {
    this.src = "https://via.placeholder.com/300x300/f1f5f9/94a3b8?text=PROFILE";
  });
}

if (card) {
  card.addEventListener("mouseenter", function () {
    card.style.transform = "translateY(-12px)";
    card.style.boxShadow = "0 32px 70px rgba(0, 0, 0, 0.6)";
  });

  card.addEventListener("mouseleave", function () {
    card.style.transform = "translateY(0)";
    card.style.boxShadow = "0 24px 55px rgba(0, 0, 0, 0.45)";
  });
}

if (emailLink) {
  emailLink.addEventListener("click", async function (event) {
    event.preventDefault();

    const emailText = emailLink.querySelector(".value")?.textContent?.trim();

    if (!emailText) {
      alert("복사할 이메일 주소가 없습니다.");
      return;
    }

    try {
      await navigator.clipboard.writeText(emailText);
      alert("이메일 주소가 클립보드에 복사되었습니다.");
    } catch (error) {
      const tempInput = document.createElement("input");

      tempInput.value = emailText;
      document.body.appendChild(tempInput);
      tempInput.select();
      document.execCommand("copy");
      document.body.removeChild(tempInput);

      alert("이메일 주소가 클립보드에 복사되었습니다.");
    }
  });
}