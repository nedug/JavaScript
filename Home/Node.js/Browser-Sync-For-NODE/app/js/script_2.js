document.addEventListener('DOMContentLoaded', () =>
{

    const url = 'http://127.0.0.1:4000';

    const user = document.querySelector('#users');

    const getData = async function getData() {

        try {
            const response = await fetch(url + '/users');

            const data = await response.json();

            buildUsers(data);
        }
        catch (err) {
            console.error("Error:", err);
        }

    }

    getData();



    function buildUsers(data) {

        console.log(data);

        const ul = document.createElement('ul');

        for (let user of data) {

            const li = document.createElement('li');

            li.innerHTML = `${user.username} (${user.email}), works as '${user.job}';`;

            ul.append(li);

            // console.log(value);
        }

        user.append(ul);


    }


})