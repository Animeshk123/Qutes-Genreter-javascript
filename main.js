alert("every time you refresh the page you will get new new quotes");

const quoteArea = document.querySelector("#area");
const author = document.querySelector(".author h3");
const loading = document.querySelector(".loading");
const whatsapp = document.querySelector(".whatsapp");
const twitter = document.querySelector(".twitter");
const copy = document.querySelector(".copy");

//fetch api 
async function getData() {
    try {
        const data = await fetch("https://type.fit/api/quotes");
        const res = await data.json();
        let randomNumber = Math.floor(Math.random() * 1500);
        quoteArea.innerText = res[randomNumber].text;
        author.innerHTML = `- ${res[randomNumber].author} <i class="fas fa-edit"></i>`;
        loading.classList.add("remove");
    }
    catch (err) {
        alert("something went wrong");
    }
}

// fetch api function calling
getData();

//calling copy function
copy.addEventListener("click", () => {
    copyText();
})

//calling sharewhatsapp function
whatsapp.addEventListener("click", () => {
    shareWhatsapp(quoteArea.value);
})

//calling shareontwitter function
twitter.addEventListener("click", () => {
    shareOnTwitter(quoteArea.value);
})

//copytext function
function copyText() {
    quoteArea.select();
    quoteArea.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(quoteArea.value);
    if (document.execCommand("copy")) {
        const box = document.querySelector(".alertBox");
        box.classList.add("openalert");
        setColor(box);
        setTimeout(() => {
            box.classList.remove("openalert");
        }, 700);
    }
}

// set alertbox color
function setColor(element) {
    const Colors = ["#482ff7", "#fc5c9c", "#2d6cdf", "#22d1ee", "#364f6b", "#364f6b", "#086972"];
    let randomNumber = Math.floor(Math.random() * 6);
    element.style.backgroundColor = Colors[randomNumber];
}

// sharewhatsapp function
function shareWhatsapp(content) {
    window.open(`whatsapp://send?text=${content}`);
}

// shareonTwitter function
function shareOnTwitter(content) {
    const endPoint = `https://twitter.com/intent/tweet?text=${content}`;
    window.open(endPoint);
}