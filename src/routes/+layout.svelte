<script>
	import './styles.css';
</script>

<head>
	<title>Add Up The Cards!</title>
	<link rel="icon" href="/static/favicon.ico" />
</head>

<div class="app">
	<slot />
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}
</style>
