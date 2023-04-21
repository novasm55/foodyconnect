const newFormHandler = async (event) => {
  console.log(2);
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

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute("data-id")) {
    const id = event.target.getAttribute("data-id");

    const response = await fetch(`/api/food/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      document.location.replace("/food");
    } else {
      alert("Failed to delete project");
    }
  }
};

console.log("53");
document.querySelector("#create").addEventListener("click", newFormHandler);

// var myWidget = cloudinary.createUploadWidget(
//   {
//     cloudName: "dujnmblmh",
//     uploadPreset: "eihxr5yn",
//   },
//   (error, result) => {
//     if (!error && result && result.event === "success") {
//       console.log("Done! Here is the image info: ", result.info);
//     }
//   }
// );

// // document
// //   .querySelector(".project-list")
// //   .addEventListener("click", delButtonHandler);

// document.getElementById("upload_widget").addEventListener(
//   "click",
//   function () {
//     myWidget.open();
//   },
//   false
// );
