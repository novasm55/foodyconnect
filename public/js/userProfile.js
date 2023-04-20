const viewUserProfile = async () => {
  const username = document.querySelector(".username");

  const response = await fetch("/user/:id", {
    method: "GET",
    body: JSON.stringify({ email, password }),
    headers: { "Content-Type": "application/json" },
  });
};

document.addEventListener("click", viewUserProfile);
