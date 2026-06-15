async function loginUser() {

    const email =
        document.getElementById("email").value;

    const password =
        document.getElementById("password").value;

    try {

        const response = await fetch(
            "http://localhost:5000/login",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    email,
                    password
                })
            }
        );

        const data = await response.json();
        if(data.message){

    alert(data.message);

    return;

}
        localStorage.setItem(
            "user",
            JSON.stringify(data)
        );

        console.log(data);

        alert("Login Successful");
        window.location.href = "index.html";

    } catch(error) {

        console.log(error);

    }

}