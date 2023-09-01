class GitHub {
    constructor(username) {
        this.username = username;
        this.url = "https://api.github.com/users/";
    }

    async getUserDetails() {
        try {
            let res = await fetch(this.url + this.username);
            let data = await res.json();
            console.log(data);
            return data;
        } catch (err) {
            throw new Error(err);
        }
    }

    createUserCard() {
        let parentDiv = document.getElementById("main");
        this.getUserDetails().then((data) => {
            parentDiv.innerHTML = `
        <div class="card mb-3" style="max-width: 650px;">
        <div class="row g-0">
            <div class="col-sm-4 img">
                <img src="${data.avatar_url}" class="img-fluid" alt="${data.name}">
            </div>
            <div class="col-sm-8">
                <div class="card-body">
                    <h5 class="card-title" style="color:white">${data.name}</h5>
                    <p class="card-text" style="color:white">${data.bio}</p>
                    <div class="col follower">
                        <p style="color:white"><b>Followers</b> : ${data.followers}</p>
                        <p style="color:white"><b>Following</b> : ${data.following}</p>
                        <p style="color:white"><b>Repos</b> : ${data.public_repos}</p>
                    </div>
                    <div class="col location">
                        <p style="color:white"><b>Twitter</b> : ${data.twitter_username}</p>
                        <p style="color:white"><b>Location</b> : ${data.location}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
      `;
        });
    }
}

// get input name
if (document.getElementById("search").value === "") {
    let obj = new GitHub("AbuQamar7379");
    obj.createUserCard();
}

document.getElementById("form").addEventListener("submit", (e) => {
    e.preventDefault();
    let usernameInput = document.getElementById("search").value;
    let obj = new GitHub(usernameInput);
    obj.createUserCard();
});