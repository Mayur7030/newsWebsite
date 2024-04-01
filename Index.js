const apiKey = "cf808ef7895a403a96a790089d34119c";

const blogContainer = document.getElementById("blog-container");
const searchField = document.getElementById("search-input")
const searchButton = document.getElementById("search-button")

async function fetchRandomNews() {
  try {
    const apiUrl = `https://newsdata.io/api/1/news?apikey=pub_411355e07e34163c405361608a60e6959ebef&q=business`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log(data.results, "data");
    return data.results;
  } catch (error) {
    console.error("Error fetching random news", error);
    return [];
  }
}

searchButton.addEventListener('click',async()=>{
const query =searchField.value.trim()
if(query !== ""){
  try{
const articles = await fetchNewsQuery(query);
displayBlogs(articles)
  }catch(error){
    console.log("error fecthing news by query",error)
  }
}
})

const fetchNewsQuery =async (query)=>{
  try {
    const apiUrl = `https://newsdata.io/api/1/news?apikey=pub_411355e07e34163c405361608a60e6959ebef&q=${query}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log(data.results, "data");
    return data.results;
  } catch (error) {
    console.error("Error fetching random news", error);
    return [];
  }
}


const displayBlogs = (article) => {
  blogContainer.innerHTML = "";
  article.forEach((article) => {
    const blogcard = document.createElement("div");
    blogcard.classList.add("blog-card");
    const img = document.createElement("img");
    img.src = article.image_url;
    img.alt = article.title;
    const title = document.createElement("h2");

    const truncatedTitle =
      article.title.length > 30
        ? article.title.slice(0, 30) + "..."
        : article.title;
    title.textContent = truncatedTitle;

    const description = document.createElement("p");

    const truncatedDescri =
      article.description.length > 100
        ? article.description.slice(0, 100) + "..."
        : article.description;
    description.textContent = truncatedDescri;

    blogcard.appendChild(img);
    blogcard.appendChild(title);
    blogcard.appendChild(description);

    blogcard.addEventListener("click", () => {
      window.open(article.url, "_blank");
    });
    blogContainer.appendChild(blogcard);
  });
};

(async () => {
  try {
    const article = await fetchRandomNews();
    displayBlogs(article);
  } catch (error) {
    console.log("Error fetching random news", error);
  }
})();
