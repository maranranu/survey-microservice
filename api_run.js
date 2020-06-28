const request = require('request-promise');
let token = "";
let username = "kamnee"
let url = "https://nodejs.org/static/images/logo.svg";

async function call_auth() {
	try {
	const response = await request({
		url: "http://localhost:3000/api/auth",
		method: "POST",
		headers: {"Content-Type": "application/json"},
		body: {"username": username, "password": "123"},
		json: true
	     });
		return response.token;
	} catch (err) {
		throw(err);
	}

}

async function call_post_survey(data) {
        try {
            const response = await request({
                url: "http://localhost:3000/api/survey",
                method: "POST",
                headers: {"Content-Type": "application/json", "Authorization": token},
                body: data,
                json: true
             });
                return response;
        } catch (err) {
                throw(err);
        }

}

async function call_get_survey(data) {
        try {
        const response = await request({
                url: "http://localhost:3000/api/survey",
                method: "GET",
                headers: {"Authorization": token}
             });
                return response;
        } catch (err) {
                throw(err);
        }

}

async function image_download_resize() {
	try {
        const response = await request({
                url: "http://localhost:3000/api/image",
                method: "GET",
		qs: {
			url: url
		}
             });
                return response;
        } catch (err) {
                throw(err);
        }

}
call_auth()
.then((result) => {
   token = result;
   return call_post_survey({"question": "ques1", "option": true, "userId": username})
})
.then((post_data) => {
	console.log("survey created: ", post_data);
	return call_get_survey();
})
.then((data) => {
        console.log("survey for user: ", data, username);
	return image_download_resize();
})
.then((reso) => {
	console.log(reso);
})
.catch((err) => {console.log(err.message);});

