const profileImage = document.getElementById("profileImage");

profileImage.addEventListener("error", function () {
  this.src = "https://via.placeholder.com/300x300/f1f5f9/94a3b8?text=PROFILE";
});