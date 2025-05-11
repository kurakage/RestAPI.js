if(typeof RestAPI === 'undefined') {
	RestAPI = {
		'enable': true,
		'version': '1.0',

		Send: function(url, data = {}, callback = function(){}, method = "POST") {
			let form;

			if(data['this']) {
				form = new FormData(data['this']);
				delete data['this'];
			}
			else {
				form = new FormData();
			}

			for(let i in data) {
				form.append(i, data[i]);
			}

			form.append("phpaction", "1");

			if($('#csrf_token').length) {
				form.append("csrf_token", $('#csrf_token').val());
			}

			fetch(url, {
				method: method,
				body: form
			})
			.then(async response => {
				const isJson = response.headers.get("content-type")?.includes("application/json");
				const data = isJson ? await response.json() : await response.text();

				return {
					response,
					data
				};
			})
			.then(({response, data}) => {
				callback(response.status, data);
			})
			.catch(error => callback(error, null));
		},

		Get: function(url, callback) {
			fetch(url)
				.then(response => response.json())
				.then(data => callback(null, data))
				.catch(error => callback(error, null));
		},

		Post: function(url, data, callback) {
			if($('#csrf_token').length) {
				data.csrf_token = $('#csrf_token').val();
			}

			fetch(url, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(data)
			})
			.then(response => response.json())
			.then(data => callback(null, data))
			.catch(error => callback(error, null));
		},

		Put: function(url, data, callback) {
			fetch(url, {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(data)
			})
			.then(response => response.json())
			.then(data => callback(null, data))
			.catch(error => callback(error, null));
		},

		Delete: function(url, callback) {
			fetch(url, { method: 'DELETE' })
				.then(response => response.json())
				.then(data => callback(null, data))
				.catch(error => callback(error, null));
		}
	};
}
