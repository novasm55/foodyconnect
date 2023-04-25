let image = "";

var myWidget = cloudinary.createUploadWidget(
  {
    cloudName: "dujnmblmh",
    uploadPreset: "foodyconnect",
  },
  (error, result) => {
    if (!error && result && result.event === "success") {
      image = result.info.thumbnail_url;
    }
  }
);

document.getElementById("upload_widget").addEventListener(
  "click",
  function () {
    myWidget.open();
  },
  false
);

const newFormHandler = async (event) => {
  event.preventDefault();

  const food_name = document.querySelector("#post-name").value.trim();
  const cuisine = document.querySelector("#post-cuisine").value.trim();
  const ingredients = document.querySelector("#post-ingrediants").value.trim();
  const cook_time = document.querySelector("#post-cooktime").value.trim();
  const description = document.querySelector("#post-desc").value.trim();

  if (food_name && cuisine && ingredients && cook_time && description) {
    const response = await fetch(`/api/food`, {
      method: "POST",
      body: JSON.stringify({
        food_name,
        cuisine,
        image,
        description,
        ingredients,
        cook_time,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.replace("/profile");
      alert("Posted");
    } else {
      alert("Failed to create project");
    }
  }
};

document.querySelector("#create").addEventListener("click", newFormHandler);

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute("data-id")) {
    const id = event.target.getAttribute("data-id");

    const response = await fetch(`/api/food/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      document.location.replace("/profile");
    } else {
      console.log(error);
      alert("Failed to delete project");
    }
  }
};
document
  .querySelector("#delete-btn")
  .addEventListener("click", delButtonHandler);
