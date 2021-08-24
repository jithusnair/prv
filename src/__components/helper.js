export async function getImagesList() {
  let results = [];
  let url = ''
  for (const page of [1,2,3,4,5]) {
    try {
      if(page === 1) url = `https://danbooru.donmai.us/posts.json?tags=dominatrix`
      else url = `https://danbooru.donmai.us/posts.json?tags=dominatrix&page=${page}`

      let arr = await fetch(url, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
      })
      .then(res => res.json())

      for (const item of arr) {
        if(item.large_file_url) results.push(item.large_file_url);
      }
    } catch (error) {
      console.error(error);
    }
  }
  return results;
}

export async function getImageWithTag(tag) {
  let results = [];
  // https://danbooru.donmai.us/posts.json?tags=order%3Arank+nude
  let arr = await fetch('https://danbooru.donmai.us/posts.json?tags=' + encodeURIComponent(tag), {
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
  })
  .then(res => res.json())

  for (const item of arr) {
    if(item.large_file_url) results.push(item.large_file_url);
  }

  return results;
}