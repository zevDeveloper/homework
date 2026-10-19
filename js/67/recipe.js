const ingredients = document.querySelector(".ing");
let val;

const select = document.querySelector("#recipe-choice");
select.addEventListener("change", (e) => {
  val = e.target.value;
  fetchRecipe(val);
});
const pic = document.querySelector(".pic");

const fetchRecipe = async (id) => {
  const res = await fetch("recipeList.json");
  const data = await res.json();
  {
    data.forEach((e) => {
      if (e.id == id) {
        pic.src = e.pic;

        const fetchRecipe1 = async (id1) => {
          const res1 = await fetch("recipes.json");
          const data1 = await res1.json();
          data1.forEach((e) => {
            if (e.id == id1) {
              let list = "";
              e.ingredients.forEach((i) => (list += `<li>${i}</li>`));
              ingredients.innerHTML = list;
            }
          });
        };
        fetchRecipe1(e.id);
      }
    });
  }
};
