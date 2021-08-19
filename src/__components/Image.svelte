<script>
	import { onMount } from 'svelte';
	import ColorThief from 'colorthief';
	import { fade } from 'svelte/transition';
	import SelectTags from './SelectTags.svelte';
	import { getImagesList, getImageWithTag } from './helper';

	let width = '';
	let height = '';

	let image;
	let background;

	let urls = [];
	let count = 0;

	let src = '';

	let timer;

	onMount(async () => {
		urls = await getImagesList();
		setTimer();
	});

	let randomValue = Math.random();

	function setTimer() {
		console.log(urls);
		timer = setInterval(() => {
			randomValue = Math.random();
			count++;
			if (count === urls.length) {
				count = 0;
			}
			src = urls[count];
			console.log(src, count);
		}, 5000);
	}

	$: if (image && background) {
		const colorThief = new ColorThief();
		const img = image;

		function imageRenderedCallback() {
			// alert("Image Rendered Callback executed");
			let color = colorThief.getColor(img);
			let hexColor = rgbToHex(...color);
			background.style.backgroundColor = hexColor;
		}

		const rgbToHex = (r, g, b) =>
			'#' +
			[r, g, b]
				.map((x) => {
					const hex = x.toString(16);
					return hex.length === 1 ? '0' + hex : hex;
				})
				.join('');

		function imageRenderingStarted() {
			requestAnimationFrame(imageRenderedCallback);
		}

		// Attach handler for load event.
		img.addEventListener('load', function () {
			requestAnimationFrame(imageRenderingStarted);
		});
	}

	async function handleSelect(event) {
		urls = await getImageWithTag(event.detail.name);
		count = 0;

		clearInterval(timer);
		setTimer();
	}
</script>

{#key randomValue}
	<div
		bind:this={background}
		transition:fade={{ duration: 1000, delay: 1500 }}
		class="container"
		bind:clientHeight={height}
		bind:clientWidth={width}
	>
		{#if !src}
			<h1>Loading...</h1>
		{:else}
			<img
				bind:this={image}
				class="mainImage"
				{src}
				alt="background wallpapers"
				crossorigin="anonymous"
			/>
		{/if}
	</div>
{/key}

<div class="tags">
	<SelectTags on:select={handleSelect} />
</div>

<style>
	.container,
	.tags,
	h1 {
		position: absolute;
		height: 100%;
	}

	.container {
		width: 100%;
		top: 0;
	}

	h1 {
		margin: 0;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	.tags {
		width: 300px;
		left: 0;
		top: 0;
	}

	.mainImage {
		z-index: 1;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		max-width: 80%;
		max-height: 80%;
	}
</style>
