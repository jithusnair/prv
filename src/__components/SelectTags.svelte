<script>
	import Select from 'svelte-select';

	function loadOptions(filterText) {
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

	const optionIdentifier = 'id';
	const getOptionLabel = (option) => option.name;
	const getSelectionLabel = (option) => option.name;
</script>

<Select
	{loadOptions}
	{optionIdentifier}
	{getSelectionLabel}
	{getOptionLabel}
	placeholder="Search for tags"
	on:select
/>
