export const getArtData = (currentPage: number) => {
  return fetch(`https://api.artic.edu/api/v1/artworks?page=${currentPage + 1}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .catch((error) => error);
};
