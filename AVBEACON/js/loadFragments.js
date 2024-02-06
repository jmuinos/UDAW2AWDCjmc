document.addEventListener("DOMContentLoaded", function () {
	// fetch('/html/fragments/nav.html')
	// 	.then(response => response.text())
	// 	.then(data => document.getElementById('navbar-container').innerHTML = data);
	
	fetch('/html/fragments/footer.html')
		.then(response => response.text())
		.then(data => document.getElementById('footer-container').innerHTML = data);
});
