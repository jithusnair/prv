<script>
	import Select from 'svelte-select';

	let loadOptions = loadOptions2;

	function loadOptions1(filterText) {
		filterText = filterText ? filterText.replace(' ', '_') : '';

		return fetch('https://danbooru.donmai.us/tags.json?search[name_matches]=' + filterText + '*', {
			method: 'GET' // *GET, POST, PUT, DELETE, etc.
		})
			.then((res) => res.json())
			.then((data) => {
				return data.sort((a, b) => {
					if (a.name > b.name) return 1;
					if (a.name < b.name) return -1;
				});
			})
			.catch((error) => console.error(error));
	}

	function loadOptions2(filterText) {
		filterText = filterText ? filterText.replace(' ', '_') : '';

		return fetch('https://danbooru.donmai.us/tags.json?search[name_matches]=' + filterText, {
			method: 'GET' // *GET, POST, PUT, DELETE, etc.
		})
			.then((res) => res.json())
			.then((data) => {
				return data.sort((a, b) => {
					if (a.name > b.name) return 1;
					if (a.name < b.name) return -1;
				});
			})
			.catch((error) => console.error(error));
	}

	const optionIdentifier = 'id';
	const getOptionLabel = (option) => option.name;
	const getSelectionLabel = (option) => option.name;

	let selectedItem = 'exact';
	const items = ['contains', 'exact'];

	function onSelect(event) {
		if (event.detail === 'contains') {
			loadOptions = loadOptions1;
		} else {
			loadOptions = loadOptions2;
		}
	}
</script>

<div class="container">
	<Select
		{loadOptions}
		{optionIdentifier}
		{getSelectionLabel}
		{getOptionLabel}
		placeholder="Search for tags"
		on:select
	/>

	<Select
		{items}
		on:select={onSelect}
		bind:value={selectedItem}
		placeholder="Change this first if needed before searching"
	/>

	<button on:click>Hot</button>
</div>

<style>
	.container {
		display: grid;
		column-gap: 10px;
		align-items: center;
		grid-template-columns: 300px 300px 100px;
	}
</style>
